import express from "express";
import cors from "cors";
import { scopePerRequest } from "awilix-express";
import { toolRoutes } from "./controllers/toolRoutes";
import { container } from "./container"; // your existing container

export function createApp() {
  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use(scopePerRequest(container));

  app.get("/", (_req, res) => {
    res.send("API is running. Try GET /tools");
  });

  app.use("/tools", toolRoutes);

  // Centralized error handler (good practice)
  app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  });

  return app;
}

// Optionally export a ready-to-use instance (handy for other tools)
export const app = createApp();
