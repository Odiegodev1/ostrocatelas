"use server";

import prisma from "@/lib/prisma";
import { ComputerSchema } from "../schema/formpcschema";


export default async function CreatePC(data: ComputerSchema) {
try{

    const createpc = await prisma.computer.create({
        data: {
           clienteId: data.clienteId,
           computerName: data.computerName,
           model: data.model,
           processor: data.processor,
           currentRamSize: data.currentRamSize,
           currentRamSlots: data.currentRamSlots,
           currentRamType: data.currentRamType,
           currentRamFrequency: data.currentRamFrequency,
           dualChannel: data.dualChannel,
           currentStorageType: data.currentStorageType,
           currentStorageSize: data.currentStorageSize

        },
    })
    console.log("----------- aqui :",createpc)
    return{
        data: createpc,
        error: null
    }

}catch(error){
    return{
        data: null,
        error: "Não e possivel "   
    }
}
}