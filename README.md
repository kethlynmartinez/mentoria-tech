# MentorIA (projeto)

# MentorIA — plataforma de mentoria profissional para mulheres em tecnologia

Crie um protótipo web de alta fidelidade, com aparência de produto SaaS real, chamado **MentorIA** (todo o texto da interface em português do Brasil). App React + React Router + Tailwind + shadcn/ui, com 4 telas principais que compartilham exatamente o mesmo sistema visual e componentes reutilizáveis. Dados 100% mockados (sem backend). As telas devem demonstrar claramente o funcionamento do produto (dashboards, match, agendamento, planos), não ser uma landing page genérica.

## Contexto do produto
A MentorIA conecta mulheres que trabalham ou estudam em tecnologia (Dados, IA, Cibersegurança, Front-end, Back-end, Full Stack, Suporte, Produto, Liderança) com mulheres mais experientes que oferecem orientação de carreira. Uma IA entende os objetivos da usuária, identifica lacunas e faz o match com mentoras de experiência compatível.
Lemas: **"Conecte-se ao seu futuro."** e **"Mulheres crescendo juntas."**
Sessões e conteúdos: preparação para entrevistas, análise de currículo, análise de portfólio, mentoria de carreira, preparação para liderança, desenvolvimento de habilidades, transição/crescimento de carreira.

---
# SISTEMA DE DESIGN UNIFICADO (obrigatório — definir primeiro, em index.css + tailwind.config, e usar em TODAS as telas)

As referências visuais são uma família só (Wardiere, planos de hosting, dashboards "Fauget"): roxo vibrante, cards muito arredondados, botões em pílula, ícones em círculos, gráficos simples em roxo, seções escuras com faixas de luz diagonais magenta/roxas e áreas claras limpas. Usá-las como referência geral de cores e estilo, sem copiar o conteúdo.

## Tipografia
**Poppins** (Google Fonts) em todo o app. Títulos de página 48–64px semibold/bold, tracking levemente negativo; títulos de card 18px semibold; corpo 15–16px regular; legendas 13–14px em cinza-lilás. Nos títulos grandes, UMA palavra de destaque com gradiente de texto roxo → lilás (ex.: "Conecte-se ao **futuro**.").

## Tokens de cor (CSS variables + Tailwind)
- --purple-900 #1B0B3B, --purple-800 #2A0A5E (roxo escuro)
- --purple-600 #6C4EE8 (roxo médio principal), --purple-500 #7B22F5 (roxo vivo p/ botões em fundo escuro), --purple-400 #8B5CF6
- --lilac-400 #A78BFA (lilás de destaque, como o card "Active Users" da referência), --lilac-300 #B9A0FA, --lilac-100 #EDE7FF
- --bg #FAF8FF (fundo claro), --white #FFFFFF, --gray-100 #F5F5F5 (barras/inputs), --gray-400 #9A94AD (texto secundário), --ink #14101F (texto)
- --dark-surface #141414 (cards escuros, como o dashboard de analytics), --dark-panel #1E1E1E (sidebar escura), --night #0B0620 (fundo de seções escuras)
- Destaques pequenos e pontuais: coral #FF5A6E (bolinha de notificação), menta #3DDBB0 (online/sucesso), amarelo #FFC94D (estrelas).
- Gradiente primário (botões): 90deg #6C4EE8 → #9B7BFA. Gradiente hero/banners: #6C4EE8 → #4B2A9E. Gradiente de seção escura: #0B0620 → #2A0A5E com 2 faixas diagonais desfocadas em magenta/roxo (#7A0BC0, opacidade .5, blur 80px) como nas referências. Gradientes com moderação.
- Fundo das áreas claras: branco/#FAF8FF com manchas radiais lilás bem suaves nos cantos (blur grande, opacidade baixa).

## CARD ÚNICO — componente `<Card>` (regra: NENHUM card fora deste modelo)
Um único componente base com as mesmas medidas em todas as telas:
- **Raio: 28px** (`--radius-card: 28px`, classe `rounded-card`) em todos os cards, sem exceção (inclusive planos, depoimentos, serviços, métricas, mentora, popup da IA). Elementos internos dentro de um card (imagens, sub-cards, tabelas) usam **20px** (`--radius-inner`). Botões, chips, tabs, inputs e barras de busca são **pílula** (rounded-full).
- **Padding:** 24px (p-6) padrão; 32px (p-8) para cards grandes/destaque; gap entre cards sempre 24px.
- **Borda:** 1px solid rgba(108,78,232,.10) nos cards claros; 1px rgba(255,255,255,.08) nos cards escuros.
- **Sombra (única escala):** `--shadow-card: 0 10px 40px -12px rgba(108,78,232,.20)`; hover: `--shadow-card-hover: 0 18px 50px -12px rgba(108,78,232,.32)` + translateY(-2px), transição 200ms; `--shadow-float: 0 24px 60px -16px rgba(43,10,94,.45)` só para elementos flutuantes (popup da IA, botão flutuante, cards sobrepostos ao hero). Em cards escuros, sem sombra externa, apenas borda e leve brilho interno.
- **Cabeçalho padrão de card:** título (18px semibold) + subtítulo cinza (14px) à esquerda e, quando fizer sentido, um botão "⋮" circular à direita (como nas referências). Conteúdo abaixo com 16–20px de espaço.
- **Variantes (prop `variant`), mesma geometria:**
  1. `default` — fundo branco, borda e sombra padrão (cards de conteúdo).
  2. `highlight` — fundo lilás sólido #A78BFA, texto #14101F (card de destaque, como "Active Users").
  3. `gradient` — gradiente roxo (#6C4EE8 → #4B2A9E), texto branco (card principal de métrica, banners).
  4. `dark` — fundo #141414, texto branco, números/gráficos em lilás (blocos de dados em seções escuras).
  5. `glass` — fundo em gradiente azul-arroxeado escuro translúcido (rgba(42,26,110,.55) → rgba(15,8,35,.85)) + backdrop-blur + borda branca 8% (cards de plano sobre fundo escuro).
- **Padrões internos reutilizáveis dos cards** (criar como componentes): `IconBadge` (círculo 48px, branco ou roxo, ícone centralizado, no canto superior direito de cards de métrica), `StatCard` (número grande 40px semibold + rótulo pequeno + link "Ver mais →" em roxo), `ArrowButton` (círculo 36px preto ou roxo com seta), `AvatarRow` (avatar circular + nome + subtítulo cinza + ArrowButton, com divisória fina entre linhas, como a lista "Popular and Trending"), `DonutChart` (anel roxo com número grande no centro e legenda com bolinhas coloridas + percentuais, como "Course Category"), `MiniBarChart` (barras arredondadas em tons de roxo, uma barra lilás de destaque, linhas de grade finas), `PillTabs` (aba ativa preenchida em roxo, inativas em texto cinza, como "For You / Hot / Trend"), `SkillTag` (chip pílula lilás claro #EDE7FF com texto roxo), `RatingStars` (amarelo #FFC94D), `Timeline`, `TestimonialCard`, `PlanCard`, `ServiceCard`, `MentorCard`.

## Botões e inputs
- Primário: pílula h-12 px-6, gradiente primário, texto branco, semibold; hover com leve brilho e elevação. Em fundo escuro: pílula sólida #7B22F5.
- Secundário: pílula branca com borda 1.5px lilás e texto roxo; em fundo escuro, pílula transparente com borda branca (como "Learn more" da referência).
- Link: "› Ver detalhes" em roxo, pequeno.
- Inputs e busca: pílula, fundo #F5F5F5 (ou branco em fundo escuro), ícone de lupa roxo à esquerda, sem borda.
- Notificações: bolinha coral #FF5A6E sobre ícones (mensagem, coração/favoritos, sino).

## Efeitos decorativos (usar com moderação)
Ícones 3D translúcidos "glassmorphism" em roxo flutuando ao redor do hero (lupa, balão de mensagem, brilho de IA, chapéu de formatura) feitos em SVG com gradiente, opacidade e blur; arcos concêntricos finos em roxo com pequenos pontos (órbitas) atrás de seções de destaque; faixas diagonais de luz em seções escuras.

## Layout
Container máx. 1200px; seções com 96px de espaço vertical; muito espaço em branco. Elegante e feminino, mas não infantil nem excessivamente delicado. Totalmente responsivo, contraste acessível, estados hover/focus, animações discretas de entrada.

---
## NAVEGAÇÃO (Navbar em todas as telas)
Navbar minimalista como a referência Wardiere: logo à esquerda (ícone de duas formas geométricas roxas entrelaçadas + "MentorIA" em bold), links no centro, CTA pílula "Começar grátis" à direita. Links: **Home** (/), **Meu Perfil** (/perfil), **Questionário**, **Encontrar Mentora** (/mentora), **Avaliações**, **Assinatura** (/assinatura). Link ativo em roxo com sublinhado/pílula lilás clara. Mobile: menu hambúrguer.
- "Questionário" abre um Dialog com mini-questionário de 3 perguntas mockadas (área de interesse, objetivo, nível de experiência) e botão "Encontrar meu match".
- "Avaliações" faz scroll até a seção de depoimentos da Home.
- **"Quem somos"**: botão na navbar (ícone de menu) que abre um **menu lateral retrátil (Sheet)** no estilo da sidebar escura das referências (fundo #1E1E1E, item ativo em pílula com gradiente roxo, ícones simples): sobre a startup, proposta ("Conecte-se ao seu futuro" / "Mulheres crescendo juntas"), como funciona (4 passos resumidos), contato (contato@mentoria.app, redes sociais), além de atalhos "Ajuda e suporte".

## IA DE CARREIRA — EM TODAS AS 4 TELAS
Botão flutuante fixo no canto inferior direito, pílula com gradiente roxo, ícone de brilho/IA e texto **"IA de carreira"** (na Home: "Falar com a IA"), ponto menta pulsando e selo "Grátis". Ao clicar abre popup de chat (~380px), usando o mesmo raio de 28px e `--shadow-float`, cabeçalho em gradiente roxo:
- Título **"Assistente de carreira"** + badge "Gratuita para todas as usuárias".
- Primeira mensagem (balão): "Olá! Como posso ajudar sua carreira hoje? Posso ajudar você a se preparar para o próximo passo."
- Sugestões rápidas (chips pílula clicáveis): "Analisar currículo", "Analisar portfólio", "Simular entrevista", "Preparar para liderança", "Encontrar uma mentora".
- Ao clicar em uma sugestão (ou enviar texto), adicionar a mensagem da usuária e uma resposta mockada da IA após ~1s com indicador "digitando…" (respostas curtas e específicas por sugestão; ex. currículo: "Envie seu currículo e eu destaco pontos de melhoria, palavras-chave e resultados que faltam.").
- Rodapé: "A IA de carreira é um recurso gratuito, mesmo sem mentoria contratada."
- Botão de fechar. Estado do chat compartilhado entre as telas (componente único montado no layout).

---
## TELA 1 — HOME (/)
Tema claro, estilo da referência Wardiere.
1. **Hero:** à esquerda, selo "✨ IA + mentoria feminina em tecnologia", título enorme "Conecte-se ao **futuro**." (palavra em gradiente), subtítulo "Encontre uma mentora que entende seus desafios e ajude sua carreira a avançar.", botões "Encontrar minha mentora" (primário) e "Como funciona" (secundário, faz scroll). Abaixo, prova social: avatares empilhados + "+2.000 mulheres crescendo juntas".
   À direita, composição com **DUAS telas de dispositivos** (notebook/monitor maior e tablet menor sobreposto, levemente inclinados, com --shadow-float) mostrando uma **videochamada entre duas mulheres**, mentora e mentoranda. Criar as mulheres como ilustrações vetoriais SVG em estilo flat moderno (sem fotos externas), com diversidade: uma **negra ou latina**, pele marrom e cabelo cacheado/volumoso (como as referências de dashboard mostram mulheres diversas), a outra com pele clara e cabelo liso; roupas profissionais; fundo do vídeo em lilás. Nas telas, detalhes de UI: barra "Sessão de mentoria · 32:10", ícones de microfone/câmera, um card flutuante "Match 96%" e outro "Trilha: Liderança em Front-end" (ambos usando o `<Card>` padrão). Ícones 3D glassmorphism e arcos concêntricos ao redor. Transmitir mentoria, tecnologia, conexão, desenvolvimento profissional e diversidade.
   Abaixo do hero, uma **barra de busca em pílula** cinza #F5F5F5 (como a da Wardiere): botão "Encontrar mentora" em gradiente à esquerda, campo "Área, habilidade ou objetivo" com lupa roxa e campo "Nível de experiência" com ícone.
2. **Como funciona** (id="como-funciona"): 4 Cards padrão numerados, com IconBadge e linha pontilhada conectando: 1 "Conte seus objetivos", 2 "A IA encontra seu match", 3 "Converse com sua mentora", 4 "Desenvolva sua carreira", cada um com uma frase curta.
3. **Áreas de atuação:** grade de Cards com ícone: Dados, IA, Cybersecurity, Front-end, Back-end, Full Stack, Produto, Liderança (com contagem, ex. "42 mentoras" e ArrowButton).
4. **Demonstração do produto** (seção escura com faixas de luz, estilo dos dashboards escuros): mostrar como a IA analisa um perfil e sugere um match, usando Cards `dark` e `highlight` com mini gráfico (DonutChart de compatibilidade 96%) e a frase "Match realizado pela IA com base nos seus objetivos, área de atuação e experiência."
5. **Depoimentos/Avaliações** (id="avaliacoes"): 3–4 TestimonialCards (Card padrão) com avatar, nome, área e estrelas. Ex.: "Encontrei uma mentora que trabalha justamente na área para a qual quero crescer." — Camila R., Dados. Criar outros 2–3 coerentes (Full Stack, Cybersecurity, Produto).
6. **Chamada para assinatura:** banner estilo "Upgrade to Premium" da referência (Card `gradient`/roxo vibrante, título "Comece com 7 dias grátis", texto curto, botão branco "Ver planos" + botão outline branco "Saiba mais", ilustração SVG de uma mulher recortada à direita) → /assinatura.
7. **Footer** com links, logo e "Mulheres crescendo juntas."

## TELA 2 — ASSINATURA (/assinatura)
- Título "Invista no próximo passo da sua carreira." (destaque em gradiente). Subtítulo "Comece gratuitamente por 7 dias e escolha o plano que combina com seu momento profissional." Selo "7 dias grátis".
- **Seletor de categoria** (PillTabs): ESTUDANTE | PROFISSIONAL | EMPRESA, com descrição abaixo:
  - Estudante: "Para mulheres que estão entrando ou se preparando para entrar no mercado de tecnologia."
  - Profissional: "Para mulheres que já trabalham em tecnologia e querem crescer, mudar de área ou assumir posições de liderança."
  - Empresa: "Para empresas que querem desenvolver talentos e apoiar mulheres em tecnologia."
- **Seletor Mensal/Anual** (toggle pílula, selo "Economize 20%" no anual).
- **Seção de planos com fundo escuro** (gradiente #0B0620 → #2A0A5E com faixas diagonais magenta, como a referência de hosting): 3 PlanCards `glass` (mesmo raio 28px), título centralizado, divisória fina, preço grande em branco, "/mês" cinza-lilás, lista com **check roxo**, botão pílula roxo vivo #7B22F5 "Começar agora". O card do meio é destacado com aba "Mais popular" em roxo vivo colada no topo e ligeiramente maior. Ao trocar categoria/período, planos e preços mudam com animação. Em cada card, nota "7 dias grátis · depois cobrado conforme o plano".
  Valores de exemplo (R$): Estudante — Essencial 19 (anual 15), Crescimento 39 (anual 31), Impulso 59 (anual 47). Profissional — Essencial 49 (anual 39), Crescimento 89 (anual 71), Liderança 149 (anual 119). Empresa — Time 399 (anual 319), Talentos 899 (anual 719), Corporativo "Sob consulta".
  Recursos distribuídos entre planos: Match com mentoras, Questionário de carreira, Trilhas personalizadas, Comunidade, Avaliações, Descontos em mentorias, IA para currículo, IA para entrevistas, IA para portfólio (planos maiores incluem mais; não inclusos aparecem esmaecidos).
- Aviso: "Após o período de teste, a assinatura passa a ser cobrada conforme o plano escolhido. Cancele quando quiser."
- **"Mentorias avulsas"** (fundo claro, Cards padrão com IconBadge): Currículo, Portfólio, Entrevista, Liderança, Carreira (mentoria individual), cada um com descrição curta, "a partir de R$ xx" e botão "Ver pacote". Texto: "Prefere não assinar? Compre sessões e pacotes separadamente."
- FAQ curto (Accordion) sobre teste grátis e cobrança.
- IA flutuante presente.

## TELA 3 — PERFIL DA MENTORANDA / DASHBOARD (/perfil)
Dashboard SaaS em fundo claro #FAF8FF com Cards padrão, inspirado nos dashboards das referências (grid, StatCards, donut, AvatarRow).
- Cabeçalho: "Olá, **Ana**." + subtítulo "Vamos trabalhar no próximo passo da sua carreira." e barra de busca pílula à direita com ícones de mensagem/sino com bolinha coral e avatar.
- **Card de perfil:** avatar ilustrado, "Ana Souza", "Front-end Developer", área "Front-end", "3 anos de experiência", SkillTags (React, TypeScript, CSS, Figma), Objetivo profissional: "Quero me preparar para minha primeira posição de liderança."
- **Seu plano de desenvolvimento:** Card com DonutChart em **65%** (número grande no centro) + legenda das etapas concluídas/pendentes e "Faltam 4 etapas".
- **StatCards** (fila de 3, um `gradient`, outros `default`, com IconBadge circular): Objetivo atual — "Preparação para liderança"; Próxima mentoria — "Conversa com Mariana — Tech Lead" (data/hora mockadas, botão "Entrar na sala"); Mentorias concluídas — 6.
- **Próximas etapas:** checklist interativo (Revisar currículo, Melhorar portfólio, Simular entrevista, Desenvolver comunicação de liderança) que atualiza o percentual do donut de forma coerente.
- **Seu match** (Card `highlight` ou com borda em gradiente, selo "Recomendada pela IA · 96%"): Mariana Costa, Tech Lead | Front-end, 8 anos de experiência, texto "Experiência em liderança de equipes, desenvolvimento front-end e transição para cargos de gestão.", SkillTags, botões "Ver perfil" (→ /mentora) e "Agendar mentoria". Nota com ícone de brilho: "Match realizado pela IA com base nos seus objetivos, área de atuação e experiência."
- **Outras mentoras sugeridas:** Card com PillTabs (Para você, Liderança, Front-end) e AvatarRows (nome, área, "› Ver detalhes", ArrowButton).
- **Avaliações das mentorias anteriores:** lista com 2–3 sessões (mentora, tema, data, estrelas, comentário) e botão "Avaliar mentoria".
- IA flutuante presente.

## TELA 4 — PERFIL DA MENTORA (/mentora)
- Faixa de topo em **seção escura** (gradiente da marca com faixas de luz) com o título "Seu conhecimento pode transformar outras carreiras." e o Card de perfil sobreposto.
- **Perfil:** avatar ilustrado grande, "Mariana Costa", "Tech Lead", "Front-end & Leadership", "8 anos de experiência", botões "Agendar mentoria" e "Enviar mensagem".
- **Indicadores** (StatCards no estilo do dashboard de analytics: um `dark`, um `highlight` lilás, um `gradient`), cada um com IconBadge e seta: Mentorias realizadas **47**; Avaliação **4,9/5** com estrelas; Especialidades: Front-end, Liderança, Carreira. Adicionar um Card `dark` com MiniBarChart "Mentorias por mês" (6 meses, mockado).
- **Sobre mim:** "Atuo há 8 anos na área de tecnologia e atualmente lidero uma equipe de desenvolvimento. Ajudo mulheres que querem avançar profissionalmente e se preparar para posições de liderança."
- **Posso ajudar com** (SkillTags): Liderança, Carreira em tecnologia, Front-end, Entrevistas, Portfólio, Comunicação profissional.
- **Serviços** (3 ServiceCards padrão): Mentoria individual — 60 minutos — "Agendar"; Pacote Liderança — 4 encontros — "Ver pacote"; Revisão de Portfólio — 1 encontro — "Comprar". Com preços de exemplo.
- **Minha experiência:** Timeline vertical simples com cargos anteriores (Tech Lead — atual; Desenvolvedora Front-end Sênior; Pleno; Júnior; empresas fictícias e períodos).
- **Avaliações das mentorandas:** 3 TestimonialCards com nome, área, estrelas e comentário.
- **Remuneração:** Card discreto com ícone: "As mentorias realizadas pela plataforma geram remuneração para a mentora."
- **Programa de Parceiras (futuro):** Card com selo "Em breve": "Mentoras que contribuem continuamente para a comunidade poderão participar de programas especiais de parceria da plataforma." Tratar como possibilidade futura, NÃO como promessa de sociedade imediata nem como função principal do produto.
- IA flutuante presente.

## Qualidade
- Consistência absoluta: mesmo raio de card (28px), mesma escala de sombras, mesmo padding/gap, mesma tipografia e mesmos botões nas 4 telas. Não criar estilos de card ad hoc; sempre usar `<Card variant=...>`.
- Sem imagens externas de stock: usar ilustrações SVG, avatares com ilustração/iniciais e ícones lucide-react.
- Priorizar clareza das informações e experiência do usuário.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/a50449ac-1bba-4196-81ec-3e4288ad3ab7).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
