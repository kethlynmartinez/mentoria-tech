import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export function Brand({ inverse = false }: { inverse?: boolean }) {
  return <div className={cn("flex items-center gap-2 font-bold text-xl", inverse ? "text-primary-foreground" : "text-ink")}><span className="relative grid size-9 place-items-center"><span className="absolute size-6 rotate-45 rounded-[9px] bg-primary"/><span className="absolute size-5 -rotate-12 translate-x-2 rounded-[8px] bg-highlight/80"/><Sparkles className="relative size-4 text-primary-foreground"/></span>MentorIA</div>;
}