import { Header } from "@/components/Header";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Rocket, Clock, CheckCircle2 } from "lucide-react";
import { GetClientes } from "../actions/get-cliente";
import { CardForm } from "../components/CardForm";



export default async function Dashboard() {
  const clientes = await GetClientes();

  return (
    <div className="flex min-h-screen flex-col w-full bg-zinc-50/50">
      <Header />
      
      {/* Container Principal com Max-Width centralizado */}
      <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        {/* Título da Seção ou Breadcrumb opcional */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-zinc-800 tracking-tight">Novo Diagnóstico</h1>
          <p className="text-zinc-500 text-sm">Preencha os dados abaixo para gerar uma recomendação de upgrade personalizada.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Coluna do Formulário (Esquerda) */}
          <div className="lg:col-span-7 xl:col-span-8">
            <CardForm clients={clientes as any} />
          </div>

          {/* Coluna Informativa (Direita) */}
          <div className="lg:col-span-5 xl:col-span-4 flex flex-col gap-6">
            
            <Card className="bg-zinc-900 border-none shadow-2xl overflow-hidden relative">
              {/* Círculo decorativo de fundo */}
              <div className="absolute -right-10 -top-10 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl" />
              
              <CardHeader className="relative z-10">
                <CardTitle className="flex items-center gap-3 text-purple-400 text-sm font-bold tracking-widest uppercase">
                  <Shield className="w-5 h-5" />
                  Por que atualizar?
                </CardTitle>
              </CardHeader>

              <CardContent className="relative z-10 space-y-6">
                <CardTitle className="text-3xl font-semibold leading-tight text-white">
                  Otimize a performance do seu setup
                </CardTitle>
                
                <div className="space-y-4">
                  <FeatureItem 
                    icon={<Rocket className="w-4 h-4 text-emerald-400" />} 
                    text="Aumento imediato de produtividade" 
                  />
                  <FeatureItem 
                    icon={<Clock className="w-4 h-4 text-emerald-400" />} 
                    text="Redução de tempo de carregamento" 
                  />
                  <FeatureItem 
                    icon={<CheckCircle2 className="w-4 h-4 text-emerald-400" />} 
                    text="Extensão da vida útil do hardware" 
                  />
                </div>
              </CardContent>

              <CardFooter className="relative z-10 border-t border-white/5 pt-6 mt-4">
                <CardDescription className="text-zinc-400 italic">
                  "Upgrades de memória e armazenamento são as formas mais eficazes de estender a vida útil do seu hardware corporativo."
                </CardDescription>
              </CardFooter>
            </Card>

            {/* Card Extra de Suporte ou Status (Opcional UX) */}
            <div className="p-6 rounded-xl border border-dashed border-zinc-300 bg-white/50">
              <h4 className="text-sm font-medium text-zinc-700 mb-1">Precisa de ajuda?</h4>
              <p className="text-xs text-zinc-500 leading-relaxed">
                Consulte o manual técnico ou entre em contato com o suporte para especificações de placas-mãe.
              </p>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}

// Componente auxiliar para a lista de features no card lateral
function FeatureItem({ icon, text }: { icon: React.ReactNode, text: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-white/5 flex items-center justify-center">
        {icon}
      </div>
      <span className="text-zinc-300 text-sm font-medium">{text}</span>
    </div>
  );
}