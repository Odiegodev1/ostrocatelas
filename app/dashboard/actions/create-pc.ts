"use server";
import OpenAI from "openai";
import prisma from "@/lib/prisma";
import { ComputerSchema } from "../schema/formpcschema";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function CreatePC(data: ComputerSchema) {
try{

 const ramSlots = data.dualChannel ? 2 : 1;

const createpc = await prisma.computer.create({
  data: {
    clienteId: data.clienteId,

    computerName: data.computerName,

    model: data.model,

    processor: data.processor,

    currentRamSize: data.currentRamSize,

    currentRamSlots: ramSlots,

    currentRamType: data.currentRamType,

    currentRamFrequency: data.currentRamFrequency,

    dualChannel: data.dualChannel,

    currentStorageType: data.currentStorageType,

    currentStorageSize: data.currentStorageSize,
  },
});

console.log(
  "informações do computador",
  createpc
);
      const prompt = `
Você é um especialista em upgrade de computadores.

Analise o computador abaixo e retorne SOMENTE um JSON válido.

REGRAS:
- Não explique nada
- Não use markdown
- Responda em português
- Não escreva texto fora do JSON
- Retorne somente JSON puro

Os enums DEVEM seguir exatamente:

RAM:
DDR2
DDR3
DDR4
DDR5

STORAGE:
HDD
SSD
NVME

Formato obrigatório:

{
  "recommendedRamSize": number | null,
  "recommendedRamSlots": number | null,
  "recommendedRamType": "DDR2" | "DDR3" | "DDR4" | "DDR5" | null,
  "recommendedRamFrequency": number | null,
  "recommendedStorageType": "HDD" | "SSD" | "NVME" | null,
  "recommendedStorageSize": number | null,
  "estimatedPrice": number | null,
  "notes": string | null
}

COMPUTADOR:

Marca: ${createpc.computerName}

Modelo: ${createpc.model}

Processador: ${createpc.processor}

RAM Atual:
- Tamanho: ${createpc.currentRamSize}GB
- Slots: ${createpc.currentRamSlots}
- Tipo: ${createpc.currentRamType}
- Frequência: ${createpc.currentRamFrequency}

Dual Channel: ${createpc.dualChannel}

Armazenamento Atual:
- Tipo: ${createpc.currentStorageType}
- Tamanho: ${createpc.currentStorageSize}GB
`;

    // =========================
    // CHAMADA IA
    // =========================

    const response = await openai.chat.completions.create({
      model: "gpt-4.1-mini",

      response_format: {
        type: "json_object",
      },

      messages: [
        {
          role: "system",
          content:
            "Você é um técnico especialista em upgrades de notebooks e computadores.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    // =========================
    // PEGAR JSON IA
    // =========================

    const content = response.choices[0].message.content;

    if (!content) {
      throw new Error("IA não retornou dados");
    }

    const upgradeData = JSON.parse(content);

    // =========================
    // SALVAR UPGRADE
    // =========================

    const upgrade = await prisma.upgradeBudget.create({
      data: {
        computerId: createpc.id,

        recommendedRamSize:
          upgradeData.recommendedRamSize,

        recommendedRamSlots:
          upgradeData.recommendedRamSlots,

        recommendedRamType:
          upgradeData.recommendedRamType,

        recommendedRamFrequency:
          upgradeData.recommendedRamFrequency,

        recommendedStorageType:
          upgradeData.recommendedStorageType,

        recommendedStorageSize:
          upgradeData.recommendedStorageSize,

        estimatedPrice:
          upgradeData.estimatedPrice,

        notes:
          upgradeData.notes,
      },
    });

    // =========================
    // RETORNO
    // =========================

    return {
      data: {
        createpc,
        upgrade,
      },
      error: null,
    };
  } catch (error) {
    console.log(error);

    return {
      data: null,
      error: "Não foi possível criar orçamento",
    };
  }
}