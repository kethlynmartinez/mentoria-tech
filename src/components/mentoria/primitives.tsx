import type { LucideIcon } from "lucide-react";
import { ArrowUpRight, Check, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function IconBadge({ icon: Icon, inverse = false }: { icon: LucideIcon; inverse?: boolean }) {
  return <span className={cn("grid size-12 shrink-0 place-items-center rounded-full", inverse ? "bg-card/15 text-primary-foreground" : "bg-lilac-soft text-primary")}><Icon className="size-5" /></span>;
}

export function ArrowButton({ label = "Ver detalhes" }: { label?: string }) {
  return <Button variant="ghost" size="icon" aria-label={label} title={label} className="shrink-0 bg-ink text-primary-foreground hover:bg-primary hover:text-primary-foreground"><ArrowUpRight /></Button>;
}

export function SkillTag({ children }: { children: React.ReactNode }) {
  return <span className="inline-flex rounded-full bg-lilac-soft px-3 py-1.5 text-xs font-semibold text-primary">{children}</span>;
}

export function RatingStars({ value = 5 }: { value?: number }) {
  return <div className="flex gap-0.5" aria-label={`${value} de 5 estrelas`}>{[1,2,3,4,5].map((n)=><Star key={n} className={cn("size-4", n <= Math.round(value) ? "fill-yellow text-yellow" : "text-muted-foreground/30")} />)}</div>;
}

export function DonutChart({ value, label = "completo", dark = false }: { value: number; label?: string; dark?: boolean }) {
  return <div className="flex flex-col items-center gap-4"><div className="relative grid size-36 place-items-center rounded-full" style={{background:`conic-gradient(var(--purple-500) ${value}%, var(--lilac-100) 0)`}}><div className={cn("grid size-24 place-items-center rounded-full text-center", dark ? "bg-dark-surface" : "bg-card")}><div><strong className="block text-3xl font-semibold">{value}%</strong><span className="text-xs text-muted-foreground">{label}</span></div></div></div></div>;
}

export function MiniBarChart({ labels = ["Jan","Fev","Mar","Abr","Mai","Jun"] }: { labels?: string[] }) {
  const values=[36,58,48,78,64,92];
  return <div className="mt-5 flex h-36 items-end gap-3 border-b border-card-dark px-1">{values.map((v,i)=><div key={labels[i]} className="flex h-full flex-1 flex-col justify-end gap-2"><div className={cn("w-full rounded-full", i===5 ? "bg-highlight" : "bg-primary")} style={{height:`${v}%`}}/><span className="text-center text-[11px] text-muted-foreground">{labels[i]}</span></div>)}</div>;
}

export function PillTabs({ items, active, onChange }: { items:string[]; active:string; onChange:(item:string)=>void }) {
  return <div className="inline-flex max-w-full flex-wrap gap-1 rounded-full bg-muted p-1">{items.map(item=><button key={item} onClick={()=>onChange(item)} className={cn("rounded-full px-4 py-2 text-xs font-semibold transition", active===item ? "bg-primary text-primary-foreground shadow-button" : "text-muted-foreground hover:text-foreground")}>{item}</button>)}</div>;
}

export function StatCard({ icon:Icon, label, value, detail, variant="default", action }: { icon:LucideIcon; label:string; value:string; detail?:string; variant?:"default"|"gradient"|"dark"|"highlight"; action?:React.ReactNode }) {
  return <Card variant={variant} className="min-h-52"><div className="flex items-start justify-between gap-4"><div><p className={cn("text-sm", variant==="default" ? "text-muted-foreground" : "opacity-75")}>{label}</p><p className="mt-4 text-3xl font-semibold leading-tight">{value}</p></div><IconBadge icon={Icon} inverse={variant!=="default"}/></div>{detail&&<p className={cn("mt-3 text-sm",variant==="default"?"text-muted-foreground":"opacity-75")}>{detail}</p>}{action&&<div className="mt-5">{action}</div>}</Card>;
}

export function Avatar({ name, tone="primary", size="md" }: {name:string;tone?:"primary"|"highlight"|"mint";size?:"sm"|"md"|"lg"}) {
  return <div className={cn("grid shrink-0 place-items-center rounded-full font-semibold", size==="sm"?"size-10 text-xs":size==="lg"?"size-28 text-2xl":"size-12",tone==="primary"?"bg-primary text-primary-foreground":tone==="highlight"?"bg-highlight text-ink":"bg-mint text-ink")}>{name.split(" ").map(n=>n[0]).slice(0,2).join("")}</div>;
}

export function AvatarRow({ name, subtitle, tone="primary" }: {name:string;subtitle:string;tone?:"primary"|"highlight"|"mint"}) {
  return <div className="flex items-center gap-3 border-b border-border py-4 last:border-0"><Avatar name={name} tone={tone}/><div className="min-w-0 flex-1"><p className="font-semibold">{name}</p><p className="truncate text-sm text-muted-foreground">{subtitle}</p></div><ArrowButton/></div>;
}

export function TestimonialCard({ name, area, quote, tone="primary" }: {name:string;area:string;quote:string;tone?:"primary"|"highlight"|"mint"}) {
  return <Card className="flex h-full flex-col"><RatingStars/><blockquote className="my-5 flex-1 text-[15px] leading-7">“{quote}”</blockquote><div className="flex items-center gap-3"><Avatar name={name} tone={tone}/><div><p className="font-semibold">{name}</p><p className="text-sm text-muted-foreground">{area}</p></div></div></Card>;
}

export function PlanCard({ title, price, features, popular=false, consult=false }: {title:string;price:string;features:{label:string;included:boolean}[];popular?:boolean;consult?:boolean}) {
  return <Card variant="glass" spacing="large" className={cn("relative flex h-full flex-col",popular&&"md:-translate-y-4 md:scale-[1.03] border-primary")}>{popular&&<span className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 rounded-full bg-vivid px-4 py-1 text-xs font-semibold text-primary-foreground">Mais popular</span>}<h3 className="text-center text-xl font-semibold">{title}</h3><div className="my-6 border-t border-card-dark"/><div className="text-center"><span className="text-4xl font-semibold">{consult?price:`R$ ${price}`}</span>{!consult&&<span className="text-sm text-primary-foreground/60">/mês</span>}</div><ul className="my-7 flex-1 space-y-3">{features.map(f=><li key={f.label} className={cn("flex gap-2 text-sm",!f.included&&"opacity-35")}><Check className="size-4 shrink-0 text-highlight"/>{f.label}</li>)}</ul><Button variant="dark" className="w-full">Começar agora</Button><p className="mt-4 text-center text-xs text-primary-foreground/55">7 dias grátis · depois cobrado conforme o plano</p></Card>;
}

export function ServiceCard({ icon:Icon,title,description,price,action }: {icon:LucideIcon;title:string;description:string;price:string;action:string}) {
  return <Card className="flex h-full flex-col"><div className="flex items-start justify-between"><IconBadge icon={Icon}/><ArrowButton label={action}/></div><h3 className="mt-6 text-lg font-semibold">{title}</h3><p className="mt-2 flex-1 text-sm leading-6 text-muted-foreground">{description}</p><p className="mt-5 font-semibold text-primary">{price}</p><Button variant="outline" className="mt-4 w-full">{action}</Button></Card>;
}

export function SectionTitle({ eyebrow, title, highlight, centered=false, inverse=false }: {eyebrow?:string;title:string;highlight?:string;centered?:boolean;inverse?:boolean}) {
  const parts=highlight?title.split(highlight):[title];
  return <div className={cn("mb-10",centered&&"mx-auto max-w-3xl text-center",inverse&&"text-primary-foreground")}>{eyebrow&&<p className="mb-3 text-sm font-semibold uppercase text-primary">{eyebrow}</p>}<h2 className="text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl">{parts[0]}{highlight&&<span className="text-gradient">{highlight}</span>}{parts[1]}</h2></div>;
}