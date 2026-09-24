import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { LogIn } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { IconBadge } from "@/components/mentoria/primitives";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Entrar — MentorIA" }, { name: "description", content: "Entre na sua conta MentorIA para acompanhar seu match e suas mentorias." }, { property: "og:title", content: "Entrar na MentorIA" }, { property: "og:description", content: "Acesse seu perfil, match e mentorias." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" }] }),
  component: Login,
});

const inputClass = "h-12 w-full rounded-full bg-muted px-5 text-sm text-ink outline-none focus-visible:ring-2 focus-visible:ring-primary";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const valid = email.trim() !== "" && password.trim() !== "";
  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!valid) return;
    setLoading(true);
    window.setTimeout(() => {
      toast.success("Login realizado com sucesso!");
      navigate({ to: "/perfil" });
    }, 600);
  };
  return (
    <div className="soft-canvas">
      <section className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-[1200px] items-center justify-center px-5 py-16">
        <Card spacing="large" className="w-full max-w-md">
          <IconBadge icon={LogIn} />
          <h1 className="mt-6 text-3xl font-bold sm:text-4xl"><span className="text-gradient">Entrar</span></h1>
          <p className="mt-2 text-sm text-muted-foreground">Bom te ver de novo!</p>
          <form onSubmit={submit} className="mt-8 space-y-4">
            <label className="block text-sm font-medium text-ink">E-mail<input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} className={`${inputClass} mt-2`} placeholder="voce@email.com" /></label>
            <label className="block text-sm font-medium text-ink">Senha<input required type="password" value={password} onChange={(e) => setPassword(e.target.value)} className={`${inputClass} mt-2`} placeholder="Sua senha" /></label>
            <Button type="submit" className="w-full" disabled={!valid || loading}>{loading ? "Entrando…" : "Entrar"}</Button>
          </form>
          <p className="mt-6 text-center text-sm text-muted-foreground">Ainda não tem conta? <Link to="/cadastro" className="font-semibold text-primary">Criar conta</Link></p>
        </Card>
      </section>
    </div>
  );
}
