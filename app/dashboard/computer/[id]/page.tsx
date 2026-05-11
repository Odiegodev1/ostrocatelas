
import Tablecomputer from "@/app/tabelacomputer/page";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import { Backbutton } from "../components/Backbutton";

export default async function Computer({
    params
}: {
    params: Promise<{ id: string }>
}) {
    // Caso precise usar o ID no futuro:
    const { id } = await params;
    const clienteId = prisma.cliente.findUnique({ where: { id } });
    if(!clienteId){
        return notFound();
    }
   
const computer = await prisma.computer.findMany({
    where:{
        clienteId: id
    },

    orderBy: {
        createdAt: "desc",
      },
})



    return (
        <main className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <header className="mb-8 border-b border-gray-200 pb-5">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                        Tabela de Computadores
                    </h1>
                    <p className="mt-2 text-sm text-gray-600">
                        Gerencie e visualize as máquinas destinadas para upgrade de hardware.
                    </p>
                </header>

                <section className="bg-white rounded-lg shadow overflow-hidden">
                   <Backbutton />
                    <div className="p-6">
                        <Tablecomputer id={id}  />
                    </div>
                </section>
            </div>
        </main>
    );
}