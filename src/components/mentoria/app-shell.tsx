import { useRef, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { BrainCircuit, FileText, Paperclip, Send, X } from "lucide-react";
import { Brand } from "./brand";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner";
import { PackageDialog, ScheduleDialog, TipsDialog } from "./actions";
import { Conversation, ConversationContent, ConversationScrollButton } from "@/components/ai-elements/conversation";
import { Message, MessageContent } from "@/components/ai-elements/message";
import { PromptInput, PromptInputButton, PromptInputFooter, PromptInputHeader, PromptInputSubmit, PromptInputTextarea, usePromptInputAttachments, type PromptInputMessage } from "@/components/ai-elements/prompt-input";
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

function PendingAttachments() {
  const attachments = usePromptInputAttachments();
  if (attachments.files.length === 0) return null;
  return <PromptInputHeader>{attachments.files.map((file) => <div key={file.id} className="flex w-full items-center justify-between gap-2 rounded-full bg-lilac-soft px-4 py-2 text-xs text-primary"><span className="flex min-w-0 items-center gap-2"><FileText className="size-4 shrink-0" /><span className="truncate">{file.filename ?? "Arquivo"} anexado</span></span><Button type="button" variant="ghost" size="icon-sm" onClick={() => attachments.remove(file.id)} aria-label="Remover anexo"><X className="size-3.5" /></Button></div>)}</PromptInputHeader>;
}

function AttachmentButton() {
  const attachments = usePromptInputAttachments();
  return <PromptInputButton type="button" variant="outline" size="icon" aria-label="Anexar arquivo" onClick={attachments.openFileDialog}><Paperclip /></PromptInputButton>;
}

function CareerChat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [typing, setTyping] = useState(false);
  const [analysisKind, setAnalysisKind] = useState<AnalysisKind | null>(null);
  const [usedNext, setUsedNext] = useState(false);
  const stepRef = useRef(0);
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

  const submitMessage = (message: PromptInputMessage) => {
    const file = message.files[0];
    const name = file?.filename;
    if (name) {
      const inferredKind = analysisKind ?? (name.toLowerCase().includes("portfolio") || name.toLowerCase().includes("portfólio") ? "portfolio" : "curriculo");
      analyzeFile(name, inferredKind);
      return;
    }
    sendText(message.text);
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
          <PromptInput accept="application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,text/plain,text/markdown,image/*" maxFiles={1} maxFileSize={20 * 1024 * 1024} onSubmit={submitMessage} onError={() => undefined}>
            <PendingAttachments />
            <PromptInputTextarea aria-label="Mensagem" placeholder="Digite sua pergunta" className="min-h-10 rounded-full bg-muted px-4 py-2 text-sm" />
            <PromptInputFooter><AttachmentButton /><PromptInputSubmit aria-label="Enviar mensagem ou arquivo" disabled={typing} status={typing ? "streaming" : "ready"}><Send /></PromptInputSubmit></PromptInputFooter>
          </PromptInput>
          <p className="mt-2 text-center text-[10px] text-muted-foreground">Recurso gratuito, mesmo sem mentoria contratada.</p>
        </div>
      </div>}
      <Button onClick={() => setOpen(!open)} className="h-14 px-5 shadow-float"><span className="relative"><BrainCircuit /><i className="absolute -right-1 -top-1 size-2 animate-pulse rounded-full bg-mint" /></span><span className="hidden sm:inline">IA de carreira</span><span className="rounded-full bg-card/15 px-2 py-0.5 text-[10px]">Grátis</span></Button>
    </div>
  );
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const path = useRouterState({ select: (state) => state.location.pathname });
  const navigation = links.map((link) => <Link key={link.to} to={link.to} className={cn("shrink-0 rounded-full px-3 py-2 text-sm font-medium", path === link.to ? "bg-lilac-soft text-primary" : "text-muted-foreground hover:text-primary")}>{link.label}</Link>);
  return <><header className="sticky top-0 z-30 border-b border-card-border bg-background/90 backdrop-blur-xl"><div className="mx-auto max-w-[1200px] px-5"><div className="flex h-20 items-center justify-between"><Link to="/"><Brand /></Link><nav className="hidden items-center gap-3 lg:flex">{navigation}</nav><Button asChild className="hidden sm:inline-flex"><Link to="/assinatura">Começar grátis</Link></Button></div><nav className="flex w-full items-center gap-1 overflow-x-auto pb-3 lg:hidden">{navigation}</nav></div></header><main>{children}</main><CareerChat /><Toaster position="top-center" /></>;
}