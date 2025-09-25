// create Express app, mount routers, error handler, listen
import express from "express";
import { container } from "./container";
import { scopePerRequest } from "awilix-express";
import { toolRoutes } from "./controllers/toolRoutes";
import cors from "cors";

const app = express();  // creates my server
app.use(cors());        // To allow calling http://localhost:3000 from http://localhost:5173
app.use(express.json());
app.use(scopePerRequest(container));

app.get("/", (req, res) => {
  res.send("API is running. Try GET /tools");
});

app.use("/tools", toolRoutes);

// Error handler
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err);
  res.status(500).json({ error: "Internal server error" });
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
