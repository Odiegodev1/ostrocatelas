import { Header } from "@/components/Header";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Rocket, Clock, CheckCircle2, HelpCircle } from "lucide-react";
import { GetClientes } from "../actions/get-cliente";
import { CardForm } from "../components/CardForm";

export default async function Dashboard() {
  const clientes = await GetClientes();

  return (
    <div className="flex min-h-screen flex-col w-full bg-zinc-50/50">
      <Header />
      
      {/* Container Principal centralizado */}
      <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Título da Seção */}
        <div className="mb-10 space-y-1">
          <h1 className="text-3xl font-extrabold text-zinc-900 tracking-tight">Novo Diagnóstico Técnico</h1>
          <p className="text-zinc-500 text-lg">Insira as especificações da máquina para gerar uma recomendação estratégica.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Coluna do Formulário (Esquerda) */}
          <div className="lg:col-span-7 xl:col-span-8">
            <CardForm clients={clientes as any} />
          </div>

          {/* Coluna Informativa (Direita) */}
          <div className="lg:col-span-5 xl:col-span-4 flex flex-col gap-8">
            
            <Card className="bg-zinc-900 border-none shadow-2xl overflow-hidden relative group">
              {/* Efeito visual de gradiente sutil no fundo */}
              <div className="absolute -right-10 -top-10 w-48 h-48 bg-blue-600/20 rounded-full blur-3xl transition-all group-hover:bg-blue-600/30" />
              
              <CardHeader className="relative z-10 pb-4">
                <CardTitle className="flex items-center gap-3 text-blue-400 text-xs font-bold tracking-[0.2em] uppercase">
                  <Shield className="w-4 h-4" />
                  Garantia de Performance
                </CardTitle>
              </CardHeader>

              <CardContent className="relative z-10 space-y-8">
                <CardTitle className="text-3xl font-bold leading-tight text-white tracking-tight">
                  Maximize o Potencial do Hardware
                </CardTitle>
                
                <div className="space-y-5">
                  <FeatureItem 
                    icon={<Rocket className="w-4 h-4 text-blue-400" />} 
                    text="Velocidade de boot e resposta imediata" 
                  />
                  <FeatureItem 
                    icon={<Clock className="w-4 h-4 text-blue-400" />} 
                    text="Redução de gargalos em multitarefas" 
                  />
                  <FeatureItem 
                    icon={<CheckCircle2 className="w-4 h-4 text-blue-400" />} 
                    text="Economia escalável para o cliente" 
                  />
                </div>
              </CardContent>

              <CardFooter className="relative z-10 border-t border-white/5 pt-8 mt-4 bg-white/[0.02]">
                <CardDescription className="text-zinc-400 text-sm leading-relaxed italic">
                  "Recomendações baseadas em arquitetura técnica garantem que o cliente invista no componente correto, evitando gastos desnecessários."
                </CardDescription>
              </CardFooter>
            </Card>

            {/* Card Extra de Suporte Profissional */}
            <div className="p-8 rounded-2xl border border-dashed border-zinc-200 bg-white shadow-sm flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-zinc-100 rounded-lg">
                  <HelpCircle className="w-5 h-5 text-zinc-600" />
                </div>
                <h4 className="font-bold text-zinc-800">Suporte ao Diagnóstico</h4>
              </div>
              <p className="text-sm text-zinc-500 leading-relaxed">
                Em caso de dúvidas sobre a frequência da RAM ou slots disponíveis, utilize ferramentas como o <strong>CPU-Z</strong> no cliente antes de preencher o formulário.
              </p>
              <div className="h-1 w-12 bg-blue-600 rounded-full" />
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}

// Componente auxiliar refinado
function FeatureItem({ icon, text }: { icon: React.ReactNode, text: string }) {
  return (
    <div className="flex items-center gap-4 group/item">
      <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 transition-all group-hover/item:border-blue-500/50 group-hover/item:bg-white/10">
        {icon}
      </div>
      <span className="text-zinc-300 text-sm font-semibold tracking-wide">{text}</span>
    </div>
  );
}