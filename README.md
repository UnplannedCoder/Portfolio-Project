# Pawan Sain — Personal Portfolio

A modern, animated personal portfolio built with React, TypeScript, and Tailwind CSS. Features smooth Framer Motion animations, Magic UI effects, Aceternity UI visual components, and a fully responsive dark theme.

**Live:** _deploy link here_  &nbsp;|&nbsp; **Author:** [Pawan Sain](https://www.linkedin.com/in/pawan-sain-18b74631b)

---

## Screenshots

| Hero | Projects | Certificates |
|------|----------|--------------|
| Animated hero with SparklesText and meteor effects | Filterable project grid with clickable images | Certificate gallery with issuer-colored cards |

---

## Tech Stack

| Category | Technologies |
|----------|-------------|
| Framework | React 18 + TypeScript |
| Build Tool | Vite 5 |
| Styling | Tailwind CSS v3 |
| Animations | Framer Motion 11 |
| UI Components | shadcn/ui (Radix UI primitives) |
| Effects | Magic UI — Marquee, BorderBeam, Meteors, SparklesText, NumberTicker |
| Effects | Aceternity UI — BackgroundBeams, Spotlight, MovingBorder |
| Icons | Lucide React |
| Linting | ESLint + TypeScript ESLint |

---

## Features

- **Animated Hero** — rotating role titles, SparklesText name, meteor shower background, floating avatar with BorderBeam
- **About** — bio, education, internship experience, animated stat counters, contact details
- **Skills** — animated progress bars per category, infinite marquee tech badge strip
- **Projects** — filter by All / Full Stack / Data Analytics, clickable image + title, live demo and source code links
- **Certificates** — full certificate image cards, issuer-colored accents, 8 professional certifications
- **Contact** — working contact form, social links, availability status badge
- **Navbar** — scroll-spy active state, smooth scroll, mobile hamburger menu
- **Dark theme** throughout with glass morphism, dot/grid backgrounds, and glow effects

---

## Project Structure

```
Portfolio/
├── public/
│   ├── certificates/       # Certificate images (.png)
│   └── projects/           # Project screenshot images (.png)
├── src/
│   ├── components/
│   │   ├── aceternity/     # BackgroundBeams, Spotlight, MovingBorder, 3D Card
│   │   ├── magicui/        # Marquee, BorderBeam, Meteors, SparklesText, NumberTicker
│   │   └── sections/       # Navbar, Hero, About, Skills, Projects, Certificates, Contact, Footer
│   ├── data/
│   │   └── portfolio.ts    # All content — personal info, skills, projects, certificates
│   ├── lib/
│   │   └── utils.ts        # cn() utility
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css           # Tailwind directives + custom utilities
├── tailwind.config.ts
├── vite.config.ts
└── tsconfig.app.json
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm 9+

### Install & Run

```bash
# Clone the repo
git clone https://github.com/UnplannedCoder/portfolio.git
cd portfolio

# Install dependencies
npm install

# Start dev server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
```

Output goes to `dist/`. Preview it locally with:

```bash
npm run preview
```

---

## Updating Content

All personal content lives in one file — **`src/data/portfolio.ts`**.

| Export | What it controls |
|--------|-----------------|
| `personalInfo` | Name, title, bio, contact, social links, stats |
| `education` | Degree, university, duration |
| `experience` | Internship/job roles and responsibilities |
| `skills` | Skill categories, names, proficiency levels |
| `techStack` | Marquee badges in the Skills section |
| `projects` | Project cards — title, description, tags, image, links |
| `certificates` | Certificate cards — title, issuer, date, image, tags |

### Adding Project Images

Save screenshots to `public/projects/<filename>.png` and set the `image` field in `portfolio.ts`:

```ts
image: '/projects/your-project.png',
```

### Adding Certificate Images

Save to `public/certificates/<filename>.png` and set the `image` field:

```ts
image: '/certificates/your-cert.png',
```

---

## Deployment

The `dist/` output is a static site — deploy to any static host:

| Platform | Command |
|----------|---------|
| **Vercel** | `vercel --prod` or connect GitHub repo |
| **Netlify** | Drag `dist/` folder to Netlify dashboard |
| **GitHub Pages** | Use `gh-pages` package to push `dist/` |

---

## Contact

**Pawan Sain**

- Email: [pawansa2006@gmail.com](mailto:pawansa2006@gmail.com)
- LinkedIn: [pawan-sain-18b74631b](https://www.linkedin.com/in/pawan-sain-18b74631b)
- GitHub: [UnplannedCoder](https://github.com/UnplannedCoder)
- Location: Greater Jaipur Area, India
