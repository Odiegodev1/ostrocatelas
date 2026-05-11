import { Header } from "@/components/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import DemoPage from "../cliente/page";
import prisma from "@/lib/prisma";


export default async function Dashboard() {
 
const orcamento = await prisma.computer.findMany({
  orderBy: {
    createdAt: "desc",
  },
where:{
  createdAt: {
    gte: new Date(new Date().setDate(new Date().getDate() - 1)),
  }
}
})
const orcamentot = await prisma.computer.findMany({
  orderBy: {
    createdAt: "desc",
  },

})


console.log(orcamento.length)

  return (
    <div className="flex min-h-screen flex-col w-full bg-zinc-50/50">
      <Header />
      
      {/* Container Principal com Max-Width centralizado */}
      <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex gap-10 items-center w-full ">
          <Card className="w-full">
            <CardHeader>
              <CardDescription>Total de orçamento Hoje</CardDescription>
            </CardHeader>
            <CardContent>
              <CardTitle>{orcamento.length}</CardTitle>
            </CardContent>
          </Card>
            <Card className="w-full">
            <CardHeader>
              <CardDescription>Total de orçamento </CardDescription>
            </CardHeader>
            <CardContent>
              <CardTitle>{orcamentot.length}</CardTitle>
            </CardContent>
          </Card>
         

        

        </div>
         <DemoPage />
       
      </main>
    </div>
  );
}
