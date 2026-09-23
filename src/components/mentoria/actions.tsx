import { useState } from "react";
import { Check, Mic, MicOff, PhoneOff, Send, Sparkles, Star, Video } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { packages } from "./data";
import { Avatar } from "./primitives";

const dialogClass = "w-[calc(100%-2rem)] max-w-lg rounded-card border-card-border p-8 shadow-float";

type TriggerProps = { children: React.ReactNode };

export function ScheduleDialog({ children, mentor = "Mariana Costa", topic = "Mentoria individual" }: TriggerProps & { mentor?: string; topic?: string }) {
  const days = ["Seg 29/09", "Ter 30/09", "Qua 01/10", "Qui 02/10"];
  const hours = ["09:00", "12:30", "18:00", "19:30"];
  const [day, setDay] = useState<string>();
  const [hour, setHour] = useState<string>();
  const [done, setDone] = useState(false);
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={(o) => { setOpen(o); if (!o) { setDone(false); setDay(undefined); setHour(undefined); } }}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className={dialogClass}>
        <DialogHeader>
          <DialogTitle className="text-2xl">{done ? "Mentoria agendada!" : "Agendar mentoria"}</DialogTitle>
          <DialogDescription>{mentor} · {topic}</DialogDescription>
        </DialogHeader>
        {done ? (
          <div className="rounded-inner bg-lilac-soft p-5 text-sm">
            <p className="font-semibold text-primary">Resumo</p>
            <p className="mt-2">{topic} com {mentor}</p>
            <p>{day} às {hour} · 60 minutos · online</p>
            <p className="mt-2 text-muted-foreground">O link da sala foi enviado para seu e-mail.</p>
          </div>
        ) : (
          <>
            <p className="text-sm font-semibold">Escolha o dia</p>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">{days.map((d) => <button key={d} onClick={() => setDay(d)} className={cn("rounded-full px-3 py-2.5 text-xs font-semibold transition", day === d ? "bg-primary text-primary-foreground" : "bg-muted hover:bg-lilac-soft")}>{d}</button>)}</div>
            <p className="text-sm font-semibold">Escolha o horário</p>
            <div className="grid grid-cols-4 gap-2">{hours.map((h) => <button key={h} onClick={() => setHour(h)} className={cn("rounded-full px-3 py-2.5 text-xs font-semibold transition", hour === h ? "bg-primary text-primary-foreground" : "bg-muted hover:bg-lilac-soft")}>{h}</button>)}</div>
            <Button disabled={!day || !hour} className="w-full" onClick={() => { setDone(true); toast.success("Agendamento confirmado", { description: `${day} às ${hour} com ${mentor}` }); }}>Confirmar agendamento</Button>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

export function PackageDialog({ children, id, price }: TriggerProps & { id: keyof typeof packages | string; price?: string }) {
  const pkg = packages[id] ?? packages["carreira"]!;
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className={dialogClass}>
        <DialogHeader>
          <DialogTitle className="text-2xl">{pkg.title}</DialogTitle>
          <DialogDescription>{pkg.description}</DialogDescription>
        </DialogHeader>
        <ul className="space-y-3">{pkg.includes.map((i) => <li key={i} className="flex gap-2 text-sm"><Check className="size-4 shrink-0 text-primary" />{i}</li>)}</ul>
        <div className="flex items-center justify-between rounded-inner bg-muted p-5"><span className="text-sm text-muted-foreground">Investimento</span><span className="text-2xl font-semibold text-primary">{price ?? pkg.price}</span></div>
        <Button className="w-full" onClick={() => toast.success("Compra realizada!", { description: `${pkg.title} adicionado à sua conta.` })}>Comprar</Button>
      </DialogContent>
    </Dialog>
  );
}

export function RoomDialog({ children }: TriggerProps) {
  const [muted, setMuted] = useState(false);
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className={dialogClass}>
        <DialogHeader>
          <DialogTitle className="text-2xl">Sala de mentoria</DialogTitle>
          <DialogDescription>Conversa com Mariana — Tech Lead · 24 set · 18h30</DialogDescription>
        </DialogHeader>
        <div className="bg-hero-gradient grid grid-cols-2 gap-3 rounded-inner p-4">
          {[{ n: "Mariana Costa", t: "primary" as const }, { n: "Ana Souza", t: "highlight" as const }].map((p) => (
            <div key={p.n} className="grid aspect-video place-items-center rounded-inner bg-card/10 text-primary-foreground"><div className="flex flex-col items-center gap-2"><Avatar name={p.n} tone={p.t} /><span className="text-xs">{p.n}</span></div></div>
          ))}
        </div>
        <p className="text-center text-sm text-muted-foreground">Mariana entrará na sala em instantes.</p>
        <div className="flex justify-center gap-3">
          <Button variant="outline" size="icon" aria-label="Microfone" onClick={() => setMuted(!muted)}>{muted ? <MicOff /> : <Mic />}</Button>
          <Button variant="outline" size="icon" aria-label="Câmera"><Video /></Button>
          <Button size="icon" aria-label="Sair" onClick={() => toast("Você saiu da sala")}><PhoneOff /></Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export function ReviewDialog({ children }: TriggerProps) {
  const [stars, setStars] = useState(0);
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className={dialogClass}>
        <DialogHeader>
          <DialogTitle className="text-2xl">Avaliar mentoria</DialogTitle>
          <DialogDescription>Marina Lopes · Entrevista técnica · 12 ago</DialogDescription>
        </DialogHeader>
        <div className="flex gap-1">{[1, 2, 3, 4, 5].map((n) => <button key={n} aria-label={`${n} estrelas`} onClick={() => setStars(n)}><Star className={cn("size-8", n <= stars ? "fill-yellow text-yellow" : "text-muted-foreground/30")} /></button>)}</div>
        <textarea placeholder="Como foi sua experiência?" className="min-h-28 rounded-inner bg-muted p-4 text-sm outline-hidden focus:ring-2 focus:ring-primary/30" />
        <Button disabled={!stars} className="w-full" onClick={() => { setOpen(false); setStars(0); toast.success("Avaliação enviada", { description: "Obrigada por ajudar a comunidade!" }); }}>Enviar avaliação</Button>
      </DialogContent>
    </Dialog>
  );
}

export function MessageDialog({ children, to = "Mariana Costa" }: TriggerProps & { to?: string }) {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className={dialogClass}>
        <DialogHeader>
          <DialogTitle className="text-2xl">Enviar mensagem</DialogTitle>
          <DialogDescription>Para {to}</DialogDescription>
        </DialogHeader>
        <textarea placeholder="Escreva sua mensagem..." className="min-h-32 rounded-inner bg-muted p-4 text-sm outline-hidden focus:ring-2 focus:ring-primary/30" />
        <Button className="w-full" onClick={() => { setOpen(false); toast.success("Mensagem enviada", { description: `${to} responderá em breve.` }); }}><Send />Enviar</Button>
      </DialogContent>
    </Dialog>
  );
}

export function NotificationsDialog({ children }: TriggerProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className={dialogClass}>
        <DialogHeader>
          <DialogTitle className="text-2xl">Notificações</DialogTitle>
          <DialogDescription>Últimas novidades da sua jornada</DialogDescription>
        </DialogHeader>
        {["Sua mentoria com Mariana é amanhã às 18h30.", "Novo match sugerido: Júlia Prado (Liderança).", "Você concluiu 2 etapas do seu plano esta semana."].map((n) => (
          <div key={n} className="flex gap-3 rounded-inner bg-muted p-4 text-sm"><i className="mt-1.5 size-2 shrink-0 rounded-full bg-coral" />{n}</div>
        ))}
      </DialogContent>
    </Dialog>
  );
}

export function TipsDialog({ children }: TriggerProps) {
  const tips = ["Comece com um resumo de 3 linhas focado no cargo desejado.", "Use verbos de ação e números: 'reduzi', 'aumentei', 'liderei'.", "Liste até 8 tecnologias principais, sem excesso.", "Inclua links para GitHub e portfólio atualizados.", "Destaque projetos em que você orientou pessoas ou tomou decisões.", "Mantenha o currículo em até 2 páginas."];
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className={dialogClass}>
        <DialogHeader>
          <DialogTitle className="text-2xl">Dicas completas de currículo</DialogTitle>
          <DialogDescription>Análise gerada pela IA de carreira</DialogDescription>
        </DialogHeader>
        <ol className="space-y-3">{tips.map((t, i) => <li key={t} className="flex gap-3 text-sm"><span className="grid size-6 shrink-0 place-items-center rounded-full bg-lilac-soft text-xs font-semibold text-primary">{i + 1}</span>{t}</li>)}</ol>
        <p className="flex gap-2 text-xs text-muted-foreground"><Sparkles className="size-4 text-primary" />Quer ajuda humana? Agende uma mentoria de currículo.</p>
      </DialogContent>
    </Dialog>
  );
}
