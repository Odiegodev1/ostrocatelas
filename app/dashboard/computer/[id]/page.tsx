import Tablecomputer from "@/app/tabelacomputer/page";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import { Backbutton } from "../components/Backbutton";
import { Laptop, History } from "lucide-react"; // Ícones para dar contexto

export default async function Computer({
    params
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params;
    
    // Busca o cliente para exibir o nome ou validar existência
    const cliente = await prisma.cliente.findUnique({ 
        where: { id },
        
    });

    if (!cliente) {
        return notFound();
    }

    return (
        <main className="min-h-screen bg-zinc-50/50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto space-y-6">
                
                {/* Header com Navegação e Título */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="space-y-1">
                        <div className="flex items-center gap-2 text-sm text-zinc-500 font-medium">
                            <Backbutton />
                            <span>/ Histórico de Equipamentos</span>
                        </div>
                        <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-zinc-900 flex items-center gap-3">
                            <Laptop className="h-8 w-8 text-blue-600" />
                            Aparelhos de {cliente?.name}
                        </h1>
                        <p className="text-zinc-500 text-sm md:text-base">
                            Gerencie ordens de serviço e upgrades para este cliente.
                        </p>
                    </div>

                    {/* Badge de Resumo (Opcional, mas fica bonito) */}
                    <div className="bg-white border border-zinc-200 px-4 py-2 rounded-xl shadow-sm self-start md:self-center">
                        <span className="text-xs text-zinc-400 uppercase font-bold tracking-wider">Status do Cliente</span>
                        <div className="flex items-center gap-2 text-emerald-600 font-semibold">
                            <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                            Ativo no Sistema
                        </div>
                    </div>
                </div>

                {/* Container Principal da Tabela */}
                <section className="bg-white rounded-2xl border border-zinc-200 shadow-sm overflow-hidden">
                    <div className="border-b border-zinc-100 bg-zinc-50/50 px-6 py-4 flex items-center justify-between">
                        <div className="flex items-center gap-2 font-medium text-zinc-700">
                            <History className="h-4 w-4" />
                            Registros de Hardware
                        </div>
                        <span className="text-xs bg-zinc-200 text-zinc-600 px-2 py-1 rounded-md font-mono">
                            ID: {id.slice(0, 8)}...
                        </span>
                    </div>

                    <div className="p-0 sm:p-6 overflow-x-auto">
                        {/* 
                           DICA: Certifique-se que o componente Tablecomputer 
                           tenha classes de overflow-x-auto para mobile 
                        */}
                        <Tablecomputer id={id} />
                    </div>
                </section>

                <footer className="text-center text-zinc-400 text-xs py-4">
                    Troca Telas & Muito+ • Sistema Interno de Gestão
                </footer>
            </div>
        </main>
    );
}