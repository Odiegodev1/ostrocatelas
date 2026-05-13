"use server";

import { unstable_noStore as noStore } from "next/cache";
import prisma from "@/lib/prisma";

export async function GetClientes() {
  noStore(); // 👈 força busca ao banco sempre

  const clients = await prisma.cliente.findMany({
    orderBy: { createdAt: "desc" },
  });

  return clients;
}

export async function GetPcs() {
  noStore(); // 👈 idem aqui

  const pcs = await prisma.computer.findMany({
    orderBy: { createdAt: "desc" },
  });

  return pcs; // 👈 estava faltando o return!
}