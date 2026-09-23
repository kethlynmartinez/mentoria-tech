import { BarChart3, Sparkles, Target, Users } from "lucide-react";
import { Card } from "@/components/ui/card";
import { IconBadge } from "./primitives";

const steps = [
  [Target, "Conte seus objetivos", "Compartilhe seu momento e onde quer chegar."],
  [Sparkles, "A IA encontra seu match", "Analisamos compatibilidade e experiência."],
  [Users, "Converse com sua mentora", "Tenha encontros focados no que importa."],
  [BarChart3, "Desenvolva sua carreira", "Acompanhe ações e evolução contínua."],
] as const;

export function HowItWorks() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {steps.map(([Icon, t, d], i) => (
        <Card key={t} className="relative">
          <span className="absolute right-6 top-6 text-4xl font-bold text-lilac-soft">0{i + 1}</span>
          <IconBadge icon={Icon} />
          <h3 className="mt-6 text-lg font-semibold">{t}</h3>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">{d}</p>
        </Card>
      ))}
    </div>
  );
}
