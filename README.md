# Ascendia

**Eleve seu potencial. Conquiste oportunidades.**

Plataforma web de otimização de currículos com diagnóstico simulado por IA, construída com HTML5, CSS3, Bootstrap 5 e JavaScript puro.

---

## Sumário

- [Visão geral](#visão-geral)
- [Objetivos do projeto](#objetivos-do-projeto)
- [Público-alvo](#público-alvo)
- [Demonstração](#demonstração)
- [Stack tecnológica](#stack-tecnológica)
- [Estrutura do repositório](#estrutura-do-repositório)
- [Funcionalidades implementadas](#funcionalidades-implementadas)
- [Fluxo de navegação](#fluxo-de-navegação)
- [Design e identidade visual](#design-e-identidade-visual)
- [Decisões de layout e responsividade](#decisões-de-layout-e-responsividade)
- [Acessibilidade](#acessibilidade)
- [Arquitetura de CSS](#arquitetura-de-css)
- [Arquitetura de JavaScript](#arquitetura-de-javascript)
- [Planos de serviço](#planos-de-serviço)
- [Boas práticas aplicadas](#boas-práticas-aplicadas)
- [Limitações da versão atual](#limitações-da-versão-atual)
- [Roadmap](#roadmap)
- [Como executar localmente](#como-executar-localmente)
- [Documentação complementar](#documentação-complementar)
- [Referências](#referências)
- [Ficha técnica](#ficha-técnica)

---

## Visão geral

A Ascendia é uma plataforma voltada para profissionais que desejam otimizar seus currículos e aumentar suas chances em processos seletivos. O projeto combina uma landing page institucional com funcionalidades interativas de diagnóstico e análise de currículo, oferecendo diferentes níveis de profundidade de acordo com o plano escolhido pelo usuário.

A proposta nasceu da observação de um problema recorrente no mercado de trabalho: candidatos qualificados são eliminados automaticamente por sistemas ATS (Applicant Tracking System) antes mesmo de um recrutador humano visualizar o currículo. A Ascendia se posiciona como a ponte entre o talento do profissional e a visibilidade que ele merece.

O protótipo de design completo (UI/UX) foi desenvolvido no Canva e pode ser consultado em: [Protótipo Ascendia no Canva](https://canva.link/fhbe6o1m9m03bdm).

## Objetivos do projeto

- Desenvolver uma landing page profissional e responsiva para apresentar o produto ao mercado.
- Implementar uma página de diagnóstico funcional que simula a análise de currículo do usuário.
- Criar uma interface de resultados que exibe métricas e recomendações de acordo com o plano selecionado.
- Garantir acessibilidade, HTML semântico e conformidade com padrões modernos de front-end.
- Demonstrar domínio de HTML, CSS, JavaScript, Bootstrap e organização modular de código.

## Público-alvo

- Profissionais em busca de recolocação ou da primeira oportunidade de emprego.
- Pessoas que desejam aprimorar sua presença profissional e superar os filtros automáticos dos processos seletivos.
- Universitários e recém-formados que precisam construir uma apresentação profissional eficaz.

---

## Demonstração

| Recurso | Link |
|---|---|
| Página publicada (GitHub Pages) | [marareiaa.github.io/ASCENDIA](https://marareiaa.github.io/ASCENDIA/) |
| Repositório do código-fonte | [github.com/marareiaa/ASCENDIA](https://github.com/marareiaa/ASCENDIA) |
| Protótipo de design (Canva) | [canva.link/fhbe6o1m9m03bdm](https://canva.link/fhbe6o1m9m03bdm) |

---

## Stack tecnológica

| Tecnologia | Aplicação no projeto | Versão / Padrão |
|---|---|---|
| HTML5 | Estruturação semântica de todas as páginas, com `<main>`, `<section>`, `<nav>`, `<footer>`, `<article>` | HTML Living Standard |
| CSS3 | Estilização modular com Custom Properties (variáveis CSS), Flexbox, Grid e animações | CSS Level 3 |
| JavaScript (Vanilla) | Manipulação do DOM, eventos, `IntersectionObserver`, `sessionStorage`, `URLSearchParams` | ECMAScript 2022 |
| Bootstrap | Sistema de grid responsivo, componentes (Navbar, Offcanvas, Accordion, Modal), utilitários | v5.3.3 |
| Bootstrap Icons | Biblioteca de ícones vetoriais (SVG) usada em toda a interface | v1.11.3 |
| Google Fonts — Poppins | Tipografia principal do projeto, pesos de 300 a 900 | via CDN |

### Justificativa das escolhas

Bootstrap 5.3.3 foi escolhido por oferecer um grid flexível e componentes prontos (Offcanvas para o menu mobile, Accordion para o FAQ, utilitários de espaçamento e visibilidade), acelerando o desenvolvimento sem sacrificar a personalização visual. Todo o visual padrão do Bootstrap foi sobreposto com CSS customizado para garantir identidade própria.

A opção por JavaScript puro, sem framework, foi intencional: o escopo da aplicação é um site estático de marketing com interatividade progressiva. JavaScript Vanilla demonstra domínio dos fundamentos da linguagem, evita overhead de bundle e garante compatibilidade total com hospedagem estática (GitHub Pages, Netlify, Vercel).

A arquitetura de CSS modular, com Custom Properties, foi dividida em arquivos independentes, cada um responsável por um componente ou seção específica. Os design tokens — cores, tipografia, transições, raio de borda — são definidos como variáveis CSS em `:root`, garantindo consistência visual e facilidade de manutenção.

---

## Estrutura do repositório

```
├── index.html                          # Landing page principal (home)
├── diagnostico.html                    # Upload e diagnóstico do currículo
├── analise.html                        # Página de resultados da análise
├── login.html                          # Tela de autenticação
├── cadastro.html                       # Formulário de criação de conta
├── Ascendia_Documentacao_Tecnica.pdf   # Documento de requisitos e especificação técnica
│
├── assets/
│   ├── css/
│   │   ├── base.css                    # Design tokens, reset e tipografia global
│   │   ├── navbar.css                  # Barra de navegação
│   │   ├── hero.css                    # Seção hero da landing page
│   │   ├── sections.css                # Problema, Como Funciona, Depoimentos, FAQ
│   │   ├── planos.css                  # Cards de planos e preços
│   │   ├── footer.css                  # Rodapé e newsletter
│   │   ├── responsive.css              # Media queries e adaptações responsivas
│   │   ├── enhancements.css            # Animações e melhorias visuais
│   │   ├── diagnostico.css             # Estilos da página de diagnóstico
│   │   ├── analise.css                 # Estilos da página de resultados
│   │   ├── login.css                   # Estilos das telas de login e cadastro
│   │   └── planmodal.css               # Modal de seleção de plano
│   │
│   ├── js/
│   │   ├── script.js                   # Comportamentos globais da landing page
│   │   ├── diagnostico.js              # Upload, drag & drop e modal de plano
│   │   ├── analise.js                  # Renderização dinâmica dos resultados
│   │   ├── cadastro.js                 # Validação e feedback do cadastro
│   │   └── login.js                    # Toggle de visibilidade da senha
│   │
│   └── img/                            # Imagens e logotipos do projeto
│
└── README.md                           # Este documento
```

---

## Funcionalidades implementadas

### Landing page (`index.html`)

| Funcionalidade | Descrição | Implementação |
|---|---|---|
| Barra de progresso de scroll | Indicador visual no topo que avança conforme a rolagem | JavaScript + CSS |
| Navbar responsiva | Menu colapsável em mobile via Offcanvas; destaque dinâmico do link da seção visível | Bootstrap Offcanvas + `IntersectionObserver` |
| Animações de entrada (reveal) | Elementos surgem suavemente ao entrar na viewport, com suporte a `prefers-reduced-motion` | `IntersectionObserver` + CSS transitions |
| Scroll suave para âncoras | Cliques em links internos rolam suavemente até a seção de destino | `scrollIntoView()` + `scroll-behavior` |
| Botão "voltar ao topo" | Aparece após 600px de rolagem; acessível via teclado | JavaScript + CSS `position: fixed` |
| Newsletter (UI) | Formulário de e-mail com feedback visual de confirmação (sem backend) | JS `form submit` + manipulação do DOM |
| Accordion de FAQ | Perguntas frequentes com abertura/fechamento animado | Componente Accordion do Bootstrap |
| Seção de planos | Quatro cards de preço com badge de "plano popular" | HTML + CSS Grid/Flexbox |

### Página de diagnóstico (`diagnostico.html`)

- Upload de currículo via clique ou arraste-e-solte (Drag & Drop API).
- Exibição do nome do arquivo selecionado, com feedback visual na área de upload.
- Modal de seleção de plano gerado dinamicamente via JavaScript, sem dependências externas.
- Redirecionamento para a página de análise com o plano escolhido via query string (`?plano=N`).
- Persistência temporária do nome do arquivo via `sessionStorage`.

### Página de análise (`analise.html`)

- Leitura dos parâmetros da URL para identificar o plano selecionado.
- Renderização condicional de conteúdo diferente para cada um dos 4 planos (Origin, Ascend, Evolve, Dominate).
- Animação do score em anel SVG, com contagem progressiva de 0 até o valor final.
- Barras de habilidade animadas via CSS transitions, acionadas por JavaScript.
- Exibição progressiva de métricas, gráficos por seção, pontos positivos, alertas, palavras-chave e plano de ação, de acordo com o plano contratado.

### Autenticação (`login.html` e `cadastro.html`)

- Toggle de visibilidade de senha, com alternância entre ícones de olho aberto/fechado.
- Validação de confirmação de senha via `setCustomValidity()`, API nativa de validação do HTML.
- Feedback visual de envio de formulário (sem backend — placeholder para integração futura).

---

## Fluxo de navegação

O site possui cinco páginas principais interligadas:

| Página | Rota | Destinos de navegação |
|---|---|---|
| Home / Landing Page | `index.html` | `diagnostico.html`, `login.html`, `cadastro.html` (e âncoras internas: hero, quem-somos, como-funciona, depoimentos, planos, FAQ) |
| Diagnóstico | `diagnostico.html` | `analise.html?plano={1,2,3,4}` |
| Análise | `analise.html` | `diagnostico.html` (novo diagnóstico), seção de planos (CTA de upgrade) |
| Login | `login.html` | `index.html` (voltar), `cadastro.html` |
| Cadastro | `cadastro.html` | `index.html` (voltar), `login.html` |

### Fluxo principal de uso

1. O usuário acessa a landing page e conhece o produto (`index.html`).
2. Clica em "Diagnóstico" ou "Testar a Ascendia" e acessa a página de upload (`diagnostico.html`).
3. Faz upload do currículo (por clique ou drag & drop) e clica em "Realizar Diagnóstico".
4. Um modal é exibido com os 4 planos disponíveis; o usuário escolhe o nível de análise desejado.
5. O sistema redireciona para `analise.html?plano={id}`, onde os resultados são renderizados dinamicamente.
6. O usuário visualiza score, métricas, alertas e recomendações. Planos inferiores exibem um CTA de upgrade.

Como não há backend, a transferência de dados entre páginas é feita por dois mecanismos do navegador: a query string da URL (`?plano=N`), que define qual nível de análise renderizar, e o `sessionStorage`, que guarda o nome do arquivo enviado enquanto a aba estiver aberta.

---

## Design e identidade visual

### Paleta de cores

| Elemento | Valor | Justificativa |
|---|---|---|
| Cor de fundo | `#160F1D` (roxo escuro quase preto) | Transmite sofisticação, modernidade e foco; cria contraste forte com elementos de destaque |
| Cor primária | `#E0303E` (vermelho) + `#FF5A36` (coral) | Paleta energética que remete a ambição, urgência e crescimento — coerente com o posicionamento da marca |
| Gradiente da marca | `linear-gradient(110deg, #E0303E, #FF5A36, #FF9A6B)` | Gradiente quente que cria sensação de movimento e progressão, alinhado ao conceito de "ascensão" |
| Tipografia | Poppins (Google Fonts) | Fonte geométrica sans-serif com personalidade forte; legível em todos os tamanhos; pesos de 300 a 900 garantem hierarquia visual clara |
| Border-radius | `18px` (cards) / `26px` (elementos grandes) | Suaviza a interface sem perder seriedade; tendência moderna no design de produtos SaaS |

Toda a paleta é centralizada como design tokens (variáveis CSS) em `:root`, dentro de `base.css` — alterar a identidade visual do projeto inteiro exige modificar apenas esse arquivo.

### Tradução do protótipo para o grid responsivo

O layout desenhado no Canva, pensado originalmente para desktop, foi recriado com o sistema de grid de 12 colunas do Bootstrap 5 (`container` → `row` → `col-*`), permitindo que as mesmas proporções visuais se reorganizem automaticamente conforme o tamanho da tela, sem necessidade de versões separadas de layout para cada dispositivo.

Um exemplo prático ilustra essa adaptação: os quatro cards de planos aparecem em uma única fileira no protótipo do Canva. No código, eles se comportam assim:

- Desktop (≥ 992px): quatro colunas lado a lado.
- Tablet (≤ 991px): reorganizados em duas colunas.
- Mobile (≤ 767px): empilhados em uma coluna.

Os ícones ilustrativos do protótipo (upload, redes sociais, check, alerta, setas) foram substituídos por Bootstrap Icons — vetores leves, escaláveis sem perda de nitidez e estilizáveis via CSS (cor, tamanho, estado), eliminando a necessidade de exportar e carregar imagens estáticas para cada ícone.

---

## Decisões de layout e responsividade

- O layout utiliza o sistema de grid do Bootstrap 5 com breakpoints padrão (`sm`, `md`, `lg`, `xl`).
- A navbar colapsa em um menu Offcanvas lateral em dispositivos móveis, preservando a experiência de navegação.
- Imagens de fundo e elementos decorativos são ocultados ou redimensionados em telas pequenas via media queries em `responsive.css`.
- Os cards de planos empilham verticalmente em mobile, organizam-se em grade 2×2 em tablet e 4×1 em desktop.
- A seção hero utiliza layout em duas colunas (`col-lg-5` / `col-lg-7`), que empilha verticalmente em mobile.

---

## Acessibilidade

- Todos os elementos interativos possuem foco visível customizado (outline com a cor da marca) para navegação por teclado.
- Elementos puramente decorativos recebem `aria-hidden="true"`, evitando leitura desnecessária por leitores de tela.
- Imagens possuem atributos `alt` descritivos e dimensões explícitas (`width`/`height`) para evitar layout shift.
- O sistema de animações respeita a media query `prefers-reduced-motion`, desativando transições para usuários que assim preferem.
- Labels de formulário associados corretamente via `for`/`id`; labels visualmente ocultos usam a classe `.visually-hidden` do Bootstrap.

---

## Arquitetura de CSS

### Design tokens (`base.css`)

Todas as variáveis de design são definidas em `:root`, garantindo um ponto único de controle para toda a paleta de cores, gradientes, transições e raios de borda — alterar a identidade visual do projeto exige modificar apenas um arquivo.

### Princípios aplicados

- Separação de responsabilidades: cada arquivo CSS é responsável por um único componente ou seção.
- Cascata controlada: os arquivos são importados em ordem específica no HTML, evitando conflitos de especificidade.
- Mobile-first parcial: as regras base cobrem mobile; `responsive.css` adiciona regras para telas maiores via `min-width`.
- Utilitários compartilhados: classes como `.reveal` e `.title-banner` são definidas em `base.css` e reutilizadas em todas as páginas.

---

## Arquitetura de JavaScript

### Padrões aplicados

- Todos os scripts utilizam `'use strict'` para evitar comportamentos implícitos do JavaScript.
- IIFE (Immediately Invoked Function Expression): cada módulo é encapsulado em `(() => { ... })()` para evitar poluição do escopo global.
- Throttle via `requestAnimationFrame`: o handler de scroll usa rAF para limitar re-renderizações a no máximo 60fps.
- Cache de medidas de layout: as posições das seções são medidas apenas em `load`/`resize`, nunca a cada frame de scroll, evitando layout thrashing.
- Lookup O(1) com `Map`: o mapeamento de links ativos da navbar usa `Map` em vez de varrer um array a cada evento.

### APIs Web utilizadas

| API / Interface | Uso no projeto | Arquivo |
|---|---|---|
| `IntersectionObserver` | Detecta elementos `.reveal` entrando na viewport; destaque de seção ativa na navbar | `script.js` |
| `requestAnimationFrame` | Throttle do handler de scroll e resize para performance | `script.js` |
| `DataTransfer` (Drag & Drop) | Recebe o arquivo arrastado para a área de upload de currículo | `diagnostico.js` |
| `sessionStorage` | Persiste o nome do arquivo e o plano selecionado entre páginas | `diagnostico.js` / `analise.js` |
| `URLSearchParams` | Lê o parâmetro `?plano=N` da URL para renderizar a análise correta | `analise.js` |
| SVG `strokeDashoffset` | Anima o anel de score via manipulação direta de atributos SVG | `analise.js` |
| `setCustomValidity` | Validação customizada de confirmação de senha, com mensagem nativa do navegador | `cadastro.js` |

---

## Planos de serviço

A Ascendia oferece quatro planos com profundidade crescente de análise:

| Plano | Preço/mês | Recursos | Profundidade da análise |
|---|---|---|---|
| ORIGIN | R$ 19,90 | Currículo estruturado, análise automática, correção de erros, sugestão de melhoria, score inicial | Pontos positivos + alertas básicos |
| ASCEND (mais popular) | R$ 39,90 | Tudo do Origin + otimização ATS, reorganização estratégica, destaque de habilidades, recomendações de cursos, compatibilidade com vagas | Pontos positivos + alertas + ações prioritárias |
| EVOLVE | R$ 69,90 | Tudo do Ascend + simulação de entrevistas, análise de perfil, otimização para vagas específicas, sugestões de comunicação | Métricas ATS + análise por seção + recomendações práticas |
| DOMINATE | R$ 119,90 | Tudo do Evolve + estratégia profissional, planejamento de carreira, currículos para múltiplas vagas, análise de LinkedIn, acompanhamento contínuo | Análise completa: métricas, benchmark, palavras-chave, plano de ação personalizado |

O plano Ascend é destacado na interface como "Mais Popular", servindo como âncora de decisão na seção de preços.

---

## Boas práticas aplicadas

### HTML semântico

- Uso correto de elementos semânticos: `<main>`, `<section>`, `<nav>`, `<header>`, `<footer>`, `<article>`, `<aside>`.
- Hierarquia de headings respeitada (`h1 > h2 > h3`) em todas as páginas.
- Metadados Open Graph e Twitter Card implementados para compartilhamento em redes sociais.
- `meta description`, `theme-color` e favicon configurados.
- Atributo `fetchpriority="high"` na imagem principal do hero, otimizando o LCP (Largest Contentful Paint).
- `loading="lazy"` em imagens abaixo da primeira tela, para carregamento diferido.

### Qualidade de código

- JavaScript em modo estrito (`'use strict'`) em todos os módulos.
- Sem variáveis globais — todo o código é encapsulado em IIFEs.
- Comentários de bloco no início de cada arquivo JS, descrevendo responsabilidades.
- Nomenclatura em `camelCase` para JavaScript e `kebab-case` para classes CSS, seguindo convenções da indústria.
- Separação clara entre lógica (JS), apresentação (CSS) e estrutura (HTML) — sem JavaScript ou estilos inline desnecessários.

### Performance

- Scroll throttled via `requestAnimationFrame`, evitando jank visual.
- Medidas de layout em cache (`bounds[]`), recalculadas apenas em `load` e `resize`, nunca a cada scroll.
- Fontes carregadas com `preconnect` para antecipação de conexão DNS.
- JavaScript carregado ao final do `<body>`, para não bloquear a renderização.

---

## Limitações da versão atual

- Sem backend: todas as operações de cadastro, login, análise e newsletter são simuladas no front-end, sem persistência real de dados.
- Análise de currículo simulada: os dados retornados pela função `fetchAnalysis()` são estáticos e não processam o arquivo de fato.
- Integração com API de IA: a arquitetura de `analise.js` foi preparada para integrar com uma API de IA, mas a chamada real está substituída por dados mock.
- Hospedagem estática: por ser um site estático, não há funcionalidades que exijam servidor (banco de dados, autenticação real, processamento de arquivos).

## Roadmap

- Integração com API de IA para análise real do currículo via PDF parsing.
- Implementação de backend (Node.js / Python) para autenticação, armazenamento de usuários e histórico de análises.
- Dashboard do usuário com histórico de análises e evolução do score ao longo do tempo.
- Exportação do currículo otimizado em PDF diretamente pela plataforma.
- Integração com LinkedIn via API para análise e sincronização de perfil.

---

© 2026 Ascendia. Todos os direitos reservados.
