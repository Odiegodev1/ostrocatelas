import prisma from "@/lib/prisma"
import { columns, Payment } from "./columns"
import { DataTable } from "./data-table"
import { GetClientes } from "../dashboard/actions/get-cliente"

async function getData(): Promise<Payment[]> {
const clientes = await GetClientes()
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