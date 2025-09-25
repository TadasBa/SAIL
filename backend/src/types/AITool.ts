// Interface that defines single AI tool

import { Category } from "./Categories";

export interface AITool
{
    id: number,
    name: string,
    description: string,
    category: Category,
    website: string,
    pricing: "free" | "paid",
    released: string,
    company: string
}