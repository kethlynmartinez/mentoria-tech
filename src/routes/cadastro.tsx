import { useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { UserPlus } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { IconBadge } from "@/components/mentoria/primitives";

export const Route = createFileRoute("/cadastro")({
  head: () => ({ meta: [{ title: "Criar conta — MentorIA" }, { name: "description", content: "Crie sua conta gratuita na MentorIA e acompanhe seu match, mentorias e evolução." }, { property: "og:title", content: "Crie sua conta na MentorIA" }, { property: "og:description", content: "Conta gratuita para acessar seu match e agendar mentorias." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" }] }),
  component: SignUp,
});

const inputClass = "h-12 w-full rounded-full bg-muted px-5 text-sm text-ink outline-none focus-visible:ring-2 focus-visible:ring-primary";

function SignUp() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    window.setTimeout(() => {
      toast.success("Conta criada com sucesso!", { description: "Bem-vinda à MentorIA." });
      navigate({ to: "/perfil" });
    }, 700);
  };
  return (
    <div className="soft-canvas">
      <section className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-[1200px] items-center justify-center px-5 py-16">
        <Card spacing="large" className="w-full max-w-md">
          <IconBadge icon={UserPlus} />
          <h1 className="mt-6 text-3xl font-bold sm:text-4xl">Criar <span className="text-gradient">conta</span></h1>
          <p className="mt-2 text-sm text-muted-foreground">Gratuita, leva menos de um minuto.</p>
          <form onSubmit={submit} className="mt-8 space-y-4">
            <label className="block text-sm font-medium text-ink">Nome<input required className={`${inputClass} mt-2`} placeholder="Seu nome" /></label>
            <label className="block text-sm font-medium text-ink">E-mail<input required type="email" className={`${inputClass} mt-2`} placeholder="voce@email.com" /></label>
            <label className="block text-sm font-medium text-ink">Senha<input required type="password" minLength={6} className={`${inputClass} mt-2`} placeholder="Mínimo de 6 caracteres" /></label>
            <Button type="submit" className="w-full" disabled={loading}>{loading ? "Criando…" : "Criar minha conta"}</Button>
          </form>
          <p className="mt-6 text-center text-sm text-muted-foreground">Já tem uma conta? <button type="button" className="font-semibold text-primary" onClick={() => toast("Login em breve", { description: "Por enquanto, crie sua conta gratuita." })}>Entrar</button></p>
        </Card>
      </section>
    </div>
  );
}
