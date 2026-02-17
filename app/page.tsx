"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Bot,
  ChevronRight,
  Code2,
  Download,
  Instagram,
  Linkedin,
  Mail,
  Menu,
  MessageSquare,
  Phone,
  Sparkles,
  Terminal,
  X,
  Zap,
  BarChart3,
  Workflow,
  Braces,
  Cpu,
  Palette,
  Layers,
  Globe,
  Database,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  SCROLL REVEAL HOOK                                                 */
/* ------------------------------------------------------------------ */
function useReveal<T extends HTMLElement = HTMLDivElement>(
  threshold = 0.15
): React.RefObject<T | null> {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("visible");
          observer.unobserve(el);
        }
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return ref;
}

/* ------------------------------------------------------------------ */
/*  WHATSAPP SVG ICON (Lucide doesn't have WhatsApp)                   */
/* ------------------------------------------------------------------ */
function WhatsAppIcon({ className = "", size = 16 }: { className?: string; size?: number }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="currentColor"
      className={className}
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  FLOATING ICON                                                      */
/* ------------------------------------------------------------------ */
function FloatingIcon({
  icon: Icon,
  className,
  size = 20,
}: {
  icon: React.ComponentType<{ className?: string; size?: number }>;
  className: string;
  size?: number;
}) {
  return (
    <div
      className={`absolute flex items-center justify-center rounded-xl border border-border bg-card/80 p-2.5 backdrop-blur-sm transition-transform duration-300 hover:scale-125 hover:border-primary/50 ${className}`}
    >
      <Icon className="text-primary/70" size={size} />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  TYPING EFFECT                                                      */
/* ------------------------------------------------------------------ */
function TypingTerminal() {
  const [displayedText, setDisplayedText] = useState("");
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const fullText = 'console.log("Hello, World!");';
    let i = 0;
    const type = () => {
      const interval = setInterval(() => {
        if (i <= fullText.length) {
          setDisplayedText(fullText.slice(0, i));
          i++;
        } else {
          clearInterval(interval);
          setTimeout(() => {
            i = 0;
            setDisplayedText("");
            type();
          }, 3000);
        }
      }, 60);
      return interval;
    };
    const interval = type();

    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 530);

    return () => {
      clearInterval(interval);
      clearInterval(cursorInterval);
    };
  }, []);

  return (
    <div className="mt-8 w-full max-w-md rounded-xl border border-border bg-card/90 p-4 text-left backdrop-blur-sm">
      <div className="mb-3 flex items-center gap-2">
        <span className="h-3 w-3 rounded-full bg-[#ef4444]" />
        <span className="h-3 w-3 rounded-full bg-[#eab308]" />
        <span className="h-3 w-3 rounded-full bg-[#22c55e]" />
        <span className="ml-2 text-xs text-muted-foreground">terminal</span>
      </div>
      <p className="text-sm text-muted-foreground">
        <span className="text-primary">{"$"}</span>{" "}
        <span className="text-foreground">{displayedText}</span>
        <span
          className={`inline-block h-4 w-1.5 translate-y-0.5 bg-primary ${showCursor ? "opacity-100" : "opacity-0"}`}
        />
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  NAV                                                                */
/* ------------------------------------------------------------------ */
const NAV_LINKS = [
  { label: "Sobre", href: "#sobre" },
  { label: "Projetos ", href: "#projetos" },
  { label: "Skills", href: "#skills" },
  { label: "Contato", href: "#contato" },
] as const;

function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-border bg-background/90 backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a
          href="#"
          className="flex items-center gap-2 text-foreground transition-colors hover:text-primary"
        >
          <Terminal className="h-5 w-5 text-primary icon-hover" />
          <span className="text-sm font-bold tracking-wider uppercase">
            ThiagoLira.Dev
          </span>
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="text-xs tracking-widest uppercase text-muted-foreground transition-colors hover:text-primary"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <button
          aria-label="Toggle menu"
          className="text-muted-foreground md:hidden"
          onClick={() => setOpen(!open)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-border bg-background/95 backdrop-blur-md md:hidden">
          <ul className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-6">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="text-xs tracking-widest uppercase text-muted-foreground transition-colors hover:text-primary"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}

/* ------------------------------------------------------------------ */
/*  HERO                                                               */
/* ------------------------------------------------------------------ */
function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden px-6 pt-24 pb-16">
      {/* Subtle dot pattern */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "radial-gradient(circle, #8b7fa3 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* Single soft radial glow behind photo area */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 right-[15%] h-[420px] w-[420px] -translate-y-1/2 rounded-full opacity-[0.06] blur-[80px]"
        style={{ background: "#c026d3" }}
      />

      {/* Floating icons -- repositioned away from text */}
      <FloatingIcon
        icon={Cpu}
        className="animate-float-slow top-28 right-[6%] hidden md:flex"
        size={18}
      />
      <FloatingIcon
        icon={Database}
        className="animate-float-medium bottom-20 right-[4%] hidden md:flex"
        size={18}
      />
      <FloatingIcon
        icon={Palette}
        className="animate-float-fast top-24 left-[4%] hidden md:flex"
        size={18}
      />
      <FloatingIcon
        icon={Layers}
        className="animate-float-medium bottom-16 left-[6%] hidden md:flex"
        size={18}
      />
      <FloatingIcon
        icon={Globe}
        className="animate-float-slow top-20 left-[30%] hidden lg:flex"
        size={16}
      />
      <FloatingIcon
        icon={Braces}
        className="animate-float-fast bottom-36 left-[35%] hidden lg:flex"
        size={16}
      />

      <div className="relative z-10 mx-auto flex max-w-6xl flex-col items-center gap-12 md:flex-row md:items-center md:justify-between">
        {/* Left: Text content */}
        <div className="flex-1 text-center md:text-left">
          {/* Deploying badge */}
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#22c55e] opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#22c55e]" />
            </span>
            <span className="text-xs tracking-wider text-primary">
              {">"}_{"  "}Deploying...
            </span>
          </div>

          <h1 className="text-balance text-4xl font-bold leading-tight tracking-tight text-foreground md:text-5xl lg:text-6xl">
            {"Olá,eu sou"}
            <span className="text-foreground"> Thiago</span>
            <br />
            <span className="text-primary"> Desenvolvedor & Automação</span>
          </h1>

          {/* Terminal block */}
          <TypingTerminal />

          <p className="mt-6 max-w-lg text-pretty text-sm leading-relaxed text-muted-foreground md:text-base">
          Desenvolvo ecossistemas digitais de alta performance. 
          Unindo design exclusivo, sites extremamente rápidos e automações que eliminam tarefas manuais.
           Meu foco é criar interfaces inteligentes que trabalham por você.
          </p>

          {/* CTA buttons */}
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row md:items-start">
            <a
              href="https://wa.me/5583996602803"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3 text-sm font-bold text-primary-foreground transition-all hover:brightness-110"
            >
              Quero um Orçamento 
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#projetos"
              className="group inline-flex items-center gap-2 rounded-full border border-border bg-card px-7 py-3 text-sm font-bold text-foreground transition-colors hover:border-primary hover:text-primary"
            >
              <Download className="h-4 w-4 transition-transform group-hover:-translate-y-0.5" />
              Ver Projetos
            </a>
          </div>

          {/* Social row -- WhatsApp + Instagram */}
          <div className="mt-8 flex items-center gap-4 max-md:justify-center">
            <span className="text-xs text-muted-foreground">Follow me on:</span>
            <a
              href="https://wa.me/5583996602803"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-card text-muted-foreground transition-all hover:border-primary hover:text-primary icon-hover"
            >
              <WhatsAppIcon size={16} />
            </a>
            <a
              href="https://instagram.com/thiagolira.dev"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-card text-muted-foreground transition-all hover:border-primary hover:text-primary icon-hover"
            >
              <Instagram className="h-4 w-4" />
            </a>
          </div>
        </div>

        {/* Right: Circular profile photo with gradient fade */}
        <div className="relative flex-shrink-0">
          {/* Outer decorative ring */}
          <div
            className="absolute -inset-4 rounded-full opacity-40 animate-pulse-glow"
            style={{
              background:
                "conic-gradient(from 180deg, #c026d3, #7c3aed, #c026d3)",
              mask: "radial-gradient(farthest-side, transparent calc(100% - 2px), #000 calc(100% - 2px))",
              WebkitMask:
                "radial-gradient(farthest-side, transparent calc(100% - 2px), #000 calc(100% - 2px))",
            }}
          />
          {/* Second subtle ring */}
          <div className="absolute -inset-8 rounded-full border border-primary/10" />

          {/* Photo container with gradient border */}
          <div
            className="relative h-72 w-72 rounded-full p-[3px] md:h-[340px] md:w-[340px] lg:h-[400px] lg:w-[400px]"
            style={{
              background:
                "linear-gradient(135deg, #c026d3 0%, #7c3aed 50%, #c026d3 100%)",
            }}
          >
            <div className="relative h-full w-full overflow-hidden rounded-full">
              <img
                src="/profile.jpg"
                alt="Thiago - Automation Specialist"
                className="h-full w-full object-cover object-top"
              />
              {/* Bottom gradient fade to blend into background */}
              <div
                className="pointer-events-none absolute inset-0 rounded-full"
                style={{
                  background:
                    "radial-gradient(ellipse at center, transparent 55%, #0f0d1a 100%)",
                }}
              />
              {/* Extra bottom fade for seamless blend */}
              <div
                className="pointer-events-none absolute right-0 bottom-0 left-0 h-1/3"
                style={{
                  background:
                    "linear-gradient(to top, #0f0d1a 0%, transparent 100%)",
                  borderRadius: "0 0 9999px 9999px",
                }}
              />
            </div>
          </div>

          {/* Floating badge on photo */}
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 rounded-full border border-border bg-card px-4 py-1.5 text-xs font-bold text-primary shadow-lg shadow-primary/10">
            ThiagoLira.dev
          </div>
        </div>
      </div>
    </section>
  );
}
/* ------------------------------------------------------------------ */
/* COMPONENTES AUXILIARES (Não delete estes!)                         */
/* ------------------------------------------------------------------ */
function MacWindow({
  title,
  children,
  className = "",
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`overflow-hidden rounded-xl border border-border bg-card/90 backdrop-blur-sm transition-all hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 ${className}`}
    >
      <div className="flex items-center gap-2 border-b border-border bg-secondary/60 px-4 py-2.5">
        <span className="h-3 w-3 rounded-full bg-[#ef4444]" />
        <span className="h-3 w-3 rounded-full bg-[#eab308]" />
        <span className="h-3 w-3 rounded-full bg-[#22c55e]" />
        <span className="ml-2 text-[11px] text-muted-foreground">{title}</span>
      </div>
      <div className="p-5">{children}</div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* ABOUT                                                              */
/* ------------------------------------------------------------------ */
function About() {
  const ref = useReveal();

  return (
    <section id="Sobre" className="scroll-mt-20 px-6 py-24">
      <div className="mx-auto max-w-6xl text-left">
        <SectionHeading label="Sobre" />
        <div ref={ref} className="reveal mt-12">
          <MacWindow title="Sobre.md">
            <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
              <span className="text-primary">{"// "}</span>
              <span className="font-bold text-foreground">Thiago Lira Dev</span>. 
              Especializado em interfaces modernas e automação de sistemas.
              Foco em tecnologia limpa, design sóbrio e processos que rodam sozinhos.
            </p>
          </MacWindow>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* PROJECTS (ÚNICO E CENTRALIZADO)                                    */
/* ------------------------------------------------------------------ */


function Projects() {
  const ref = useReveal();

  return (
    <section id="projetos" className="scroll-mt-20 px-6 py-24">
      <div className="mx-auto max-w-5xl text-left">
        <SectionHeading label="Projeto em Destaque" />

        <div ref={ref} className="reveal mt-12">
          <article className="group overflow-hidden rounded-2xl border border-border bg-card/30 backdrop-blur-md transition-all hover:border-primary/30 shadow-2xl">
            <div className="relative aspect-video w-full overflow-hidden border-b border-border bg-black/20">
              <video
                src="/gifbeatriz.mp4" 
                autoPlay loop muted playsInline
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            </div>

            <div className="p-8 md:p-12">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold text-foreground">Design Premium focado em captação de clientes</h3>
                  <p className="mt-4 text-muted-foreground text-sm leading-relaxed max-w-xl">
                  Interface desenvolvida para elevar o posicionamento de marca e converter visitantes em clientes de alto padrão.
                  Landing Page otimizada com funil de conversão direto para o WhatsApp e Automação 
                  </p>
                </div>
                <div className="flex flex-col gap-4 items-start md:items-end">
                   <div className="flex gap-2">
                      <span className="px-3 py-1 text-[10px] uppercase tracking-widest bg-primary/10 text-primary border border-primary/20 rounded-full">Design</span>
                      <span className="px-3 py-1 text-[10px] uppercase tracking-widest bg-primary/10 text-primary border border-primary/20 rounded-full">Code</span>
                   </div>
                   <a href="https://wa.me/5583996602803" className="inline-flex items-center gap-2 text-xs font-bold text-foreground hover:text-primary transition-colors">
                      VER DETALHES <ArrowUpRight size={16} />
                   </a>
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  SKILLS                                                             */
/* ------------------------------------------------------------------ */
const SKILLS = [
  {
    title: "Automação de Processos",
    description:
      "Desenvolvimento de fluxos inteligentes que eliminam tarefas repetitivas e organizam seu dia a dia.",
    icon: Workflow,
  },
  {
    title: "API Integrada (WhatsApp)",
    description:
      "Conecte a API do WhatsApp Business à sua plataforma de vendas para captura de leads em tempo real, respostas automatizadas e sincronização do pipeline.",
    icon: MessageSquare,
  },
  {
    title: "Integrações Inteligentes",
    description:
      "Conexão entre o seu site e ferramentas externas via WhatsApp API, CRM e bancos de dados.",
    icon: Code2,
  },
  {
    title: "Web Design Premium",
    description:
      "Criação de interfaces modernas, responsivas e focadas na experiência do usuário.",
    icon: Zap,
  },
] as const;

function Skills() {
  const ref = useReveal();

  return (
    <section id="skills" className="scroll-mt-20 px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeading label="Skills" />

        <div ref={ref} className="reveal-stagger mt-12 grid gap-6 sm:grid-cols-2">
          {SKILLS.map((s) => (
            <div
              key={s.title}
              className="group rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5"
            >
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 transition-transform group-hover:scale-110 group-hover:bg-primary/20">
                <s.icon className="h-5 w-5 text-primary transition-transform group-hover:scale-110" />
              </div>
              <h3 className="text-base font-bold text-foreground">
                {s.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {s.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  CONTACT                                                            */
/* ------------------------------------------------------------------ */
function Contact() {
  const ref = useReveal();

  return (
    <section id="contato" className="scroll-mt-20 px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeading label="Contato" />

        <div ref={ref} className="reveal mt-12 rounded-xl border border-border bg-card p-8 md:p-12">
          <div className="grid gap-10 md:grid-cols-2">
            <div>
              <h3 className="text-xl font-bold text-foreground">
                {"Vamos construir seu próximo projeto!"}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Pronto para elevar o nível do seu negócio com um design exclusivo e automações que funcionam?
                Entre em contato para transformarmos sua ideia em um sistema eficiente.
              </p>

              <div className="mt-8 flex flex-col gap-4">
                <a
                  href="https://wa.me/5583996602803"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  <WhatsAppIcon className="text-primary icon-hover" size={16} />
                  WhatsApp
                </a>
                <a
                  href="https://instagram.com/thiagolira.dev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  <Instagram className="h-4 w-4 text-primary icon-hover" />
                  @thiagolira.dev
                </a>
                <a
                  href="mailto:thiagolira@desenvolvedornet.com"
                  className="flex items-center gap-3 text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  <Mail className="h-4 w-4 text-primary icon-hover" />
                  thiagolira@desenvolvedornet.com
                </a>
              </div>
            </div>

            <form
              action="https://formspree.io/f/mreaknra"
              method="POST"
              className="flex flex-col gap-4"
            >
              <label className="flex flex-col gap-1.5">
                <span className="text-xs tracking-wider uppercase text-muted-foreground">
                  Nome
                </span>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="Seu nome"
                  className="rounded-lg border border-border bg-secondary px-4 py-2.5 text-sm text-foreground placeholder-muted-foreground outline-none transition-colors focus:border-primary"
                />
              </label>
              <label className="flex flex-col gap-1.5">
                <span className="text-xs tracking-wider uppercase text-muted-foreground">
                  Email
                </span>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="Seuemail@exemplo.com"
                  className="rounded-lg border border-border bg-secondary px-4 py-2.5 text-sm text-foreground placeholder-muted-foreground outline-none transition-colors focus:border-primary"
                />
              </label>
              <label className="flex flex-col gap-1.5">
                <span className="text-xs tracking-wider uppercase text-muted-foreground">
                  Mensagem
                </span>
                <textarea
                  name="message"
                  required
                  rows={4}
                  placeholder="Fale-me sobre o seu projeto...."
                  className="resize-none rounded-lg border border-border bg-secondary px-4 py-2.5 text-sm text-foreground placeholder-muted-foreground outline-none transition-colors focus:border-primary"
                />
              </label>
              <button
                type="submit"
                className="group mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-xs font-bold tracking-widest uppercase text-primary-foreground transition-all hover:brightness-110"
              >
                Enviar Mensagem
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}


/* ------------------------------------------------------------------ */
/*  FOOTER                                                             */
/* ------------------------------------------------------------------ */
function Footer() {
  return (
    <footer className="border-t border-border px-6 py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 md:flex-row">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Terminal className="h-4 w-4 text-primary" />
          <span>
            {"ThiagoLira.Dev"} &copy; {new Date().getFullYear()}
          </span>
        </div>

        <div className="flex items-center gap-4">
          {[
            { href: "https://wa.me/5583996602803", icon: WhatsAppIcon, label: "WhatsApp", isCustom: true },
            {
              href: "https://instagram.com/thiagolira.dev",
              icon: Instagram,
              label: "Instagram",
              isCustom: false,
            },
            {
              href: "mailto:thiagolira@desenvolvedornet.com",
              icon: Mail,
              label: "Email",
              isCustom: false,
            },
          ].map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label}
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-card text-muted-foreground transition-all hover:border-primary hover:text-primary icon-hover"
            >
              {s.isCustom ? (
                <WhatsAppIcon size={16} />
              ) : (
                <s.icon className="h-4 w-4" />
              )}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

/* ------------------------------------------------------------------ */
/*  SHARED: Section heading                                            */
/* ------------------------------------------------------------------ */
function SectionHeading({ label }: { label: string }) {
  const ref = useReveal();

  return (
    <div ref={ref} className="reveal flex items-center gap-4">
      <div className="h-px flex-1 bg-border" />
      <h2 className="text-xs font-bold tracking-[0.3em] uppercase text-primary">
        {label}
      </h2>
      <div className="h-px flex-1 bg-border" />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  PAGE                                                               */
/* ------------------------------------------------------------------ */
export default function Page() {
  return (
    <main className="relative overflow-x-hidden bg-transparent">
      {/* BACKGROUND DE VÍDEO FIXO */}
      <div className="fixed inset-0 -z-50 h-full w-full overflow-hidden pointer-events-none">
        <video
          src="/gifthiago.mp4" 
          autoPlay
          muted
          loop
          playsInline
          className="h-full w-full object-cover"
        />
        {/* Camada de cor para garantir que o texto branco seja legível */}
        <div className="absolute inset-0 bg-[#0f0d1a]/80 backdrop-blur-[2px]" />
      </div>

      <Navbar />
      <Hero />
      <About />
      <Projects />
      <Skills />
      <Contact />
      <Footer />
    </main>
  );
}