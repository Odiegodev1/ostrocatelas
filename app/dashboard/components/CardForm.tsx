"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { 
  Monitor, 
  Cpu, 
  HardDrive, 
  Layers,
  ChevronRight,
  User,
  Wrench,
  Loader2,
  Info
} from "lucide-react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { computerSchema, ComputerSchema } from "../schema/formpcschema";
import CreatePC from "../actions/create-pc";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface Client {
  id: string;
  name: string;
}

interface Props {
  clients: Client[];
}

export function CardForm({ clients }: Props) {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);

  const form = useForm<ComputerSchema>({
    resolver: zodResolver(computerSchema ),
    defaultValues: {
      computerName: "",
      model: "",
      processor: "",
      currentRamSize: 0,
      currentRamSlots: 0,
      currentRamType: "DDR4",
      currentRamFrequency: 0,
      dualChannel: true,
      currentStorageType: "SSD",
      currentStorageSize: 0,
      clienteId: "",
    },
  });

  async function onSubmit(data: ComputerSchema) {
    setIsPending(true);
    try {
      const res = await CreatePC(data);
      if(res.error){
        toast.error(res.error);
      } else {
        toast.success("Diagnóstico concluído com sucesso!");
        router.push("/dashboard/orcamento/" + data.clienteId);
      }
    } catch (error) {
      toast.error("Erro ao salvar especificações.");
    } finally {
      setIsPending(false);
    }
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-4xl mx-auto pb-12">
      <Card className="border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] bg-white/70 backdrop-blur-md overflow-hidden">
        {/* Banner Superior Decorativo */}
        <div className="h-2 bg-gradient-to-r from-blue-600 via-blue-400 to-zinc-800" />
        
        <CardHeader className="p-8 border-b border-zinc-100">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              <div className="flex items-center justify-center size-14 rounded-2xl bg-zinc-900 shadow-xl shadow-zinc-200 group-hover:scale-105 transition-transform">
                <Cpu className="w-7 h-7 text-blue-500" />
              </div>
              <div>
                <CardTitle className="text-2xl font-bold text-zinc-900 tracking-tight">
                  Mapeamento de Hardware
                </CardTitle>
                <CardDescription className="text-zinc-500 font-medium">
                  Insira as especificações atuais para o cálculo de upgrade
                </CardDescription>
              </div>
            </div>
            <div className="hidden lg:flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full">
              <span className="size-2 rounded-full bg-blue-500 animate-pulse" />
              <span className="text-[10px] font-bold text-blue-700 uppercase tracking-wider">Sistema Ativo</span>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="p-8 space-y-12">
          
          {/* SEÇÃO 01: PROPRIETÁRIO */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-1">
              <h3 className="text-sm font-bold text-zinc-900 flex items-center gap-2">
                <User className="size-4 text-blue-600" />
                Proprietário
              </h3>
              <p className="text-xs text-zinc-500 leading-relaxed">
                Vincule este diagnóstico a um cliente existente para histórico.
              </p>
            </div>

            <div className="md:col-span-2">
              <Controller
                control={form.control}
                name="clienteId"
                render={({ field }) => (
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger className="h-12 bg-white border-zinc-200 shadow-sm focus:ring-2 focus:ring-blue-600/20 transition-all rounded-xl">
                      <SelectValue placeholder="Selecione o cliente" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl">
                      {clients.map((client) => (
                        <SelectItem key={client.id} value={client.id} className="py-3 cursor-pointer">
                          {client.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
          </section>

          <div className="h-px bg-zinc-100 w-full" />

          {/* SEÇÃO 02: EQUIPAMENTO */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-1">
              <h3 className="text-sm font-bold text-zinc-900 flex items-center gap-2">
                <Monitor className="size-4 text-blue-600" />
                Equipamento
              </h3>
              <p className="text-xs text-zinc-500 leading-relaxed">
                Informações de marca e placa para compatibilidade de peças.
              </p>
            </div>

            <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-xs font-bold text-zinc-600 ml-1">Marca / Fabricante</Label>
                <Controller
                  control={form.control}
                  name="computerName"
                  render={({ field }) => (
                    <Input placeholder="Dell, Lenovo..." className="h-11 rounded-xl bg-zinc-50/50 border-zinc-200 focus:bg-white transition-all" {...field} />
                  )}
                />
              </div>

              <div className="space-y-2">
                <Label className="text-xs font-bold text-zinc-600 ml-1">Modelo / Placa-Mãe</Label>
                <Controller
                  control={form.control}
                  name="model"
                  render={({ field }) => (
                    <Input placeholder="B450M, Inspiron..." className="h-11 rounded-xl bg-zinc-50/50 border-zinc-200 focus:bg-white transition-all" {...field} />
                  )}
                />
              </div>
            </div>
          </section>

          <div className="h-px bg-zinc-100 w-full" />

          {/* SEÇÃO 03: HARDWARE CORE */}
          <section className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Armazenamento Card */}
              <div className="p-6 rounded-2xl border border-zinc-100 bg-white shadow-sm space-y-6 relative overflow-hidden group">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-50 rounded-lg text-blue-600 group-hover:scale-110 transition-transform">
                      <HardDrive className="size-5" />
                    </div>
                    <span className="text-sm font-bold text-zinc-800">Storage</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-[10px] uppercase font-black text-zinc-400 tracking-widest">Tecnologia</Label>
                    <Controller
                      control={form.control}
                      name="currentStorageType"
                      render={({ field }) => (
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <SelectTrigger className="bg-zinc-50 border-none rounded-lg h-10">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="HDD">HDD</SelectItem>
                            <SelectItem value="SSD">SSD Sata</SelectItem>
                            <SelectItem value="NVME">M.2 NVMe</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] uppercase font-black text-zinc-400 tracking-widest">Tamanho (GB)</Label>
                    <Controller
                      control={form.control}
                      name="currentStorageSize"
                      render={({ field }) => (
                        <Input 
                          type="number" 
                          className="bg-zinc-50 border-none rounded-lg h-10" 
                          {...field}
                          onChange={(e) => field.onChange(Number(e.target.value))}
                        />
                      )}
                    />
                  </div>
                </div>
              </div>

              {/* RAM Card */}
              <div className="p-6 rounded-2xl border border-zinc-100 bg-white shadow-sm space-y-6 relative overflow-hidden group">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-emerald-50 rounded-lg text-emerald-600 group-hover:scale-110 transition-transform">
                      <Layers className="size-5" />
                    </div>
                    <span className="text-sm font-bold text-zinc-800">Memória RAM</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-[10px] uppercase font-black text-zinc-400 tracking-widest">Tipo</Label>
                    <Controller
                      control={form.control}
                      name="currentRamType"
                      render={({ field }) => (
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <SelectTrigger className="bg-zinc-50 border-none rounded-lg h-10">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="DDR3">DDR3</SelectItem>
                            <SelectItem value="DDR4">DDR4</SelectItem>
                            <SelectItem value="DDR5">DDR5</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] uppercase font-black text-zinc-400 tracking-widest">Capacidade</Label>
                    <Controller
                      control={form.control}
                      name="currentRamSize"
                      render={({ field }) => (
                        <Input 
                          type="number" 
                          className="bg-zinc-50 border-none rounded-lg h-10" 
                          {...field}
                          onChange={(e) => field.onChange(Number(e.target.value))}
                        />
                      )}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* DUAL CHANNEL TOGGLE */}
            <div className="flex items-center justify-between p-6 rounded-2xl bg-zinc-900 border border-zinc-800 shadow-lg group transition-all hover:bg-black">
              <div className="flex items-center gap-4">
                <div className="size-12 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 text-blue-400 group-hover:text-blue-300">
                  <Info className="size-6" />
                </div>
                <div className="space-y-0.5">
                  <h4 className="text-sm font-bold text-white tracking-tight">Arquitetura de Canal</h4>
                  <p className="text-[11px] text-zinc-500 font-medium">O hardware já utiliza Dual Channel para performance?</p>
                </div>
              </div>

              <Controller
                control={form.control}
                name="dualChannel"
                render={({ field }) => (
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    className="data-[state=checked]:bg-blue-500"
                  />
                )}
              />
            </div>
          </section>

          {/* BOTÃO DE AÇÃO */}
          <div className="pt-4">
            <Button
              type="submit"
              disabled={isPending}
              className={cn(
                "w-full h-16 rounded-2xl text-lg font-bold transition-all duration-300",
                "bg-blue-600 hover:bg-blue-700 text-white shadow-[0_10px_20px_rgba(37,99,235,0.2)]",
                "flex items-center justify-center gap-3 active:scale-[0.98]",
                isPending && "opacity-80"
              )}
            >
              {isPending ? (
                <>
                  <Loader2 className="animate-spin size-6" />
                  <span>Processando Análise...</span>
                </>
              ) : (
                <>
                  <Wrench className="size-5" />
                  <span>Gerar Diagnóstico Profissional</span>
                  <ChevronRight className="size-5 opacity-40 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <div className="mt-8 flex flex-col items-center gap-2">
        <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-[0.3em]">
          Troca telas e muito+
        </p>
      </div>
    </form>
  );
}