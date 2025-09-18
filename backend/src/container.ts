import { createContainer, asClass, Lifetime} from "awilix";
import { InMemoryToolRepository } from "./repositories/InMemoryToolRepository";
import { ToolService } from "./services/ToolService";

export const container = createContainer(
    {
        injectionMode: "CLASSIC"
    }
);

container.register({
    toolRepository: asClass(InMemoryToolRepository, {lifetime: Lifetime.SINGLETON,}), // Repository should live for the whole app lifetime
    toolService: asClass(ToolService, {lifetime: Lifetime.SCOPED,})  // Service should be new per request
});

