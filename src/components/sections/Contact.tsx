import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  Send,
  CheckCircle2,
} from "lucide-react";
import { personalInfo } from "@/data/portfolio";
import { BackgroundBeams } from "@/components/aceternity/background-beams";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setError("Please fill in all required fields.");
      return;
    }
    setSending(true);
    // Simulate sending — replace with EmailJS or Resend integration
    await new Promise((r) => setTimeout(r, 1500));
    setSending(false);
    setSent(true);
    setForm({ name: "", email: "", subject: "", message: "" });
    setTimeout(() => setSent(false), 6000);
  };

  const inputClass =
    "w-full px-4 py-3 rounded-xl bg-zinc-900/80 border border-zinc-800 text-white placeholder:text-zinc-600 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500/30 transition-all duration-200 text-sm";

  return (
    <section
      id="contact"
      className="relative py-24 bg-zinc-950 overflow-hidden"
    >
      <BackgroundBeams className="opacity-20" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <span className="text-violet-400 font-semibold text-sm uppercase tracking-widest mb-3 block">
              Let's Talk
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Get In <span className="gradient-text">Touch</span>
            </h2>
            <p className="text-zinc-500 max-w-2xl mx-auto text-sm">
              I'm actively looking for internship and entry-level Data Analyst /
              Developer roles. Have a project, opportunity, or just want to say
              hi? I'd love to hear from you.
            </p>
            <div className="w-20 h-1 bg-gradient-to-r from-violet-600 to-cyan-500 rounded-full mx-auto mt-4" />
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left: Info */}
            <motion.div variants={itemVariants} className="space-y-7">
              <div>
                <h3 className="text-2xl font-bold text-white mb-5">
                  Contact Information
                </h3>
                <div className="space-y-3">
                  {[
                    {
                      icon: Mail,
                      label: "Email",
                      value: personalInfo.email,
                      href: `mailto:${personalInfo.email}`,
                    },
                    {
                      icon: Phone,
                      label: "Phone",
                      value: personalInfo.phone,
                      href: `tel:${personalInfo.phone}`,
                    },
                    {
                      icon: MapPin,
                      label: "Location",
                      value: personalInfo.location,
                      href: "#",
                    },
                  ].map(({ icon: Icon, label, value, href }) => (
                    <a
                      key={label}
                      href={href}
                      className="flex items-start gap-4 p-4 rounded-xl glass hover:border-violet-500/30 group transition-all"
                    >
                      <div className="w-10 h-10 rounded-xl bg-violet-600/20 flex items-center justify-center border border-violet-500/20 shrink-0 group-hover:bg-violet-600/30 transition-colors">
                        <Icon className="w-4 h-4 text-violet-400" />
                      </div>
                      <div>
                        <p className="text-zinc-500 text-xs font-medium mb-0.5">
                          {label}
                        </p>
                        <p className="text-zinc-200 text-sm font-medium">
                          {value}
                        </p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              {/* Social */}
              <div>
                <h4 className="text-zinc-400 text-xs font-semibold uppercase tracking-widest mb-3">
                  Connect with me
                </h4>
                <div className="flex gap-3">
                  {[
                    {
                      icon: Github,
                      href: personalInfo.github,
                      label: "GitHub",
                      sub: "UnplannedCoder",
                    },
                    {
                      icon: Linkedin,
                      href: personalInfo.linkedin,
                      label: "LinkedIn",
                      sub: "pawan-sain",
                    },
                  ].map(({ icon: Icon, href, label, sub }) => (
                    <motion.a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl glass hover:border-violet-500/30 group transition-all flex-1"
                      aria-label={label}
                    >
                      <div className="w-9 h-9 rounded-lg bg-zinc-800 flex items-center justify-center group-hover:bg-violet-600/20 transition-colors">
                        <Icon className="w-4 h-4 text-zinc-300 group-hover:text-violet-400 transition-colors" />
                      </div>
                      <div>
                        <p className="text-white text-xs font-semibold">
                          {label}
                        </p>
                        <p className="text-zinc-500 text-xs">{sub}</p>
                      </div>
                    </motion.a>
                  ))}
                </div>
              </div>

              {/* Availability */}
              <div className="p-5 rounded-2xl bg-green-500/5 border border-green-500/20">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-green-400 font-semibold text-sm">
                    Open to Opportunities
                  </span>
                </div>
                <p className="text-zinc-500 text-sm">
                  I'm actively looking for{" "}
                  <span className="text-zinc-300">internship</span> and{" "}
                  <span className="text-zinc-300">entry-level roles</span> in
                  Data Analytics and Full Stack Development. Let's build
                  something meaningful together!
                </p>
              </div>
            </motion.div>

            {/* Right: Form */}
            <motion.div variants={itemVariants}>
              <form
                onSubmit={handleSubmit}
                className="relative p-7 rounded-2xl bg-zinc-900/80 border border-zinc-800 space-y-5"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-zinc-400 text-xs font-medium mb-2"
                    >
                      Name <span className="text-violet-400">*</span>
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      className={inputClass}
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-zinc-400 text-xs font-medium mb-2"
                    >
                      Email <span className="text-violet-400">*</span>
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      className={inputClass}
                      required
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block text-zinc-400 text-xs font-medium mb-2"
                  >
                    Subject
                  </label>
                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    value={form.subject}
                    onChange={handleChange}
                    placeholder="Internship / Collaboration / Just saying hi"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-zinc-400 text-xs font-medium mb-2"
                  >
                    Message <span className="text-violet-400">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell me about your project or opportunity..."
                    rows={5}
                    className={`${inputClass} resize-none`}
                    required
                  />
                </div>

                {error && <p className="text-red-400 text-xs">{error}</p>}

                <motion.button
                  type="submit"
                  disabled={sending || sent}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-violet-500/25"
                >
                  {sent ? (
                    <>
                      <CheckCircle2 className="w-5 h-5" />
                      Message Sent!
                    </>
                  ) : sending ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                          repeat: Infinity,
                          duration: 1,
                          ease: "linear",
                        }}
                        className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                      />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Send Message
                    </>
                  )}
                </motion.button>

                <p className="text-zinc-600 text-xs text-center">
                  Or email me directly at{" "}
                  <a
                    href={`mailto:${personalInfo.email}`}
                    className="text-violet-400 hover:text-violet-300"
                  >
                    {personalInfo.email}
                  </a>
                </p>
              </form>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
