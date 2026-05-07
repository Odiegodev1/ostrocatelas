"use client";

import { 
  Printer, 
  Download, 
  MapPin, 
  Phone, 
  Globe, 
  Cpu, 
  MemoryStick, 
  HardDrive 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function OSPage() {
  const handlePrint = () => {
    window.print();
  };

  

  return (
    <div className="min-h-screen bg-zinc-100 py-10 px-4 print:bg-white print:py-0 print:px-0">
      
      {/* CSS Injetado para forçar 1 página A4 */}
      <style jsx global>{`
        @media print {
          @page {
            size: A4;
            margin: 0; /* Remove margens do navegador (data, hora, etc) */
          }
          body {
            margin: 0;
            padding: 0;
          }
          /* Garante que o conteúdo não quebre para a segunda página */
          main {
            height: 100vh;
            border: none !important;
            padding: 15mm !important; /* Margem interna de segurança para impressora */
          }
        }
      `}</style>

      {/* Ações do Topo - Escondidas na Impressão */}
      <div className="max-w-[210mm] mx-auto mb-6 flex justify-end gap-3 print:hidden">
        <Button variant="outline" onClick={handlePrint}>
          <Printer className="mr-2 size-4" /> Imprimir OS
        </Button>
        <Button className="bg-purple-600 hover:bg-purple-700">
          <Download className="mr-2 size-4" /> Salvar PDF
        </Button>
      </div>

      {/* Folha A4 - Usando medidas reais em mm para precisão */}
      <main className="mx-auto bg-white shadow-2xl flex flex-col w-[210mm] h-[297mm] p-[15mm] print:shadow-none print:w-full print:h-full">
        
        {/* Cabeçalho da Empresa */}
        <header className="flex justify-between items-start border-b-2 border-zinc-900 pb-6">
          <div>
            <h1 className="text-2xl font-black tracking-tighter text-zinc-900 uppercase">TechCare Solutions</h1>
            <p className="text-xs text-zinc-500 font-medium tracking-wide">Assistência Técnica Especializada</p>
            <div className="mt-4 space-y-0.5 text-[10px] text-zinc-600">
              <p className="flex items-center gap-2"><MapPin className="size-3" /> Av. Paulista, 1000 - São Paulo, SP</p>
              <p className="flex items-center gap-2"><Phone className="size-3" /> (11) 99999-9999</p>
              <p className="flex items-center gap-2"><Globe className="size-3" /> www.techcare.com.br</p>
            </div>
          </div>
          <div className="text-right">
            <div className="bg-zinc-900 text-white px-3 py-1.5 rounded-sm">
              <p className="text-[9px] uppercase font-bold tracking-widest">Ordem de Serviço</p>
              <p className="text-lg font-mono">#OS-2024-001</p>
            </div>
            <p className="mt-2 text-[10px] text-zinc-500 font-semibold uppercase">Emissão: 22/05/2024</p>
          </div>
        </header>

        {/* Info do Cliente e Equipamento */}
        <section className="mt-8 grid grid-cols-2 gap-8">
          <div>
            <h3 className="text-[9px] font-bold text-zinc-400 uppercase mb-1">Dados do Cliente</h3>
            <p className="text-base font-bold text-zinc-900 uppercase">João Roberto dos Santos</p>
            <p className="text-[11px] text-zinc-600">CPF: 123.456.789-00</p>
            <p className="text-[11px] text-zinc-600">Tel: (11) 98888-7777</p>
          </div>
          <div className="text-right">
            <h3 className="text-[9px] font-bold text-zinc-400 uppercase mb-1">Equipamento</h3>
            <p className="text-base font-bold text-zinc-900 font-mono">MACBOOK PRO M1 (2020)</p>
            <p className="text-[11px] text-zinc-600 uppercase italic">S/N: PREC-9921-XQ2</p>
          </div>
        </section>

        <Separator className="my-6 bg-zinc-200" />

        {/* Detalhes Técnicos */}
        <section className="space-y-4">
          <div>
            <h3 className="text-[10px] font-bold text-zinc-900 uppercase border-l-4 border-purple-500 pl-2 mb-3">
              Diagnóstico e Recomendações Técnicas
            </h3>
            <p className="text-[11px] text-zinc-700 leading-relaxed bg-zinc-50 p-3 rounded-md border border-zinc-100 italic">
              Equipamento apresentando lentidão severa durante multitarefa e falta de espaço no disco principal. 
              Foi identificado que a memória atual está operando em 95% de carga. Recomendamos upgrade imediato 
              de armazenamento e memória para restaurar a performance original do sistema.
            </p>
          </div>

          {/* Tabela de Serviços/Peças - Compactada */}
          <div className="mt-4">
            <table className="w-full text-left text-[11px]">
              <thead className="bg-zinc-900 text-white">
                <tr>
                  <th className="px-3 py-2 rounded-tl-sm font-medium">Serviço / Peça</th>
                  <th className="px-3 py-2 font-medium">Categoria</th>
                  <th className="px-3 py-2 text-right rounded-tr-sm font-medium">Preço</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 border-x border-b border-zinc-200">
                <ServiceRow icon={<MemoryStick className="size-3"/>} name="Upgrade RAM Crucial 8GB DDR4" cat="Peça" price="R$ 350,00" />
                <ServiceRow icon={<HardDrive className="size-3"/>} name="SSD NVMe Samsung 980 Pro 1TB" cat="Peça" price="R$ 450,00" />
                <ServiceRow icon={<Cpu className="size-3"/>} name="Limpeza Interna + Pasta Térmica" cat="Serviço" price="R$ 150,00" />
              </tbody>
            </table>
          </div>
        </section>

        {/* Resumo Financeiro */}
        <section className="mt-6 flex justify-end">
          <div className="w-48 space-y-1">
            <div className="flex justify-between text-[11px] text-zinc-600">
              <span>Subtotal:</span>
              <span>R$ 950,00</span>
            </div>
            <div className="flex justify-between text-[11px] text-zinc-600">
              <span>Desconto:</span>
              <span>R$ 0,00</span>
            </div>
            <div className="flex justify-between text-base font-black text-zinc-900 pt-1 border-t border-zinc-200 uppercase tracking-tighter">
              <span>Total:</span>
              <span>R$ 950,00</span>
            </div>
          </div>
        </section>

        {/* Assinaturas - Subiu um pouco para garantir espaço */}
        <section className="mt-auto grid grid-cols-2 gap-16 pb-10">
          <div className="border-t border-zinc-400 text-center pt-2">
            <p className="text-[9px] uppercase font-bold text-zinc-400">Responsável Técnico</p>
            <p className="text-[11px] font-medium text-zinc-800">TechCare Solutions</p>
          </div>
          <div className="border-t border-zinc-400 text-center pt-2">
            <p className="text-[9px] uppercase font-bold text-zinc-400">Assinatura do Cliente</p>
            <p className="text-[11px] font-medium text-zinc-800">João Roberto dos Santos</p>
          </div>
        </section>

        {/* Rodapé Final */}
        <footer className="text-center">
          <p className="text-[9px] text-zinc-400 leading-tight">
            Garantia de 90 dias para serviços e conforme fabricante para peças.<br />
            Este documento é uma estimativa técnica válida por 7 dias após a emissão.
          </p>
        </footer>
      </main>
    </div>
  );
}

function ServiceRow({ icon, name, cat, price }: { icon: any, name: string, cat: string, price: string }) {
  return (
    <tr className="hover:bg-zinc-50/50">
      <td className="px-3 py-2 flex items-center gap-2 font-medium text-zinc-800 uppercase tracking-tighter">
        <span className="p-1 bg-zinc-100 rounded text-zinc-500 print:hidden">{icon}</span>
        {name}
      </td>
      <td className="px-3 py-2 text-zinc-500">{cat}</td>
      <td className="px-3 py-2 text-right font-bold text-zinc-900">{price}</td>
    </tr>
  );
}