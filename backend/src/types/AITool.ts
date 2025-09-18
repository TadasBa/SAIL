// Interface that defines single AI tool

export interface AITool
{
    id: number,
    name: string,
    description: string,
    category: "chatbot" | "image" | "video" | "programing" | "other",
    website: string,
    pricing: "free" | "paid",
    released: Date,
    company: string
}