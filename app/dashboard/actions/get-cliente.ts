"use server";

import  prisma  from "@/lib/prisma";

export async function GetClientes() {
  const clients = await prisma.cliente.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return clients;
}

export async function Getpcs() {
    const pcs = await prisma.computer.findMany({
      orderBy: {
        createdAt: "desc",
      },
    })
    
}