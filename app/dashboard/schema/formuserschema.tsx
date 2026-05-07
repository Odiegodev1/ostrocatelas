import z from "zod";

export const formschemauser = z.object({
    name: z.string().min(1, {message: "Nome e obrigatorio"}),
    phone: z.string().min(1, {message: "Telefone e obrigatorio"}),
    cpf: z.string().min(1, {message: "Cpf e obrigatorio"}),
    address: z.string().min(1, {message: "Endereco e obrigatorio"}),
})

export type FormSchemaUser = z.infer<typeof formschemauser>