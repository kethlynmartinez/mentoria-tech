import { createFileRoute } from "@tanstack/react-router";
import { MentorProfile } from "@/components/mentoria/mentor-profile";
import { mentors } from "@/components/mentoria/data";

export const Route = createFileRoute("/mentora/")({
  head: () => ({ meta: [{ title: "Mariana Costa, Tech Lead — MentorIA" }, { name: "description", content: "Conheça a experiência e as avaliações da mentora Mariana Costa." }, { property: "og:title", content: "Mariana Costa — Mentora MentorIA" }, { property: "og:description", content: "Mentoria em Front-end, liderança e carreira em tecnologia." }, { property: "og:type", content: "profile" }, { name: "twitter:card", content: "summary_large_image" }] }),
  component: () => <MentorProfile mentor={mentors[0]!} />,
});
