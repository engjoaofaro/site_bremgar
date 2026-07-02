# João Bremgartner - Portfólio Pessoal

[![Licença: MIT](https://img.shields.io/badge/Licença-MIT-yellow.svg)](LICENSE)
[![Status Deploy](https://img.shields.io/badge/Deploy-Automático-brightgreen)](https://bremgar.dev.br)
[![Feito com HTML/CSS/JS](https://img.shields.io/badge/Feito%20com-HTML%2FCSS%2FJS-blue)](https://developer.mozilla.org/)

Um portfólio pessoal moderno e sem dependências externas que apresenta projetos e experiência. Construído com HTML5, CSS3 e JavaScript puro, com animações bonitas, design responsivo e performance otimizada.

**Acesse em:** [bremgar.dev.br](https://bremgar.dev.br)

## ✨ Destaques

- 🎨 **Tema Dark Moderno** — Interface elegante com paleta de cores personalizada e transições suaves
- ⚡ **Zero Dependências** — Stack vanilla puro, sem ferramentas de build, sem gerenciadores de pacotes
- 🎭 **Animações Ricas** — Partículas flutuantes, símbolos de código interativos, efeitos parallax
- 📱 **Totalmente Responsivo** — Otimizado para mobile, tablet e desktop
- 🚀 **Performance em Primeiro Lugar** — Leve, carregamento rápido, assets otimizados
- 🔍 **SEO Otimizado** — Meta tags apropriadas, HTML semântico, suporte a Open Graph
- ♿ **Acessível** — Labels ARIA, markup semântico, amigável com teclado

## 🏗️ Arquitetura

### Stack de Tecnologias

| Camada | Tecnologia | Detalhes |
|--------|-----------|----------|
| **Marcação** | HTML5 | Estrutura semântica e acessível com meta tags apropriadas |
| **Estilos** | CSS3 | Arquitetura modular: `main.css`, `base.css`, `components.css`, `animations.css`, `responsive.css`, `blog.css` |
| **Interatividade** | JavaScript Puro | Estrutura modular: `particles.js`, `banner.js`, `tree.js`, `animations.js`, `main.js` |
| **Ícones** | Font Awesome 6.4.0 | Via CDN para extensibilidade |
| **Fontes** | JetBrains Mono | Google Fonts — estética monospace focada em código |

### Filosofia Zero-Dependências

- ✅ Sem ferramentas de build (Webpack, Vite, etc.)
- ✅ Sem gerenciadores de pacotes (npm, yarn, etc.)
- ✅ Sem frameworks JavaScript (React, Vue, Angular, etc.)
- ✅ HTML, CSS e JavaScript puro
- ✅ Apenas um CDN externo (Font Awesome) — pode ser substituído por SVGs inline

## 🎨 Sistema de Design

### Identidade Visual
- **Paleta de Cores** — Tema escuro com acentos vibrantes
- **Tipografia** — JetBrains Mono para estética técnica
- **Grade de Layout** — Design responsivo flexível, mobile-first
- **Espaçamento** — Ritmo consistente com propriedades CSS customizadas

### Recursos Interativos
- **Partículas Flutuantes** — Animação dinâmica de fundo
- **Animação de Símbolos** — Caracteres de código animados no hero
- **Efeitos Parallax** — Movimento sutil baseado no mouse
- **Cursor de Terminal** — Efeito de cursor piscante
- **Transições Suaves** — Estados hover e transições de página

## 🚀 Como Começar

### Pré-requisitos
- Um navegador web moderno
- (Opcional) Um servidor local para desenvolvimento

### Desenvolvimento Local

1. **Clone o repositório**
   ```bash
   git clone https://github.com/engjoaofaro/site_bremgar.git
   cd site_bremgar
   ```

2. **Execute um servidor local** (recomendado para evitar problemas de CORS)
   ```bash
   # Python 3
   python -m http.server 8000
   
   # Python 2
   python -m SimpleHTTPServer 8000
   
   # Node.js com npx
   npx serve .
   
   # Usando PHP
   php -S localhost:8000
   ```

3. **Abra no seu navegador**
   ```
   http://localhost:8000
   ```

### Início Rápido (Sem Servidor)
Simplesmente abra `index.html` diretamente no navegador, embora alguns recursos possam ter limitações devido às restrições de segurança do navegador.

### Deploy em Produção
Este site é implantado automaticamente no AWS CloudFront a cada push na branch `main` via GitHub Actions. Veja `.github/workflows/deploy.yml` para a configuração de CI/CD.

## 📋 Funcionalidades

### ✅ Funcionalidades Atuais

- **Seção Hero** — Banner atraente com símbolos de código animados e partículas flutuantes
- **Cartão de Perfil** — Apresentação profissional com foto e cargo atual
- **Showcase de Projetos** — Projetos em destaque com badges de stack técnico e links ao vivo
- **Layout Responsivo** — Design mobile-first que se adapta a todos os tamanhos de tela
- **Elementos Interativos** — Animações suaves, efeitos hover e interações com cursor
- **Links Sociais** — Acesso rápido a email, Twitter, LinkedIn e GitHub
- **Otimizado para SEO** — Meta tags, Open Graph, Twitter Cards para compartilhamento social
- **Performance** — Sem dependências externas além de ícones, JavaScript mínimo

### 🗺️ Roadmap

| Fase | Funcionalidade | Status |
|------|----------------|--------|
| **Sistema de Blog** | Posts em Markdown | `Planejado` |
| | Categorias & tags | `Planejado` |
| | Funcionalidade de busca | `Planejado` |
| | Feed RSS | `Planejado` |
| **Portfólio** | Página dedicada a projetos | `Planejado` |
| | Filtros por tecnologia | `Planejado` |
| | Galeria de screenshots | `Planejado` |
| | Documentação de case studies | `Planejado` |
| **Melhorias** | Toggle tema escuro/claro | `Planejado` |
| | Internacionalização (PT/EN/ES) | `Planejado` |
| | Suporte PWA | `Planejado` |
| | Integração com analytics | `Planejado` |
| | Suporte webring | `Planejado` |

## 🤝 Contribuindo

Embora este seja meu portfólio pessoal, sugestões, melhorias e contribuições são sempre bem-vindas! Seja uma correção de bug, melhoria de design ou ideia de nova funcionalidade, sinta-se à vontade para abrir uma issue ou enviar um PR.

### Fluxo de Desenvolvimento

1. **Faça um fork do repositório**
   ```bash
   gh repo fork engjoaofaro/site_bremgar --clone
   ```

2. **Crie uma branch para sua feature**
   ```bash
   git checkout -b feature/sua-feature-incrivel
   ```

3. **Faça suas alterações**
   - Mantenha CSS modular e organizado
   - Siga o estilo de código existente
   - Teste em mobile e desktop

4. **Commit com mensagens claras**
   ```bash
   git commit -m "feat: adicionar sua feature incrível"
   ```

5. **Push e crie um Pull Request**
   ```bash
   git push origin feature/sua-feature-incrivel
   ```

## 📄 Licença

Este projeto está licenciado sob a **Licença MIT** — veja [LICENSE](LICENSE) para detalhes.

Você é livre para usar, modificar e distribuir este código em seus próprios projetos.

## 💬 Entre em Contato

Adoraria ouvir de você! Sinta-se à vontade para entrar em contato:

| Canal | Link |
|-------|------|
| **Email** | [joaobremgartner@pm.me](mailto:joaobremgartner@pm.me) |
| **Twitter** | [@joaobremgartner](https://twitter.com/joaobremgartner) |
| **LinkedIn** | [João Bremgartner](https://linkedin.com/in/joaobremgartner) |
| **GitHub** | [@engjoaofaro](https://github.com/engjoaofaro) |
| **Website** | [bremgar.dev.br](https://bremgar.dev.br) |

## 🙏 Mostre seu Apoio

- ⭐ **Deixe uma star** neste repositório se achar útil
- 🐛 **Reporte bugs** abrindo uma issue
- 💡 **Sugira features** que gostaria de ver
- 🚀 **Contribua** com pull requests

## 📁 Estrutura do Projeto

```
site_bremgar/
├── index.html                 # Página principal de landing
├── blog/                      # Posts do blog (futuro)
├── image/                     # Imagens e assets
│   └── photo.png             # Foto de perfil
├── styles/                    # Módulos CSS
│   ├── main.css              # Stylesheet principal
│   ├── base.css              # Estilos base & variáveis
│   ├── components.css        # Estilos de componentes
│   ├── animations.css        # Definições de animações
│   ├── responsive.css        # Media queries
│   └── blog.css              # Estilos do blog
├── js/                        # Módulos JavaScript
│   ├── main.js               # Ponto de entrada
│   ├── particles.js          # Efeito de partículas flutuantes
│   ├── banner.js             # Animação do banner hero
│   ├── tree.js               # Estrutura de árvore de projetos
│   └── animations.js         # Animações gerais
├── favicon.*                  # Arquivos de favicon (SVG, PNG)
├── apple-touch-icon.png      # Ícone para iOS
├── .github/                   # Arquivos específicos do GitHub
│   └── workflows/            # Automação de CI/CD
├── .claude/                   # Configurações do Claude Code
├── README.md                  # Este arquivo
└── LICENSE                    # Licença MIT
```

## ⚡ Performance

Este site é otimizado para velocidade e eficiência:

- **Sem Processo de Build** — Servido como está, sem overhead de compilação
- **Dependências Mínimas** — Apenas Font Awesome via CDN
- **Assets Otimizados** — Imagens comprimidas e favicons SVG
- **CSS Eficiente** — Estrutura modular, sem bloat
- **JavaScript Puro** — Sem overhead de framework, ~1.5KB de JS minificado
- **Carregamento Rápido** — Tipicamente carrega em menos de 500ms

## 🌐 Suporte de Navegadores

- ✅ Chrome/Chromium (versão mais recente)
- ✅ Firefox (versão mais recente)
- ✅ Safari (versão mais recente)
- ✅ Edge (versão mais recente)
- ✅ Navegadores mobile (iOS Safari, Chrome Mobile)

## 🔒 Segurança

- Sem scripts externos além da biblioteca de ícones Font Awesome
- Sem rastreamento ou analytics (por enquanto)
- Sem cookies ou armazenamento local
- Amigável com Content Security Policy
- Sem coleta de dados sensíveis

## 📊 Deploy

### Pipeline de CI/CD Automático

Este site usa GitHub Actions para fazer deploy automático no AWS CloudFront:

1. **No Push para Main** → Workflow do GitHub Actions dispara
2. **Build & Validação** → HTML é validado quanto à correção
3. **Deploy para S3** → Arquivos são feitos upload para bucket AWS S3
4. **Invalidação CloudFront** → Cache é invalidado para atualizações instantâneas
5. **Ao Vivo** → Site está ao vivo em [bremgar.dev.br](https://bremgar.dev.br)

Veja `.github/workflows/deploy.yml` para detalhes de implementação.

## 🎓 Aprendizado & Inspiração

Este projeto demonstra:

- **Padrões Web Modernos** — Semântica HTML5, recursos CSS3, JavaScript ES6+
- **Desenvolvimento Zero-Dependência** — Construindo sites robustos sem frameworks
- **CSS Modular** — Arquitetura organizada de stylesheets
- **Design Interativo** — Animações atraentes sem frameworks
- **Design Responsivo** — Abordagem mobile-first
- **Práticas de CI/CD** — Testes e deployment automático
- **Melhores Práticas de SEO** — Meta tags, markup estruturado, otimização de performance

---

<div align="center">

**Sempre aprendendo, sempre compartilhando a jornada.** 🚀

Feito com ❤️ por [João Bremgartner](https://github.com/engjoaofaro)

</div>