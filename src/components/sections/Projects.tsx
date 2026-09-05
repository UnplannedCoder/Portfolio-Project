import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  Github,
  ExternalLink,
  Star,
  BarChart2,
  Code2,
  ArrowUpRight,
} from "lucide-react";
import { projects } from "@/data/portfolio";
import { cn } from "@/lib/utils";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const tagColors = [
  "bg-violet-500/10 text-violet-300 border-violet-500/20",
  "bg-cyan-500/10 text-cyan-300 border-cyan-500/20",
  "bg-pink-500/10 text-pink-300 border-pink-500/20",
  "bg-amber-500/10 text-amber-300 border-amber-500/20",
  "bg-green-500/10 text-green-300 border-green-500/20",
  "bg-blue-500/10 text-blue-300 border-blue-500/20",
];

function ProjectCard({ project }: { project: (typeof projects)[0] }) {
  // Prefer live link, fall back to github
  const primaryLink = project.live || project.github || "#";
  const isExternal = primaryLink !== "#";

  return (
    <motion.div
      layout
      variants={itemVariants}
      className={cn(
        "group relative flex flex-col rounded-2xl bg-zinc-900 border border-zinc-800 overflow-hidden",
        "transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-black/50",
        project.type === "Data Analytics"
          ? "hover:border-cyan-500/50"
          : "hover:border-violet-500/50",
        project.featured && "ring-1 ring-violet-500/20",
      )}
    >
      {/* Featured badge */}
      {project.featured && (
        <div className="absolute top-3 right-3 z-20 flex items-center gap-1 px-2 py-1 rounded-full bg-zinc-950/80 backdrop-blur-sm border border-violet-500/30 text-violet-300 text-xs font-medium">
          <Star className="w-3 h-3 fill-violet-400 text-violet-400" />
          Featured
        </div>
      )}

      {/* ── Clickable image ── */}
      <a
        href={primaryLink}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noopener noreferrer" : undefined}
        className="block relative overflow-hidden bg-zinc-800"
        aria-label={`Open ${project.title}`}
        tabIndex={0}
      >
        {project.image ? (
          <div className="w-full h-48 overflow-hidden bg-zinc-800">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
              onError={(e) => {
                // If image fails, show fallback
                const target = e.currentTarget;
                target.style.display = "none";
                const parent = target.parentElement;
                if (parent) parent.classList.add("fallback-shown");
              }}
            />
          </div>
        ) : (
          <div
            className={cn(
              "w-full h-48 flex flex-col items-center justify-center gap-2",
              project.type === "Data Analytics"
                ? "bg-gradient-to-br from-cyan-900/40 via-zinc-900 to-blue-900/30"
                : "bg-gradient-to-br from-violet-900/40 via-zinc-900 to-purple-900/30",
            )}
          >
            {project.type === "Data Analytics" ? (
              <BarChart2 className="w-8 h-8 text-cyan-500/40" />
            ) : (
              <Code2 className="w-8 h-8 text-violet-500/40" />
            )}
            <span className="text-zinc-600 text-xs">{project.type}</span>
          </div>
        )}

        {/* Dark overlay + arrow on hover */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
          <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm font-medium">
              <ArrowUpRight className="w-4 h-4" />
              {project.live ? "View Live" : "View Code"}
            </div>
          </div>
        </div>
      </a>

      {/* ── Card body ── */}
      <div className="flex flex-col flex-1 p-5">
        {/* Title + type badge */}
        <div className="flex items-start gap-2 mb-2">
          <h3 className="text-sm font-bold leading-snug flex-1">
            <a
              href={primaryLink}
              target={isExternal ? "_blank" : undefined}
              rel={isExternal ? "noopener noreferrer" : undefined}
              className="text-white hover:text-violet-400 transition-colors duration-200 hover:underline underline-offset-2"
              onClick={(e) => e.stopPropagation()}
            >
              {project.title}
            </a>
          </h3>
          <span
            className={cn(
              "shrink-0 mt-0.5 px-2 py-0.5 rounded-full text-xs border whitespace-nowrap",
              project.type === "Data Analytics"
                ? "bg-cyan-500/10 text-cyan-300 border-cyan-500/20"
                : "bg-violet-500/10 text-violet-300 border-violet-500/20",
            )}
          >
            {project.type === "Data Analytics" ? "Analytics" : "Full Stack"}
          </span>
        </div>

        <p className="text-zinc-500 text-xs leading-relaxed mb-4 flex-1">
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.tags.map((tag, i) => (
            <span
              key={tag}
              className={cn(
                "px-2 py-0.5 rounded-md text-xs font-medium border",
                tagColors[i % tagColors.length],
              )}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Link buttons */}
        <div className="flex items-center gap-3 pt-3 border-t border-zinc-800">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-zinc-400 hover:text-white text-xs font-medium transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              <Github className="w-3.5 h-3.5" />
              Source Code
            </a>
          )}
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-zinc-400 hover:text-violet-400 text-xs font-medium transition-colors ml-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <ExternalLink className="w-3.5 h-3.5" />
              Live Demo
            </a>
          )}
          {!project.github && !project.live && (
            <span className="text-zinc-700 text-xs">No link available</span>
          )}
        </div>
      </div>
    </motion.div>
  );
}

type FilterType = "All" | "Full Stack" | "Data Analytics";

export default function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [filter, setFilter] = useState<FilterType>("All");

  const filtered =
    filter === "All" ? projects : projects.filter((p) => p.type === filter);
  const tabs: FilterType[] = ["All", "Full Stack", "Data Analytics"];

  return (
    <section id="projects" className="relative py-24 bg-zinc-950">
      <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="text-center mb-10">
            <span className="text-violet-400 font-semibold text-sm uppercase tracking-widest mb-3 block">
              What I've Built
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              My <span className="gradient-text">Projects</span>
            </h2>
            <p className="text-zinc-500 max-w-2xl mx-auto text-sm">
              Full-stack web applications and data analytics dashboards built
              during my internship and personal learning journey.
            </p>
            <div className="w-20 h-1 bg-gradient-to-r from-violet-600 to-cyan-500 rounded-full mx-auto mt-4" />
          </motion.div>

          {/* Filter tabs */}
          <motion.div
            variants={itemVariants}
            className="flex justify-center gap-2 mb-10 flex-wrap"
          >
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                className={cn(
                  "px-5 py-2 rounded-xl text-sm font-medium transition-all duration-200 border",
                  filter === tab
                    ? "bg-violet-600 border-violet-500 text-white shadow-lg shadow-violet-500/20"
                    : "bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-600",
                )}
              >
                {tab === "All"
                  ? `All (${projects.length})`
                  : `${tab} (${projects.filter((p) => p.type === tab).length})`}
              </button>
            ))}
          </motion.div>

          {/* Grid */}
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
