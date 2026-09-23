import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MentorProfile } from "@/components/mentoria/mentor-profile";
import { getMentor } from "@/components/mentoria/data";

export const Route = createFileRoute("/mentora/$id")({
  loader: ({ params }) => {
    const mentor = getMentor(params.id);
    if (!mentor) throw notFound();
    return { mentor };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Mentora não encontrada — MentorIA" }, { name: "robots", content: "noindex" }] };
    const m = loaderData.mentor;
    const title = `${m.name}, ${m.role} — MentorIA`;
    const desc = `Mentoria com ${m.name}: ${m.specialty}, ${m.years} anos de experiência.`;
    return { meta: [{ title }, { name: "description", content: desc }, { property: "og:title", content: title }, { property: "og:description", content: desc }, { property: "og:type", content: "profile" }, { name: "twitter:card", content: "summary" }] };
  },
  notFoundComponent: MentorNotFound,
  component: MentorPage,
});

function MentorPage() {
  const { mentor } = Route.useLoaderData();
  return <MentorProfile mentor={mentor} />;
}

function MentorNotFound() {
  return <div className="mx-auto max-w-xl px-5 py-24"><Card spacing="large" className="text-center"><h1 className="text-3xl font-semibold">Mentora não encontrada</h1><p className="mt-3 text-muted-foreground">Esse perfil não está disponível.</p><Button asChild className="mt-6"><Link to="/mentora">Ver mentoras</Link></Button></Card></div>;
}
