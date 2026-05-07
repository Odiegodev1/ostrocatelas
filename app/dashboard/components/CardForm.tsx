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
  Settings, 
  User, 
  Monitor, 
  Cpu, 
  HardDrive, 
  Layers,
  ChevronRight
} from "lucide-react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { computerSchema, ComputerSchema } from "../schema/formpcschema";
import CreatePC from "../actions/create-pc";
import { toast } from "sonner";
import { redirect } from "next/navigation";

interface Client {
  id: string;
  name: string;
}

interface Props {
  clients: Client[];
}

export function CardForm({ clients }: Props) {
  const form = useForm<ComputerSchema>({
    resolver: zodResolver(computerSchema as any),
    defaultValues: {
      computerName: "",
      model: "",
      processor: "",
      currentRamSize: 0,
      currentRamSlots: 0,
      currentRamType: "DDR3",
      currentRamFrequency: 0,
      dualChannel: false,
      currentStorageType: "HDD",
      currentStorageSize: 0,
    },
  });

async function onSubmit(data: ComputerSchema) {
    const res = await CreatePC(data)
    if(res.error){
        toast.error(res.error)
    }
    else{
        toast.success("PC criado com sucesso")
        
    }
    
}
  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-2xl mx-auto">
      <Card className="shadow-lg border-zinc-200">
        <CardHeader className="space-y-1 bg-zinc-50/50 border-b">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Settings className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <CardTitle className="text-xl">Configurador de Upgrade</CardTitle>
              <CardDescription>Insira os dados atuais para gerar o orçamento</CardDescription>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="p-6 space-y-8">
          
          {/* SEÇÃO: CLIENTE */}
          <section className="space-y-4">
            <div className="flex items-center gap-2 text-zinc-500 pb-1 border-b border-zinc-100">
              <User className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-wider">Identificação</span>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="clienteId">Selecionar Cliente</Label>
              <Controller
                control={form.control}
                name="clienteId"
                render={({ field }) => (
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger className="bg-white">
                      <SelectValue placeholder="Selecione o cliente cadastrado" />
                    </SelectTrigger>
                    <SelectContent>
                      {clients.map((client) => (
                        <SelectItem key={client.id} value={client.id}>
                          {client.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
          </section>

          {/* SEÇÃO: COMPUTADOR */}
          <section className="space-y-4">
            <div className="flex items-center gap-2 text-zinc-500 pb-1 border-b border-zinc-100">
              <Monitor className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-wider">Especificações da Máquina</span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Marca / Fabricante</Label>
                <Controller
                  control={form.control}
                  name="computerName"
                  render={({ field }) => (
                    <Input placeholder="Ex: Dell, HP, Lenovo" {...field} />
                  )}
                />
              </div>

              <div className="space-y-2">
                <Label>Modelo</Label>
                <Controller
                  control={form.control}
                  name="model"
                  render={({ field }) => (
                    <Input placeholder="Ex: Inspiron 15 5000" {...field} />
                  )}
                />
              </div>
            </div>
          </section>

          {/* SEÇÃO: HARDWARE */}
          <section className="space-y-4">
            <div className="flex items-center gap-2 text-zinc-500 pb-1 border-b border-zinc-100">
              <Cpu className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-wider">Hardware Atual</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Armazenamento */}
              <div className="space-y-3 p-4 rounded-xl border bg-zinc-50/30">
                <div className="flex items-center gap-2 mb-2">
                  <HardDrive className="w-4 h-4 text-zinc-400" />
                  <span className="text-sm font-medium">Armazenamento</span>
                </div>
                
                <div className="space-y-2">
                  <Label className="text-xs">Tipo</Label>
                  <Controller
                    control={form.control}
                    name="currentStorageType"
                    render={({ field }) => (
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <SelectTrigger className="bg-white">
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="HDD">HDD Sata</SelectItem>
                          <SelectItem value="SSD">SSD Sata</SelectItem>
                          <SelectItem value="NVME">SSD M.2 NVMe</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>
              </div>

              {/* RAM */}
              <div className="space-y-3 p-4 rounded-xl border bg-zinc-50/30">
                <div className="flex items-center gap-2 mb-2">
                  <Layers className="w-4 h-4 text-zinc-400" />
                  <span className="text-sm font-medium">Memória RAM</span>
                </div>
                
                <div className="space-y-2">
                  <Label className="text-xs">Capacidade Total (GB)</Label>
                  <Controller
                    control={form.control}
                    name="currentRamSize"
                    render={({ field }) => (
                      <Input
                        type="number"
                        placeholder="Ex: 8"
                        className="bg-white"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    )}
                  />
                </div>
              </div>
            </div>

            {/* DUAL CHANNEL TOGGLE */}
            <div className="flex items-center justify-between bg-purple-50/50 border border-purple-100 p-4 rounded-xl transition-all hover:bg-purple-50">
              <div className="space-y-0.5">
                <h4 className="text-sm font-semibold text-purple-900">Configuração de Slots</h4>
                <p className="text-xs text-purple-700/70">
                  O sistema possui dois pentes trabalhando em Dual Channel?
                </p>
              </div>

              <Controller
                control={form.control}
                name="dualChannel"
                render={({ field }) => (
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    className="data-[state=checked]:bg-purple-500"
                  />
                )}
              />
            </div>
          </section>

          <Button
            type="submit"
            className="w-full h-12 bg-purple-600 hover:bg-purple-700 text-white font-bold transition-all shadow-md hover:shadow-purple-200 active:scale-[0.98]"
          >
            <Settings className="mr-2 w-5 h-5" />
            Gerar Orçamento Técnico
            <ChevronRight className="ml-2 w-4 h-4 opacity-50" />
          </Button>
        </CardContent>
      </Card>
    </form>
  );
}