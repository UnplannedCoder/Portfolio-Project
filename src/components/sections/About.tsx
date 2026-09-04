import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  MapPin,
  Mail,
  Phone,
  Github,
  Linkedin,
  ExternalLink,
  GraduationCap,
  Briefcase,
} from "lucide-react";
import { personalInfo, education, experience } from "@/data/portfolio";
import NumberTicker from "@/components/magicui/number-ticker";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="relative py-24 bg-zinc-950">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-violet-600/5 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <span className="text-violet-400 font-semibold text-sm uppercase tracking-widest mb-3 block">
              Get To Know Me
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              About <span className="gradient-text">Me</span>
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-violet-600 to-cyan-500 rounded-full mx-auto" />
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col items-center gap-7"
            >
              {/* Avatar */}
              <div
                className="relative w-52 h-52 md:w-64 md:h-64 rounded-2xl shadow-2xl shadow-violet-500/20 ring-2 ring-violet-500/30"
                style={{
                  backgroundImage: "url(/photo/photo.jpg)",
                  backgroundSize: "cover",
                  backgroundPosition: "center top",
                }}
              >
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Contact details */}
              <div className="w-full space-y-2.5">
                {[
                  {
                    icon: Mail,
                    text: personalInfo.email,
                    href: `mailto:${personalInfo.email}`,
                  },
                  {
                    icon: Phone,
                    text: personalInfo.phone,
                    href: `tel:${personalInfo.phone}`,
                  },
                  { icon: MapPin, text: personalInfo.location, href: "#" },
                  {
                    icon: Github,
                    text: "UnplannedCoder (GitHub)",
                    href: personalInfo.github,
                  },
                  {
                    icon: Linkedin,
                    text: "pawan-sain-18b74631b",
                    href: personalInfo.linkedin,
                  },
                ].map(({ icon: Icon, text, href }) => (
                  <a
                    key={text}
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel={
                      href.startsWith("http")
                        ? "noopener noreferrer"
                        : undefined
                    }
                    className="flex items-center gap-3 px-4 py-3 rounded-xl glass hover:border-violet-500/30 text-zinc-400 hover:text-zinc-200 transition-all duration-200 group"
                  >
                    <Icon className="w-4 h-4 text-violet-400 shrink-0" />
                    <span className="text-sm">{text}</span>
                    {href.startsWith("http") && (
                      <ExternalLink className="w-3 h-3 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                    )}
                  </a>
                ))}
              </div>
            </motion.div>

            {/* Right */}
            <motion.div variants={itemVariants} className="space-y-8">
              {/* Bio */}
              <div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  Who am I?
                </h3>
                {personalInfo.about.split("\n\n").map((para, i) => (
                  <p
                    key={i}
                    className="text-zinc-400 leading-relaxed text-sm mb-3"
                  >
                    {para}
                  </p>
                ))}
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-3">
                {personalInfo.stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="relative p-4 rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-violet-500/30 transition-colors overflow-hidden group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-violet-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                    <div className="text-2xl font-bold text-white mb-0.5 flex items-end gap-0.5">
                      <NumberTicker
                        value={stat.value}
                        className="text-2xl font-bold"
                      />
                      <span className="gradient-text">+</span>
                    </div>
                    <p className="text-zinc-500 text-xs">{stat.label}</p>
                  </div>
                ))}
              </div>

              {/* Education */}
              <div>
                <h4 className="text-sm font-semibold text-zinc-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-violet-400" />{" "}
                  Education
                </h4>
                {education.map((edu) => (
                  <div
                    key={edu.school}
                    className="p-4 rounded-xl bg-zinc-900 border border-zinc-800"
                  >
                    <p className="text-white font-semibold text-sm">
                      {edu.school}
                    </p>
                    <p className="text-violet-300 text-sm">
                      {edu.degree} · {edu.major}
                    </p>
                    <p className="text-zinc-500 text-xs mt-1">
                      {edu.duration} · {edu.location}
                    </p>
                  </div>
                ))}
              </div>

              {/* Experience */}
              <div>
                <h4 className="text-sm font-semibold text-zinc-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-violet-400" /> Experience
                </h4>
                {experience.map((exp) => (
                  <div
                    key={exp.company}
                    className="p-4 rounded-xl bg-zinc-900 border border-zinc-800"
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div>
                        <p className="text-white font-semibold text-sm">
                          {exp.role}
                        </p>
                        <p className="text-violet-300 text-sm">
                          {exp.company} · {exp.type}
                        </p>
                      </div>
                      <span className="text-zinc-500 text-xs whitespace-nowrap">
                        {exp.duration}
                      </span>
                    </div>
                    <ul className="space-y-1 mb-3">
                      {exp.responsibilities.map((r, i) => (
                        <li
                          key={i}
                          className="text-zinc-500 text-xs flex gap-2"
                        >
                          <span className="text-violet-400 mt-0.5 shrink-0">
                            ▸
                          </span>
                          {r}
                        </li>
                      ))}
                    </ul>
                    <div className="flex flex-wrap gap-1.5">
                      {exp.tags.map((t) => (
                        <span
                          key={t}
                          className="px-2 py-0.5 rounded-full text-xs bg-violet-500/10 text-violet-300 border border-violet-500/20"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div className="flex flex-wrap gap-3">
                <a
                  href={personalInfo.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  download="Pawan_Sain_Resume.pdf"
                  className="px-6 py-3 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-semibold text-sm transition-all hover:shadow-lg hover:shadow-violet-500/25 hover:scale-105 active:scale-95"
                >
                  Download Resume
                </a>
                <button
                  onClick={() =>
                    document
                      .getElementById("projects")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="px-6 py-3 rounded-xl border border-zinc-700 hover:border-violet-500 text-zinc-300 hover:text-white font-semibold text-sm transition-all hover:bg-violet-600/10"
                >
                  View Projects
                </button>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
