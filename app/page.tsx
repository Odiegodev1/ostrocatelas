"use client";

export default function Home() {
  async function gerarPDF() {
    const res = await fetch("/api/pdf", {
      method: "POST",
    });

    const blob = await res.blob();

    const url = URL.createObjectURL(blob);

    window.open(url);
  }

  return (
    <button onClick={gerarPDF}>
      Gerar PDF
    </button>
  );
}