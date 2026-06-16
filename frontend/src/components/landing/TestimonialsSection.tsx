import { motion } from "motion/react";
import { Star, Quote } from "lucide-react";

const TESTIMONIALS = [
  {
    quote: "BoneAI flagged a non-displaced scaphoid fracture our radiologist initially read as negative. The 97% confidence score convinced us to order a CT — confirmed. This is exactly the second-set-of-eyes workflow we needed.",
    name: "Dr. Sarah Chen",
    title: "Orthopedic Surgeon",
    institution: "Meridian Medical Center",
    initials: "SC",
    specialty: "Hand & Wrist",
    scans: "2,100+ scans analyzed",
    color: "#00d4ff",
    rating: 5,
  },
  {
    quote: "Integration with our PACS took 45 minutes. The HL7 FHIR push means findings land in the EMR automatically. Turn-around time on fracture reads dropped from 4 hours to under 2 minutes for the AI triage layer.",
    name: "Dr. Marcus Webb",
    title: "Chief of Radiology",
    institution: "Atlas Health Systems",
    initials: "MW",
    specialty: "Musculoskeletal Radiology",
    scans: "8,400+ scans analyzed",
    color: "#a855f7",
    rating: 5,
  },
  {
    quote: "We deployed on-premise to meet our regional data sovereignty requirements. The team had us live in under a week. Sensitivity on pediatric forearm fractures is astonishing — better than junior residents by a wide margin.",
    name: "Dr. Amara Osei",
    title: "Pediatric Radiologist",
    institution: "Nexus Children's Hospital",
    initials: "AO",
    specialty: "Pediatric Radiology",
    scans: "1,650+ scans analyzed",
    color: "#00e5a0",
    rating: 5,
  },
];

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} className="w-3 h-3 fill-[#f59e0b] text-[#f59e0b]" strokeWidth={0} />
      ))}
    </div>
  );
}

export function TestimonialsSection() {
  return (
    <section
      className="relative py-24 overflow-hidden"
      style={{ background: "#020c18" }}
    >
      <div
        className="absolute top-0 inset-x-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent 0%, rgba(0,229,160,0.12) 30%, rgba(0,212,255,0.12) 70%, transparent 100%)" }}
      />

      {/* Ambient glow */}
      <div
        className="absolute -right-32 top-1/3 w-64 h-64 rounded-full pointer-events-none opacity-[0.03]"
        style={{ background: "radial-gradient(circle, #00d4ff 0%, transparent 70%)" }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <div
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border mb-5"
            style={{ background: "rgba(0,229,160,0.05)", borderColor: "rgba(0,229,160,0.14)" }}
          >
            <span style={{ fontSize: "0.68rem", fontWeight: 700, color: "#00e5a0", letterSpacing: "0.07em", fontFamily: "Inter, sans-serif" }}>
              CLINICAL VOICES
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
              marginBottom: "0.7rem",
            }}
          >
            Trusted by the clinicians
            <br />
            <span style={{ color: "#2a4a6a" }}>who rely on precision.</span>
          </h2>
          <p style={{ fontSize: "0.88rem", color: "#2a4060", fontFamily: "Inter, sans-serif", maxWidth: 440, margin: "0 auto" }}>
            From private practices to academic medical centers — BoneAI fits the workflow.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-5">
          {TESTIMONIALS.map(({ quote, name, title, institution, initials, specialty, scans, color, rating }, i) => (
            <motion.div
              key={name}
              className="relative flex flex-col p-6 rounded-2xl"
              style={{
                background: "rgba(255,255,255,0.022)",
                border: "1px solid rgba(255,255,255,0.05)",
              }}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              whileHover={{
                background: `${color}07`,
                borderColor: `${color}18`,
              }}
            >
              {/* Quote icon */}
              <div className="mb-4">
                <Quote className="w-6 h-6" style={{ color: `${color}40` }} strokeWidth={1.5} />
              </div>

              {/* Stars */}
              <div className="mb-4">
                <Stars count={rating} />
              </div>

              {/* Quote text */}
              <blockquote
                style={{
                  fontSize: "0.83rem",
                  color: "#5a7a9a",
                  fontFamily: "Inter, sans-serif",
                  lineHeight: 1.75,
                  flexGrow: 1,
                  marginBottom: "1.5rem",
                }}
              >
                "{quote}"
              </blockquote>

              {/* Divider */}
              <div className="h-px mb-4" style={{ background: `linear-gradient(90deg, ${color}20, transparent)` }} />

              {/* Author */}
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                  style={{ background: `${color}14`, border: `1.5px solid ${color}25` }}
                >
                  <span style={{ fontSize: "0.7rem", fontWeight: 800, color, fontFamily: "Inter, sans-serif" }}>{initials}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p style={{ fontSize: "0.82rem", fontWeight: 700, color: "#c0d8f0", fontFamily: "Inter, sans-serif" }}>{name}</p>
                  <p style={{ fontSize: "0.7rem", color: "#2a4a6a", fontFamily: "Inter, sans-serif" }}>{title}</p>
                  <p style={{ fontSize: "0.65rem", color: "#1a3040", fontFamily: "Inter, sans-serif" }}>{institution}</p>
                </div>
              </div>

              {/* Metadata chips */}
              <div className="flex flex-wrap gap-1.5 mt-4">
                <span
                  className="px-2 py-0.5 rounded-full"
                  style={{ background: `${color}0a`, border: `1px solid ${color}18`, fontSize: "0.6rem", color: `${color}`, fontWeight: 600, fontFamily: "Inter, sans-serif" }}
                >
                  {specialty}
                </span>
                <span
                  className="px-2 py-0.5 rounded-full"
                  style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", fontSize: "0.6rem", color: "#2a4060", fontFamily: "Inter, sans-serif" }}
                >
                  {scans}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Summary stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-8 py-5 px-8 rounded-2xl"
          style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.04)" }}
        >
          {[
            { value: "4.9/5", label: "Average rating", color: "#f59e0b" },
            { value: "2,400+", label: "Active clinicians", color: "#00d4ff" },
            { value: "180K+", label: "Scans processed", color: "#00e5a0" },
            { value: "38", label: "Countries", color: "#a855f7" },
          ].map(({ value, label, color }) => (
            <div key={label} className="text-center">
              <p style={{ fontSize: "1.4rem", fontWeight: 800, color, fontFamily: "Inter, sans-serif", letterSpacing: "-0.02em", lineHeight: 1 }}>{value}</p>
              <p style={{ fontSize: "0.7rem", color: "#1a3050", fontFamily: "Inter, sans-serif", marginTop: 4 }}>{label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
