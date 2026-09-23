import { BadgeDollarSign, CalendarDays, ChartNoAxesColumn, Crown, Mail, MessageCircle, Presentation, Sparkles, Star, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar, MiniBarChart, SectionTitle, ServiceCard, SkillTag, StatCard, TestimonialCard } from "./primitives";
import { MessageDialog, PackageDialog, ScheduleDialog } from "./actions";
import type { Mentor } from "./data";

export function MentorProfile({ mentor: m }: { mentor: Mentor }) {
  const first = m.name.split(" ")[0];
  const tones = ["primary", "highlight", "mint"] as const;
  const isMariana = m.id === "mariana-costa";
  return (
    <div className="soft-canvas overflow-x-clip">
      <section className="dark-rays h-[410px] pt-20 text-primary-foreground">
        <div className="absolute left-1/3 top-32 h-24 w-3/4 -rotate-12 bg-vivid/30 blur-3xl" />
        <div className="relative mx-auto max-w-[1200px] px-5">
          <p className="text-sm font-semibold text-highlight">MENTORAS MENTORIA</p>
          <h1 className="mt-4 max-w-4xl text-4xl font-semibold leading-tight sm:text-6xl">Seu conhecimento pode transformar outras <span className="text-highlight">carreiras</span>.</h1>
        </div>
      </section>
      <div className="mx-auto -mt-28 max-w-[1200px] px-5">
        <Card spacing="large" className="relative z-10">
          <div className="flex flex-col gap-6 md:flex-row md:items-center">
            <Avatar name={m.name} tone={m.tone} size="lg" />
            <div className="flex-1">
              <span className="rounded-full bg-lilac-soft px-3 py-1 text-xs font-semibold text-primary">Mentora verificada</span>
              <h2 className="mt-3 text-3xl font-semibold">{m.name}</h2>
              <p className="text-muted-foreground">{m.role} · {m.specialty} · {m.years} anos de experiência</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <ScheduleDialog mentor={m.name}><Button><CalendarDays />Agendar mentoria</Button></ScheduleDialog>
              <MessageDialog to={m.name}><Button variant="outline"><MessageCircle />Enviar mensagem</Button></MessageDialog>
            </div>
          </div>
        </Card>
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          <StatCard icon={Users} label="Mentorias realizadas" value={String(m.sessions)} variant="dark" />
          <StatCard icon={Star} label="Avaliação" value={`${m.rating}/5`} detail="★★★★★" variant="highlight" />
          <StatCard icon={Crown} label="Especialidades" value={m.area} detail={m.skills.slice(0, 2).join(" · ")} variant="gradient" />
        </div>
        <div className="mt-6 grid gap-6 lg:grid-cols-[1.1fr_.9fr]">
          <Card variant="dark" spacing="large">
            <div className="flex justify-between"><div><h2 className="text-lg font-semibold">Mentorias por mês</h2><p className="text-sm text-primary-foreground/50">Últimos seis meses</p></div><ChartNoAxesColumn className="text-highlight" /></div>
            <MiniBarChart />
          </Card>
          <Card spacing="large">
            <h2 className="text-lg font-semibold">Sobre mim</h2>
            <p className="mt-4 text-sm leading-7 text-muted-foreground">{m.about}</p>
            <h3 className="mt-6 text-sm font-semibold">Posso ajudar com</h3>
            <div className="mt-3 flex flex-wrap gap-2">{m.skills.map((s) => <SkillTag key={s}>{s}</SkillTag>)}</div>
          </Card>
        </div>
        {!isMariana && <section className="py-24">
          <SectionTitle eyebrow="Escolha seu formato" title="Serviços de mentoria" />
          <div className="grid gap-6 md:grid-cols-3">
            <ServiceCard icon={CalendarDays} title="Mentoria individual" description="Uma conversa focada no seu desafio atual e em próximos passos claros." price="R$ 129 · 60 minutos" action="Agendar" wrap={(b) => <ScheduleDialog mentor={m.name}>{b}</ScheduleDialog>} />
            <ServiceCard icon={Crown} title="Pacote Liderança" description="Quatro encontros para desenvolver comunicação, influência e gestão." price="R$ 449 · 4 encontros" action="Ver pacote" wrap={(b) => <PackageDialog id="lideranca" price="R$ 449">{b}</PackageDialog>} />
            <ServiceCard icon={Presentation} title="Revisão de Portfólio" description="Feedback sobre narrativa, impacto e apresentação dos seus projetos." price="R$ 99 · 1 encontro" action="Comprar" wrap={(b) => <PackageDialog id="portfolio" price="R$ 99">{b}</PackageDialog>} />
          </div>
        </section>}
        <section className="grid gap-6 pb-24 lg:grid-cols-2">
          <Card spacing="large">
            <h2 className="text-lg font-semibold">Minha experiência</h2>
            <div className="mt-6">
              {m.experience.map(([role, company, date], i) => (
                <div key={role} className="relative flex gap-4 pb-7 last:pb-0">
                  <div className="flex flex-col items-center"><i className="size-4 rounded-full bg-primary ring-4 ring-lilac-soft" />{i < m.experience.length - 1 && <i className="mt-2 h-full w-px bg-border" />}</div>
                  <div><p className="font-semibold">{role}</p><p className="text-sm text-muted-foreground">{company} · {date}</p></div>
                </div>
              ))}
            </div>
          </Card>
          <div className="grid gap-6 sm:grid-cols-2">
            <Card><BadgeDollarSign className="size-8 text-primary" /><h3 className="mt-4 font-semibold">Remuneração</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">As mentorias realizadas pela plataforma geram remuneração para a mentora.</p></Card>
            <Card variant="highlight"><span className="rounded-full bg-card/55 px-3 py-1 text-xs font-semibold">Em breve</span><h3 className="mt-4 font-semibold">Programa de Parceiras</h3><p className="mt-2 text-sm leading-6 opacity-70">Mentoras que contribuem continuamente para a comunidade poderão participar de programas especiais de parceria da plataforma.</p></Card>
            <Card variant="gradient" className="sm:col-span-2"><div className="flex items-start justify-between"><div><p className="text-sm text-primary-foreground/60">Impacto na comunidade</p><p className="mt-2 text-3xl font-semibold">+{m.sessions * 2} horas compartilhadas</p></div><Sparkles /></div></Card>
          </div>
        </section>
        <section className="pb-24">
          <SectionTitle eyebrow="Avaliações" title={`O que dizem as mentorandas de ${first}`} />
          <div className="grid gap-6 md:grid-cols-3">{m.testimonials.map((t, i) => <TestimonialCard key={t.name} {...t} tone={tones[i % 3] ?? "primary"} />)}</div>
        </section>
        {isMariana && <section className="pb-24">
          <Card variant="gradient" spacing="large" className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
            <div><p className="text-sm font-semibold text-highlight">ENTRE EM CONTATO</p><h2 className="mt-2 text-2xl font-semibold">Converse com Mariana sobre sua mentoria.</h2><p className="mt-2 text-sm text-primary-foreground/70">Conte seu momento de carreira e consulte formatos e valores disponíveis.</p></div>
            <MessageDialog to={m.name}><Button variant="light"><Mail />Consulte valores</Button></MessageDialog>
          </Card>
        </section>}
      </div>
    </div>
  );
}
