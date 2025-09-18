// Interface that defines what operations will be availabe to execute for manipulating and quering AI tool library
// Promise object is used to enable asinchronous operations, that will be important when DB layer is implemented

import { AITool } from "../types/AITool";

export interface IToolRepository
{
    getAll(): Promise<AITool[]>,
    getById(id: number): Promise<AITool | null>,
    create(tool: AITool): Promise<void>,
    update(tool: AITool): Promise<void>,
    delete(id: number): Promise<void>,
};