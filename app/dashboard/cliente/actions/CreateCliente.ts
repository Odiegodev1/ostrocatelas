"use server";
import {hashSync} from "bcrypt-ts"
import prisma from "@/lib/prisma";
import { FormSchemaUser } from "../../schema/formuserschema";
import { revalidatePath } from "next/cache";

export async function CreateCliente(data: FormSchemaUser) {
    const dataget = data
    if (!dataget) {
        return{
            data: null,
            error: "Não e possivel criar um cliente sem dados"
        }
    }
  
    try{

        const cliente = await prisma.cliente.create({
            data: {
                name:data.name,
                phone: data.phone,
                cpf: data.cpf,
                address: data.address
            }
        })
        revalidatePath("/dashboard/cliente")
        revalidatePath("/dashboard")
        revalidatePath("/")
        console.log("----------- aqui :",cliente)

        return{
            data: cliente,
            error: null
        }
        
           
    }catch(error){
        return{
            data: null,
            error: "Não e possivel criar um cliente "
        }
    }
}