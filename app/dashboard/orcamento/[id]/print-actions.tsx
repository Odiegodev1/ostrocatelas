"use client";

import { Printer, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export function PrintActions() {
  const router = useRouter();

  const handlePrint = () => {
    window.print();
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <div className="max-w-[210mm] mx-auto mb-6 flex justify-end gap-3 print:hidden">
      <Button
        onClick={handleBack}
        className="bg-purple-600 hover:bg-purple-700"
      >
        <ArrowLeft className="mr-2 size-4" />
        Voltar
      </Button>

      <Button variant="outline" onClick={handlePrint}>
        <Printer className="mr-2 size-4" />
        Imprimir OS
      </Button>
    </div>
  );
}