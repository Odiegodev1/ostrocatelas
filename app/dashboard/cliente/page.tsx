"use client";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { UserPlus, Phone, CreditCard, MapPin, Loader2, User } from "lucide-react";

import { formschemauser, FormSchemaUser } from "../schema/formuserschema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Controller, useForm } from "react-hook-form";
import { CreateCliente } from "./actions/CreateCliente";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Cliente() {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);

  const form = useForm<FormSchemaUser>({
    resolver: zodResolver(formschemauser),
    defaultValues: {
      name: "",
      phone: "",
      cpf: "",
      address: "",
    },
  });

  async function onSubmit(data: FormSchemaUser) {
    setIsPending(true);
    try {
      const response = await CreateCliente(data);
      if (response.error) {
        toast.error(response.error);
      } else {
        toast.success("Cliente cadastrado com sucesso!");
        router.push("/dashboard"); // Substituído redirect por router.push
      }
    } catch (error) {
      toast.error("Ocorreu um erro ao processar o cadastro.");
    } finally {
      setIsPending(false);
    }
  }

  return (
    <div className="flex min-h-screen flex-col w-full bg-zinc-50/50">
      <Header />
      
      <main className="flex flex-col mt-10 w-full max-w-4xl mx-auto px-4">
        {/* Título da Seção */}
        <div className="mb-8 space-y-2">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-600 rounded-lg">
              <UserPlus className="text-white size-5" />
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900">
              Novo Cliente
            </h1>
          </div>
          <p className="text-zinc-500">
            Cadastre os dados pessoais do cliente para iniciar um novo diagnóstico técnico.
          </p>
        </div>

        <Card className="border-zinc-200 shadow-sm overflow-hidden">
          <CardContent className="p-8">
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FieldGroup className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Nome Completo */}
                <Controller
                  name="name"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid} className="space-y-2">
                      <FieldLabel className="text-zinc-700 font-bold flex items-center gap-2">
                        Nome Completo
                      </FieldLabel>
                      <div className="relative">
                        <Input
                          placeholder="Ex: Pedro Santos"
                          className="pl-10 h-11 bg-zinc-50 border-zinc-200 focus:bg-white transition-all"
                          {...field}
                        />
                        <User className="absolute left-3 top-3 size-5 text-zinc-400" />
                      </div>
                      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                  )}
                />

                {/* Telefone / WhatsApp */}
                <Controller
                  name="phone"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid} className="space-y-2">
                      <FieldLabel className="text-zinc-700 font-bold">Telefone / WhatsApp</FieldLabel>
                      <div className="relative">
                        <Input
                          placeholder="(22) 99999-0000"
                          className="pl-10 h-11 bg-zinc-50 border-zinc-200"
                          {...field}
                        />
                        <Phone className="absolute left-3 top-3 size-5 text-zinc-400" />
                      </div>
                      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                  )}
                />

                {/* CPF */}
                <Controller
                  name="cpf"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid} className="space-y-2">
                      <FieldLabel className="text-zinc-700 font-bold">CPF</FieldLabel>
                      <div className="relative">
                        <Input
                          placeholder="000.000.000-00"
                          className="pl-10 h-11 bg-zinc-50 border-zinc-200"
                          {...field}
                        />
                        <CreditCard className="absolute left-3 top-3 size-5 text-zinc-400" />
                      </div>
                      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                  )}
                />

                {/* Endereço */}
                <Controller
                  name="address"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid} className="space-y-2">
                      <FieldLabel className="text-zinc-700 font-bold">Endereço Residencial</FieldLabel>
                      <div className="relative">
                        <Input
                          placeholder="Rua, Número, Bairro - Cidade"
                          className="pl-10 h-11 bg-zinc-50 border-zinc-200"
                          {...field}
                        />
                        <MapPin className="absolute left-3 top-3 size-5 text-zinc-400" />
                      </div>
                      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                  )}
                />
              </FieldGroup>

              <div className="pt-4">
                <Button
                  type="submit"
                  disabled={isPending}
                  className="w-full h-12 bg-zinc-900 hover:bg-zinc-800 text-white font-bold rounded-xl transition-all shadow-lg shadow-zinc-200 flex items-center justify-center gap-2"
                >
                  {isPending ? (
                    <Loader2 className="animate-spin size-5" />
                  ) : (
                    <UserPlus className="size-5" />
                  )}
                  {isPending ? "Processando..." : "Finalizar Cadastro de Cliente"}
                </Button>
                <p className="text-center text-xs text-zinc-400 mt-4 uppercase tracking-widest font-medium">
                  Troca Telas & Muito+ • Gerenciamento de Ordens
                </p>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}