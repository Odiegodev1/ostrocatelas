import { Header } from "@/components/Header";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  CheckCheck,
  CheckCircle,
  CreditCard,
  HardDrive,
  MemoryStick,
  Shield,
  Sparkles,
  Timer,
  Wrench,
  Share2,
  Download,
  ArrowUpRight,
} from "lucide-react";
import Image from "next/image";
import Memo from "@/public/memoria.png";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function Orcamento() {
  return (
    <div className="flex min-h-screen flex-col w-full bg-zinc-50">
      <Header />
      <main className="flex mb-20 flex-col mt-10 w-full max-w-6xl mx-auto px-4">
        
        {/* Header de Confirmação */}
        <div className="flex flex-col w-full items-center mb-12 text-center">
          <div className="bg-emerald-100 p-3 rounded-full mb-4">
            <CheckCircle className="size-8 text-emerald-600" />
          </div>
          <h1 className="text-4xl font-extrabold text-zinc-900 tracking-tight">Orçamento Gerado</h1>
          <p className="max-w-md mt-3 text-zinc-500 leading-relaxed">
            Análise técnica concluída. Sua máquina é elegível para os upgrades abaixo com ganho de performance garantido.
          </p>
        </div>

        <Card className="overflow-hidden border-none shadow-xl bg-white">
          {/* Top Bar do Card */}
          <CardHeader className="bg-zinc-900 text-white p-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div className="space-y-1">
                <span className="text-purple-400 text-xs font-bold uppercase tracking-[0.2em]">
                  Identificação do Hardware
                </span>
                <CardTitle className="text-2xl md:text-3xl font-bold">MacBook Pro M1 (2020)</CardTitle>
                <p className="text-zinc-400 font-mono text-sm">SN: PREC-9921-XQ2</p>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3">
                <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 px-4 py-1.5 flex gap-2 items-center">
                  <CheckCheck className="size-4" />
                  Hardware Compatível
                </Badge>
                <div className="flex gap-2">
                  <Button variant="secondary" size="sm" className="bg-white/10 text-white hover:bg-white/20 border-none">
                    <Download className="size-4 mr-2" /> PDF
                  </Button>
                  <Button variant="secondary" size="sm" className="bg-white/10 text-white hover:bg-white/20 border-none">
                    <Share2 className="size-4 mr-2" /> Enviar
                  </Button>
                </div>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              
              {/* Lado Esquerdo: Lista de Upgrades */}
              <div className="space-y-6">
                <div className="flex items-center gap-2 mb-4">
                  <ArrowUpRight className="text-purple-500 size-5" />
                  <h3 className="font-bold text-zinc-800 uppercase tracking-wide text-sm">Upgrades Recomendados</h3>
                </div>

                <div className="grid gap-4">
                  <UpgradeItem 
                    icon={<MemoryStick className="text-purple-600" />}
                    title="Expansão de Memória RAM"
                    description="+ 8GB DDR4 3200Mhz Crucial"
                    tag="Performance"
                  />
                  <UpgradeItem 
                    icon={<HardDrive className="text-blue-600" />}
                    title="Upgrade de Armazenamento"
                    description="SSD NVMe M.2 1TB Samsung 980 Pro"
                    tag="Velocidade"
                  />
                  <UpgradeItem 
                    icon={<Wrench className="text-amber-600" />}
                    title="Manutenção Preventiva"
                    description="Instalação + Limpeza Interna + Pasta Térmica"
                    tag="Saúde"
                  />
                </div>
              </div>

              {/* Lado Direito: Imagem e Preço */}
              <div className="flex flex-col gap-6">
                <div className="relative group rounded-2xl overflow-hidden shadow-inner bg-zinc-100 border border-zinc-200 h-64 lg:h-auto">
                  <Image
                    src={Memo}
                    alt="Hardware Image"
                    fill
                    className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                <Card className="bg-zinc-900 border-none text-white overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 opacity-10">
                    <CreditCard size={80} />
                  </div>
                  <CardHeader className="pb-2">
                    <span className="text-zinc-400 text-xs font-medium uppercase italic">Investimento Total</span>
                    <CardTitle className="text-4xl font-black text-white">R$ 950,00</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-zinc-400 text-sm leading-relaxed">
                      Este valor inclui peças originais, mão de obra especializada e seguro durante o manuseio.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div className="mt-12">
              <Button className="w-full h-16 text-lg font-bold bg-purple-600 hover:bg-purple-700 shadow-xl shadow-purple-200 transition-all active:scale-[0.99] group">
                <Sparkles className="mr-3 size-5 group-hover:animate-pulse" />
                Confirmar e Agendar Coleta
              </Button>
            </div>
          </CardContent>

          {/* Rodapé Informativo */}
          <CardFooter className="bg-zinc-50 py-6 border-t border-zinc-100 grid grid-cols-1 md:grid-cols-3 gap-6">
            <FooterInfo icon={<Timer className="text-purple-500" />} label="Prazo de Entrega" value="3 dias Úteis" />
            <FooterInfo icon={<Shield className="text-emerald-500" />} label="Garantia Técnica" value="90 dias Premium" />
            <FooterInfo icon={<CreditCard className="text-blue-500" />} label="Pagamento Facilitado" value="Até 6x sem juros" />
          </CardFooter>
        </Card>
      </main>
    </div>
  );
}

function UpgradeItem({ icon, title, description, tag }: { icon: React.ReactNode, title: string, description: string, tag: string }) {
  return (
    <div className="flex items-start gap-4 p-4 rounded-xl border border-zinc-200 bg-white hover:border-purple-200 hover:shadow-md transition-all group">
      <div className="p-2 rounded-lg bg-zinc-100 group-hover:bg-purple-50 transition-colors">
        {icon}
      </div>
      <div className="flex-1">
        <div className="flex justify-between items-center mb-1">
          <h4 className="font-bold text-zinc-900 text-sm leading-none">{title}</h4>
          <span className="text-[10px] font-bold uppercase py-0.5 px-2 bg-zinc-100 rounded-full text-zinc-500 tracking-tighter">
            {tag}
          </span>
        </div>
        <p className="text-xs text-zinc-500">{description}</p>
      </div>
    </div>
  );
}

function FooterInfo({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) {
  return (
    <div className="flex items-center gap-3 px-4 py-2 rounded-lg bg-white shadow-sm border border-zinc-100">
      <div className="flex-shrink-0">{icon}</div>
      <div className="flex flex-col">
        <span className="text-[10px] text-zinc-400 font-bold uppercase">{label}</span>
        <span className="text-sm font-semibold text-zinc-800 leading-tight">{value}</span>
      </div>
    </div>
  );
}