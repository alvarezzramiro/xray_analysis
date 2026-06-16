import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import {
  ZoomIn, ZoomOut, Maximize2, Sun, Contrast, Ruler, RotateCcw,
  ChevronLeft, ChevronRight, Download, Share2
} from "lucide-react";

const TOOLS = [
  { icon: ZoomIn, label: "Zoom In" },
  { icon: ZoomOut, label: "Zoom Out" },
  { icon: Ruler, label: "Measure" },
  { icon: Contrast, label: "W/L" },
  { icon: Sun, label: "Brightness" },
  { icon: Maximize2, label: "Fullscreen" },
  { icon: RotateCcw, label: "Reset" },
];

const SERIES = ["AP", "LAT", "OBL", "PA"];

interface Finding {
  id: string;
  label: string;
  sublabel: string;
  confidence: number;
  severity: "critical" | "moderate" | "low" | "info";
  color: string;
}

const FINDINGS: Finding[] = [
  { id: "f1", label: "Distal Radius Fracture", sublabel: "Transverse pattern, non-displaced", confidence: 97.3, severity: "critical", color: "#ef4444" },
  { id: "f2", label: "Possible Callus", sublabel: "Early periosteal reaction", confidence: 42.1, severity: "low", color: "#f59e0b" },
  { id: "f3", label: "Bone Density", sublabel: "Within normal range", confidence: 94.0, severity: "info", color: "#00d4ff" },
];

function XraySvg() {
  return (
    <svg viewBox="0 0 260 340" className="w-full h-full" style={{ filter: "brightness(0.95) contrast(1.08)" }}>
      <defs>
        <radialGradient id="boneR1" cx="50%" cy="50%" r="60%">
          <stop offset="0%" stopColor="rgba(235,245,255,0.92)" />
          <stop offset="55%" stopColor="rgba(185,210,240,0.7)" />
          <stop offset="100%" stopColor="rgba(120,155,200,0.3)" />
        </radialGradient>
        <radialGradient id="boneU1" cx="50%" cy="50%" r="60%">
          <stop offset="0%" stopColor="rgba(220,235,255,0.85)" />
          <stop offset="60%" stopColor="rgba(170,200,235,0.6)" />
          <stop offset="100%" stopColor="rgba(110,145,195,0.25)" />
        </radialGradient>
        <radialGradient id="carpal1" cx="50%" cy="50%" r="60%">
          <stop offset="0%" stopColor="rgba(200,225,250,0.8)" />
          <stop offset="100%" stopColor="rgba(130,165,210,0.3)" />
        </radialGradient>
        <filter id="filmGrain">
          <feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="4" stitchTiles="stitch" result="noise" />
          <feColorMatrix type="saturate" values="0" in="noise" result="grayNoise" />
          <feBlend in="SourceGraphic" in2="grayNoise" mode="overlay" result="blend" />
          <feComposite in="blend" in2="SourceGraphic" operator="in" />
        </filter>
        <filter id="softEdge">
          <feGaussianBlur stdDeviation="0.8" />
        </filter>
      </defs>

      {/* Film background with subtle texture */}
      <rect width="260" height="340" fill="#000d1a" />
      <rect width="260" height="340" fill="url(#filmGrain)" opacity="0.04" />

      {/* === SOFT TISSUE OUTLINE (very faint) === */}
      <path
        d="M55 340 C50 280, 48 200, 52 160 C56 130, 58 100, 54 70 C60 40, 70 30, 72 60 C70 90, 72 110, 70 130 C82 110, 84 80, 82 58 C85 35, 94 25, 96 56 C94 80, 96 108, 96 128 C102 108, 102 78, 102 54 C104 30, 112 20, 114 52 C112 78, 112 108, 114 130 C120 110, 121 82, 122 60 C124 36, 133 28, 134 60 C132 84, 130 110, 132 132 C134 116, 136 92, 138 74 C141 50, 150 44, 150 72 C149 94, 148 118, 150 138 C156 120, 158 100, 162 82 C165 60, 174 56, 174 80 C172 100, 168 122, 170 150 C178 165, 195 178, 205 220 C210 250, 208 300, 202 340 Z"
        fill="rgba(40,60,90,0.08)"
        filter="url(#softEdge)"
      />

      {/* === RADIUS (left, primary bone) === */}
      <g>
        {/* Bone bulk */}
        <ellipse cx="105" cy="215" rx="19" ry="100" fill="url(#boneR1)" />
        {/* Cortex edge highlight */}
        <ellipse cx="105" cy="215" rx="19" ry="100" fill="none" stroke="rgba(210,230,255,0.35)" strokeWidth="1.8" />
        {/* Medullary canal (dark center) */}
        <ellipse cx="105" cy="220" rx="10" ry="88" fill="rgba(3,15,30,0.55)" />
        {/* Distal articular surface (wrist end) */}
        <ellipse cx="105" cy="122" rx="22" ry="9" fill="rgba(220,238,255,0.75)" />
        {/* Proximal end (elbow) */}
        <ellipse cx="105" cy="312" rx="19" ry="8" fill="rgba(210,232,255,0.6)" />
        {/* Radial styloid process */}
        <ellipse cx="92" cy="120" rx="5" ry="7" fill="rgba(190,218,248,0.6)" />
        {/* Lister's tubercle */}
        <ellipse cx="112" cy="118" rx="4" ry="5" fill="rgba(185,215,248,0.45)" />
      </g>

      {/* === FRACTURE LINE (distal third radius) === */}
      <g>
        <path d="M88 235 Q96 231 105 233 Q114 231 122 235" stroke="rgba(3,15,30,0.75)" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        <path d="M89 237 Q97 233 105 235 Q114 233 121 237" stroke="rgba(0,180,255,0.04)" strokeWidth="3" fill="none" strokeLinecap="round" />
        <path d="M87 234 Q96 230 105 232 Q114 230 123 234" stroke="rgba(3,15,30,0.4)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      </g>

      {/* === ULNA (right, secondary bone) === */}
      <g>
        <ellipse cx="150" cy="210" rx="13" ry="92" fill="url(#boneU1)" />
        <ellipse cx="150" cy="210" rx="13" ry="92" fill="none" stroke="rgba(200,222,252,0.28)" strokeWidth="1.2" />
        <ellipse cx="150" cy="212" rx="7" ry="81" fill="rgba(3,15,30,0.5)" />
        {/* Olecranon (elbow) */}
        <ellipse cx="150" cy="305" rx="15" ry="9" fill="rgba(200,228,255,0.65)" />
        {/* Ulnar head */}
        <ellipse cx="160" cy="122" rx="10" ry="8" fill="rgba(190,218,250,0.55)" />
        {/* Ulnar styloid */}
        <ellipse cx="163" cy="116" rx="4" ry="7" fill="rgba(178,210,248,0.5)" />
      </g>

      {/* === CARPAL BONES === */}
      {[
        { cx: 92, cy: 108, rx: 9, ry: 7 },
        { cx: 107, cy: 105, rx: 9, ry: 7 },
        { cx: 121, cy: 107, rx: 8, ry: 6 },
        { cx: 133, cy: 111, rx: 7, ry: 6 },
        { cx: 88, cy: 95, rx: 8, ry: 6 },
        { cx: 101, cy: 92, rx: 8, ry: 6 },
        { cx: 114, cy: 93, rx: 8, ry: 7 },
        { cx: 127, cy: 97, rx: 7, ry: 6 },
      ].map((b, i) => (
        <g key={i} opacity="0.75">
          <ellipse {...b} fill="url(#carpal1)" />
          <ellipse {...b} fill="none" stroke="rgba(200,225,255,0.2)" strokeWidth="0.8" />
        </g>
      ))}

      {/* === METACARPALS === */}
      {[
        { x1: 84, y1: 88, x2: 76, y2: 44, w: 8 },
        { x1: 99, y1: 85, x2: 96, y2: 32, w: 7 },
        { x1: 112, y1: 85, x2: 112, y2: 30, w: 7 },
        { x1: 124, y1: 88, x2: 126, y2: 36, w: 6 },
        { x1: 134, y1: 94, x2: 140, y2: 58, w: 5 },
      ].map((m, i) => (
        <g key={i} opacity="0.7">
          <line x1={m.x1} y1={m.y1} x2={m.x2} y2={m.y2} stroke="rgba(190,215,245,0.65)" strokeWidth={m.w} strokeLinecap="round" />
          <line x1={m.x1} y1={m.y1} x2={m.x2} y2={m.y2} stroke="rgba(3,15,30,0.4)" strokeWidth={m.w - 2.5} strokeLinecap="round" />
        </g>
      ))}

      {/* === PHALANGES === */}
      {[
        { x1: 74, y1: 42, x2: 70, y2: 20 },
        { x1: 94, y1: 30, x2: 92, y2: 8 },
        { x1: 112, y1: 28, x2: 112, y2: 6 },
        { x1: 126, y1: 34, x2: 127, y2: 14 },
        { x1: 139, y1: 56, x2: 143, y2: 40 },
      ].map((p, i) => (
        <line key={i} x1={p.x1} y1={p.y1} x2={p.x2} y2={p.y2}
          stroke="rgba(180,208,242,0.6)" strokeWidth={5} strokeLinecap="round" opacity="0.68" />
      ))}
    </svg>
  );
}

export function PacsViewer() {
  const [activeSeries, setActiveSeries] = useState(0);
  const [activeTool, setActiveTool] = useState(0);
  const [scanProgress, setScanProgress] = useState(0);
  const [findingsReady, setFindingsReady] = useState(false);
  const [selectedFinding, setSelectedFinding] = useState<string | null>("f1");

  useEffect(() => {
    const t1 = setTimeout(() => {
      const interval = setInterval(() => {
        setScanProgress(p => {
          if (p >= 100) {
            clearInterval(interval);
            setFindingsReady(true);
            return 100;
          }
          return p + 3;
        });
      }, 40);
    }, 800);
    return () => clearTimeout(t1);
  }, []);

  return (
    <div
      className="relative w-full overflow-hidden rounded-2xl select-none"
      style={{
        background: "#020b16",
        border: "1px solid rgba(0,212,255,0.12)",
        boxShadow: "0 0 80px rgba(0,212,255,0.06), 0 40px 80px rgba(0,0,0,0.6)",
        maxWidth: 700,
      }}
    >
      {/* ── TOP TOOLBAR ── */}
      <div
        className="flex items-center justify-between px-3 py-2"
        style={{ background: "rgba(5,15,30,0.95)", borderBottom: "1px solid rgba(0,212,255,0.08)" }}
      >
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 mr-2">
            <div className="w-2 h-2 rounded-full" style={{ background: "#ef4444", opacity: 0.8 }} />
            <div className="w-2 h-2 rounded-full" style={{ background: "#f59e0b", opacity: 0.8 }} />
            <div className="w-2 h-2 rounded-full" style={{ background: "#22c55e", opacity: 0.8 }} />
          </div>
          <span style={{ fontSize: "0.6rem", color: "rgba(0,212,255,0.5)", fontFamily: "Inter, monospace", fontWeight: 700, letterSpacing: "0.06em" }}>
            BONEAI PACS v2.4
          </span>
          <div className="h-3 w-px bg-[rgba(0,212,255,0.12)] mx-1" />
          {TOOLS.map(({ icon: Icon, label }, i) => (
            <button
              key={label}
              onClick={() => setActiveTool(i)}
              className="w-6 h-6 rounded flex items-center justify-center transition-all duration-150"
              style={{
                background: activeTool === i ? "rgba(0,212,255,0.15)" : "transparent",
                border: activeTool === i ? "1px solid rgba(0,212,255,0.3)" : "1px solid transparent",
              }}
            >
              <Icon className="w-3 h-3" style={{ color: activeTool === i ? "#00d4ff" : "rgba(100,140,180,0.6)" }} strokeWidth={2} />
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <button className="w-6 h-6 rounded flex items-center justify-center hover:bg-[rgba(0,212,255,0.08)] transition-colors">
            <Share2 className="w-3 h-3 text-[rgba(100,140,180,0.5)]" strokeWidth={2} />
          </button>
          <button className="w-6 h-6 rounded flex items-center justify-center hover:bg-[rgba(0,212,255,0.08)] transition-colors">
            <Download className="w-3 h-3 text-[rgba(100,140,180,0.5)]" strokeWidth={2} />
          </button>
          <div className="flex items-center gap-1 px-2 py-0.5 rounded-full" style={{ background: "rgba(0,229,160,0.1)", border: "1px solid rgba(0,229,160,0.2)" }}>
            <motion.div className="w-1 h-1 rounded-full bg-[#00e5a0]" animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.2, repeat: Infinity }} />
            <span style={{ fontSize: "0.5rem", color: "#00e5a0", fontWeight: 700, letterSpacing: "0.06em", fontFamily: "Inter, sans-serif" }}>LIVE</span>
          </div>
        </div>
      </div>

      {/* ── MAIN CONTENT ── */}
      <div className="flex" style={{ minHeight: 380 }}>

        {/* LEFT SIDEBAR */}
        <div
          className="flex flex-col shrink-0"
          style={{ width: 112, background: "rgba(3,10,22,0.9)", borderRight: "1px solid rgba(0,212,255,0.07)" }}
        >
          {/* Patient info */}
          <div className="px-2.5 pt-2.5 pb-2" style={{ borderBottom: "1px solid rgba(0,212,255,0.06)" }}>
            <p style={{ fontSize: "0.5rem", color: "rgba(0,212,255,0.4)", fontWeight: 700, letterSpacing: "0.08em", fontFamily: "Inter, sans-serif", marginBottom: 4 }}>PATIENT</p>
            {[
              ["ID", "PT-20641"],
              ["DOB", "**/**/****"],
              ["Sex", "M"],
              ["Study", "L.FOREARM"],
              ["Date", "2026-06-06"],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between mb-0.5">
                <span style={{ fontSize: "0.5rem", color: "rgba(60,100,140,0.8)", fontFamily: "Inter, monospace" }}>{k}:</span>
                <span style={{ fontSize: "0.5rem", color: "rgba(160,195,230,0.8)", fontFamily: "Inter, monospace" }}>{v}</span>
              </div>
            ))}
          </div>

          {/* Series navigator */}
          <div className="px-2.5 py-2" style={{ borderBottom: "1px solid rgba(0,212,255,0.06)" }}>
            <p style={{ fontSize: "0.5rem", color: "rgba(0,212,255,0.4)", fontWeight: 700, letterSpacing: "0.08em", fontFamily: "Inter, sans-serif", marginBottom: 4 }}>SERIES</p>
            <div className="flex flex-col gap-1">
              {SERIES.map((s, i) => (
                <button
                  key={s}
                  onClick={() => setActiveSeries(i)}
                  className="flex items-center gap-1.5 px-2 py-1 rounded transition-all duration-150"
                  style={{
                    background: activeSeries === i ? "rgba(0,212,255,0.12)" : "transparent",
                    border: `1px solid ${activeSeries === i ? "rgba(0,212,255,0.25)" : "transparent"}`,
                  }}
                >
                  <div className="w-5 h-5 rounded overflow-hidden" style={{ background: "#000d1a", border: "1px solid rgba(0,212,255,0.1)" }}>
                    <svg viewBox="0 0 20 20" className="w-full h-full">
                      <rect width="20" height="20" fill="#000a14" />
                      <ellipse cx="9" cy="10" rx="3.5" ry="8" fill="rgba(200,225,255,0.4)" />
                      <ellipse cx="13" cy="10" rx="2.5" ry="7" fill="rgba(180,210,250,0.3)" />
                    </svg>
                  </div>
                  <div>
                    <p style={{ fontSize: "0.5rem", color: activeSeries === i ? "#00d4ff" : "rgba(100,140,170,0.7)", fontWeight: 600, fontFamily: "Inter, sans-serif" }}>{s}</p>
                    <p style={{ fontSize: "0.45rem", color: "rgba(50,80,110,0.8)", fontFamily: "Inter, monospace" }}>12 img</p>
                  </div>
                </button>
              ))}
            </div>
            <div className="flex items-center justify-between mt-1.5 px-1">
              <button className="p-0.5 rounded hover:bg-[rgba(0,212,255,0.08)]">
                <ChevronLeft className="w-2.5 h-2.5 text-[rgba(60,100,140,0.6)]" strokeWidth={2} />
              </button>
              <span style={{ fontSize: "0.45rem", color: "rgba(60,100,140,0.7)", fontFamily: "Inter, monospace" }}>7 / 12</span>
              <button className="p-0.5 rounded hover:bg-[rgba(0,212,255,0.08)]">
                <ChevronRight className="w-2.5 h-2.5 text-[rgba(60,100,140,0.6)]" strokeWidth={2} />
              </button>
            </div>
          </div>

          {/* Window / Level */}
          <div className="px-2.5 py-2">
            <p style={{ fontSize: "0.5rem", color: "rgba(0,212,255,0.4)", fontWeight: 700, letterSpacing: "0.08em", fontFamily: "Inter, sans-serif", marginBottom: 5 }}>WINDOW</p>
            {[
              { label: "W/L", value: "400 / 40" },
              { label: "Zoom", value: "1.5×" },
              { label: "Rot", value: "0°" },
              { label: "kV", value: "65" },
              { label: "mAs", value: "4" },
            ].map(({ label, value }) => (
              <div key={label} className="flex justify-between mb-1">
                <span style={{ fontSize: "0.5rem", color: "rgba(60,100,140,0.7)", fontFamily: "Inter, monospace" }}>{label}:</span>
                <span style={{ fontSize: "0.5rem", color: "rgba(140,175,210,0.8)", fontFamily: "Inter, monospace" }}>{value}</span>
              </div>
            ))}

            {/* Scan progress */}
            {!findingsReady && (
              <div className="mt-2">
                <div className="flex justify-between mb-1">
                  <span style={{ fontSize: "0.45rem", color: "rgba(0,212,255,0.5)", fontFamily: "Inter, monospace", fontWeight: 600 }}>AI SCAN</span>
                  <span style={{ fontSize: "0.45rem", color: "rgba(0,212,255,0.5)", fontFamily: "Inter, monospace" }}>{scanProgress}%</span>
                </div>
                <div className="h-0.5 rounded-full overflow-hidden" style={{ background: "rgba(0,212,255,0.1)" }}>
                  <motion.div
                    className="h-full rounded-full bg-[#00d4ff]"
                    style={{ width: `${scanProgress}%` }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* CENTER VIEWER */}
        <div className="relative flex-1 overflow-hidden" style={{ background: "#000d1a" }}>
          {/* Main X-ray */}
          <div className="absolute inset-0">
            <XraySvg />
          </div>

          {/* Corner HUD markers */}
          {["top-2 left-2", "top-2 right-2", "bottom-2 left-2", "bottom-2 right-2"].map((pos, i) => (
            <div key={i} className={`absolute ${pos} w-4 h-4 pointer-events-none`}>
              <div className={`absolute inset-0`} style={{
                borderTop: i < 2 ? "1.5px solid rgba(0,212,255,0.35)" : "none",
                borderBottom: i >= 2 ? "1.5px solid rgba(0,212,255,0.35)" : "none",
                borderLeft: i % 2 === 0 ? "1.5px solid rgba(0,212,255,0.35)" : "none",
                borderRight: i % 2 === 1 ? "1.5px solid rgba(0,212,255,0.35)" : "none",
              }} />
            </div>
          ))}

          {/* Metadata overlay */}
          <div className="absolute top-2 left-2" style={{ pointerEvents: "none" }}>
            <div style={{ fontSize: "0.48rem", color: "rgba(0,212,255,0.4)", fontFamily: "Inter, monospace", lineHeight: 1.8 }}>
              <div>PT: [ANON] · L.FOREARM AP</div>
              <div>2026-06-06 · Ser 1/4 · Img 7/12</div>
            </div>
          </div>
          <div className="absolute top-2 right-2" style={{ pointerEvents: "none", textAlign: "right" }}>
            <div style={{ fontSize: "0.48rem", color: "rgba(0,212,255,0.35)", fontFamily: "Inter, monospace", lineHeight: 1.8 }}>
              <div>kV: 65 · mAs: 4</div>
              <div>SID: 110cm · DFD: 100</div>
            </div>
          </div>

          {/* Scanning line */}
          <motion.div
            className="absolute left-0 right-0 pointer-events-none"
            style={{
              height: 1,
              background: "linear-gradient(90deg, transparent 0%, rgba(0,212,255,0.5) 25%, rgba(0,212,255,0.85) 50%, rgba(0,212,255,0.5) 75%, transparent 100%)",
              boxShadow: "0 0 10px rgba(0,212,255,0.3)",
            }}
            animate={{ top: ["5%", "95%", "5%"] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "linear" }}
          />

          {/* ── PRIMARY DETECTION BOX ── */}
          <AnimatePresence>
            {findingsReady && (
              <motion.div
                className="absolute pointer-events-none"
                style={{ top: "57%", left: "24%", width: "38%", height: "12%" }}
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                <div
                  className="absolute inset-0 rounded"
                  style={{
                    border: `1.5px solid ${selectedFinding === "f1" ? "#ef4444" : "rgba(239,68,68,0.6)"}`,
                    boxShadow: "0 0 16px rgba(239,68,68,0.3), inset 0 0 16px rgba(239,68,68,0.04)",
                  }}
                />
                {/* Corner accents */}
                {[
                  "top-0 left-0 border-t-[1.5px] border-l-[1.5px]",
                  "top-0 right-0 border-t-[1.5px] border-r-[1.5px]",
                  "bottom-0 left-0 border-b-[1.5px] border-l-[1.5px]",
                  "bottom-0 right-0 border-b-[1.5px] border-r-[1.5px]",
                ].map((cls, i) => (
                  <div key={i} className={`absolute w-2.5 h-2.5 ${cls} border-[#ef4444]`} />
                ))}
                {/* Label */}
                <motion.div
                  className="absolute -top-5 left-0 flex items-center gap-1 px-1.5 py-0.5 rounded"
                  style={{ background: "#ef4444" }}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="w-1 h-1 rounded-full bg-white" />
                  <span style={{ fontSize: "0.48rem", fontWeight: 800, color: "#fff", fontFamily: "Inter, monospace", letterSpacing: "0.04em" }}>
                    FRACTURE · 97.3%
                  </span>
                </motion.div>
                {/* Crosshair */}
                <div className="absolute inset-0 flex items-center justify-center opacity-20">
                  <div className="absolute w-full h-px bg-[#ef4444]" />
                  <div className="absolute h-full w-px bg-[#ef4444]" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── SECONDARY MARKER ── */}
          <AnimatePresence>
            {findingsReady && (
              <motion.div
                className="absolute pointer-events-none"
                style={{ top: "46%", left: "44%", width: "14%", height: "5%" }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.75 }}
                transition={{ delay: 0.5 }}
              >
                <div
                  className="absolute inset-0 rounded-sm"
                  style={{ border: "1px dashed rgba(245,158,11,0.7)", boxShadow: "0 0 8px rgba(245,158,11,0.2)" }}
                />
                <div className="absolute -top-4 left-0 px-1 py-0.5 rounded" style={{ background: "rgba(245,158,11,0.85)" }}>
                  <span style={{ fontSize: "0.42rem", fontWeight: 700, color: "#000", fontFamily: "Inter, monospace" }}>CALLUS · 42%</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── MEASUREMENT LINE ── */}
          <AnimatePresence>
            {findingsReady && (
              <motion.div
                className="absolute pointer-events-none"
                style={{ top: "59%", left: "14%", width: "10%" }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.6 }}
                transition={{ delay: 0.7 }}
              >
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "1px", background: "#00d4ff" }} />
                <div style={{ position: "absolute", top: "-16px", left: "50%", transform: "translateX(-50%)", background: "rgba(0,212,255,0.2)", padding: "1px 4px", borderRadius: 2 }}>
                  <span style={{ fontSize: "0.42rem", color: "#00d4ff", fontFamily: "Inter, monospace" }}>2.3mm</span>
                </div>
                {/* Tick marks */}
                <div style={{ position: "absolute", top: -3, left: 0, width: 1, height: 7, background: "#00d4ff" }} />
                <div style={{ position: "absolute", top: -3, right: 0, width: 1, height: 7, background: "#00d4ff" }} />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Bottom bar */}
          <div
            className="absolute bottom-0 left-0 right-0 flex items-center justify-between px-3 py-1.5"
            style={{ background: "rgba(1,8,20,0.92)", borderTop: "1px solid rgba(0,212,255,0.07)" }}
          >
            <div className="flex items-center gap-2">
              <motion.div
                className="w-1.5 h-1.5 rounded-full bg-[#00d4ff]"
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              />
              <span style={{ fontSize: "0.48rem", color: "rgba(0,212,255,0.6)", fontFamily: "Inter, monospace", fontWeight: 600 }}>
                {findingsReady ? "ANALYSIS COMPLETE · 1 CRITICAL" : "AI SCANNING..."}
              </span>
            </div>
            <span style={{ fontSize: "0.45rem", color: "rgba(50,90,130,0.7)", fontFamily: "Inter, monospace" }}>
              BoneAI v2.4.1 · DICOM CR
            </span>
          </div>
        </div>

        {/* RIGHT FINDINGS PANEL */}
        <div
          className="flex flex-col shrink-0"
          style={{ width: 130, background: "rgba(3,10,22,0.95)", borderLeft: "1px solid rgba(0,212,255,0.07)" }}
        >
          <div className="px-2.5 pt-2.5 pb-1.5" style={{ borderBottom: "1px solid rgba(0,212,255,0.07)" }}>
            <div className="flex items-center gap-1.5 mb-3">
              <div className="w-3.5 h-3.5 rounded flex items-center justify-center" style={{ background: "rgba(0,212,255,0.12)", border: "1px solid rgba(0,212,255,0.2)" }}>
                <span style={{ fontSize: "0.4rem", color: "#00d4ff", fontWeight: 800 }}>AI</span>
              </div>
              <span style={{ fontSize: "0.55rem", color: "#00d4ff", fontWeight: 700, letterSpacing: "0.04em", fontFamily: "Inter, sans-serif" }}>
                AI FINDINGS
              </span>
            </div>

            <div className="flex flex-col gap-2">
              {FINDINGS.map((f, i) => (
                <motion.button
                  key={f.id}
                  onClick={() => setSelectedFinding(selectedFinding === f.id ? null : f.id)}
                  className="w-full text-left rounded-lg p-2 transition-all duration-200"
                  style={{
                    background: selectedFinding === f.id ? `${f.color}12` : "rgba(255,255,255,0.02)",
                    border: `1px solid ${selectedFinding === f.id ? `${f.color}40` : "rgba(255,255,255,0.04)"}`,
                  }}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: findingsReady ? 1 : 0, x: findingsReady ? 0 : 10 }}
                  transition={{ delay: 0.3 + i * 0.15, duration: 0.4 }}
                >
                  {/* Severity dot */}
                  <div className="flex items-center gap-1 mb-1">
                    <div className="w-1.5 h-1.5 rounded-full" style={{ background: f.color }} />
                    <span style={{ fontSize: "0.48rem", color: f.color, fontWeight: 700, fontFamily: "Inter, sans-serif", letterSpacing: "0.04em" }}>
                      {f.severity.toUpperCase()}
                    </span>
                  </div>
                  <p style={{ fontSize: "0.5rem", color: "rgba(200,220,245,0.85)", fontWeight: 600, fontFamily: "Inter, sans-serif", marginBottom: 2 }}>
                    {f.label}
                  </p>
                  <p style={{ fontSize: "0.44rem", color: "rgba(70,100,140,0.9)", fontFamily: "Inter, sans-serif", marginBottom: 4, lineHeight: 1.4 }}>
                    {f.sublabel}
                  </p>
                  {/* Confidence bar */}
                  <div className="flex items-center gap-1">
                    <div className="flex-1 h-0.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.06)" }}>
                      <div className="h-full rounded-full" style={{ width: `${f.confidence}%`, background: f.color }} />
                    </div>
                    <span style={{ fontSize: "0.44rem", color: "rgba(100,140,180,0.8)", fontFamily: "Inter, monospace" }}>
                      {f.confidence.toFixed(0)}%
                    </span>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="px-2.5 py-2.5 flex flex-col gap-1.5">
            <p style={{ fontSize: "0.48rem", color: "rgba(0,212,255,0.4)", fontWeight: 700, letterSpacing: "0.08em", fontFamily: "Inter, sans-serif", marginBottom: 2 }}>ACTIONS</p>
            {["Generate Report", "Export DICOM", "Second Opinion", "Add Annotation"].map((action) => (
              <button
                key={action}
                className="w-full text-left px-2 py-1 rounded transition-all duration-150 hover:bg-[rgba(0,212,255,0.08)]"
                style={{ border: "1px solid rgba(0,212,255,0.08)" }}
              >
                <span style={{ fontSize: "0.48rem", color: "rgba(100,140,180,0.7)", fontFamily: "Inter, sans-serif" }}>
                  {action}
                </span>
              </button>
            ))}
          </div>

          {/* AI model badge */}
          <div className="mt-auto px-2.5 py-2" style={{ borderTop: "1px solid rgba(0,212,255,0.06)" }}>
            <div className="flex flex-col gap-0.5">
              <span style={{ fontSize: "0.44rem", color: "rgba(30,60,90,0.8)", fontFamily: "Inter, monospace" }}>Model: BoneNet-v5.2</span>
              <span style={{ fontSize: "0.44rem", color: "rgba(30,60,90,0.8)", fontFamily: "Inter, monospace" }}>Trained: 2.4M scans</span>
              <span style={{ fontSize: "0.44rem", color: "rgba(30,60,90,0.8)", fontFamily: "Inter, monospace" }}>Sens: 98.7%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
