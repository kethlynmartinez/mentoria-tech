import { createFileRoute } from "@tanstack/react-router";
import { Instagram, Linkedin, Mail, Send, Youtube } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { IconBadge, SectionTitle } from "@/components/mentoria/primitives";
import { HowItWorks } from "@/components/mentoria/how-it-works";

export const Route = createFileRoute("/sobre")({
  head: () => ({ meta: [{ title: "Sobre a MentorIA — Mulheres crescendo juntas" }, { name: "description", content: "Conheça a proposta da MentorIA, como funciona e fale com a nossa equipe." }, { property: "og:title", content: "Sobre a MentorIA" }, { property: "og:description", content: "Mentoria feminina e IA para transformar carreiras em tecnologia." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" }] }),
  component: About,
});

function About() {
  return (
    <div className="soft-canvas">
      <section className="mx-auto max-w-[1200px] px-5 pb-16 pt-20">
        <p className="text-sm font-semibold uppercase text-primary">Sobre a MentorIA</p>
        <h1 className="mt-4 max-w-4xl text-5xl font-bold leading-tight sm:text-6xl">Conecte-se ao seu <span className="text-gradient">futuro</span>.</h1>
        <p className="mt-4 text-2xl font-semibold text-muted-foreground">Mulheres crescendo juntas.</p>
      </section>
      <section className="mx-auto grid max-w-[1200px] gap-6 px-5 lg:grid-cols-[1.2fr_.8fr]">
        <Card spacing="large">
          <h2 className="text-lg font-semibold">Nossa proposta</h2>
          <p className="mt-4 leading-7 text-muted-foreground">A MentorIA nasceu para diminuir a distância entre mulheres que estão construindo carreira em tecnologia e mulheres que já trilharam esse caminho. Nossa IA entende seus objetivos, identifica lacunas e conecta você a mentoras com experiência compatível — para que cada conversa gere um próximo passo concreto.</p>
        </Card>
        <Card variant="gradient" spacing="large">
          <p className="text-sm text-primary-foreground/70">Nossa comunidade</p>
          <p className="mt-3 text-4xl font-semibold">+2.000</p>
          <p className="mt-1 text-primary-foreground/70">mulheres crescendo juntas em 9 áreas da tecnologia.</p>
        </Card>
      </section>
      <section className="mx-auto max-w-[1200px] px-5 py-24">
        <SectionTitle eyebrow="Sua jornada" title="Como funciona" />
        <HowItWorks />
      </section>
      <section className="mx-auto grid max-w-[1200px] gap-6 px-5 pb-24 lg:grid-cols-2">
        <Card spacing="large">
          <h2 className="text-lg font-semibold">Contato</h2>
          <div className="mt-6 flex items-center gap-3"><IconBadge icon={Mail} /><a href="mailto:contato@mentoria.app" className="font-semibold text-primary">contato@mentoria.app</a></div>
          <p className="mt-6 text-sm text-muted-foreground">Siga a MentorIA</p>
          <div className="mt-3 flex gap-2">{[[Instagram, "Instagram"], [Linkedin, "LinkedIn"], [Youtube, "YouTube"]].map(([I, l]) => { const Icon = I as typeof Mail; return <Button key={l as string} variant="outline" size="icon" aria-label={l as string} onClick={() => toast(`Em breve: MentorIA no ${l as string}`)}><Icon /></Button>; })}</div>
        </Card>
        <Card spacing="large">
          <h2 className="text-lg font-semibold">Fale com a gente</h2>
          <form className="mt-6 space-y-3" onSubmit={(e) => { e.preventDefault(); e.currentTarget.reset(); toast.success("Mensagem enviada!", { description: "Responderemos em até 2 dias úteis." }); }}>
            <input required name="nome" placeholder="Seu nome" className="h-12 w-full rounded-full bg-muted px-5 text-sm outline-hidden focus:ring-2 focus:ring-primary/30" />
            <input required type="email" name="email" placeholder="Seu e-mail" className="h-12 w-full rounded-full bg-muted px-5 text-sm outline-hidden focus:ring-2 focus:ring-primary/30" />
            <textarea required name="mensagem" placeholder="Como podemos ajudar?" className="min-h-28 w-full rounded-inner bg-muted p-5 text-sm outline-hidden focus:ring-2 focus:ring-primary/30" />
            <Button type="submit" className="w-full"><Send />Enviar mensagem</Button>
          </form>
        </Card>
      </section>
    </div>
  );
}
