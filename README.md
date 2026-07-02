# João Bremgartner - Personal Portfolio

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Deploy Status](https://img.shields.io/badge/Deploy-Auto-brightgreen)](https://bremgar.dev.br)
[![Made with HTML/CSS/JS](https://img.shields.io/badge/Made%20with-HTML%2FCSS%2FJS-blue)](https://developer.mozilla.org/)

A modern, zero-dependency personal portfolio website showcasing projects and expertise. Built with vanilla HTML5, CSS3, and JavaScript with beautiful animations, responsive design, and optimal performance.

**Live at:** [bremgar.dev.br](https://bremgar.dev.br)

## ✨ Highlights

- 🎨 **Modern Dark Theme** — Elegant UI with custom color palette and smooth transitions
- ⚡ **Zero Dependencies** — Pure vanilla stack, no build tools, no package managers
- 🎭 **Rich Animations** — Floating particles, interactive code symbols, parallax effects
- 📱 **Fully Responsive** — Optimized for mobile, tablet, and desktop screens
- 🚀 **Performance First** — Lightweight, fast-loading, optimized assets
- 🔍 **SEO Optimized** — Proper meta tags, semantic HTML, Open Graph support
- ♿ **Accessible** — ARIA labels, semantic markup, keyboard-friendly

## 🏗️ Architecture

### Tech Stack

| Layer | Technology | Details |
|-------|-----------|---------|
| **Markup** | HTML5 | Semantic, accessible structure with proper meta tags |
| **Styling** | CSS3 | Modular architecture: `main.css`, `base.css`, `components.css`, `animations.css`, `responsive.css`, `blog.css` |
| **Interactivity** | Vanilla JS | Modular structure: `particles.js`, `banner.js`, `tree.js`, `animations.js`, `main.js` |
| **Icons** | Font Awesome 6.4.0 | Via CDN for extensibility |
| **Fonts** | JetBrains Mono | Google Fonts — monospace aesthetic for code-focused design |

### Zero-Dependency Philosophy

- ✅ No build tools (Webpack, Vite, etc.)
- ✅ No package managers (npm, yarn, etc.)
- ✅ No JavaScript frameworks (React, Vue, Angular, etc.)
- ✅ Pure HTML, CSS, and JavaScript
- ✅ Only one external CDN (Font Awesome) — can be replaced with inline SVGs

## 🎨 Design System

### Visual Identity
- **Color Scheme** — Dark theme with vibrant accents
- **Typography** — JetBrains Mono for technical aesthetic
- **Layout Grid** — Flexible, mobile-first responsive design
- **Spacing** — Consistent rhythm with CSS custom properties

### Interactive Features
- **Floating Particles** — Dynamic background animation
- **Code Symbol Animation** — Animated coding characters in hero
- **Parallax Effects** — Subtle mouse-based movement
- **Terminal Cursor** — Blinking cursor effect for aesthetics
- **Smooth Transitions** — Hover states and page transitions

## 🚀 Getting Started

### Prerequisites
- A modern web browser
- (Optional) A local server for development

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/engjoaofaro/site_bremgar.git
   cd site_bremgar
   ```

2. **Run a local server** (recommended to avoid CORS issues)
   ```bash
   # Python 3
   python -m http.server 8000
   
   # Python 2
   python -m SimpleHTTPServer 8000
   
   # Node.js with npx
   npx serve .
   
   # Using PHP
   php -S localhost:8000
   ```

3. **Open in your browser**
   ```
   http://localhost:8000
   ```

### Quick Start (No Server)
Simply open `index.html` directly in your browser, though some features may have limitations due to browser security restrictions.

### Production Deployment
This site is automatically deployed to AWS CloudFront on every push to `main` branch via GitHub Actions. See `.github/workflows/deploy.yml` for CI/CD configuration.

## 📋 Features

### ✅ Current Features

- **Hero Section** — Eye-catching banner with animated code symbols and floating particles
- **Profile Card** — Professional introduction with photo and current role
- **Projects Showcase** — Featured projects with tech stack badges and live links
- **Responsive Layout** — Mobile-first design that scales to all screen sizes
- **Interactive Elements** — Smooth animations, hover effects, and cursor interactions
- **Social Links** — Quick access to email, Twitter, LinkedIn, and GitHub
- **SEO Optimized** — Meta tags, Open Graph, Twitter Cards for social sharing
- **Performance** — No external dependencies beyond icons, minimal JavaScript

### 🗺️ Roadmap

| Phase | Feature | Status |
|-------|---------|--------|
| **Blog System** | Markdown-based posts | `Planned` |
| | Categories & tags | `Planned` |
| | Search functionality | `Planned` |
| | RSS feed | `Planned` |
| **Portfolio** | Dedicated projects page | `Planned` |
| | Technology filters | `Planned` |
| | Project screenshots gallery | `Planned` |
| | Case study documentation | `Planned` |
| **Enhancements** | Dark/Light theme toggle | `Planned` |
| | i18n (PT/EN/ES) | `Planned` |
| | PWA support | `Planned` |
| | Analytics integration | `Planned` |
| | Webring support | `Planned` |

## 🤝 Contributing

While this is my personal portfolio, suggestions, improvements, and contributions are always welcome! Whether it's a bug fix, design improvement, or new feature idea, feel free to open an issue or submit a PR.

### Development Workflow

1. **Fork the repository**
   ```bash
   gh repo fork engjoaofaro/site_bremgar --clone
   ```

2. **Create a feature branch**
   ```bash
   git checkout -b feature/your-amazing-feature
   ```

3. **Make your changes**
   - Keep CSS modular and organized
   - Follow the existing code style
   - Test on mobile and desktop

4. **Commit with clear messages**
   ```bash
   git commit -m "feat: add your amazing feature"
   ```

5. **Push and create a Pull Request**
   ```bash
   git push origin feature/your-amazing-feature
   ```

## 📄 License

This project is licensed under the **MIT License** — see [LICENSE](LICENSE) for details.

You're free to use, modify, and distribute this code in your own projects.

## 💬 Get in Touch

I'd love to hear from you! Feel free to reach out:

| Channel | Link |
|---------|------|
| **Email** | [joaobremgartner@pm.me](mailto:joaobremgartner@pm.me) |
| **Twitter** | [@joaobremgartner](https://twitter.com/joaobremgartner) |
| **LinkedIn** | [João Bremgartner](https://linkedin.com/in/joaobremgartner) |
| **GitHub** | [@engjoaofaro](https://github.com/engjoaofaro) |
| **Website** | [bremgar.dev.br](https://bremgar.dev.br) |

## 🙏 Show Your Support

- ⭐ **Star this repository** if you find it helpful
- 🐛 **Report bugs** by opening an issue
- 💡 **Suggest features** you'd like to see
- 🚀 **Contribute** with pull requests

## 📁 Project Structure

```
site_bremgar/
├── index.html                 # Main landing page
├── blog/                      # Blog posts (future)
├── image/                     # Images and assets
│   └── photo.png             # Profile photo
├── styles/                    # CSS modules
│   ├── main.css              # Main stylesheet
│   ├── base.css              # Base styles & variables
│   ├── components.css        # Component styles
│   ├── animations.css        # Animation definitions
│   ├── responsive.css        # Media queries
│   └── blog.css              # Blog styles
├── js/                        # JavaScript modules
│   ├── main.js               # Entry point
│   ├── particles.js          # Floating particles effect
│   ├── banner.js             # Hero banner animation
│   ├── tree.js               # Project tree structure
│   └── animations.js         # General animations
├── favicon.*                  # Favicon files (SVG, PNG)
├── apple-touch-icon.png      # iOS icon
├── .github/                   # GitHub specific files
│   └── workflows/            # CI/CD automation
├── .claude/                   # Claude Code settings
├── README.md                  # This file
└── LICENSE                    # MIT License
```

## ⚡ Performance

This site is optimized for speed and efficiency:

- **No Build Process** — Served as-is, no compilation overhead
- **Minimal Dependencies** — Only Font Awesome via CDN
- **Optimized Assets** — Compressed images and SVG favicons
- **Efficient CSS** — Modular structure, no bloat
- **Vanilla JavaScript** — No framework overhead, ~1.5KB minified JS
- **Fast Loading** — Typically loads in under 500ms

## 🌐 Browser Support

- ✅ Chrome/Chromium (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 🔒 Security

- No external scripts except Font Awesome icon library
- No tracking or analytics (yet)
- No cookies or local storage
- Content Security Policy friendly
- No sensitive data collection

## 📊 Deployment

### Automatic CI/CD Pipeline

This site uses GitHub Actions to automatically deploy to AWS CloudFront:

1. **On Push to Main** → GitHub Actions workflow triggers
2. **Build & Validate** → HTML is validated for correctness
3. **Deploy to S3** → Files uploaded to AWS S3 bucket
4. **CloudFront Invalidation** → Cache is invalidated for instant updates
5. **Live** → Site is live at [bremgar.dev.br](https://bremgar.dev.br)

See `.github/workflows/deploy.yml` for implementation details.

## 🎓 Learning & Inspiration

This project demonstrates:

- **Modern Web Standards** — HTML5 semantics, CSS3 features, ES6+ JavaScript
- **Zero-Dependency Development** — Building robust sites without frameworks
- **Modular CSS** — Organized stylesheet architecture
- **Interactive Design** — Engaging animations without frameworks
- **Responsive Design** — Mobile-first approach
- **CI/CD Practices** — Automated testing and deployment
- **SEO Best Practices** — Meta tags, structured markup, performance optimization

---

<div align="center">

**Always learning, always sharing the journey.** 🚀

Made with ❤️ by [João Bremgartner](https://github.com/engjoaofaro)

</div>