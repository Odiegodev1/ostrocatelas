import React from 'react';
import { Smartphone, ShieldCheck, Zap, ArrowRight, Laptop, Clock } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-zinc-900 selection:bg-blue-100">
      {/* Navegação Simples */}
      <nav className="flex items-center justify-between px-6 py-6 max-w-7xl mx-auto">
        <div className="text-xl font-bold tracking-tighter flex items-center gap-2">
          <div className="bg-blue-600 p-1.5 rounded-lg">
            <Smartphone className="text-white h-5 w-5" />
          </div>
          <span>Troca Telas <span className="text-blue-600">& Muito+</span></span>
        </div>
        <div className="hidden md:flex gap-8 text-sm font-medium text-zinc-600">
          <a href="#servicos" className="hover:text-blue-600 transition-colors">Serviços</a>
          <a href="#sobre" className="hover:text-blue-600 transition-colors">Sobre nós</a>
          <a href="#contato" className="hover:text-blue-600 transition-colors">Contato</a>
        </div>
        <a 
          href="/dashboard" 
          className="bg-zinc-900 text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-zinc-800 transition-all shadow-lg shadow-zinc-200"
        >
          Área Técnica
        </a>
      </nav>

      {/* Hero Section */}
      <header className="relative pt-16 pb-24 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-bold mb-6 border border-blue-100">
            <Zap className="h-3 w-3 fill-current" />
            REPAROS RÁPIDOS EM SAQUAREMA
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8">
            Seu celular novo de <br /> 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500">
              novo, em minutos.
            </span>
          </h1>
          <p className="text-zinc-500 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            Especialistas em troca de telas, baterias e reparos avançados. 
            Qualidade técnica com garantia e o melhor preço da região.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="w-full sm:w-auto bg-blue-600 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-blue-700 transition-all flex items-center justify-center gap-2 group shadow-xl shadow-blue-200">
              Solicitar Orçamento
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="w-full sm:w-auto bg-white border border-zinc-200 text-zinc-700 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-zinc-50 transition-all">
              Ver Serviços
            </button>
          </div>
        </div>
      </header>

      {/* Stats/Cards Section */}
      <section id="servicos" className="py-20 bg-zinc-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="bg-white p-8 rounded-3xl border border-zinc-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="bg-blue-100 w-12 h-12 rounded-2xl flex items-center justify-center mb-6 text-blue-600">
                <Smartphone className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-zinc-900">Troca de Telas</h3>
              <p className="text-zinc-500 leading-relaxed">
                Trabalhamos com displays de alta qualidade e tecnologia OLED/LCD para todas as marcas.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white p-8 rounded-3xl border border-zinc-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="bg-emerald-100 w-12 h-12 rounded-2xl flex items-center justify-center mb-6 text-emerald-600">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-zinc-900">Garantia Total</h3>
              <p className="text-zinc-500 leading-relaxed">
                Todos os nossos serviços possuem garantia de 90 dias e suporte técnico especializado.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white p-8 rounded-3xl border border-zinc-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="bg-orange-100 w-12 h-12 rounded-2xl flex items-center justify-center mb-6 text-orange-600">
                <Clock className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-zinc-900">Entrega Express</h3>
              <p className="text-zinc-500 leading-relaxed">
                A maioria dos reparos (como telas e baterias) são entregues em até 2 horas.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer / CTA Final */}
      <footer className="py-20 px-6 border-t border-zinc-100">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10 text-center md:text-left">
          <div>
            <h2 className="text-3xl font-bold mb-2 text-zinc-900">Troca Telas & Muito+</h2>
            <p className="text-zinc-500">Sua assistência técnica de confiança em Saquarema, RJ.</p>
          </div>
          <div className="flex gap-4">
            <button className="bg-emerald-500 text-white px-6 py-3 rounded-xl font-bold hover:bg-emerald-600 transition-colors">
              Chamar no WhatsApp
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}