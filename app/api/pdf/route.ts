// app/api/pdf/route.ts

import { NextResponse } from "next/server";

export async function POST() {
  const apiKey = process.env.API_KEY_PDF;

  if (!apiKey) {
    return NextResponse.json(
      { error: "Missing DOPPIO_API_KEY" },
      { status: 500 }
    );
  }

  const response = await fetch(
    "https://api.doppio.sh/v1/render/pdf/direct",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        page: {
          pdf: {
            format: "A4",
            printBackground: true,
          },
          goto: {
            url: "https://alohasaquarema.vercel.app/",
            options: {
              waitUntil: ["networkidle0"],
            },
          },
        },
      }),
    }
  );

  if (!response.ok) {
    const error = await response.text();

    return NextResponse.json(
      { error },
      { status: 500 }
    );
  }

  const pdfBuffer = await response.arrayBuffer();

  return new Response(pdfBuffer, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": 'inline; filename="arquivo.pdf"',
    },
  });
}