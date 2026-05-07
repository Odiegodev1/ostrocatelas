import { z } from "zod";

export const computerSchema = z.object({
  clienteId: z.string().min(1, "Cliente é obrigatório"),

  computerName: z.string().min(1),
  model: z.string().optional(),

  processor: z.string().optional(),

  // RAM atual (FIX)
  currentRamSize: z.coerce.number().int().optional(),
  currentRamSlots: z.coerce.number().int().optional(),
  currentRamType: z.enum(["DDR3", "DDR4", "DDR5"]).optional(),
  currentRamFrequency: z.coerce.number().int().optional(),

  dualChannel: z.boolean().default(false),

  // armazenamento atual (FIX)
  currentStorageType: z.enum(["HDD", "SSD", "NVME"]).optional(),
  currentStorageSize: z.coerce.number().int().optional(),
});

export type ComputerSchema = z.infer<typeof computerSchema>;