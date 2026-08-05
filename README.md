# Pawan Sain — Personal Portfolio

A modern, animated personal portfolio built with React, TypeScript, and Tailwind CSS. Features smooth Framer Motion animations, Magic UI effects, Aceternity UI visual components, a 3D physics Lanyard card, a draggable 3D skill carousel, and a fully responsive dark theme.

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
| Effects | Magic UI — BorderBeam, Meteors, SparklesText, NumberTicker |
| Effects | Aceternity UI — BackgroundBeams |
| 3D Card | @react-three/fiber, @react-three/drei, @react-three/rapier, meshline |
| Drag Gestures | @use-gesture/react |
| Icons | Lucide React |

---

## Features

- **Hero** — rotating role titles, SparklesText name, meteor shower background, Show/Hide 3D Lanyard card toggle. View My Work scrolls to Projects.
- **3D Lanyard Card** — physics-based draggable card with profile photo, preloaded in background for instant display
- **About** — profile photo, bio, education, internship experience, animated stat counters, contact details
- **Skills** — draggable 3D rotating carousel of tech icons + animated progress bars per category
- **Projects** — filter by All / Full Stack / Data Analytics, clickable images + titles, live demo and source code links
- **Certificates** — full certificate images (8 certs), issuer-colored accents from Google, Microsoft, Meta, Deloitte, HackerRank, GeeksforGeeks
- **Contact** — contact form, social links, availability status badge
- **Navbar** — scroll-spy active state, smooth scroll, mobile hamburger menu, Resume download button
- **Dark theme** throughout with glass morphism, dot/grid backgrounds, and glow effects

---

## Project Structure

```
Portfolio/
├── public/
│   ├── favicon.png                # Browser tab icon
│   ├── photo/
│   │   └── photo.jpg              # Profile photo (About section + Lanyard card)
│   ├── resume/
│   │   └── Resume.pdf             # Downloadable resume
│   ├── certificates/              # Certificate images (.png)
│   ├── projects/                  # Project screenshot images (.png)
│   └── skills/                    # Tech stack icon images (.png)
├── src/
│   ├── assets/
│   │   └── lanyard/
│   │       ├── card.glb           # 3D card model
│   │       └── lanyard.png        # Lanyard band texture
│   ├── components/
│   │   ├── aceternity/            # BackgroundBeams, MovingBorder
│   │   ├── domegallery/           # DomeGallery.tsx, DomeGallery.css (skill carousel)
│   │   ├── lanyard/               # Lanyard.tsx, Lanyard.css, LanyardErrorBoundary.tsx
│   │   ├── magicui/               # BorderBeam, Meteors, SparklesText, NumberTicker
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
├── index.html                     # Includes preload hints for photo
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
| `techStack` | Tech stack labels (legacy, kept for reference) |
| `projects` | Project cards — title, description, tags, image, links, type |
| `certificates` | Certificate cards — title, issuer, date, image, tags |

### Profile Photo

Save your photo to `public/photo/photo.jpg`. Used in:
- The **About** section avatar box
- The **Lanyard 3D card** front face

### Resume

Save your resume to `public/resume/Resume.pdf`. The `personalInfo.resume` field in `portfolio.ts` points to `/resume/Resume.pdf` and feeds all Resume buttons. The `download="Pawan_Sain_Resume.pdf"` attribute forces a download instead of opening in the browser.

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

### Skill Icons

Tech stack icons live in `public/skills/` as `.png` files. The carousel in `Skills.tsx` references them directly. To add or replace an icon, drop a `.png` into `public/skills/` and update the `SKILL_TILES` array in `src/components/sections/Skills.tsx`.

### Lanyard Card

The 3D card is toggled by the **Show Card / Hide Card** button in the Hero section. The GLB model is preloaded in the background on page load so there is no delay when the button is clicked. To update the photo on the card, change `frontImage` in `Hero.tsx`:

```tsx
<Lanyard
  position={[0, 0, 17]}
  gravity={[0, -40, 0]}
  fov={16}
  transparent={true}
  frontImage="/photo/photo.jpg"
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
