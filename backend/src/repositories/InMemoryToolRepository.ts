// Class that will be storing AI tools in array until DB is added
// Class implements in IToolRepository defined operations

import { AITool } from "../types/AITool";
import { IToolRepository } from "./IToolRepository";

export class InMemoryToolRepository implements IToolRepository
{
    private tools: AITool[] = [];
    private currentId = 1;

    async getAll(): Promise<AITool[]> {
        return this.tools;
    }

    async getById(id: number): Promise<AITool | null> {
        for(const tool of this.tools)
        {
            if(tool.id === id)
            {
                return tool;
            }            
        }
        return null;
    }


    async create(tool: AITool): Promise<void> {
        tool.id = this.currentId++;
        this.tools.push(tool);
    }

    async update(tool: AITool): Promise<void> {
        for (let i = 0; i < this.tools.length; i++) {
          const existing = this.tools[i];
          if (existing && existing.id === tool.id) {
            this.tools[i] = tool;
            return;
          }
        }
      }
      

    async delete(id: number): Promise<void> {
        this.tools = this.tools.filter(tool => tool.id !== id);
    }

}