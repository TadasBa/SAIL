// Class that contains available services (bussiness level methods), that will serve as a middle person and will call ToolRepository methods 

import { AITool } from "../types/AITool";
import { IToolRepository } from "../repositories/IToolRepository";

export class ToolService {
  private readonly toolRepository: IToolRepository;

  constructor(toolRepository: IToolRepository) {
    this.toolRepository = toolRepository;
  }

  // Get all tools
  async listTools(): Promise<AITool[]> {
    return this.toolRepository.getAll();
  }

  // Get one tool by id
  async getTool(id: number): Promise<AITool | null> {
    return this.toolRepository.getById(id);
  }

  // Add a new tool
  async addTool(tool: AITool): Promise<void> {
    await this.toolRepository.create(tool);
  }

  // Update an existing tool
  async updateTool(tool: AITool): Promise<boolean> {
    const existing = await this.toolRepository.getById(tool.id);
    if (!existing) return false;

    const updated = { ...existing, ...tool };
    await this.toolRepository.update(updated);
    return true;
  }

  // Remove a tool
  async removeTool(id: number): Promise<boolean> {
    const existing = await this.toolRepository.getById(id);
    if (!existing) return false;

    await this.toolRepository.delete(id);
    return true;
  }
}
