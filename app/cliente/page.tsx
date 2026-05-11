import prisma from "@/lib/prisma"
import { columns, Payment } from "./columns"
import { DataTable } from "./data-table"

async function getData(): Promise<Payment[]> {
const clientes = await prisma.cliente.findMany({
    orderBy: {
        createdAt: "desc",
    },
})
  return [
    ...clientes
    
    // ...
  ]
}

export default async function DemoPage() {
  const data = await getData()

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  )
}