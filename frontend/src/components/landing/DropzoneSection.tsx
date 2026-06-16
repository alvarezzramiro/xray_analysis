import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Upload, FileImage, Shield, CheckCircle, X, AlertCircle, Cpu } from "lucide-react";

const FORMAT_BADGES = [
  { label: "DICOM", desc: ".dcm", accent: "#00d4ff" },
  { label: "PNG", desc: ".png", accent: "#00e5a0" },
  { label: "JPEG", desc: ".jpg .jpeg", accent: "#a78bfa" },
  { label: "TIFF", desc: ".tiff", accent: "#f0a030" },
];

const SECURITY_BADGES = [
  { icon: Shield, label: "HIPAA Compliant" },
  { icon: CheckCircle, label: "AES-256 Encrypted" },
  { icon: Cpu, label: "On-premise option" },
];

type Status = "idle" | "dragging" | "processing" | "done" | "error";

export function DropzoneSection() {
  const [status, setStatus] = useState<Status>("idle");
  const [fileName, setFileName] = useState("");

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setStatus("dragging");
  }, []);

  const handleDragLeave = useCallback(() => {
    setStatus("idle");
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      setFileName(file.name);
      setStatus("processing");
      setTimeout(() => setStatus("done"), 2200);
    }
  }, []);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      setStatus("processing");
      setTimeout(() => setStatus("done"), 2200);
    }
  }, []);

  const reset = () => {
    setStatus("idle");
    setFileName("");
  };

  return (
    <section
      id="features"
      className="relative py-28 overflow-hidden"
      style={{ background: "#030b14" }}
    >
      {/* Background accent */}
      <div
        className="absolute left-1/2 -translate-x-1/2 top-0 w-[800px] h-[300px] opacity-[0.04] pointer-events-none"
        style={{ background: "radial-gradient(ellipse, #00d4ff 0%, transparent 70%)" }}
      />

      <div className="max-w-4xl mx-auto px-6 lg:px-10">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border mb-5"
            style={{ background: "rgba(0,212,255,0.06)", borderColor: "rgba(0,212,255,0.2)" }}
          >
            <Upload className="w-3 h-3 text-[#00d4ff]" strokeWidth={2.5} />
            <span style={{ fontSize: "0.7rem", fontWeight: 600, color: "#00d4ff", letterSpacing: "0.06em", fontFamily: "Inter, sans-serif" }}>
              INSTANT ANALYSIS
            </span>
          </div>
          <h2
            className="text-[#e8f4ff] mb-4"
            style={{ fontSize: "clamp(1.8rem, 4vw, 2.6rem)", fontWeight: 800, letterSpacing: "-0.025em", fontFamily: "Inter, sans-serif", lineHeight: 1.15 }}
          >
            Drop your X-ray.
            <br />
            <span style={{ color: "#5a7a9a", fontWeight: 500 }}>Get results in seconds.</span>
          </h2>
          <p
            className="text-[#4a6a8a] max-w-lg mx-auto"
            style={{ fontSize: "0.95rem", lineHeight: 1.7, fontFamily: "Inter, sans-serif" }}
          >
            Our upload pipeline is end-to-end encrypted and fully HIPAA compliant.
            Images are processed in an isolated environment and never stored without consent.
          </p>
        </motion.div>

        {/* Dropzone */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          <label
            htmlFor="xray-upload"
            className="block relative cursor-pointer"
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <div
              className="relative rounded-2xl transition-all duration-300 overflow-hidden"
              style={{
                background: status === "dragging"
                  ? "rgba(0,212,255,0.06)"
                  : status === "done"
                  ? "rgba(0,229,160,0.04)"
                  : "rgba(8,18,35,0.8)",
                border: `2px dashed ${
                  status === "dragging"
                    ? "rgba(0,212,255,0.6)"
                    : status === "done"
                    ? "rgba(0,229,160,0.5)"
                    : status === "error"
                    ? "rgba(239,68,68,0.5)"
                    : "rgba(0,212,255,0.18)"
                }`,
                boxShadow: status === "dragging" ? "0 0 40px rgba(0,212,255,0.08), inset 0 0 40px rgba(0,212,255,0.03)" : "none",
                minHeight: "260px",
              }}
            >
              {/* Animated corner glows when dragging */}
              <AnimatePresence>
                {status === "dragging" && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 pointer-events-none"
                  >
                    {["top-0 left-0", "top-0 right-0", "bottom-0 left-0", "bottom-0 right-0"].map((pos, i) => (
                      <div
                        key={i}
                        className={`absolute ${pos} w-16 h-16 opacity-40`}
                        style={{ background: "radial-gradient(circle, rgba(0,212,255,0.4) 0%, transparent 70%)" }}
                      />
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="flex flex-col items-center justify-center gap-5 py-16 px-6">
                <AnimatePresence mode="wait">
                  {status === "idle" || status === "dragging" ? (
                    <motion.div
                      key="idle"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="flex flex-col items-center gap-5"
                    >
                      <div className="relative">
                        <div
                          className="w-16 h-16 rounded-2xl flex items-center justify-center"
                          style={{
                            background: status === "dragging" ? "rgba(0,212,255,0.15)" : "rgba(0,212,255,0.08)",
                            border: "1px solid rgba(0,212,255,0.2)",
                          }}
                        >
                          <Upload
                            className={`w-7 h-7 transition-transform duration-200 ${status === "dragging" ? "-translate-y-1" : ""}`}
                            style={{ color: "#00d4ff" }}
                            strokeWidth={1.5}
                          />
                        </div>
                        {status === "dragging" && (
                          <motion.div
                            className="absolute -inset-2 rounded-2xl border border-[#00d4ff]/30"
                            animate={{ scale: [1, 1.1, 1], opacity: [0.6, 0.2, 0.6] }}
                            transition={{ duration: 1, repeat: Infinity }}
                          />
                        )}
                      </div>
                      <div className="text-center">
                        <p style={{ fontSize: "1.1rem", fontWeight: 600, color: "#c8dff0", fontFamily: "Inter, sans-serif" }}>
                          {status === "dragging" ? "Release to upload" : "Drag & drop your X-ray here"}
                        </p>
                        <p style={{ fontSize: "0.85rem", color: "#3a5a7a", fontFamily: "Inter, sans-serif", marginTop: "6px" }}>
                          or{" "}
                          <span className="text-[#00d4ff] underline underline-offset-2">browse from your device</span>
                        </p>
                      </div>
                    </motion.div>
                  ) : status === "processing" ? (
                    <motion.div
                      key="processing"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex flex-col items-center gap-4"
                    >
                      <div className="relative w-16 h-16">
                        <motion.div
                          className="absolute inset-0 rounded-full border-2 border-[#00d4ff]/20"
                        />
                        <motion.div
                          className="absolute inset-0 rounded-full border-2 border-transparent border-t-[#00d4ff]"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Cpu className="w-6 h-6 text-[#00d4ff]" strokeWidth={1.5} />
                        </div>
                      </div>
                      <div className="text-center">
                        <p style={{ fontSize: "1rem", fontWeight: 600, color: "#c8dff0", fontFamily: "Inter, sans-serif" }}>
                          Analyzing with AI…
                        </p>
                        <p style={{ fontSize: "0.8rem", color: "#3a5a7a", fontFamily: "Inter, sans-serif", marginTop: "4px" }}>
                          {fileName}
                        </p>
                      </div>
                      {/* Progress bar */}
                      <div
                        className="w-48 h-1 rounded-full overflow-hidden"
                        style={{ background: "rgba(0,212,255,0.1)" }}
                      >
                        <motion.div
                          className="h-1 rounded-full bg-[#00d4ff]"
                          initial={{ width: "0%" }}
                          animate={{ width: "100%" }}
                          transition={{ duration: 2.2, ease: "easeInOut" }}
                        />
                      </div>
                    </motion.div>
                  ) : status === "done" ? (
                    <motion.div
                      key="done"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex flex-col items-center gap-4"
                    >
                      <motion.div
                        className="w-16 h-16 rounded-2xl flex items-center justify-center"
                        style={{ background: "rgba(0,229,160,0.12)", border: "1px solid rgba(0,229,160,0.3)" }}
                        initial={{ scale: 0.5 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <CheckCircle className="w-8 h-8 text-[#00e5a0]" strokeWidth={2} />
                      </motion.div>
                      <div className="text-center">
                        <p style={{ fontSize: "1rem", fontWeight: 600, color: "#00e5a0", fontFamily: "Inter, sans-serif" }}>
                          Analysis Complete — 1 fracture detected
                        </p>
                        <p style={{ fontSize: "0.8rem", color: "#3a5a7a", fontFamily: "Inter, sans-serif", marginTop: "4px" }}>
                          {fileName}
                        </p>
                      </div>
                      <button
                        onClick={(e) => { e.preventDefault(); reset(); }}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#1e3a5f] text-[#4a6a8a] hover:text-[#e8f4ff] hover:border-[#3a5a8f] transition-colors"
                        style={{ fontSize: "0.75rem", fontFamily: "Inter, sans-serif" }}
                      >
                        <X className="w-3 h-3" />
                        Upload another
                      </button>
                    </motion.div>
                  ) : null}
                </AnimatePresence>

                {/* Format badges */}
                {(status === "idle" || status === "dragging") && (
                  <div className="flex flex-wrap justify-center gap-2 pt-2">
                    {FORMAT_BADGES.map(({ label, desc, accent }) => (
                      <div
                        key={label}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full"
                        style={{ background: `${accent}0d`, border: `1px solid ${accent}25` }}
                      >
                        <FileImage className="w-3 h-3" style={{ color: accent }} strokeWidth={2} />
                        <span style={{ fontSize: "0.7rem", fontWeight: 600, color: accent, fontFamily: "Inter, sans-serif" }}>
                          {label}
                        </span>
                        <span style={{ fontSize: "0.65rem", color: "#3a5a7a", fontFamily: "Inter, monospace" }}>
                          {desc}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <input
              id="xray-upload"
              type="file"
              accept=".dcm,.png,.jpg,.jpeg,.tiff"
              className="sr-only"
              onChange={handleFileInput}
            />
          </label>
        </motion.div>

        {/* Security trust row */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8"
        >
          {SECURITY_BADGES.map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-2">
              <Icon className="w-3.5 h-3.5 text-[#00e5a0]" strokeWidth={2} />
              <span style={{ fontSize: "0.78rem", color: "#4a6a8a", fontFamily: "Inter, sans-serif", fontWeight: 500 }}>
                {label}
              </span>
            </div>
          ))}
          <div className="flex items-center gap-2">
            <AlertCircle className="w-3.5 h-3.5 text-[#f0a030]" strokeWidth={2} />
            <span style={{ fontSize: "0.78rem", color: "#4a6a8a", fontFamily: "Inter, sans-serif", fontWeight: 500 }}>
              No data retained without consent
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
