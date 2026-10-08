# MentorIA

Protótipo de uma plataforma de mentoria para mulheres em tecnologia. Uma IA entende os objetivos da usuária e sugere mentoras com experiência compatível. A pessoa também agenda sessões, acompanha seu plano de desenvolvimento e escolhe um plano de assinatura.

Site publicado: https://mentoria-tech.lovable.app

> Este é um protótipo de alta fidelidade. Todos os dados (mentoras, depoimentos, números e preços) são fictícios e não há servidor. O assistente de carreira responde com mensagens de exemplo.

## Telas

- **Home:** apresentação do produto, como funciona, áreas de atuação, demonstração do match e depoimentos.
- **Questionário:** perguntas rápidas sobre área, objetivo e nível de experiência.
- **Assinatura:** planos para estudante, profissional e empresa, com troca entre mensal e anual e mentorias avulsas.
- **Perfil da mentoranda:** painel com plano de desenvolvimento, próximas etapas, match recomendado e avaliações.
- **Perfil da mentora:** indicadores, serviços, experiência e avaliações.
- **Quem somos, login e cadastro.**

## Meu papel

Pesquisa e definição do produto, sistema de design (cores, tipografia, cards e componentes), prototipação das telas e implementação do front-end.

## Decisões de design

- Um único componente de card, com o mesmo raio, padding e escala de sombras em todas as telas.
- Paleta em roxo e lilás, com tipografia Poppins.
- Assistente de carreira disponível em todas as telas, inclusive para quem não contratou mentoria.

## Tecnologias

React 19, TypeScript, TanStack Start e Router, Vite, Tailwind CSS 4, shadcn/ui (Radix) e lucide-react. O projeto foi iniciado no Lovable.

## Como rodar no seu computador

```
npm install
npm run dev
```

Para gerar a versão final: `npm run build`.
