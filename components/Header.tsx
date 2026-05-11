"use client"
import { Smartphone, PlusCircle, UserPlus } from "lucide-react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation"; // O correto para Client Components

export function Header() {
  const router = useRouter();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-200 bg-white/80 backdrop-blur-md">
      <div className="flex h-16 items-center justify-between px-6 max-w-[1600px] mx-auto">
        
        {/* Logo Section */}
        <div 
          className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity"
          onClick={() => router.push("/dashboard")}
        >
          <div className="flex items-center justify-center rounded-xl bg-blue-600 shadow-lg shadow-blue-200 size-10">
            <Smartphone className="text-white size-6" />
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight text-zinc-900 leading-none">
              Troca Telas
            </h1>
            <p className="text-[10px] font-medium text-zinc-500 uppercase tracking-wider">
              e muito +
            </p>
          </div>
        </div>

        {/* Actions Section */}
        <div className="flex items-center gap-3">
          <Button 
            variant="ghost" 
            className="hidden sm:flex items-center gap-2 text-zinc-600 hover:text-blue-600"
            onClick={() => router.push("/dashboard/cliente")}
          >
            <UserPlus className="size-4" />
            Novo Cliente
          </Button>
          
          <Button 
            className="bg-zinc-900 text-white hover:bg-zinc-800 rounded-xl px-5 shadow-sm flex items-center gap-2"
            onClick={() => router.push("/dashboard/orcamento")}
          >
            <PlusCircle className="size-4" />
            <span>Novo Orçamento</span>
          </Button>
        </div>

      </div>
    </header>
  );
}