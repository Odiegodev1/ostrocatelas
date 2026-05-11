import prisma from "@/lib/prisma"
import { columns, Payment } from "./columns"
import { DataTable } from "./data-table"

interface computer {
  id: string
}
async function getData({id}: computer): Promise<Payment[]> {
const computer = await prisma.computer.findMany({
    where:{
        clienteId: id
    },

    orderBy: {
        createdAt: "desc",
      },
})
const computerid = computer.map((computer) => computer)

  return [
    ...computerid as any
    
    // ...
  ]
}

export default async function Tablecomputer({id}: computer) {
  const data = await getData({id})

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  )
}