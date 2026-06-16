import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, Activity } from "lucide-react";

const NAV_LINKS = [
  { label: "Features",    href: "#features"    },
  { label: "How It Works",href: "#workflow"    },
  { label: "3D Analysis", href: "#3d-analysis" },
  { label: "Security",    href: "#security"    },
  { label: "Docs",        href: "#docs"        },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <motion.nav
      initial={{ y: -72, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 inset-x-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? "rgba(2,12,24,0.88)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(0,212,255,0.07)" : "1px solid transparent",
        boxShadow: scrolled ? "0 4px 40px rgba(0,0,0,0.4)" : "none",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <div className="relative">
              <div className="absolute inset-0 rounded-lg bg-[#00d4ff]/15 blur-md" />
              <div
                className="relative w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ background: "rgba(0,212,255,0.1)", border: "1px solid rgba(0,212,255,0.3)" }}
              >
                <Activity className="w-4 h-4 text-[#00d4ff]" strokeWidth={2.5} />
              </div>
            </div>
            <span
              style={{ fontSize: "1.1rem", fontWeight: 800, color: "#e8f4ff", letterSpacing: "-0.02em", fontFamily: "Inter, sans-serif" }}
            >
              Fractur<span style={{ color: "#00d4ff" }}>AI</span>
            </span>
            <div
              className="hidden sm:flex items-center px-2 py-0.5 rounded-full"
              style={{ background: "rgba(0,212,255,0.08)", border: "1px solid rgba(0,212,255,0.18)" }}
            >
              <span style={{ fontSize: "0.6rem", fontWeight: 700, color: "#00d4ff", letterSpacing: "0.08em", fontFamily: "Inter, sans-serif" }}>
                BETA
              </span>
            </div>
          </div>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-7">
            {NAV_LINKS.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                className="text-[#3a5a7a] hover:text-[#c0d8f0] transition-colors duration-200"
                style={{ fontSize: "0.85rem", fontWeight: 500, fontFamily: "Inter, sans-serif" }}
              >
                {label}
              </a>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <button
              className="px-4 py-2 text-[#3a5a7a] hover:text-[#c0d8f0] transition-colors duration-200"
              style={{ fontSize: "0.85rem", fontWeight: 500, fontFamily: "Inter, sans-serif" }}
            >
              Sign In
            </button>
            <button
              className="relative group px-5 py-2 rounded-lg overflow-hidden"
              style={{ background: "#00d4ff" }}
            >
              <motion.div
                className="absolute inset-0"
                style={{ background: "linear-gradient(135deg, #00d4ff 0%, #0ea5e9 100%)" }}
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.25 }}
              />
              <span
                className="relative"
                style={{ fontSize: "0.85rem", fontWeight: 700, color: "#020c18", fontFamily: "Inter, sans-serif" }}
              >
                Sign Up
              </span>
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 rounded-lg"
            style={{ color: "#3a5a7a" }}
            onClick={() => setMobileOpen(v => !v)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            style={{ background: "rgba(2,12,24,0.97)", borderBottom: "1px solid rgba(0,212,255,0.08)" }}
          >
            <div className="px-6 py-5 flex flex-col gap-4">
              {NAV_LINKS.map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  className="text-[#3a5a7a] hover:text-[#c0d8f0] transition-colors py-1"
                  style={{ fontSize: "0.95rem", fontWeight: 500, fontFamily: "Inter, sans-serif" }}
                  onClick={() => setMobileOpen(false)}
                >
                  {label}
                </a>
              ))}
              <button
                className="mt-1 w-full py-3 rounded-xl"
                style={{ background: "#00d4ff" }}
              >
                <span style={{ fontSize: "0.9rem", fontWeight: 700, color: "#020c18", fontFamily: "Inter, sans-serif" }}>
                  Sign Up
                </span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
