import { useRef, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { BrainCircuit, FileText, Menu, Paperclip, Send, X } from "lucide-react";
import { Brand } from "./brand";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner";
import { PackageDialog, ScheduleDialog, TipsDialog } from "./actions";
import { Conversation, ConversationContent, ConversationScrollButton } from "@/components/ai-elements/conversation";
import { Message, MessageContent } from "@/components/ai-elements/message";
import { Shimmer } from "@/components/ai-elements/shimmer";

const links = [
  { label: "Home", to: "/" },
  { label: "Quem Somos", to: "/sobre" },
  { label: "Questionário", to: "/questionario" },
  { label: "Assinatura", to: "/assinatura" },
  { label: "Perfil", to: "/perfil" },
] as const;

type AnalysisKind = "curriculo" | "portfolio";
type ChatAction = { label: string; kind: "tips" | "schedule" | "package" | "next" | "link"; topic?: string };
type ChatMessage = { from: "user" | "ai"; text: string; actions?: ChatAction[] | undefined; file?: string | undefined };

const interviewQuestions = [
  "Vamos simular uma entrevista! Primeira pergunta: conte sobre um projeto de que você se orgulha e qual foi sua contribuição.",
  "Boa! Segunda pergunta: como você lida com prazos apertados e demandas concorrentes?",
  "Última pergunta: onde você se vê daqui a dois anos e o que falta para chegar lá?",
];
const interviewFeedback = "Simulação concluída! Pontos fortes: clareza ao contar experiências e vocabulário técnico. Para evoluir: traga mais resultados com números e conecte cada resposta ao impacto no time.";

function CareerChat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [typing, setTyping] = useState(false);
  const [attached, setAttached] = useState<string | null>(null);
  const [analysisKind, setAnalysisKind] = useState<AnalysisKind | null>(null);
  const [usedNext, setUsedNext] = useState(false);
  const stepRef = useRef(0);
  const fileInput = useRef<HTMLInputElement>(null);
  const suggestions = ["Analisar currículo", "Analisar portfólio", "Simular entrevista", "Preparar para liderança", "Encontrar uma mentora"];

  const aiSay = (text: string, actions?: ChatAction[]) => {
    setTyping(true);
    window.setTimeout(() => {
      setMessages((current) => [...current, { from: "ai", text, actions }]);
      setTyping(false);
    }, 800);
  };

  const requestFile = (kind: AnalysisKind) => {
    setAnalysisKind(kind);
    setMessages((current) => [...current, { from: "user", text: kind === "curriculo" ? "Analisar currículo" : "Analisar portfólio" }]);
    aiSay(kind === "curriculo" ? "Envie seu currículo para que eu faça a análise." : "Envie seu portfólio para que eu faça a análise.");
  };

  const analyzeFile = (name: string, kind: AnalysisKind) => {
    const label = kind === "curriculo" ? "currículo" : "portfólio";
    const confirmation = kind === "curriculo"
      ? "Recebi seu currículo. Vou analisar a estrutura, o conteúdo e a apresentação."
      : "Recebi seu portfólio. Vou analisar os projetos, a narrativa e a apresentação.";
    const feedback = kind === "curriculo"
      ? "Aqui está meu feedback: sua experiência técnica está bem descrita. Adicione resultados quantificados, como “reduzi o tempo de carregamento em 30%”, e destaque projetos de liderança."
      : "Aqui está meu feedback: seu portfólio tem bons projetos. Adicione um estudo de caso detalhado explicando o problema, suas decisões e o processo, não apenas o resultado final.";
    const actions: ChatAction[] = kind === "curriculo"
      ? [{ label: "Ver dicas completas", kind: "tips" }, { label: "Agendar mentoria de currículo", kind: "schedule", topic: "Mentoria de currículo" }]
      : [{ label: "Ver pacote de Portfólio", kind: "package" }];

    setMessages((current) => [...current, { from: "user", text: `${name} enviado`, file: name }]);
    setAttached(null);
    setAnalysisKind(null);
    setTyping(true);
    window.setTimeout(() => {
      setMessages((current) => [...current, { from: "ai", text: confirmation }]);
    }, 650);
    window.setTimeout(() => {
      setMessages((current) => [...current, { from: "ai", text: feedback, actions }]);
      setTyping(false);
    }, 1700);
    void label;
  };

  const nextQuestion = () => {
    setUsedNext(true);
    stepRef.current += 1;
    const next = interviewQuestions[stepRef.current];
    if (next) aiSay(next, [{ label: "Próxima pergunta", kind: "next" }]);
    else aiSay(interviewFeedback, [{ label: "Agendar simulação completa", kind: "schedule", topic: "Simulação de entrevista" }]);
  };

  const sendText = (value: string) => {
    const text = value.trim();
    if (!text) return;
    const normalized = text.toLowerCase();
    if (normalized.includes("currículo") || normalized.includes("curriculo")) {
      requestFile("curriculo");
      return;
    }
    if (normalized.includes("portfólio") || normalized.includes("portfolio")) {
      requestFile("portfolio");
      return;
    }
    setMessages((current) => [...current, { from: "user", text }]);
    if (normalized.includes("entrevista")) {
      stepRef.current = 0;
      setUsedNext(false);
      aiSay(interviewQuestions[0] ?? "Conte sobre um desafio técnico que você resolveu recentemente.", [{ label: "Próxima pergunta", kind: "next" }]);
    } else if (normalized.includes("liderança") || normalized.includes("lideranca")) {
      aiSay("Vamos mapear comunicação, influência e gestão de conflitos para seu próximo passo.", [{ label: "Agendar mentoria de liderança", kind: "schedule", topic: "Preparação para liderança" }]);
    } else {
      aiSay("Vou cruzar seu objetivo, experiência e área para sugerir perfis compatíveis.", [{ label: "Responder ao questionário", kind: "link" }]);
    }
  };

  const chooseSuggestion = (value: string) => {
    if (value === "Analisar currículo") requestFile("curriculo");
    else if (value === "Analisar portfólio") requestFile("portfolio");
    else sendText(value);
  };

  const submitMessage = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const text = String(new FormData(form).get("message") ?? "").trim();
    if (attached) {
      const inferredKind = analysisKind ?? (attached.toLowerCase().includes("portfolio") || attached.toLowerCase().includes("portfólio") ? "portfolio" : "curriculo");
      analyzeFile(attached, inferredKind);
      form.reset();
      return;
    }
    sendText(text);
    form.reset();
  };

  const renderAction = (action: ChatAction, key: string, stale: boolean) => {
    const trigger = <Button variant="outline" size="sm">{action.label}</Button>;
    if (action.kind === "tips") return <TipsDialog key={key}>{trigger}</TipsDialog>;
    if (action.kind === "schedule") return <ScheduleDialog key={key} {...(action.topic ? { topic: action.topic } : {})}>{trigger}</ScheduleDialog>;
    if (action.kind === "package") return <PackageDialog key={key} id="portfolio">{trigger}</PackageDialog>;
    if (action.kind === "link") return <Button key={key} asChild variant="outline" size="sm"><Link to="/questionario">{action.label}</Link></Button>;
    return <Button key={key} variant="outline" size="sm" disabled={stale} onClick={nextQuestion}>{action.label}</Button>;
  };

  const lastAi = messages.map((message) => message.from).lastIndexOf("ai");

  return (
    <div className="fixed bottom-5 right-4 z-40 sm:bottom-6 sm:right-6">
      {open && <div className="mb-3 flex h-[min(70vh,620px)] w-[calc(100vw-2rem)] max-w-[380px] flex-col overflow-hidden rounded-card border border-card-border bg-card shadow-float">
        <div className="bg-hero-gradient p-5 text-primary-foreground">
          <div className="flex items-start justify-between"><div><p className="font-semibold">Assistente de carreira</p><span className="mt-1 inline-block rounded-full bg-card/15 px-2 py-1 text-[10px]">Gratuita para todas as usuárias</span></div><Button variant="ghost" size="icon" onClick={() => setOpen(false)} aria-label="Fechar chat" className="text-primary-foreground hover:bg-card/15"><X /></Button></div>
        </div>
        <Conversation className="min-h-0">
          <ConversationContent className="gap-3 p-4">
            <Message from="assistant"><MessageContent className="leading-6">Olá! Como posso ajudar sua carreira hoje? Posso analisar seu currículo, simular entrevistas e encontrar sua mentora.</MessageContent></Message>
            <div className="flex flex-wrap gap-2">{suggestions.map((suggestion) => <Button key={suggestion} variant="outline" size="sm" onClick={() => chooseSuggestion(suggestion)}>{suggestion}</Button>)}</div>
            {messages.map((message, index) => <Message key={`${message.text}-${index}`} from={message.from === "ai" ? "assistant" : "user"}>
              <MessageContent className={cn("leading-6", message.from === "user" && "rounded-inner bg-primary text-primary-foreground")}>{message.file && <span className="mb-1 flex items-center gap-2 font-semibold"><FileText className="size-4" />{message.file}</span>}{message.text}</MessageContent>
              {message.actions && <div className="flex flex-wrap gap-2">{message.actions.map((action, actionIndex) => renderAction(action, `${index}-${actionIndex}`, index < lastAi && action.kind === "next"))}</div>}
            </Message>)}
            {typing && <Shimmer className="text-xs">Analisando…</Shimmer>}
          </ConversationContent>
          <ConversationScrollButton />
        </Conversation>
        <div className="border-t border-border p-3">
          {attached && <div className="mb-2 flex items-center justify-between gap-2 rounded-full bg-lilac-soft px-4 py-2 text-xs text-primary"><span className="flex min-w-0 items-center gap-2"><FileText className="size-4 shrink-0" /><span className="truncate">{attached} anexado</span></span><Button type="button" variant="ghost" size="icon-sm" onClick={() => setAttached(null)} aria-label="Remover anexo"><X className="size-3.5" /></Button></div>}
          <form onSubmit={submitMessage} className="flex items-center gap-2">
            <input ref={fileInput} type="file" accept=".pdf,.doc,.docx,.txt,.md,image/*" className="hidden" onChange={(event) => { const file = event.target.files?.[0]; if (file) setAttached(file.name); event.target.value = ""; }} aria-label="Selecionar currículo ou portfólio" />
            <Button type="button" variant="outline" size="icon" aria-label="Anexar arquivo" onClick={() => fileInput.current?.click()}><Paperclip /></Button>
            <input name="message" aria-label="Mensagem" placeholder={attached ? "Arquivo pronto para enviar" : "Digite sua pergunta"} className="h-10 min-w-0 flex-1 rounded-full bg-muted px-4 text-sm outline-hidden focus:ring-2 focus:ring-primary/30" />
            <Button type="submit" size="icon" aria-label={attached ? "Enviar arquivo" : "Enviar mensagem"} disabled={typing}><Send /></Button>
          </form>
          <p className="mt-2 text-center text-[10px] text-muted-foreground">Recurso gratuito, mesmo sem mentoria contratada.</p>
        </div>
      </div>}
      <Button onClick={() => setOpen(!open)} className="h-14 px-5 shadow-float"><span className="relative"><BrainCircuit /><i className="absolute -right-1 -top-1 size-2 animate-pulse rounded-full bg-mint" /></span><span className="hidden sm:inline">IA de carreira</span><span className="rounded-full bg-card/15 px-2 py-0.5 text-[10px]">Grátis</span></Button>
    </div>
  );
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const path = useRouterState({ select: (state) => state.location.pathname });
  return <><header className="sticky top-0 z-30 border-b border-card-border bg-background/90 backdrop-blur-xl"><div className="mx-auto flex h-20 max-w-[1200px] items-center justify-between px-5"><Link to="/"><Brand /></Link><nav className="hidden items-center gap-3 lg:flex">{links.map((link) => <Link key={link.to} to={link.to} className={cn("rounded-full px-3 py-2 text-sm font-medium", path === link.to ? "bg-lilac-soft text-primary" : "text-muted-foreground hover:text-primary")}>{link.label}</Link>)}</nav><div className="flex items-center gap-1"><Button asChild className="hidden sm:inline-flex"><Link to="/assinatura">Começar grátis</Link></Button><Sheet><SheetTrigger asChild><Button variant="ghost" size="icon" className="lg:hidden" aria-label="Abrir navegação"><Menu /></Button></SheetTrigger><SheetContent className="bg-background"><SheetHeader><SheetTitle><Brand /></SheetTitle><SheetDescription>Navegue pela MentorIA</SheetDescription></SheetHeader><div className="mt-8 flex flex-col gap-2">{links.map((link) => <Link key={link.to} to={link.to} className={cn("rounded-full px-4 py-3 font-medium", path === link.to ? "bg-lilac-soft text-primary" : "hover:bg-lilac-soft")}>{link.label}</Link>)}</div></SheetContent></Sheet></div></div></header><main>{children}</main><CareerChat /><Toaster position="top-center" /></>;
}