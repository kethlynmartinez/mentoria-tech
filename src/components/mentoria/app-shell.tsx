import { useRef, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { BrainCircuit, CircleHelp, Compass, Menu, MessageCircle, Paperclip, Send, Sparkles, Users, X } from "lucide-react";
import { Brand } from "./brand";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner";
import { ScheduleDialog, TipsDialog } from "./actions";

const links=[{label:"Home",to:"/"},{label:"Meu Perfil",to:"/perfil"},{label:"Questionário",to:"/questionario"},{label:"Encontrar Mentora",to:"/mentora"},{label:"Assinatura",to:"/assinatura"}] as const;

type ChatAction = { label: string; kind: "tips" | "schedule" | "next" | "link"; topic?: string };

const pillClass = "rounded-full border border-primary/15 px-3 py-2 text-xs font-medium text-primary transition hover:bg-lilac-soft";

const interviewQuestions = [
  "Vamos simular uma entrevista! Primeira pergunta: conte sobre um projeto de que você se orgulha e qual foi sua contribuição.",
  "Boa! Segunda pergunta: como você lida com prazos apertados e demandas concorrentes?",
  "Última pergunta: onde você se vê daqui a dois anos e o que falta para chegar lá?",
];
const interviewFeedback = "Simulação concluída! Pontos fortes: clareza ao contar experiências e vocabulário técnico. Para evoluir: traga mais resultados com números (ex.: \"reduzi o tempo de build em 30%\") e conecte cada resposta ao impacto no time.";

function CareerChat(){
  const [open,setOpen]=useState(false);
  const [messages,setMessages]=useState<{from:"user"|"ai";text:string;actions?:ChatAction[]|undefined}[]>([]);
  const [typing,setTyping]=useState(false);
  const [attached,setAttached]=useState<string|null>(null);
  const [step,setStep]=useState(0);
  const [usedNext,setUsedNext]=useState(false);
  const stepRef=useRef(0);
  const fileInput=useRef<HTMLInputElement>(null);
  const suggestions=["Analisar currículo","Analisar portfólio","Simular entrevista","Preparar para liderança","Encontrar uma mentora"];

  const aiSay=(text:string,actions?:ChatAction[]|undefined)=>{setTyping(true);setTimeout(()=>{setMessages(m=>[...m,{from:"ai",text,actions}]);setTyping(false)},800)};
  const send=(value:string)=>{
    if(!value)return;
    setMessages(m=>[...m,{from:"user",text:value}]);
    const v=value.toLowerCase();
    if(v.includes("currículo")||v.includes("curriculo"))aiSay("Análise do seu currículo: o resumo está genérico e faltam resultados com números. Priorize conquistas mensuráveis, limite a 2 páginas e alinhe as palavras-chave à vaga desejada.",[{label:"Ver dicas completas",kind:"tips"},{label:"Agendar mentoria de currículo",kind:"schedule",topic:"Mentoria de currículo"}]);
    else if(v.includes("portfólio")||v.includes("portfolio"))aiSay("Análise do seu portfólio: os projetos estão bem apresentados, mas a narrativa pode melhorar. Explique o problema, sua decisão técnica e o impacto final em cada case.",[{label:"Agendar revisão de portfólio",kind:"schedule",topic:"Revisão de portfólio"}]);
    else if(v.includes("entrevista")){stepRef.current=0;setStep(0);setUsedNext(false);aiSay(interviewQuestions[0]!,[{label:"Próxima pergunta",kind:"next"}])}
    else if(v.includes("liderança")||v.includes("lideranca"))aiSay("Vamos mapear comunicação, influência e gestão de conflitos para seu próximo passo. Um bom exercício: escolha uma situação recente em que você precisou alinhar pessoas com opiniões diferentes.",[{label:"Agendar mentoria de liderança",kind:"schedule",topic:"Preparação para liderança"}]);
    else aiSay("Vou cruzar seu objetivo, experiência e área para sugerir perfis compatíveis.",[{label:"Responder ao questionário",kind:"link"}]);
  };
  const nextQuestion=()=>{
    setUsedNext(true);
    stepRef.current+=1;
    const i=stepRef.current;
    setStep(i);
    if(i<interviewQuestions.length)aiSay(interviewQuestions[i]!,[{label:"Próxima pergunta",kind:"next"}]);
    else aiSay(interviewFeedback,[{label:"Agendar simulação completa",kind:"schedule",topic:"Simulação de entrevista"}]);
  };
  const onAction=(a:ChatAction)=>{if(a.kind==="next")nextQuestion()};
  const pickFile=(e:React.ChangeEvent<HTMLInputElement>)=>{
    const f=e.target.files?.[0];
    if(!f)return;
    setAttached(f.name);
    e.target.value="";
  };
  const analyzeFile=()=>{
    if(!attached)return;
    const name=attached as string;
    setAttached(null);
    setMessages(m=>[...m,{from:"user",text:`Anexei o arquivo: ${name}`}]);
    aiSay(`Recebi ${name}. Análise inicial: o documento está organizado, mas o resumo pode ser mais direto e faltam resultados com números. Preparei 6 ajustes prioritários para elevar o impacto.`,[{label:"Ver dicas completas",kind:"tips"},{label:"Agendar mentoria de currículo",kind:"schedule",topic:"Mentoria de currículo"}]);
  };

  const renderAction=(a:ChatAction,key:number)=>{
    if(a.kind==="tips")return <TipsDialog key={key}><button className={pillClass}>{a.label}</button></TipsDialog>;
    if(a.kind==="schedule")return <ScheduleDialog key={key} {...(a.topic?{topic:a.topic}:{})}><button className={pillClass}>{a.label}</button></ScheduleDialog>;
    if(a.kind==="link")return <Link key={key} to="/questionario" className={pillClass}>{a.label}</Link>;
    return <button key={key} className={cn(pillClass,a.kind==="next"&&usedNext&&"pointer-events-none opacity-40")} onClick={()=>onAction(a)}>{a.label}</button>;
  };

  return <div className="fixed bottom-5 right-4 z-40 sm:bottom-6 sm:right-6">{open&&<div className="mb-3 flex max-h-[70vh] w-[calc(100vw-2rem)] max-w-[380px] flex-col overflow-hidden rounded-card border border-card-border bg-card shadow-float"><div className="bg-hero-gradient p-5 text-primary-foreground"><div className="flex items-start justify-between"><div><p className="font-semibold">Assistente de carreira</p><span className="mt-1 inline-block rounded-full bg-card/15 px-2 py-1 text-[10px]">Gratuita para todas as usuárias</span></div><Button variant="ghost" size="icon" onClick={()=>setOpen(false)} aria-label="Fechar chat" className="text-primary-foreground hover:bg-card/15"><X/></Button></div></div><div className="overflow-y-auto p-4"><div className="max-w-[88%] rounded-inner bg-lilac-soft p-3 text-sm leading-6">Olá! Como posso ajudar sua carreira hoje? Posso analisar seu currículo, simular entrevistas e encontrar sua mentora.</div><div className="mt-3 flex flex-wrap gap-2">{suggestions.map(s=><button key={s} onClick={()=>send(s)} className="rounded-full border border-primary/15 px-3 py-2 text-xs text-primary hover:bg-lilac-soft">{s}</button>)}</div>{messages.map((m,i)=><div key={`${m.text}-${i}`} className={cn("mt-3 max-w-[88%] rounded-inner p-3 text-sm leading-6",m.from==="user"?"ml-auto bg-primary text-primary-foreground":"bg-muted")}>{m.text}{m.actions&&<div className="mt-3 flex flex-wrap gap-2">{m.actions.map(renderAction)}</div>}</div>)}{typing&&<p className="mt-3 text-xs text-muted-foreground">digitando…</p>}</div><div className="border-t border-border p-3">{attached&&<div className="mb-2 flex items-center justify-between gap-2 rounded-full bg-lilac-soft px-4 py-2 text-xs text-primary"><span className="truncate">{attached}</span><button onClick={()=>setAttached(null)} aria-label="Remover anexo"><X className="size-3.5"/></button></div>}<form onSubmit={e=>{e.preventDefault();const data=new FormData(e.currentTarget);const value=String(data.get("message")||"").trim();if(value)send(value);e.currentTarget.reset()}} className="flex gap-2"><input ref={fileInput} type="file" accept=".pdf,.doc,.docx,.txt,.md" className="hidden" onChange={pickFile} aria-label="Anexar arquivo"/><Button type="button" variant="outline" size="icon" aria-label="Anexar arquivo" onClick={()=>fileInput.current?.click()}><Paperclip/></Button><input name="message" aria-label="Mensagem" placeholder="Digite sua pergunta" className="min-w-0 flex-1 rounded-full bg-muted px-4 text-sm outline-hidden focus:ring-2 focus:ring-primary/30"/><Button size="icon" aria-label="Enviar"><Send/></Button></form><p className="mt-2 text-center text-[10px] text-muted-foreground">Recurso gratuito, mesmo sem mentoria contratada.</p></div></div>}<Button onClick={()=>setOpen(!open)} className="h-14 px-5 shadow-float"><span className="relative"><BrainCircuit/><i className="absolute -right-1 -top-1 size-2 animate-pulse rounded-full bg-mint"/></span><span className="hidden sm:inline">IA de carreira</span><span className="rounded-full bg-card/15 px-2 py-0.5 text-[10px]">Grátis</span></Button></div>}

export function AppShell({children}:{children:React.ReactNode}){const path=useRouterState({select:s=>s.location.pathname});return <><header className="sticky top-0 z-30 border-b border-card-border bg-background/90 backdrop-blur-xl"><div className="mx-auto flex h-20 max-w-[1200px] items-center justify-between px-5"><Link to="/"><Brand/></Link><nav className="hidden items-center gap-5 lg:flex">{links.map(l=><Link key={l.to} to={l.to} className={cn("rounded-full px-3 py-2 text-sm font-medium",path===l.to?"bg-lilac-soft text-primary":"text-muted-foreground hover:text-primary")}>{l.label}</Link>)}</nav><div className="flex items-center gap-1"><Button asChild variant="ghost" size="icon" aria-label="Quem somos"><Link to="/sobre"><Menu/></Link></Button><Button asChild className="hidden sm:inline-flex"><Link to="/assinatura">Começar grátis</Link></Button><Sheet><SheetTrigger asChild><Button variant="ghost" size="icon" className="lg:hidden" aria-label="Abrir navegação"><Menu/></Button></SheetTrigger><SheetContent className="bg-background"><SheetHeader><SheetTitle><Brand/></SheetTitle><SheetDescription>Navegue pela MentorIA</SheetDescription></SheetHeader><div className="mt-8 flex flex-col gap-2">{links.map(l=><Link key={l.to} to={l.to} className="rounded-full px-4 py-3 font-medium hover:bg-lilac-soft">{l.label}</Link>)}<Link to="/sobre" className="rounded-full px-4 py-3 font-medium hover:bg-lilac-soft">Quem somos</Link></div></SheetContent></Sheet></div></div></header><main>{children}</main><CareerChat/><Toaster position="top-center"/></>}
