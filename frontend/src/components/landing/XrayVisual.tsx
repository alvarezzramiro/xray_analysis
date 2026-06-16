import { motion } from "motion/react";

export function XrayVisual() {
  return (
    <div className="relative w-full max-w-lg mx-auto">
      {/* Outer glow */}
      <div className="absolute -inset-6 bg-[#00d4ff]/5 rounded-3xl blur-2xl" />

      {/* Main viewer panel */}
      <div
        className="relative rounded-2xl overflow-hidden border border-[#00d4ff]/20 shadow-[0_0_60px_rgba(0,212,255,0.08)]"
        style={{ background: "#010810", aspectRatio: "3/4" }}
      >
        {/* HUD corner markers */}
        {["top-3 left-3", "top-3 right-3", "bottom-3 left-3", "bottom-3 right-3"].map((pos, i) => (
          <div key={i} className={`absolute ${pos} w-5 h-5`}>
            <div
              className={`absolute ${i < 2 ? "top-0" : "bottom-0"} ${i % 2 === 0 ? "left-0" : "right-0"} w-full h-full`}
              style={{
                borderTop: i < 2 ? "2px solid rgba(0,212,255,0.5)" : "none",
                borderBottom: i >= 2 ? "2px solid rgba(0,212,255,0.5)" : "none",
                borderLeft: i % 2 === 0 ? "2px solid rgba(0,212,255,0.5)" : "none",
                borderRight: i % 2 === 1 ? "2px solid rgba(0,212,255,0.5)" : "none",
              }}
            />
          </div>
        ))}

        {/* Medical metadata overlay */}
        <div className="absolute top-5 left-5 z-10">
          <div style={{ fontSize: "0.6rem", fontFamily: "Inter, monospace", color: "rgba(0,212,255,0.5)", lineHeight: 1.8 }}>
            <div>PT: [ANONYMIZED]</div>
            <div>DATE: 2026-06-06</div>
            <div>MOD: CR • ACC: 2.4M</div>
            <div>SERIES: 3 / 12</div>
          </div>
        </div>

        <div className="absolute top-5 right-5 z-10 text-right">
          <div style={{ fontSize: "0.6rem", fontFamily: "Inter, monospace", color: "rgba(0,212,255,0.5)", lineHeight: 1.8 }}>
            <div>kV: 65 • mAs: 4</div>
            <div>SID: 110 cm</div>
            <div>L FOREARM AP</div>
          </div>
        </div>

        {/* X-ray SVG — stylized forearm / wrist */}
        <svg
          viewBox="0 0 300 400"
          className="absolute inset-0 w-full h-full"
          style={{ filter: "contrast(1.1)" }}
        >
          <defs>
            <radialGradient id="boneGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(220,230,245,0.85)" />
              <stop offset="70%" stopColor="rgba(180,200,225,0.55)" />
              <stop offset="100%" stopColor="rgba(140,165,200,0.25)" />
            </radialGradient>
            <radialGradient id="boneGlow2" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(200,215,235,0.75)" />
              <stop offset="65%" stopColor="rgba(160,185,215,0.45)" />
              <stop offset="100%" stopColor="rgba(120,150,190,0.2)" />
            </radialGradient>
            <filter id="softBlur">
              <feGaussianBlur stdDeviation="1.5" />
            </filter>
            <filter id="boneTexture">
              <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" result="noise" />
              <feColorMatrix type="saturate" values="0" in="noise" result="grayNoise" />
              <feBlend in="SourceGraphic" in2="grayNoise" mode="overlay" result="blend" />
              <feComposite in="blend" in2="SourceGraphic" operator="in" />
            </filter>
          </defs>

          {/* Background: subtle X-ray film texture */}
          <rect width="300" height="400" fill="#000a14" />
          <rect width="300" height="400" fill="url(#bgPattern)" opacity="0.03" />

          {/* === RADIUS (left/wider bone) === */}
          <g opacity="0.82">
            {/* Bone shaft */}
            <ellipse cx="118" cy="265" rx="18" ry="95" fill="url(#boneGlow)" />
            {/* Cortex edge highlight */}
            <ellipse cx="118" cy="265" rx="18" ry="95" fill="none" stroke="rgba(230,240,255,0.3)" strokeWidth="1.5" />
            {/* Medullary canal */}
            <ellipse cx="118" cy="265" rx="9" ry="85" fill="rgba(5,20,40,0.5)" />
            {/* Distal end (wrist) */}
            <ellipse cx="118" cy="175" rx="22" ry="12" fill="url(#boneGlow)" />
            {/* Proximal end (elbow) */}
            <ellipse cx="118" cy="358" rx="20" ry="10" fill="url(#boneGlow)" />
            {/* Styloid process */}
            <ellipse cx="104" cy="172" rx="5" ry="8" fill="rgba(180,200,230,0.55)" />
          </g>

          {/* === ULNA (right/narrower bone) === */}
          <g opacity="0.75">
            <ellipse cx="162" cy="260" rx="12" ry="88" fill="url(#boneGlow2)" />
            <ellipse cx="162" cy="260" rx="12" ry="88" fill="none" stroke="rgba(230,240,255,0.25)" strokeWidth="1" />
            <ellipse cx="162" cy="260" rx="6" ry="78" fill="rgba(5,20,40,0.45)" />
            {/* Olecranon (elbow end) */}
            <ellipse cx="162" cy="352" rx="14" ry="10" fill="url(#boneGlow2)" />
            {/* Ulnar head */}
            <ellipse cx="172" cy="175" rx="10" ry="8" fill="rgba(180,200,230,0.5)" />
          </g>

          {/* === FRACTURE LINE on Radius === */}
          <g>
            {/* Cortical break */}
            <path
              d="M104 230 L118 226 L132 228"
              stroke="rgba(0,212,255,0.12)"
              strokeWidth="4"
              fill="none"
              strokeLinecap="round"
            />
            <path
              d="M105 231 Q113 227 121 228 Q127 226 133 229"
              stroke="rgba(30,60,90,0.6)"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
            />
            <path
              d="M105 232 Q113 228 121 229 Q127 227 133 230"
              stroke="rgba(0,212,255,0.08)"
              strokeWidth="1.5"
              fill="none"
              strokeLinecap="round"
            />
          </g>

          {/* === CARPAL BONES (wrist cluster) === */}
          {[
            { cx: 105, cy: 158, rx: 9, ry: 7 },
            { cx: 121, cy: 155, rx: 8, ry: 7 },
            { cx: 137, cy: 158, rx: 7, ry: 6 },
            { cx: 150, cy: 162, rx: 7, ry: 6 },
            { cx: 100, cy: 144, rx: 8, ry: 6 },
            { cx: 115, cy: 141, rx: 8, ry: 6 },
            { cx: 130, cy: 143, rx: 7, ry: 6 },
            { cx: 144, cy: 147, rx: 7, ry: 6 },
          ].map((bone, i) => (
            <g key={i} opacity="0.7">
              <ellipse {...bone} fill="rgba(190,210,235,0.55)" />
              <ellipse {...bone} fill="none" stroke="rgba(220,235,255,0.2)" strokeWidth="0.8" />
            </g>
          ))}

          {/* === METACARPALS === */}
          {[
            { x1: 96, y1: 135, x2: 92, y2: 80, w: 8 },
            { x1: 112, y1: 132, x2: 110, y2: 70, w: 7 },
            { x1: 126, y1: 133, x2: 126, y2: 72, w: 7 },
            { x1: 139, y1: 136, x2: 141, y2: 78, w: 6 },
            { x1: 150, y1: 141, x2: 155, y2: 88, w: 5 },
          ].map((m, i) => (
            <g key={i} opacity="0.65">
              <line
                x1={m.x1} y1={m.y1} x2={m.x2} y2={m.y2}
                stroke={`rgba(185,205,230,0.6)`}
                strokeWidth={m.w}
                strokeLinecap="round"
              />
              <line
                x1={m.x1} y1={m.y1} x2={m.x2} y2={m.y2}
                stroke="rgba(5,20,40,0.35)"
                strokeWidth={m.w - 3}
                strokeLinecap="round"
              />
            </g>
          ))}

          {/* Proximal phalanges */}
          {[
            { x1: 90, y1: 78, x2: 85, y2: 52 },
            { x1: 108, y1: 68, x2: 106, y2: 42 },
            { x1: 124, y1: 70, x2: 124, y2: 44 },
            { x1: 139, y1: 76, x2: 140, y2: 52 },
            { x1: 153, y1: 86, x2: 157, y2: 65 },
          ].map((p, i) => (
            <line
              key={i}
              x1={p.x1} y1={p.y1} x2={p.x2} y2={p.y2}
              stroke="rgba(175,198,225,0.55)"
              strokeWidth={5 - i * 0.3}
              strokeLinecap="round"
              opacity="0.7"
            />
          ))}

          {/* Middle phalanges (fingers 2-5) */}
          {[
            { x1: 106, y1: 40, x2: 105, y2: 22 },
            { x1: 124, y1: 42, x2: 124, y2: 24 },
            { x1: 140, y1: 50, x2: 141, y2: 34 },
          ].map((p, i) => (
            <line
              key={i}
              x1={p.x1} y1={p.y1} x2={p.x2} y2={p.y2}
              stroke="rgba(165,190,220,0.5)"
              strokeWidth="3.5"
              strokeLinecap="round"
              opacity="0.65"
            />
          ))}

          {/* Soft tissue outline */}
          <path
            d="M70 380 C65 300, 60 200, 68 150 C75 110, 80 80, 75 50 C80 30, 90 20, 92 50 C88 80, 90 100, 88 120 C100 100, 102 70, 100 48 C103 30, 112 20, 114 48 C112 70, 114 100, 114 120 C118 100, 120 70, 120 46 C122 28, 131 20, 132 46 C130 70, 130 100, 132 122 C136 102, 138 75, 140 56 C143 36, 152 30, 153 56 C151 76, 150 100, 152 120 C154 100, 155 78, 158 65 C162 48, 168 45, 168 65 C165 82, 162 100, 165 130 C172 145, 185 160, 195 200 C200 230, 200 300, 195 380 Z"
            fill="none"
            stroke="rgba(80,110,150,0.15)"
            strokeWidth="1.5"
          />
        </svg>

        {/* === Scanning line animation === */}
        <motion.div
          className="absolute left-0 right-0 h-px pointer-events-none"
          style={{
            background: "linear-gradient(90deg, transparent 0%, rgba(0,212,255,0.6) 30%, rgba(0,212,255,0.9) 50%, rgba(0,212,255,0.6) 70%, transparent 100%)",
            boxShadow: "0 0 12px 2px rgba(0,212,255,0.4)",
          }}
          animate={{ top: ["8%", "92%", "8%"] }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        />

        {/* === AI Detection Bounding Box === */}
        <motion.div
          className="absolute pointer-events-none"
          style={{ top: "53%", left: "28%", width: "32%", height: "16%" }}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: [0, 1, 1, 1, 0] }}
          transition={{ duration: 3.5, delay: 1.8, repeat: Infinity, times: [0, 0.15, 0.5, 0.85, 1] }}
        >
          {/* Box */}
          <div
            className="absolute inset-0 rounded"
            style={{
              border: "1.5px solid #00d4ff",
              boxShadow: "0 0 14px rgba(0,212,255,0.45), inset 0 0 14px rgba(0,212,255,0.05)",
            }}
          />
          {/* Corner accents */}
          {[
            "top-0 left-0 border-t-2 border-l-2",
            "top-0 right-0 border-t-2 border-r-2",
            "bottom-0 left-0 border-b-2 border-l-2",
            "bottom-0 right-0 border-b-2 border-r-2",
          ].map((cls, i) => (
            <div key={i} className={`absolute w-3 h-3 ${cls} border-[#00d4ff]`} />
          ))}
          {/* Label */}
          <motion.div
            className="absolute -top-7 left-0 flex items-center gap-1.5 px-2 py-1 rounded"
            style={{ background: "#00d4ff", backdropFilter: "blur(4px)" }}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: [0, 1, 1, 0] }}
            transition={{ duration: 3.5, delay: 2, repeat: Infinity, times: [0, 0.1, 0.85, 1] }}
          >
            <div className="w-1.5 h-1.5 rounded-full bg-[#030b14] animate-pulse" />
            <span
              className="text-[#030b14]"
              style={{ fontSize: "0.6rem", fontWeight: 800, letterSpacing: "0.04em", fontFamily: "Inter, monospace" }}
            >
              FRACTURE · 97.3%
            </span>
          </motion.div>
          {/* Confidence bar */}
          <motion.div
            className="absolute -bottom-8 left-0 right-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 1, 0] }}
            transition={{ duration: 3.5, delay: 2.1, repeat: Infinity, times: [0, 0.1, 0.85, 1] }}
          >
            <div className="flex items-center gap-1.5">
              <div className="h-1 rounded-full flex-1 bg-[rgba(0,212,255,0.15)]">
                <div className="h-1 rounded-full bg-[#00d4ff] w-[97.3%]" />
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* === Secondary detection marker (smaller) === */}
        <motion.div
          className="absolute pointer-events-none"
          style={{ top: "48%", left: "47%", width: "14%", height: "7%" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.7, 0] }}
          transition={{ duration: 3.5, delay: 2.2, repeat: Infinity, times: [0, 0.5, 1] }}
        >
          <div
            className="absolute inset-0 rounded"
            style={{ border: "1px solid rgba(255,170,0,0.7)", boxShadow: "0 0 8px rgba(255,170,0,0.3)" }}
          />
          <div
            className="absolute -top-5 left-0 px-1.5 py-0.5 rounded"
            style={{ background: "rgba(255,170,0,0.9)" }}
          >
            <span style={{ fontSize: "0.5rem", fontWeight: 700, color: "#030b14", fontFamily: "Inter, monospace" }}>
              POSSIBLE · 42%
            </span>
          </div>
        </motion.div>

        {/* === Bottom status bar === */}
        <div
          className="absolute bottom-0 left-0 right-0 flex items-center justify-between px-4 py-2"
          style={{ background: "rgba(1,8,20,0.9)", borderTop: "1px solid rgba(0,212,255,0.1)" }}
        >
          <div className="flex items-center gap-2">
            <motion.div
              className="w-1.5 h-1.5 rounded-full bg-[#00d4ff]"
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.2, repeat: Infinity }}
            />
            <span style={{ fontSize: "0.55rem", color: "rgba(0,212,255,0.7)", fontFamily: "Inter, monospace", fontWeight: 600 }}>
              AI ANALYZING
            </span>
          </div>
          <span style={{ fontSize: "0.55rem", color: "rgba(100,140,180,0.6)", fontFamily: "Inter, monospace" }}>
            BoneAI v2.4.1 · DICOM
          </span>
        </div>
      </div>

      {/* Side floating cards */}
      <motion.div
        className="absolute -right-4 top-16 lg:-right-20"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, delay: 1 }}
      >
        <div
          className="px-3 py-2.5 rounded-xl border border-[#00d4ff]/20 backdrop-blur-xl"
          style={{ background: "rgba(10,20,40,0.9)", minWidth: "120px" }}
        >
          <div style={{ fontSize: "0.55rem", color: "rgba(0,212,255,0.6)", fontWeight: 600, letterSpacing: "0.06em", fontFamily: "Inter, sans-serif" }}>
            ACCURACY
          </div>
          <div style={{ fontSize: "1.4rem", fontWeight: 800, color: "#00d4ff", fontFamily: "Inter, sans-serif", lineHeight: 1.2 }}>
            98.7<span style={{ fontSize: "0.8rem" }}>%</span>
          </div>
          <div style={{ fontSize: "0.55rem", color: "rgba(100,140,180,0.7)", fontFamily: "Inter, sans-serif" }}>
            vs 89.2% manual
          </div>
        </div>
      </motion.div>

      <motion.div
        className="absolute -left-4 bottom-24 lg:-left-20"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, delay: 1.3 }}
      >
        <div
          className="px-3 py-2.5 rounded-xl border border-[#00e5a0]/20 backdrop-blur-xl"
          style={{ background: "rgba(10,20,40,0.9)", minWidth: "110px" }}
        >
          <div style={{ fontSize: "0.55rem", color: "rgba(0,229,160,0.6)", fontWeight: 600, letterSpacing: "0.06em", fontFamily: "Inter, sans-serif" }}>
            SPEED
          </div>
          <div style={{ fontSize: "1.4rem", fontWeight: 800, color: "#00e5a0", fontFamily: "Inter, sans-serif", lineHeight: 1.2 }}>
            1.2<span style={{ fontSize: "0.8rem" }}>s</span>
          </div>
          <div style={{ fontSize: "0.55rem", color: "rgba(100,140,180,0.7)", fontFamily: "Inter, sans-serif" }}>
            per scan
          </div>
        </div>
      </motion.div>
    </div>
  );
}
