import { motion } from "motion/react";
import { Upload, Cpu, FileCheck, ArrowRight } from "lucide-react";

const STEPS = [
  {
    number: "01",
    icon: Upload,
    title: "Cargue su imagen de rayos X",
    desc: "",
    detail: "PNG · JPEG · JPG",
    color: "#00d4ff",
    accent: "rgba(0,212,255,0.06)",
    border: "rgba(0,212,255,0.12)",
  },
  {
    number: "02",
    icon: Cpu,
    title: "Procesamiento Estructural por IA",
    desc: "",
    detail: "Computer Vision · YOLO Ultralytics",
    color: "#a855f7",
    accent: "rgba(168,85,247,0.06)",
    border: "rgba(168,85,247,0.12)",
  },
  {
    number: "03",
    icon: FileCheck,
    title: "Provea feedback",
    desc: "Su feedback ayuda a generar nuevos datos de entrenamiento para nuestro modelo, y aporta a mejorar el reconocimiento en futuras versiones.",
    detail: "",
    color: "#00e5a0",
    accent: "rgba(0,229,160,0.06)",
    border: "rgba(0,229,160,0.12)",
  },
  {
    number: "04",
    icon: FileCheck,
    title: "Exporte el resultado",
    desc: "",
    detail: "IMAGEN · PDF",
    color: "#00e5a0",
    accent: "rgba(0,229,160,0.06)",
    border: "rgba(0,229,160,0.12)",
  },
];

export function WorkflowSection() {
  return (
    <section className="relative py-24 overflow-hidden" style={{ background: "#020c18" }}>
      {/* Divider glow */}
      <div
        className="absolute top-0 inset-x-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent 0%, rgba(0,212,255,0.15) 30%, rgba(168,85,247,0.15) 70%, transparent 100%)" }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border mb-5"
            style={{ background: "rgba(0,212,255,0.05)", borderColor: "rgba(0,212,255,0.15)" }}
          >
            <span style={{ fontSize: "0.68rem", fontWeight: 700, color: "#00d4ff", letterSpacing: "0.07em", fontFamily: "Inter, sans-serif" }}>
              HOW IT WORKS
            </span>
          </div>
          <h2
            style={{
              fontSize: "clamp(1.7rem, 3.5vw, 2.5rem)",
              fontWeight: 800,
              color: "#e8f4ff",
              letterSpacing: "-0.025em",
              fontFamily: "Inter, sans-serif",
              lineHeight: 1.15,
              marginBottom: "0.8rem",
            }}
          >
            From upload to diagnosis
            <br />
            <span style={{ color: "#2a4a6a" }}>in three steps.</span>
          </h2>
          <p style={{ fontSize: "0.9rem", color: "#3a5a7a", fontFamily: "Inter, sans-serif", maxWidth: 480, margin: "0 auto", lineHeight: 1.7 }}>
            Un flujo de trabajo diseñado para la velocidad y la precisión — sin necesidad de instalar software.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid lg:grid-cols-3 gap-5 relative">

          {/* Connecting lines (desktop only) */}
          <div className="hidden lg:block absolute top-14 left-[calc(33.333%-16px)] right-[calc(33.333%-16px)] h-px z-10">
            <div className="absolute inset-0" style={{ background: "linear-gradient(90deg, rgba(0,212,255,0.3) 0%, rgba(168,85,247,0.3) 50%, rgba(0,229,160,0.3) 100%)" }} />
            {/* Arrow dots */}
            <div className="absolute left-[calc(50%-2px)] top-[calc(50%-4px)] w-2 h-2 rounded-full" style={{ background: "rgba(168,85,247,0.5)" }} />
          </div>

          {STEPS.map(({ number, icon: Icon, title, desc, detail, color, accent, border }, i) => (
            <motion.div
              key={title}
              className="relative flex flex-col gap-5 p-6 rounded-2xl"
              style={{ background: accent, border: `1px solid ${border}` }}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              whileHover={{ background: `${color}09`, borderColor: `${color}20` }}
            >
              {/* Step number + connector arrow */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {/* Number badge */}
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: `${color}14`, border: `1px solid ${color}25` }}
                  >
                    <Icon className="w-5 h-5" style={{ color }} strokeWidth={1.8} />
                  </div>
                  <span
                    style={{ fontSize: "0.7rem", fontWeight: 700, color: `${color}`, letterSpacing: "0.06em", fontFamily: "Inter, monospace" }}
                  >
                    STEP {number}
                  </span>
                </div>
                {i < STEPS.length - 1 && (
                  <ArrowRight className="w-4 h-4 hidden lg:block" style={{ color: `${color}40` }} strokeWidth={1.5} />
                )}
              </div>

              {/* Content */}
              <div className="flex flex-col gap-2">
                <h3
                  style={{ fontSize: "1.1rem", fontWeight: 700, color: "#d0e8ff", fontFamily: "Inter, sans-serif", letterSpacing: "-0.01em" }}
                >
                  {title}
                </h3>
                <p style={{ fontSize: "0.82rem", color: "#3a5a7a", fontFamily: "Inter, sans-serif", lineHeight: 1.7 }}>
                  {desc}
                </p>
              </div>

              {/* Format tags */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {detail.split(" · ").map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 rounded-full"
                    style={{
                      background: `${color}0a`,
                      border: `1px solid ${color}20`,
                      fontSize: "0.62rem",
                      fontWeight: 700,
                      color: `${color}`,
                      fontFamily: "Inter, monospace",
                      letterSpacing: "0.04em",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Bottom animated accent line */}
              <div className="absolute bottom-0 left-6 right-6 h-px" style={{ background: `linear-gradient(90deg, transparent, ${color}30, transparent)` }} />
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12"
        >
          <button
            className="flex items-center gap-2 px-6 py-3 rounded-xl"
            style={{ background: "#00d4ff" }}
          >
            <span style={{ fontSize: "0.875rem", fontWeight: 700, color: "#020c18", fontFamily: "Inter, sans-serif" }}>
              Try Free — No Account Needed
            </span>
          </button>
          <p style={{ fontSize: "0.75rem", color: "#1e3050", fontFamily: "Inter, sans-serif" }}>
            First 10 scans free · HIPAA BAA available · Cancel anytime
          </p>
        </motion.div>
      </div>
    </section>
  );
}
