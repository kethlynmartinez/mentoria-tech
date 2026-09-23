import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Loader2, MailCheck, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/questionario")({
  head: () => ({ meta: [{ title: "Questionário de carreira — MentorIA" }, { name: "description", content: "Responda o questionário e receba as mentoras mais compatíveis com seu perfil." }, { property: "og:title", content: "Encontre seu match na MentorIA" }, { property: "og:description", content: "Conte seus objetivos e a IA encontra sua mentora ideal." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" }] }),
  component: Questionnaire,
});

const questions = [
  { key: "situacao", title: "Qual é sua situação atual de trabalho?", options: ["Estou empregada", "Estou desempregada", "Sou estudante", "Freelancer/autônoma"] },
  { key: "area", title: "Qual sua área de atuação ou interesse?", options: ["Dados", "IA", "Cibersegurança", "Front-end", "Back-end", "Full Stack", "Suporte", "Produto", "Liderança"] },
  { key: "nivel", title: "Qual seu nível de experiência?", options: ["Iniciante", "Júnior", "Pleno", "Sênior", "Liderança"] },
  { key: "objetivo", title: "Qual é seu objetivo principal?", options: ["Conseguir o primeiro emprego", "Mudar de área", "Crescer na carreira atual", "Preparar-se para liderança", "Melhorar currículo/portfólio"] },
] as const;

const loadingTexts = ["Analisando seu perfil...", "Buscando mentoras compatíveis...", "Calculando seu match...", "Preparando suas recomendações..."];
const field = "h-12 w-full rounded-full bg-muted px-5 text-sm outline-hidden focus:ring-2 focus:ring-primary/30";

function Questionnaire() {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [phase, setPhase] = useState<"form" | "loading" | "done">("form");
  const [textIndex, setTextIndex] = useState(0);
  const [error, setError] = useState("");

  useEffect(() => {
    if (phase !== "loading") return;
    const interval = setInterval(() => setTextIndex((i) => Math.min(i + 1, loadingTexts.length - 1)), 1200);
    const timeout = setTimeout(() => setPhase("done"), 3800);
    return () => { clearInterval(interval); clearTimeout(timeout); };
  }, [phase]);

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (questions.some((q) => !answers[q.key])) { setError("Responda todas as perguntas de múltipla escolha para encontrarmos seu match."); return; }
    setError(""); setTextIndex(0); setPhase("loading"); window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="soft-canvas min-h-screen">
      <div className="mx-auto max-w-3xl px-5 py-16">
        {phase === "form" && (
          <>
            <span className="inline-flex items-center gap-2 rounded-full bg-lilac-soft px-4 py-2 text-xs font-semibold text-primary"><Sparkles className="size-4" />Leva cerca de 2 minutos</span>
            <h1 className="mt-6 text-4xl font-bold leading-tight sm:text-5xl">Vamos entender melhor sua <span className="text-gradient">carreira</span>.</h1>
            <p className="mt-4 text-muted-foreground">Suas respostas ajudam a IA a encontrar mentoras com a experiência certa para o seu momento.</p>
            <form onSubmit={submit} className="mt-10 space-y-6">
              {questions.map((q, qi) => (
                <Card key={q.key}>
                  <p className="text-xs font-semibold text-primary">PERGUNTA {qi + 1} DE 6</p>
                  <h2 className="mt-2 text-lg font-semibold">{q.title}</h2>
                  <div className="mt-4 flex flex-wrap gap-2" role="radiogroup" aria-label={q.title}>
                    {q.options.map((o) => (
                      <button type="button" role="radio" aria-checked={answers[q.key] === o} key={o} onClick={() => setAnswers((a) => ({ ...a, [q.key]: o }))} className={cn("rounded-full px-4 py-2.5 text-sm font-medium transition", answers[q.key] === o ? "bg-primary text-primary-foreground shadow-button" : "bg-muted hover:bg-lilac-soft hover:text-primary")}>{o}</button>
                    ))}
                  </div>
                </Card>
              ))}
              <Card>
                <p className="text-xs font-semibold text-primary">PERGUNTA 5 DE 6</p>
                <label htmlFor="dificuldade" className="mt-2 block text-lg font-semibold">Conte um pouco mais — você tem alguma dificuldade específica no momento?</label>
                <textarea id="dificuldade" placeholder="Ex.: tenho dificuldade em falar sobre minhas conquistas em entrevistas..." className="mt-4 min-h-32 w-full rounded-inner bg-muted p-5 text-sm outline-hidden focus:ring-2 focus:ring-primary/30" />
              </Card>
              <Card>
                <p className="text-xs font-semibold text-primary">PERGUNTA 6 DE 6</p>
                <h2 className="mt-2 text-lg font-semibold">Para onde enviamos seu resultado?</h2>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <input required aria-label="Nome" placeholder="Seu nome" className={field} />
                  <input required type="email" aria-label="E-mail" placeholder="Seu e-mail" className={field} />
                </div>
              </Card>
              {error && <p className="text-sm font-medium text-coral">{error}</p>}
              <Button type="submit" size="lg" className="w-full">Encontrar meu match</Button>
            </form>
          </>
        )}
        {phase === "loading" && (
          <Card variant="gradient" spacing="large" className="mt-10 py-16 text-center" aria-live="polite">
            <Loader2 className="mx-auto size-12 animate-spin" />
            <p key={textIndex} className="mt-6 animate-in fade-in text-2xl font-semibold">{loadingTexts[textIndex]}</p>
            <div className="mx-auto mt-8 h-2 max-w-xs overflow-hidden rounded-full bg-card/20"><div className="h-full rounded-full bg-card transition-all duration-1000" style={{ width: `${((textIndex + 1) / loadingTexts.length) * 100}%` }} /></div>
          </Card>
        )}
        {phase === "done" && (
          <Card variant="highlight" spacing="large" className="mt-10 text-center">
            <span className="mx-auto grid size-16 place-items-center rounded-full bg-card text-primary"><MailCheck className="size-8" /></span>
            <h1 className="mt-6 text-3xl font-semibold sm:text-4xl">Prontinho! Suas opções de mentoras estão a caminho.</h1>
            <p className="mt-4">Enviamos as mentoras mais compatíveis com o seu perfil para o seu e-mail.</p>
            <div className="mt-8 rounded-inner bg-card p-6 text-left">
              <p className="font-semibold">Quer acompanhar tudo em um só lugar?</p>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">Crie sua conta gratuita na MentorIA e acesse seu match, agende mentorias e acompanhe sua evolução.</p>
              <div className="mt-5 flex flex-wrap items-center gap-4">
                <Button asChild><Link to="/perfil">Criar minha conta grátis</Link></Button>
                <Link to="/" className="text-sm font-semibold text-primary">Voltar para a Home</Link>
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
