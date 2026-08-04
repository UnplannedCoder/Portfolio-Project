# Pawan Sain — Personal Portfolio

A modern, animated personal portfolio built with React, TypeScript, and Tailwind CSS. Features smooth Framer Motion animations, Magic UI effects, Aceternity UI visual components, a 3D physics Lanyard card, and a fully responsive dark theme.

**Live:** _deploy link here_  &nbsp;|&nbsp; **Author:** [Pawan Sain](https://www.linkedin.com/in/pawan-sain-18b74631b)

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
| Effects | Aceternity UI — BackgroundBeams, MovingBorder |
| 3D Card | @react-three/fiber, @react-three/drei, @react-three/rapier, meshline |
| Icons | Lucide React |

---

## Features

- **Hero** — rotating role titles, SparklesText name, meteor shower background, Show/Hide 3D Lanyard card toggle
- **3D Lanyard Card** — physics-based draggable card with your photo, powered by Rapier + React Three Fiber, lazy loaded
- **About** — profile photo, bio, education, internship experience, animated stat counters, contact details
- **Skills** — animated progress bars per category, infinite marquee tech badge strip
- **Projects** — filter by All / Full Stack / Data Analytics, clickable images + titles, live demo and source code links
- **Certificates** — full certificate images (8 certs), issuer-colored accents from Google, Microsoft, Meta, Deloitte, HackerRank, GeeksforGeeks
- **Contact** — contact form, social links, availability status badge
- **Navbar** — scroll-spy active state, smooth scroll, mobile hamburger menu
- **Dark theme** throughout with glass morphism, dot/grid backgrounds, and glow effects

---

## Project Structure

```
Portfolio/
├── public/
│   ├── photo.jpg                  # Your profile photo (used in About + Lanyard card)
│   ├── certificates/              # Certificate images (.png)
│   └── projects/                  # Project screenshot images (.png)
├── src/
│   ├── assets/
│   │   └── lanyard/
│   │       ├── card.glb           # 3D card model
│   │       └── lanyard.png        # Lanyard band texture
│   ├── components/
│   │   ├── aceternity/            # BackgroundBeams, MovingBorder
│   │   ├── lanyard/               # Lanyard.tsx, Lanyard.css, LanyardErrorBoundary.tsx
│   │   ├── magicui/               # Marquee, BorderBeam, Meteors, SparklesText, NumberTicker
│   │   └── sections/              # Navbar, Hero, About, Skills, Projects, Certificates, Contact, Footer
│   ├── data/
│   │   └── portfolio.ts           # All content — personal info, skills, projects, certificates
│   ├── lib/
│   │   └── utils.ts               # cn() utility
│   ├── global.d.ts                # Module declarations for .glb, meshline
│   ├── vite-env.d.ts              # Vite client types + .glb/.png declarations
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css                  # Tailwind directives + custom utilities
├── tailwind.config.ts
├── vite.config.ts                 # includes assetsInclude: ['**/*.glb']
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

# Install dependencies (--legacy-peer-deps required for React 18 + R3F compatibility)
npm install --legacy-peer-deps

# Start dev server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
```

Output goes to `dist/`. Preview locally with:

```bash
npm run preview
```

---

## Updating Content

All personal content lives in one file — **`src/data/portfolio.ts`**.

| Export | What it controls |
|--------|-----------------|
| `personalInfo` | Name, title, bio, contact, social links, resume link, stats |
| `education` | Degree, university, duration |
| `experience` | Internship/job roles and responsibilities |
| `skills` | Skill categories, names, proficiency levels |
| `techStack` | Marquee badges in the Skills section |
| `projects` | Project cards — title, description, tags, image, links, type |
| `certificates` | Certificate cards — title, issuer, date, image, tags |

### Profile Photo

Save your photo as `public/photo.jpg`. It is used in:
- The **About** section avatar box
- The **Lanyard 3D card** front face (via `frontImage="/photo.jpg"` prop in Hero)

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

### Lanyard Card

The 3D card is toggled by the **Show Card / Hide Card** button in the Hero section. To change the photo on the card, update `frontImage` in `Hero.tsx`:

```tsx
<Lanyard
  position={[0, 0, 17]}
  gravity={[0, -40, 0]}
  fov={16}
  transparent={true}
  frontImage="/photo.jpg"
  imageFit="cover"
/>
```

---

## Deployment

The `dist/` output is a static site — deploy to any static host:

| Platform | Steps |
|----------|-------|
| **Vercel** | Connect GitHub repo or run `vercel --prod` |
| **Netlify** | Drag `dist/` folder to Netlify dashboard |
| **GitHub Pages** | Use `gh-pages` package to push `dist/` to `gh-pages` branch |

> Note: `npm install --legacy-peer-deps` is required due to `@react-three/fiber@8` requiring React 18.

---

## Contact

**Pawan Sain**

- Email: [pawansa2006@gmail.com](mailto:pawansa2006@gmail.com)
- LinkedIn: [pawan-sain-18b74631b](https://www.linkedin.com/in/pawan-sain-18b74631b)
- GitHub: [UnplannedCoder](https://github.com/UnplannedCoder)
- Location: Greater Jaipur Area, India
