"use client";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Settings, Settings2, Shield, User } from "lucide-react";

import { formschemauser, FormSchemaUser } from "../schema/formuserschema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Controller, useForm } from "react-hook-form";
import { CreateCliente } from "./actions/CreateCliente";
import { toast } from "sonner";
import { redirect } from "next/navigation";
export default function Cliente() {
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
   const response = await CreateCliente(data)
   if(response.error){
   return toast.error(response.error)
   }
   else{
    
    toast.success("Cliente criado com sucesso")
   redirect("/dashboard")
    
   }
  }
  return (
    <div className="flex min-h-screen flex-col w-full bg-zinc-200">
      <Header />
      <main className="flex flex-col mt-8 w-full max-w-[1600] mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Criar Cliente</h1>
          <p className="text-sm text-zinc-800">
            Preencha os campos abaixo para criar um novo cliente e gera um
            orçamento
          </p>
        </div>
        <div>
          <Card>
            <CardContent>
              <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
                <FieldGroup>
                  <div className="grid grid-cols-2 gap-10">
                    <Controller
                      name="name"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel>Nome</FieldLabel>
                          <Input
                            placeholder="Ex: Pedro Santos"
                            autoComplete="off"
                            aria-invalid={fieldState.invalid}
                            {...field}
                          />
                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </Field>
                      )}
                    />

                    <Controller
                      name="phone"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel>Telefone</FieldLabel>
                          <Input
                            placeholder="Ex: (00) 00000-0000"
                            autoComplete="off"
                            aria-invalid={fieldState.invalid}
                            {...field}
                          />
                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </Field>
                      )}
                    />

                    <div className="space-y-2">
                      <Controller
                        name="cpf"
                        control={form.control}
                        render={({ field, fieldState }) => (
                          <Field data-invalid={fieldState.invalid}>
                            <FieldLabel>Cpf</FieldLabel>
                            <Input
                              placeholder="Ex: 000.000.000-00"
                              autoComplete="off"
                              aria-invalid={fieldState.invalid}
                              {...field}
                            />
                            {fieldState.invalid && (
                              <FieldError errors={[fieldState.error]} />
                            )}
                          </Field>
                        )}
                      />
                    </div>

                    <div className="space-y-2">
                      <Controller
                        name="address"
                        control={form.control}
                        render={({ field, fieldState }) => (
                          <Field data-invalid={fieldState.invalid}>
                            <FieldLabel>Endereço</FieldLabel>
                            <Input
                              placeholder="Ex: Rua 1 N° 1 Bairro 1 Cidade - Rj"
                              autoComplete="off"
                              aria-invalid={fieldState.invalid}
                              {...field}
                            />
                            {fieldState.invalid && (
                              <FieldError errors={[fieldState.error]} />
                            )}
                          </Field>
                        )}
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="mt-8 h-12 bg-purple-500 hover:bg-purple-500/70"
                  >
                    {" "}
                    <User /> Criar Cliente
                  </Button>
                </FieldGroup>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
