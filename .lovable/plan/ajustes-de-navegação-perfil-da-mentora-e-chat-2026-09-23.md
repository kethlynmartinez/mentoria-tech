# Ajustes de navegação, perfil da mentora e chat

## O que será alterado

- Reorganizar o menu principal para mostrar somente **Home, Quem Somos, Questionário, Assinatura e Perfil**, nessa ordem.
- Remover o ícone de três linhas e manter **Encontrar Mentora** fora do menu, sem excluir sua página nem alterar o acesso pelo perfil da estudante.
- No perfil de **Mariana Costa**, ocultar a seção de serviços e adicionar ao final uma área de contato com o botão **Consulte valores**.
- Ajustar o chat para separar claramente três etapas: escolher currículo ou portfólio, anexar o arquivo e enviar para análise.

## Comportamento do chat

- Clicar em **Analisar currículo** ou **Analisar portfólio** apenas solicitará o arquivo correspondente.
- Selecionar um arquivo o manterá visível como anexo pendente, sem iniciar a análise.
- O envio ocorrerá somente pelo botão de enviar.
- Depois do envio, o arquivo aparecerá no histórico e a IA exibirá confirmação, processamento e feedback adequado ao tipo solicitado.
- Mensagens comuns e os demais fluxos do chat continuarão funcionando antes e depois dos anexos.

## Validação

- Conferir o header em telas grandes e pequenas.
- Confirmar o acesso Perfil → Ver perfil → Mariana e as demais rotas de mentoras.
- Testar separadamente currículo e portfólio, verificando que nenhum feedback aparece antes do envio.
- Verificar a página da Mariana, links, erros de execução e adaptação para celular.

## Detalhes técnicos

- Reutilizar os componentes, tokens, cartões, diálogos, botões e espaçamentos existentes.
- Preservar as demais páginas, ações mockadas e o estado compartilhado do chat.
- A seção de serviços continuará disponível nos outros perfis; a remoção será específica para Mariana Costa.