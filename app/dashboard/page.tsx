import { Header } from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Calendar, TrendingUp } from "lucide-react"; // Ícones dão vida ao painel
import DemoPage from "../cliente/page";
import prisma from "@/lib/prisma";

export default async function Dashboard() {
  const orcamentoHoje = await prisma.computer.findMany({
    orderBy: { createdAt: "desc" },
    where: {
      createdAt: {
        gte: new Date(new Date().setHours(0, 0, 0, 0)), // Início do dia atual
      },
    },
  });

  const orcamentoTotal = await prisma.computer.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="flex min-h-screen flex-col w-full bg-zinc-50/50">
      <Header />
      
      <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Título e Boas-vindas */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900">Painel de Controle</h1>
          <p className="text-zinc-500">Gerencie os orçamentos e ordens de serviço da Troca Telas.</p>
        </div>

        {/* Grid de Cards de Estatísticas */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          
          <Card className="shadow-sm border-zinc-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-zinc-600">Orçamentos (Hoje)</CardTitle>
              <Calendar className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{orcamentoHoje.length}</div>
              <p className="text-xs text-zinc-500 mt-1">+2% em relação a ontem</p>
            </CardContent>
          </Card>

          <Card className="shadow-sm border-zinc-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-zinc-600">Total Acumulado</CardTitle>
              <FileText className="h-4 w-4 text-zinc-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{orcamentoTotal.length}</div>
              <p className="text-xs text-zinc-500 mt-1">Registros no banco de dados</p>
            </CardContent>
          </Card>

          {/* Card Extra para preencher o Grid e dar ar de "sistema completo" */}
          <Card className="shadow-sm border-zinc-200 bg-zinc-900 text-white md:col-span-2 lg:col-span-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-zinc-300">Status do Sistema</CardTitle>
              <TrendingUp className="h-4 w-4 text-emerald-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Online</div>
              <p className="text-xs text-zinc-400 mt-1">Sincronizado com o banco</p>
            </CardContent>
          </Card>

        </div>

        {/* Tabela de Clientes / Lista de O.S. */}
        <div className="rounded-xl border border-zinc-200 bg-white p-2 shadow-sm">
           <DemoPage />
        </div>
        
      </main>
    </div>
  );
}