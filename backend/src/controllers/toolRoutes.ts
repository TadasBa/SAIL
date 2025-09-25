// Class that uses Express to handle http requests/responses

import { Router, Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import { createToolValidator, updateToolValidator } from "../validators/toolValidators";
import { allowedCategories } from "../types/Categories";

const router = Router();


// GET /tools/categories (gets predifined tool categories)
router.get("/categories", (_req: Request, res: Response) => {
  res.json(allowedCategories);
});

// GET /tools (all tools)
router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const toolService = (req as any).container.cradle.toolService;
    const tools = await toolService.listTools();
    res.json(tools);
  } catch (err) {
    next(err);
  }
});

// GET /tools/:id (one tool by id)
router.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const toolService = (req as any).container.cradle.toolService;
    const id = Number(req.params.id);
    const tool = await toolService.getTool(id);

    if (!tool) {
      return res.status(404).json({ error: "Tool not found" });
    }
    res.json(tool);
  } catch (err) {
    next(err);
  }
});

// POST /tools (create tool)
router.post("/", createToolValidator, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const toolService = (req as any).container.cradle.toolService;
    await toolService.addTool(req.body);
    res.status(201).json({ message: "Tool created" });
  } catch (err) {
    next(err);
  }
});

// PUT /tools/:id (update tool)
router.put("/:id", updateToolValidator, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const toolService = (req as any).container.cradle.toolService;
    const id = Number(req.params.id);
    const ok = await toolService.updateTool({ ...req.body, id });

    if (!ok) return res.status(404).json({ error: "Tool not found" });
    res.json({ message: "Tool updated" });
  } catch (err) {
    next(err);
  }
});

// DELETE /tools/:id (delete tool)
router.delete("/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const toolService = (req as any).container.cradle.toolService;
    const id = Number(req.params.id);
    const ok = await toolService.removeTool(id);

    if (!ok) return res.status(404).json({ error: "Tool not found" });
    res.status(204).send();
  } catch (err) {
    next(err);
  }
});

export const toolRoutes = router;
