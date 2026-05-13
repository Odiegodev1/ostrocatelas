import { z } from "zod";

export const computerSchema = z.object({
  clienteId: z.string().min(1, "Cliente é obrigatório"),
  computerName: z.string().min(1),
  model: z.string().optional(),
  processor: z.string().optional(),

  // Trocar z.coerce.number() por z.number() nos opcionais ✅
  currentRamSize: z.number().int().optional(),
  currentRamSlots: z.number().int().optional(),
  currentRamType: z.enum(["DDR3", "DDR4", "DDR5"]).optional(),
  currentRamFrequency: z.number().int().optional(),

  dualChannel: z.boolean(),

  currentStorageType: z.enum(["HDD", "SSD", "NVME"]).optional(),
  currentStorageSize: z.number().int().optional(),
});

export type ComputerSchema = z.infer<typeof computerSchema>;