const request = require('supertest');
const { createApp } = require('../dist/app.js');
const awilix = require('awilix');         
const { container } = require('../dist/container.js');
const { createApp: createApp2 } = require('../dist/app.js');

function tool(overrides = {}) {
  return {
    name: "Copilot",
    description: "AI coding assistant",
    category: "Programming",
    website: "https://example.com",
    pricing: "paid",
    released: "2024-05-10",
    company: "GitHub",
    ...overrides
  };
}

describe("Tools API (public contracts)", () => {
  const app = createApp();

  it("GET /tools -> [] initially", async () => {
    const res = await request(app).get("/tools");
    expect(res.status).toBe(200);
    expect(res.body).toEqual([]);
  });

  it("GET /tools/categories returns array", async () => {
    const res = await request(app).get("/tools/categories");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThanOrEqual(4);
  });

  it("POST /tools creates; then GET /tools/:id returns it", async () => {
    const created = await request(app).post("/tools").send(tool());
    expect(created.status).toBe(201);

    const list = await request(app).get("/tools");
    expect(list.status).toBe(200);
    expect(list.body.length).toBe(1);

    const t = list.body[0];
    expect(t).toEqual(expect.objectContaining({ id: expect.any(Number), ...tool() }));

    const byId = await request(app).get(`/tools/${t.id}`);
    expect(byId.status).toBe(200);
    expect(byId.body).toEqual(t);
  });

  it("PUT /tools/:id updates fields", async () => {
    const list = await request(app).get("/tools");
    const id = list.body[0].id;

    const upd = await request(app).put(`/tools/${id}`).send({ pricing: "free", website: "https://new.example.com" });
    expect(upd.status).toBe(200);

    const byId = await request(app).get(`/tools/${id}`);
    expect(byId.body.pricing).toBe("free");
    expect(byId.body.website).toBe("https://new.example.com");
  });

  it("DELETE /tools/:id removes; then 404 on GET", async () => {
    const list = await request(app).get("/tools");
    const id = list.body[0].id;

    const del = await request(app).delete(`/tools/${id}`);
    expect(del.status).toBe(204);

    const missing = await request(app).get(`/tools/${id}`);
    expect(missing.status).toBe(404);
  });

  // -------- Validation & error paths --------

  it("GET /tools/:id 404 for non-existent", async () => {
    const res = await request(app).get("/tools/999999");
    expect(res.status).toBe(404);
  });

  it("POST /tools 400 for invalid payload", async () => {
    const res = await request(app).post("/tools").send({
      name: "",
      description: "",
      category: "Nope",
      website: "not-a-url",
      pricing: "maybe",
      released: "not-a-date",
      company: ""
    });
    expect(res.status).toBe(400);
    expect(Array.isArray(res.body.errors)).toBe(true);
  });

  it("PUT /tools/:id 400 for invalid fields", async () => {
    // create a valid tool first
    await request(app).post("/tools").send(tool({ name: "X" }));
    const list = await request(app).get("/tools");
    const id = list.body.find(t => t.name === "X").id;

    const bad = await request(app).put(`/tools/${id}`).send({ website: "bad" });
    expect(bad.status).toBe(400);
    expect(Array.isArray(bad.body.errors)).toBe(true);
  });

  it("PUT /tools/:id 404 for missing id", async () => {
    const res = await request(app).put("/tools/999999").send({ pricing: "free" });
    expect(res.status).toBe(404);
  });

  it("DELETE /tools/:id 404 for missing id", async () => {
    const res = await request(app).delete("/tools/999999");
    expect(res.status).toBe(404);
  });

  it("GET / health", async () => {
    const res = await request(app).get("/");
    expect(res.status).toBe(200);
    expect(typeof res.text).toBe("string");
  });
});

describe("Error paths (service throws -> 500 + catch->next)", () => {
  let app;
  let consoleErrorSpy;

  beforeAll(() => {
    // Silence the error logs from the error handler to keep test output clean
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    // Replace toolService in DI container with a stub that throws on every call
    container.register({
      toolService: awilix.asValue({
        listTools: () => { throw new Error('boom'); },
        getTool:   () => { throw new Error('boom'); },
        addTool:   () => { throw new Error('boom'); },
        updateTool:() => { throw new Error('boom'); },
        removeTool:() => { throw new Error('boom'); }
      })
    });
    // Create a fresh app AFTER we override the container, so requests use the throwing service
    app = createApp2();
  });

  afterAll(() => {
    consoleErrorSpy.mockRestore();
  });

  it("GET /tools -> 500 when service fails", async () => {
    const res = await request(app).get("/tools");
    expect(res.status).toBe(500);
    expect(res.body).toEqual({ error: "Internal server error" });
  });

  it("GET /tools/:id -> 500 when service fails", async () => {
    const res = await request(app).get("/tools/1");
    expect(res.status).toBe(500);
    expect(res.body).toEqual({ error: "Internal server error" });
  });

  it("POST /tools -> 500 when service fails (valid payload)", async () => {
    const res = await request(app).post("/tools").send({
      name: "X",
      description: "Y",
      category: "Programming",
      website: "https://example.com",
      pricing: "free",
      released: "2024-01-01",
      company: "Z"
    });
    expect(res.status).toBe(500);
    expect(res.body).toEqual({ error: "Internal server error" });
  });

  it("PUT /tools/:id -> 500 when service fails (valid payload)", async () => {
    const res = await request(app).put("/tools/1").send({
      website: "https://example.com/new"
    });
    expect(res.status).toBe(500);
    expect(res.body).toEqual({ error: "Internal server error" });
  });

  it("DELETE /tools/:id -> 500 when service fails", async () => {
    const res = await request(app).delete("/tools/1");
    expect(res.status).toBe(500);
    expect(res.body).toEqual({ error: "Internal server error" });
  });
});
