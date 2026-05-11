
import { 
  Printer, 
  Download, 
  MapPin, 
  Phone, 
  Globe, 
  Cpu, 
  MemoryStick, 
  HardDrive, 
  Power,
  Smartphone
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import prisma from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";
import { PrintActions } from "@/app/dashboard/orcamento/[id]/print-actions";

export default async function OSPage({
  params,
}: {
  params : Promise<{id : string}>}
) {
  
  const {id} = await params
  const computer = await prisma.computer.findUnique({
    where: {
      id: id,
    }
  })
  if (!computer){
    return redirect("/dashboard")
  }

 const ultimoComputer = await prisma.computer.findUnique({
  where: {
    id: id
  },
  
});

const cliente = await prisma.cliente.findUnique({
  where: {
    id: ultimoComputer?.clienteId
  }
})
console.log(cliente)


  const orcamentos = await prisma.upgradeBudget.findFirst({
    where: {
      computerId: ultimoComputer?.id
    }
  })


  const ordemos = orcamentos?.id
  ordemos?.charAt(2)
  const idordem = ordemos?.match(/.{1,6}/g)
  const os = idordem?.[0]
  return (
    <div className="min-h-screen bg-zinc-100 py-10 px-4 print:bg-white print:py-0 print:px-0">
      
   
   {/* CSS Injetado para forçar 1 página A4 */}
     <PrintActions />

      {/* Folha A4 - Usando medidas reais em mm para precisão */}
      <main className="mx-auto bg-white shadow-2xl flex flex-col w-[210mm] h-[297mm] p-[15mm] print:shadow-none print:w-full print:h-full">
        
        {/* Cabeçalho da Empresa */}
        <header className="flex justify-between items-center border-b-4 border-zinc-900 pb-8 relative z-10">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
               <div className="bg-zinc-900 p-2 rounded-lg">
                  <Smartphone className="text-white size-6" />
               </div>
               <div>
                  <h1 className="text-3xl font-black tracking-tighter text-zinc-900 uppercase leading-none">
                    Troca Telas <span className="text-blue-600">&</span> Muito+
                  </h1>
                  <p className="text-[10px] text-zinc-500 font-bold tracking-[0.2em] uppercase">Assistência Técnica Especializada</p>
               </div>
            </div>
            
            <div className="pt-2 space-y-1 text-[11px] text-zinc-600">
              <p className="flex items-center gap-2">
                <MapPin className="size-3 text-blue-600" /> Rua 13, 1287, Jaconé, Saquarema-RJ
              </p>
              <p className="flex items-center gap-2">
                <Phone className="size-3 text-blue-600" /> (22) 99899-5338
              </p>
            </div>
          </div>

          <div className="flex flex-col items-end gap-2">
            <div className="bg-zinc-900 text-white p-4 rounded-xl text-right min-w-[180px]">
              <p className="text-[10px] uppercase font-black tracking-widest opacity-70">Ordem de Serviço</p>
              <p className="text-2xl font-mono font-bold">#OS-{os}</p>
            </div>
            <p className="text-[11px] font-bold text-zinc-500 bg-zinc-100 px-3 py-1 rounded-full uppercase">
              Emitido em: {new Date().toLocaleDateString("pt-BR")}
            </p>
          </div>
        </header>

        {/* Info do Cliente e Equipamento */}
        <section className="mt-8 grid grid-cols-2 gap-8">
          <div>
            <h3 className="text-[9px] font-bold text-zinc-400 uppercase mb-1">Dados do Cliente</h3>
            <p className="text-base font-bold text-zinc-900 uppercase">{cliente?.name}</p>
            <p className="text-[11px] text-zinc-600">End: {cliente?.address}</p>
            <p className="text-[11px] text-zinc-600">Tel:{cliente?.phone} </p>
          </div>
          <div className="text-right">
            <h3 className="text-[9px] font-bold text-zinc-400 uppercase mb-1">Equipamento</h3>
            <p className="text-base font-bold text-zinc-900 font-mono">{ultimoComputer?.computerName}</p>
            <p className="text-[11px] text-zinc-600 uppercase italic">Model: {ultimoComputer?.model}</p>
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
            {orcamentos?.notes}
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
                <ServiceRow icon={<MemoryStick className="size-3"/>} name={` Upgrade de ${orcamentos?.recommendedRamSize} GB para  ${orcamentos?.recommendedRamType} ${orcamentos?.recommendedRamFrequency} MHz`} cat="Peça" price=" " />
                <ServiceRow icon={<HardDrive className="size-3"/>} name={`Upgrade de ${orcamentos?.recommendedStorageSize} GB ,  ${orcamentos?.recommendedStorageType} `} cat="Peça" price="" />
                <ServiceRow icon={<Power className="size-3"/>} name="Upgrade de Hardware + Windows" cat="Serviço" price=" " />
                <ServiceRow icon={<Cpu className="size-3"/>} name="Limpeza Interna + Limpeza Externa" cat="Serviço" price="GRATUITO " />
              </tbody>
            </table>
          </div>
        </section>

        {/* Resumo Financeiro */}
        <section className="mt-6 flex justify-end">
          <div className="w-48 space-y-1">
            <div className="flex justify-between text-[11px] text-zinc-600">
              <span>Subtotal:</span>
              <span> </span>
            </div>
            <div className="flex justify-between text-[11px] text-zinc-600">
              <span>Desconto:</span>
              <span> </span>
            </div>
            <div className="flex justify-between text-base font-black text-zinc-900 pt-1 border-t border-zinc-200 uppercase tracking-tighter">
              <span>Total:</span>
              <span></span>
            </div>
          </div>
        </section>

        {/* Assinaturas - Subiu um pouco para garantir espaço */}
        <section className="mt-auto grid grid-cols-2 gap-16 pb-10">
          <div className="border-t border-zinc-400 text-center pt-2">
            <p className="text-[9px] uppercase font-bold text-zinc-400">Responsável Técnico</p>
            <p className="text-[11px] font-medium text-zinc-800">Troca telas e muito +</p>
          </div>
          <div className="border-t border-zinc-400 text-center pt-2">
            <p className="text-[9px] uppercase font-bold text-zinc-400">Assinatura do Cliente</p>
            <p className="text-[11px] font-medium text-zinc-800">{cliente?.name}</p>
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