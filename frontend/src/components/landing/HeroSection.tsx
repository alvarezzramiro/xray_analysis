import { motion } from "motion/react";
import { ArrowRight, Play, } from "lucide-react";
import { PacsViewer } from "./PacsViewer";

export function HeroSection() {
  return (
    <section
      className="relative overflow-hidden"
      style={{
        background: "linear-gradient(150deg, #020c18 0%, #04101f 40%, #03090f 100%)",
        minHeight: "100vh",
      }}
    >
      {/* Grid background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,212,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,212,255,0.03) 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
        }}
      />

      {/* Ambient glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute rounded-full"
          style={{
            width: 900, height: 900,
            top: "5%", right: "-15%",
            background: "radial-gradient(circle, rgba(0,212,255,0.045) 0%, transparent 65%)",
          }}
        />
        <div
          className="absolute rounded-full"
          style={{
            width: 500, height: 500,
            bottom: "10%", left: "-8%",
            background: "radial-gradient(circle, rgba(0,144,255,0.035) 0%, transparent 65%)",
          }}
        />
        <div
          className="absolute rounded-full"
          style={{
            width: 300, height: 300,
            top: "50%", left: "35%",
            background: "radial-gradient(circle, rgba(168,85,247,0.025) 0%, transparent 65%)",
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 pt-28 pb-20 w-full">
        <div className="grid lg:grid-cols-[1fr_1.4fr] gap-12 lg:gap-10 items-start">

          {/* ── LEFT COLUMN ── */}
          <div className="flex flex-col gap-7 lg:pt-8">

            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: "easeOut" }}
            >
              <div
                className="inline-flex items-center gap-2.5 px-3.5 py-2 rounded-full"
                style={{ background: "rgba(0,212,255,0.06)", border: "1px solid rgba(0,212,255,0.18)" }}
              >
                <motion.span
                  className="block w-1.5 h-1.5 rounded-full"
                  style={{ background: "#00d4ff" }}
                  animate={{ scale: [1, 1.5, 1] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                />
                <span style={{ fontSize: "0.7rem", fontWeight: 700, color: "#00d4ff", letterSpacing: "0.07em", fontFamily: "Inter, sans-serif" }}>
                  EXPLORACIÓN VISUAL MEDIANTE IA • ENTORNO EDUCATIVO
                </span>
              </div>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.1, ease: "easeOut" }}
              style={{
                fontSize: "clamp(2.5rem, 5vw, 3.8rem)",
                fontWeight: 800,
                lineHeight: 1.08,
                letterSpacing: "-0.035em",
                fontFamily: "Inter, sans-serif",
                color: "#e8f4ff",
              }}
            >
              Detección de fracturas óseas
              <br />
              <span
                style={{
                  background: "linear-gradient(120deg, #00d4ff 0%, #0ea5e9 45%, #00b4ff 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                mediante IA
              </span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.18, ease: "easeOut" }}
              style={{
                fontSize: "1rem",
                lineHeight: 1.75,
                fontFamily: "Inter, sans-serif",
                color: "#4a6a8a",
                maxWidth: 460,
              }}
            >
              FracturAI transforma radiografías complejas en una experiencia 
              visual comprensible. Explora en microsegundos cómo la Inteligencia Artificial 
              procesa imágenes médicas, identifica patrones y ayuda a 
              desmitificar la tecnología detrás del análisis de datos óseos.
              {" "}
              <span style={{ color: "#8baabb" }}>
                Modelados óseos 3D próximamente
              </span>
            </motion.p>

            {/* CTA row */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.26, ease: "easeOut" }}
              className="flex flex-col sm:flex-row gap-3"
            >
              <button
                className="group relative inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl overflow-hidden"
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
                  style={{ fontSize: "0.9rem", fontWeight: 700, color: "#020c18", fontFamily: "Inter, sans-serif" }}
                >
                  Upload X-ray
                </span>
                <ArrowRight
                  className="relative w-4 h-4 text-[#020c18] transition-transform duration-200 group-hover:translate-x-0.5"
                  strokeWidth={2.5}
                />
              </button>

              <button
                className="group inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl transition-all duration-200"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(0,212,255,0.14)",
                  backdropFilter: "blur(12px)",
                }}
              >
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center"
                  style={{ background: "rgba(0,212,255,0.1)", border: "1px solid rgba(0,212,255,0.25)" }}
                >
                  <Play className="w-3 h-3 text-[#00d4ff]" style={{ marginLeft: 1 }} strokeWidth={2.5} />
                </div>
                <span
                  className="text-[#5a7a9a] group-hover:text-[#e8f4ff] transition-colors duration-200"
                  style={{ fontSize: "0.9rem", fontWeight: 600, fontFamily: "Inter, sans-serif" }}
                >
                  Watch Demo
                </span>
              </button>
            </motion.div>

            {/* Stats row */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35, ease: "easeOut" }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2"
            >

            </motion.div>

            {/* Social proof */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex items-center gap-3 pt-1"
            >
               
            </motion.div>
          </div>

          {/* ── RIGHT COLUMN: PACS VIEWER ── */}
          <motion.div
            initial={{ opacity: 0, x: 50, y: 10 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 0.85, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="flex justify-center lg:justify-end"
          >
            <PacsViewer />
          </motion.div>
        </div>
      </div>

      {/* Bottom gradient */}
      <div
        className="absolute bottom-0 inset-x-0 h-24 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent, #020c18)" }}
      />
    </section>
  );
}
