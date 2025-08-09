import { Helmet } from "react-helmet-async";
import hero from "@/assets/hero-pdv.jpg";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const niches = [
  "Vestuário", "Mercado", "Padaria", "Restaurante/Pizza", "Beleza", "Pet Shop", "Autopeças", "Bebidas", "Material Construção"
];

const Index = () => {
  const [active, setActive] = useState<string[]>(["Mercado", "Padaria"]);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>PDV Modular Multi-nicho — Rápido e Configurável</title>
        <meta name="description" content="Sistema PDV moderno, multi-nicho, responsivo e pronto para frente de loja." />
        <link rel="canonical" href="/" />
        <link rel="image_src" href={hero} />
        <meta property="og:title" content="PDV Modular Multi-nicho" />
        <meta property="og:description" content="Rápido, confiável e configurável para diversos segmentos." />
      </Helmet>

      <header className="container py-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-md bg-gradient-to-br from-brand to-brand-2" />
          <span className="font-semibold">PDV Multi-nicho</span>
        </div>
        <nav className="hidden md:flex items-center gap-4 text-sm text-muted-foreground">
          <a href="/catalog" className="hover:text-foreground">Catálogo</a>
          <a href="#modulos" className="hover:text-foreground">Módulos</a>
          <a href="#recursos" className="hover:text-foreground">Recursos</a>
          <a href="#demo" className="hover:text-foreground">Demo</a>
        </nav>
      </header>

      <main>
        {/* Hero */}
        <section className="relative">
          <div className="absolute inset-0 -z-10 bg-gradient-to-b from-brand/10 via-transparent to-transparent" />
          <div className="container grid lg:grid-cols-2 gap-8 items-center py-8 md:py-16">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold leading-tight">Sistema PDV modular para qualquer nicho</h1>
              <p className="mt-4 text-lg text-muted-foreground">Rápido, confiável e pronto para touchscreen, com módulos ativáveis conforme seu segmento.</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button variant="hero" onClick={() => navigate("/pdv")}>Abrir PDV Demo</Button>
                <Button variant="outline" asChild>
                  <a href="/catalog">Abrir Catálogo</a>
                </Button>
                <Button variant="outline" asChild>
                  <a href="#modulos">Ver módulos</a>
                </Button>
              </div>
            </div>
            <Card className="overflow-hidden">
              <img src={hero} alt="Interface moderna de PDV com impressora térmica e leitor" loading="lazy" className="w-full h-full object-cover" />
            </Card>
          </div>
        </section>

        {/* Módulos por nicho */}
        <section id="modulos" className="container py-12">
          <h2 className="text-2xl font-semibold">Ative módulos por nicho</h2>
          <p className="text-muted-foreground mt-2">Escolha os segmentos que seu PDV vai atender. Tudo é configurável.</p>
          <div className="mt-6 flex flex-wrap gap-2">
            {niches.map(n => {
              const on = active.includes(n);
              return (
                <Button key={n} variant={on ? "secondary" : "outline"} onClick={() => setActive(on ? active.filter(a => a !== n) : [...active, n])}>
                  {n}
                </Button>
              );
            })}
          </div>
        </section>

        {/* Destaques */}
        <section id="recursos" className="container py-12 grid md:grid-cols-3 gap-6">
          <Card className="p-6">
            <h3 className="font-semibold">Vendas rápidas</h3>
            <p className="text-sm text-muted-foreground mt-2">Busca por código de barras, grid touch, descontos e observações por item.</p>
          </Card>
          <Card className="p-6">
            <h3 className="font-semibold">Integrações</h3>
            <p className="text-sm text-muted-foreground mt-2">Impressoras POS-80, balanças EAN-13 e preparo para TEF e fiscais.</p>
          </Card>
          <Card className="p-6">
            <h3 className="font-semibold">Relatórios</h3>
            <p className="text-sm text-muted-foreground mt-2">Vendas por período, produtos mais vendidos e alertas de reposição.</p>
          </Card>
        </section>

        {/* CTA */}
        <section id="demo" className="container py-12">
          <Card className="p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h3 className="text-xl font-semibold">Teste agora o PDV demo</h3>
              <p className="text-muted-foreground">Experimente o fluxo de venda, carrinho e pagamento.</p>
            </div>
            <Button variant="hero" onClick={() => navigate("/pdv")}>Abrir PDV</Button>
          </Card>
        </section>
      </main>

      <footer className="border-t mt-8">
        <div className="container py-6 text-sm text-muted-foreground">© {new Date().getFullYear()} PDV Multi-nicho</div>
      </footer>
    </div>
  );
};

export default Index;
