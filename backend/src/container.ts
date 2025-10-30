import { createContainer, asClass, asValue, Lifetime } from "awilix";
import { InMemoryToolRepository } from "./repositories/InMemoryToolRepository";
import { DbToolRepository } from "./repositories/DbToolRepository";
import { ToolService } from "./services/ToolService";
import { prisma } from "./db/prismaClient";

export const container = createContainer({ injectionMode: "CLASSIC" });

const useDb = process.env.USE_DB === "1";

if (useDb) {
  container.register({
    prisma: asValue(prisma), // so DbToolRepository can receive it
    toolRepository: asClass(DbToolRepository, { lifetime: Lifetime.SINGLETON }),
    toolService: asClass(ToolService, { lifetime: Lifetime.SCOPED })
  });
} else {
  container.register({
    toolRepository: asClass(InMemoryToolRepository, { lifetime: Lifetime.SINGLETON }),
    toolService: asClass(ToolService, { lifetime: Lifetime.SCOPED })
  });
}
