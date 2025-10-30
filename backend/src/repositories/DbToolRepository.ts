import { PrismaClient, Pricing, Category } from "@prisma/client";
import { AITool } from "../types/AITool";

function toISODateOnly(d: Date): string {
  return d.toISOString().slice(0, 10);
}

// Map DB row to API AITool
function mapFromDb(db: any): AITool {
  return {
    id: db.id,
    name: db.name,
    description: db.description,
    category: db.category as unknown as AITool["category"],
    website: db.website,
    pricing: db.pricing as unknown as AITool["pricing"],
    released: toISODateOnly(db.released),
    company: db.company
  };
}

export class DbToolRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async getAll(): Promise<AITool[]> {
    const rows = await this.prisma.tool.findMany({ orderBy: { id: "asc" } });
    return rows.map(mapFromDb);
  }

  async getById(id: number): Promise<AITool | undefined> {
    const row = await this.prisma.tool.findUnique({ where: { id } });
    return row ? mapFromDb(row) : undefined;
  }

  async create(tool: AITool): Promise<void> {
    await this.prisma.tool.create({
      data: {
        name: tool.name,
        description: tool.description,
        category: tool.category as unknown as Category,
        website: tool.website,
        pricing: tool.pricing as unknown as Pricing,
        released: new Date(tool.released),
        company: tool.company
      }
    });
  }

  async update(tool: AITool): Promise<void> {
    await this.prisma.tool.update({
      where: { id: tool.id },
      data: {
        name: tool.name,
        description: tool.description,
        category: tool.category as unknown as Category,
        website: tool.website,
        pricing: tool.pricing as unknown as Pricing,
        released: new Date(tool.released),
        company: tool.company
      }
    });
  }

  async delete(id: number): Promise<void> {
    await this.prisma.tool.delete({ where: { id } });
  }
}