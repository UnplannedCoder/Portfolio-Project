import { motion } from "framer-motion";
import { Code2, Github, Linkedin, ArrowUp } from "lucide-react";
import { personalInfo } from "@/data/portfolio";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-zinc-950 border-t border-zinc-900">
      <div className="h-px bg-gradient-to-r from-transparent via-violet-500/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-5">
          {/* Brand */}
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-violet-600 to-cyan-500 flex items-center justify-center">
              <Code2 className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="font-bold gradient-text">Pawan Sain</span>
          </div>

          {/* Copyright */}
          <p className="text-zinc-500 text-sm flex items-center gap-1.5">
            Designed & Built by Pawan Sain
          </p>

          {/* Socials + scroll top */}
          <div className="flex items-center gap-3">
            {[
              { icon: Github, href: personalInfo.github, label: "GitHub" },
              {
                icon: Linkedin,
                href: personalInfo.linkedin,
                label: "LinkedIn",
              },
            ].map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg flex items-center justify-center text-zinc-500 hover:text-white hover:bg-white/5 transition-colors"
                aria-label={label}
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}

            <motion.button
              onClick={scrollToTop}
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.9 }}
              className="ml-1 w-8 h-8 rounded-lg flex items-center justify-center bg-violet-600/20 hover:bg-violet-600 text-violet-400 hover:text-white transition-all border border-violet-500/20"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-4 h-4" />
            </motion.button>
          </div>
        </div>
      </div>
    </footer>
  );
}
