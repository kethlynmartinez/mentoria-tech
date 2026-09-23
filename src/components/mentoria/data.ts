export type Tone = "primary" | "highlight" | "mint";

export type Mentor = {
  id: string;
  name: string;
  role: string;
  specialty: string;
  area: string;
  years: number;
  tone: Tone;
  sessions: number;
  rating: string;
  about: string;
  skills: string[];
  experience: [string, string, string][];
  testimonials: { name: string; area: string; quote: string }[];
};

export const mentors: Mentor[] = [
  {
    id: "mariana-costa", name: "Mariana Costa", role: "Tech Lead", specialty: "Front-end & Leadership", area: "Front-end", years: 8, tone: "primary", sessions: 47, rating: "4,9",
    about: "Atuo há 8 anos na área de tecnologia e atualmente lidero uma equipe de desenvolvimento. Ajudo mulheres que querem avançar profissionalmente e se preparar para posições de liderança.",
    skills: ["Liderança", "Carreira em tecnologia", "Front-end", "Entrevistas", "Portfólio", "Comunicação profissional"],
    experience: [["Tech Lead", "Nexa Tecnologia", "2023 — atual"], ["Desenvolvedora Front-end Sênior", "Orbit Labs", "2020 — 2023"], ["Desenvolvedora Pleno", "Pluma Digital", "2018 — 2020"], ["Desenvolvedora Júnior", "Vértice Tech", "2016 — 2018"]],
    testimonials: [
      { name: "Clara F.", area: "Front-end", quote: "Mariana me ajudou a estruturar uma conversa de promoção com muito mais confiança." },
      { name: "Débora S.", area: "Engenharia", quote: "Saí com ações práticas para liderar meu primeiro projeto multidisciplinar." },
      { name: "Gabi T.", area: "Produto digital", quote: "O feedback foi direto, generoso e conectado com a realidade do mercado." },
    ],
  },
  {
    id: "julia-prado", name: "Júlia Prado", role: "Engineering Manager", specialty: "Liderança & Gestão de times", area: "Liderança", years: 11, tone: "highlight", sessions: 63, rating: "4,8",
    about: "Gerencio times de engenharia há 5 anos. Gosto de ajudar mulheres a fazer a transição de especialista técnica para liderança com segurança.",
    skills: ["Gestão de pessoas", "Liderança", "Feedback", "Carreira", "Comunicação"],
    experience: [["Engineering Manager", "Lumen Pay", "2021 — atual"], ["Tech Lead", "Circuito", "2018 — 2021"], ["Desenvolvedora Sênior", "Aurora Sistemas", "2014 — 2018"]],
    testimonials: [
      { name: "Patrícia L.", area: "Back-end", quote: "Aprendi a dar feedbacks difíceis sem perder a empatia." },
      { name: "Ingrid M.", area: "Full Stack", quote: "Júlia me ajudou a montar meu primeiro plano de liderança." },
      { name: "Sofia R.", area: "Dados", quote: "Sessões muito práticas e acolhedoras." },
    ],
  },
  {
    id: "renata-lima", name: "Renata Lima", role: "Staff Engineer", specialty: "Front-end & Arquitetura", area: "Front-end", years: 10, tone: "primary", sessions: 38, rating: "4,9",
    about: "Sou Staff Engineer focada em arquitetura front-end e performance. Apoio mulheres que querem crescer tecnicamente até posições sênior e staff.",
    skills: ["React", "Arquitetura", "Performance", "Entrevistas técnicas", "Portfólio"],
    experience: [["Staff Engineer", "Kora Commerce", "2022 — atual"], ["Desenvolvedora Sênior", "Brisa Apps", "2018 — 2022"], ["Desenvolvedora Pleno", "Norte Web", "2015 — 2018"]],
    testimonials: [
      { name: "Helena B.", area: "Front-end", quote: "Finalmente entendi como falar de arquitetura em entrevistas." },
      { name: "Marta C.", area: "Front-end", quote: "Meu portfólio ficou muito mais técnico e claro." },
      { name: "Yasmin D.", area: "Full Stack", quote: "Renata tem uma didática incrível." },
    ],
  },
  {
    id: "paula-mendes", name: "Paula Mendes", role: "Product Lead", specialty: "Produto & Carreira", area: "Produto", years: 9, tone: "mint", sessions: 52, rating: "4,9",
    about: "Lidero produtos digitais e já ajudei dezenas de mulheres a migrarem para Produto. Meu foco é clareza de carreira e narrativa profissional.",
    skills: ["Produto", "Transição de carreira", "Currículo", "Storytelling", "Carreira"],
    experience: [["Product Lead", "Vela Saúde", "2022 — atual"], ["Product Manager", "Trama", "2019 — 2022"], ["Analista de Negócios", "Grão", "2016 — 2019"]],
    testimonials: [
      { name: "Lívia A.", area: "Produto", quote: "Consegui minha primeira vaga de PM depois de três sessões." },
      { name: "Nina P.", area: "UX", quote: "Me ajudou a enxergar minhas conquistas com outros olhos." },
      { name: "Rosa T.", area: "Dados", quote: "Muito objetiva e generosa." },
    ],
  },
];

export const getMentor = (id: string) => mentors.find((m) => m.id === id);

export type PackageInfo = { id: string; title: string; description: string; price: string; includes: string[] };

export const packages: Record<string, PackageInfo> = {
  curriculo: { id: "curriculo", title: "Pacote Currículo", description: "Revisão completa do seu currículo com uma mentora da sua área.", price: "R$ 49", includes: ["1 sessão de 45 minutos", "Revisão escrita com comentários", "Checklist de palavras-chave", "Modelo editável"] },
  portfolio: { id: "portfolio", title: "Pacote Portfólio", description: "Feedback sobre narrativa, impacto e apresentação dos seus projetos.", price: "R$ 59", includes: ["1 sessão de 60 minutos", "Análise de até 3 projetos", "Roteiro para estudo de caso", "Revisão final por escrito"] },
  entrevista: { id: "entrevista", title: "Pacote Entrevista", description: "Simulações realistas com feedback objetivo.", price: "R$ 69", includes: ["2 simulações de 45 minutos", "Perguntas técnicas e comportamentais", "Feedback gravado", "Método STAR na prática"] },
  lideranca: { id: "lideranca", title: "Pacote Liderança", description: "Encontros para desenvolver comunicação, influência e gestão.", price: "R$ 89", includes: ["4 encontros de 60 minutos", "Plano de desenvolvimento de liderança", "Exercícios de feedback", "Suporte por mensagem entre sessões"] },
  carreira: { id: "carreira", title: "Pacote Carreira", description: "Plano individual para o seu próximo passo profissional.", price: "R$ 79", includes: ["2 sessões de 60 minutos", "Mapa de competências", "Plano de ação de 90 dias", "Indicação de trilhas"] },
};
