import { motion } from "motion/react";
import {
  ShieldCheck, Lock, Award, BarChart3, Globe, FileCheck,
  Server, Key, Eye
} from "lucide-react";

const STATS = [
  { value: "98.7%", label: "Sensitivity",     sub: "vs 89.2% human baseline",      color: "#00d4ff" },
  { value: "97.1%", label: "Specificity",     sub: "across 14 fracture types",      color: "#00e5a0" },
  { value: "1.2s",  label: "Detection Time",  sub: "incl. image preprocessing",     color: "#a855f7" },
  { value: "2.4M",  label: "Training Scans",  sub: "from 38 countries",             color: "#f59e0b" },
];

const CERTS = [
  { icon: ShieldCheck, title: "HIPAA Compliant",       desc: "Full PHI protection with Business Associate Agreement available for US healthcare institutions.",                         color: "#00e5a0" },
  { icon: Lock,        title: "AES-256 Encryption",    desc: "End-to-end encryption at rest and in transit. Zero-knowledge processing with ephemeral compute environments.",           color: "#00d4ff" },
  { icon: FileCheck,   title: "FDA 510(k) Pending",    desc: "Submission in review as Class II Software as Medical Device (SaMD). Currently deployed as decision-support only.",      color: "#a78bfa" },
  { icon: Globe,       title: "GDPR & MDR Ready",      desc: "EU Medical Device Regulation compliant data processing. Full audit trails, DPO available.",                            color: "#f59e0b" },
  { icon: Award,       title: "ISO 13485 Certified",   desc: "Quality management system certification for medical device software (QMS). Design control fully documented.",           color: "#f472b6" },
  { icon: BarChart3,   title: "IRB Validated",         desc: "Performance validated across 3 independent IRB-approved clinical studies at academic medical centers.",                 color: "#34d399" },
];

const SECURITY_ARCH = [
  { icon: Server, label: "On-premise deploy",  desc: "Run inside your firewall" },
  { icon: Key,    label: "Zero-trust model",   desc: "Per-request auth tokens"  },
  { icon: Eye,    label: "Audit logging",      desc: "Full HIPAA access trail"  },
];

export function TrustSection() {
  return (
    <section
      id="security"
      className="relative py-24 overflow-hidden"
      style={{ background: "#020c18" }}
    >
      <div
        className="absolute top-0 inset-x-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent 0%, rgba(0,212,255,0.14) 30%, rgba(0,229,160,0.14) 70%, transparent 100%)" }}
      />

      <div
        className="absolute -left-40 top-1/2 -translate-y-1/2 w-80 h-80 rounded-full pointer-events-none opacity-[0.025]"
        style={{ background: "radial-gradient(circle, #00e5a0 0%, transparent 70%)" }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <div
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border mb-5"
            style={{ background: "rgba(0,229,160,0.05)", borderColor: "rgba(0,229,160,0.15)" }}
          >
            <ShieldCheck className="w-3 h-3 text-[#00e5a0]" strokeWidth={2.5} />
            <span style={{ fontSize: "0.68rem", fontWeight: 700, color: "#00e5a0", letterSpacing: "0.07em", fontFamily: "Inter, sans-serif" }}>
              TRUST & COMPLIANCE
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
            Built to the clinical standard.
            <br />
            <span style={{ color: "#2a4a6a" }}>Trusted at every layer.</span>
          </h2>
          <p style={{ fontSize: "0.9rem", color: "#2a4a6a", fontFamily: "Inter, sans-serif", maxWidth: 480, margin: "0 auto", lineHeight: 1.7 }}>
            Medical-grade security isn't a feature — it's the foundation BoneAI is architected on.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.08 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10"
        >
          {STATS.map(({ value, label, sub, color }, i) => (
            <motion.div
              key={label}
              className="flex flex-col gap-1.5 p-5 rounded-2xl text-center"
              style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.05)" }}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.07 }}
              whileHover={{ background: `${color}07`, borderColor: `${color}20` }}
            >
              <span style={{ fontSize: "2rem", fontWeight: 800, color, fontFamily: "Inter, sans-serif", lineHeight: 1, letterSpacing: "-0.02em" }}>
                {value}
              </span>
              <span style={{ fontSize: "0.78rem", fontWeight: 600, color: "#6a8aaa", fontFamily: "Inter, sans-serif" }}>{label}</span>
              <span style={{ fontSize: "0.65rem", color: "#1e3050", fontFamily: "Inter, sans-serif" }}>{sub}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Cert grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
          {CERTS.map(({ icon: Icon, title, desc, color }, i) => (
            <motion.div
              key={title}
              className="flex flex-col gap-3 p-5 rounded-2xl"
              style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.04)" }}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.07 }}
              whileHover={{ background: `${color}06`, borderColor: `${color}18` }}
            >
              <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: `${color}12`, border: `1px solid ${color}22` }}>
                <Icon className="w-4 h-4" style={{ color }} strokeWidth={2} />
              </div>
              <div>
                <p style={{ fontSize: "0.85rem", fontWeight: 700, color: "#c0d8f0", fontFamily: "Inter, sans-serif", marginBottom: 4 }}>{title}</p>
                <p style={{ fontSize: "0.73rem", color: "#1e3050", fontFamily: "Inter, sans-serif", lineHeight: 1.65 }}>{desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Security architecture strip */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="flex flex-col sm:flex-row gap-4 mb-10"
        >
          {SECURITY_ARCH.map(({ icon: Icon, label, desc }) => (
            <div
              key={label}
              className="flex items-center gap-3 flex-1 p-4 rounded-xl"
              style={{ background: "rgba(0,212,255,0.03)", border: "1px solid rgba(0,212,255,0.08)" }}
            >
              <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ background: "rgba(0,212,255,0.1)", border: "1px solid rgba(0,212,255,0.18)" }}>
                <Icon className="w-4 h-4 text-[#00d4ff]" strokeWidth={2} />
              </div>
              <div>
                <p style={{ fontSize: "0.78rem", fontWeight: 700, color: "#6a9ab8", fontFamily: "Inter, sans-serif" }}>{label}</p>
                <p style={{ fontSize: "0.68rem", color: "#1e3050", fontFamily: "Inter, sans-serif" }}>{desc}</p>
              </div>
            </div>
          ))}
        </motion.div>

        {/* CTA strip */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col lg:flex-row items-center justify-between gap-6 p-7 rounded-2xl"
          style={{
            background: "linear-gradient(135deg, rgba(0,212,255,0.04) 0%, rgba(0,229,160,0.03) 100%)",
            border: "1px solid rgba(0,212,255,0.1)",
          }}
        >
          <div>
            <h3 style={{ fontSize: "1.15rem", fontWeight: 700, color: "#d0e8ff", fontFamily: "Inter, sans-serif", letterSpacing: "-0.01em", marginBottom: 6 }}>
              Ready to integrate BoneAI into your clinical workflow?
            </h3>
            <p style={{ fontSize: "0.8rem", color: "#2a4060", fontFamily: "Inter, sans-serif" }}>
              DICOM viewer integration · HL7 FHIR API · On-premise deployment · BAA included
            </p>
          </div>
          <div className="flex gap-3 shrink-0">
            <button className="px-5 py-2.5 rounded-xl" style={{ background: "#00d4ff" }}>
              <span style={{ fontSize: "0.875rem", fontWeight: 700, color: "#020c18", fontFamily: "Inter, sans-serif" }}>Request a Demo</span>
            </button>
            <button
              className="px-5 py-2.5 rounded-xl border border-[rgba(0,212,255,0.12)] hover:border-[rgba(0,212,255,0.25)] transition-colors"
              style={{ background: "rgba(255,255,255,0.03)" }}
            >
              <span style={{ fontSize: "0.875rem", fontWeight: 600, color: "#3a6a8a", fontFamily: "Inter, sans-serif" }}>View Docs</span>
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
