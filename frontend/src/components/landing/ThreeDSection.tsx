import { useRef, useEffect, useState } from "react";
import { motion } from "motion/react";
import { Layers, TrendingUp, Box, Clock, RotateCcw, Sliders, Eye } from "lucide-react";

// ── Canvas 3D bone renderer ──────────────────────────────────────────────────

type Seg = { t: number; r: number; ox: number };

const BONE_SEGS: Seg[] = [
  { t: 0.00, r: 0,  ox: -28 },
  { t: 0.04, r: 26, ox: -26 },
  { t: 0.08, r: 18, ox: -18 },
  { t: 0.12, r: 13, ox: -9  },
  { t: 0.16, r: 15, ox: 0   },
  { t: 0.19, r: 21, ox: 5   },
  { t: 0.23, r: 13, ox: 2   },
  { t: 0.30, r: 12, ox: 0   },
  { t: 0.50, r: 11, ox: 0   },
  { t: 0.68, r: 11, ox: 0   },
  { t: 0.78, r: 13, ox: -1  },
  { t: 0.86, r: 19, ox: 0   },
  { t: 0.92, r: 24, ox: -2  },
  { t: 0.96, r: 21, ox: 2   },
  { t: 1.00, r: 0,  ox: 0   },
];

type HeatPt = { t: number; color: [number, number, number]; radius: number; intensity: number };
const HEAT_PTS: HeatPt[] = [
  { t: 0.22, color: [239, 68, 68],   radius: 20, intensity: 0.8 },
  { t: 0.36, color: [249, 115, 22],  radius: 16, intensity: 0.55 },
  { t: 0.50, color: [234, 179, 8],   radius: 13, intensity: 0.35 },
  { t: 0.64, color: [34,  197, 94],  radius: 11, intensity: 0.22 },
  { t: 0.78, color: [59,  130, 246], radius: 12, intensity: 0.15 },
];

function lerpSeg(t: number): { r: number; ox: number } {
  for (let i = 0; i < BONE_SEGS.length - 1; i++) {
    const s1 = BONE_SEGS[i], s2 = BONE_SEGS[i + 1];
    if (t >= s1.t && t <= s2.t) {
      const u = s2.t === s1.t ? 0 : (t - s1.t) / (s2.t - s1.t);
      return { r: s1.r + u * (s2.r - s1.r), ox: s1.ox + u * (s2.ox - s1.ox) };
    }
  }
  return { r: 0, ox: 0 };
}

function drawBoneFrame(ctx: CanvasRenderingContext2D, angle: number, cw: number, ch: number) {
  ctx.clearRect(0, 0, cw, ch);

  const cx = cw / 2;
  const topY = ch * 0.04;
  const boneH = ch * 0.92;
  const cosA = Math.cos(angle);

  const N = 180;
  const lx: number[] = [], rx: number[] = [], ys: number[] = [], centers: number[] = [];

  for (let i = 0; i <= N; i++) {
    const t = i / N;
    const { r, ox } = lerpSeg(t);
    const y = topY + t * boneH;
    const projOx = ox * cosA;
    const halfW = r * Math.abs(cosA);
    lx.push(cx + projOx - halfW);
    rx.push(cx + projOx + halfW);
    ys.push(y);
    centers.push(cx + projOx);
  }

  // Bone silhouette fill
  ctx.beginPath();
  lx.forEach((x, i) => i === 0 ? ctx.moveTo(x, ys[i]) : ctx.lineTo(x, ys[i]));
  for (let i = N; i >= 0; i--) ctx.lineTo(rx[i], ys[i]);
  ctx.closePath();

  const bgrad = ctx.createLinearGradient(cx - 32, 0, cx + 32, 0);
  bgrad.addColorStop(0,    "rgba(35, 65, 115, 0.55)");
  bgrad.addColorStop(0.28, "rgba(100, 155, 220, 0.82)");
  bgrad.addColorStop(0.46, "rgba(185, 215, 255, 0.97)");
  bgrad.addColorStop(0.54, "rgba(195, 222, 255, 1.0)");
  bgrad.addColorStop(0.72, "rgba(100, 155, 220, 0.82)");
  bgrad.addColorStop(1,    "rgba(35, 65, 115, 0.55)");
  ctx.fillStyle = bgrad;
  ctx.fill();

  // Heatmap overlays
  HEAT_PTS.forEach(({ t, color, radius, intensity }) => {
    const idx = Math.min(Math.round(t * N), N);
    const centerX = centers[idx];
    const y = ys[idx];
    const hw = Math.max(Math.abs(cosA) * radius, 3);

    const hg = ctx.createRadialGradient(centerX, y, 0, centerX, y, hw * 1.8);
    hg.addColorStop(0,   `rgba(${color.join(",")}, ${intensity})`);
    hg.addColorStop(0.5, `rgba(${color.join(",")}, ${intensity * 0.45})`);
    hg.addColorStop(1,   `rgba(${color.join(",")}, 0)`);
    ctx.beginPath();
    ctx.ellipse(centerX, y, hw * 1.6, hw * 0.9, 0, 0, Math.PI * 2);
    ctx.fillStyle = hg;
    ctx.fill();
  });

  // Cortex highlight edges
  ctx.beginPath();
  lx.forEach((x, i) => i === 0 ? ctx.moveTo(x, ys[i]) : ctx.lineTo(x, ys[i]));
  ctx.strokeStyle = "rgba(175, 210, 255, 0.22)";
  ctx.lineWidth = 1;
  ctx.stroke();

  ctx.beginPath();
  rx.forEach((x, i) => i === 0 ? ctx.moveTo(x, ys[i]) : ctx.lineTo(x, ys[i]));
  ctx.stroke();

  // Femoral head (sphere)
  const headSeg = lerpSeg(0.04);
  const headCx = cx + headSeg.ox * cosA;
  const headY = topY + 0.04 * boneH;
  const headR = 26;

  ctx.beginPath();
  ctx.arc(headCx, headY, headR, 0, Math.PI * 2);
  const hg2 = ctx.createRadialGradient(
    headCx - headR * 0.32, headY - headR * 0.32, 0,
    headCx, headY, headR
  );
  hg2.addColorStop(0,   "rgba(215, 235, 255, 1)");
  hg2.addColorStop(0.55, "rgba(155, 195, 240, 0.95)");
  hg2.addColorStop(1,   "rgba(55, 100, 165, 0.7)");
  ctx.fillStyle = hg2;
  ctx.fill();

  // High stress on head (subcapital fracture risk)
  const hsHeat = ctx.createRadialGradient(headCx + 7, headY + 4, 0, headCx + 7, headY + 4, 16);
  hsHeat.addColorStop(0, "rgba(239,68,68,0.55)");
  hsHeat.addColorStop(1, "rgba(239,68,68,0)");
  ctx.beginPath();
  ctx.arc(headCx + 7, headY + 4, 16, 0, Math.PI * 2);
  ctx.fillStyle = hsHeat;
  ctx.fill();
}

function BoneCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const angleRef = useRef(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const W = 200, H = 400;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    canvas.style.width = `${W}px`;
    canvas.style.height = `${H}px`;
    ctx.scale(dpr, dpr);

    const tick = () => {
      angleRef.current += 0.006;
      drawBoneFrame(ctx, angleRef.current, W, H);
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return <canvas ref={canvasRef} style={{ display: "block" }} />;
}

// ── Section content ──────────────────────────────────────────────────────────

const FEATURES_3D = [
  { icon: Layers,     title: "Volumetric Density Mapping",   desc: "...",  color: "#a855f7" },
  { icon: TrendingUp, title: "Stress-Point Heatmaps",        desc: "...",    color: "#ef4444" },
  { icon: Box,        title: "STL Export for Surgery Prep",  desc: "...", color: "#00d4ff" },
  { icon: Clock,      title: "Longitudinal Healing Tracker", desc: "...",    color: "#00e5a0" },
];

const HEATMAP_LEGEND = [
  { label: "HIGH",   color: "#ef4444", desc: "> 80% risk" },
  { label: "MED",    color: "#f97316", desc: "50–80%"     },
  { label: "LOW",    color: "#eab308", desc: "20–50%"     },
  { label: "NORMAL", color: "#22c55e", desc: "< 20%"      },
  { label: "DENSE",  color: "#3b82f6", desc: "Sclerotic"  },
];

const VIEW_TABS = ["3D", "AP", "LAT", "AXIAL"];

export function ThreeDSection() {
  const [activeView, setActiveView] = useState(0);
  const [activeLayer, setActiveLayer] = useState(0);

  return (
    <section
      id="3d-analysis"
      className="relative py-24 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #020c18 0%, #04091a 50%, #020c18 100%)" }}
    >
      {/* Divider */}
      <div
        className="absolute top-0 inset-x-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent 0%, rgba(168,85,247,0.2) 30%, rgba(0,212,255,0.2) 70%, transparent 100%)" }}
      />

      {/* Dot-grid bg */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{ backgroundImage: "radial-gradient(rgba(168,85,247,1) 1px, transparent 1px)", backgroundSize: "36px 36px" }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-2 gap-14 items-start">

          {/* ── LEFT: COPY ── */}
          <motion.div
            initial={{ opacity: 0, x: -28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex flex-col gap-7 lg:pt-4"
          >
            {/* Badge */}
            <div className="inline-flex">
              <div
                className="flex items-center gap-2.5 px-3.5 py-2 rounded-full border"
                style={{ background: "rgba(168,85,247,0.07)", borderColor: "rgba(168,85,247,0.2)" }}
              >
                <motion.div
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: "#a855f7" }}
                  animate={{ opacity: [1, 0.25, 1] }}
                  transition={{ duration: 1.6, repeat: Infinity }}
                />
                <span style={{ fontSize: "0.68rem", fontWeight: 700, color: "#a855f7", letterSpacing: "0.07em", fontFamily: "Inter, sans-serif" }}>
                  PROXIMAMENTE
                </span>
              </div>
            </div>

            <div>
              <h2
                style={{
                  fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
                  fontWeight: 800,
                  letterSpacing: "-0.025em",
                  fontFamily: "Inter, sans-serif",
                  lineHeight: 1.08,
                  marginBottom: "1rem",
                  color: "#e8f4ff",
                }}
              >
                Advanced 3D Bone
                <br />
                <span
                  style={{
                    background: "linear-gradient(130deg, #a855f7 0%, #c084fc 55%, #e879f9 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  Analysis & Modeling.
                </span>
              </h2>
              <p style={{ fontSize: "0.9rem", color: "#3a5a7a", fontFamily: "Inter, sans-serif", lineHeight: 1.75, maxWidth: 480 }}>
                A partir de varias radiografías o de un estudio tomográfico, obtenga a un modelo óseo volumétrico 3D 
                completamente interactivo. La plataforma genera mapas de calor estructurales y gradientes de densidad visual, 
                destacando variaciones morfológicas para facilitar la comprensión anatómica.
              </p>
            </div>

            {/* Feature grid */}
            <div className="grid sm:grid-cols-2 gap-3.5">
              {FEATURES_3D.map(({ icon: Icon, title, desc, color }, i) => (
                <motion.div
                  key={title}
                  className="flex flex-col gap-2.5 p-4 rounded-xl"
                  style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.04)" }}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 + i * 0.08 }}
                  whileHover={{ background: `${color}07`, borderColor: `${color}22` }}
                >
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${color}12`, border: `1px solid ${color}22` }}>
                    <Icon className="w-4 h-4" style={{ color }} strokeWidth={2} />
                  </div>
                  <p style={{ fontSize: "0.82rem", fontWeight: 700, color: "#c0d8f0", fontFamily: "Inter, sans-serif" }}>{title}</p>
                  <p style={{ fontSize: "0.73rem", color: "#2a4a6a", fontFamily: "Inter, sans-serif", lineHeight: 1.6 }}>{desc}</p>
                </motion.div>
              ))}
            </div>

          </motion.div>

          {/* ── RIGHT: 3D VIEWPORT ── */}
          <motion.div
            initial={{ opacity: 0, x: 36 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="flex justify-center"
          >
            <div
              className="relative rounded-2xl overflow-hidden"
              style={{
                width: "100%",
                maxWidth: 460,
                background: "linear-gradient(145deg, #08041a, #0c0820)",
                border: "1px solid rgba(168,85,247,0.14)",
                boxShadow: "0 0 80px rgba(168,85,247,0.07), 0 0 160px rgba(0,212,255,0.03)",
              }}
            >
              {/* Viewport header */}
              <div
                className="flex items-center justify-between px-4 py-2.5"
                style={{ background: "rgba(4,2,14,0.9)", borderBottom: "1px solid rgba(168,85,247,0.1)" }}
              >
                <div className="flex items-center gap-2">
                  <span style={{ fontSize: "0.52rem", color: "rgba(168,85,247,0.55)", fontFamily: "Inter, monospace", fontWeight: 700, letterSpacing: "0.06em" }}>
                    3D BONE RENDERER · PREVIEW
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  {[RotateCcw, Sliders, Eye].map((Icon, i) => (
                    <button key={i} className="w-6 h-6 rounded flex items-center justify-center hover:bg-[rgba(168,85,247,0.1)] transition-colors">
                      <Icon className="w-3 h-3" style={{ color: "rgba(168,85,247,0.45)" }} strokeWidth={2} />
                    </button>
                  ))}
                </div>
              </div>

              {/* View tabs */}
              <div className="flex px-4 pt-2 gap-1" style={{ borderBottom: "1px solid rgba(168,85,247,0.06)" }}>
                {VIEW_TABS.map((tab, i) => (
                  <button
                    key={tab}
                    onClick={() => setActiveView(i)}
                    className="px-3 py-1.5 text-center transition-all duration-150"
                    style={{
                      background: activeView === i ? "rgba(168,85,247,0.12)" : "transparent",
                      borderBottom: activeView === i ? "1.5px solid #a855f7" : "1.5px solid transparent",
                      fontSize: "0.58rem",
                      fontWeight: 700,
                      color: activeView === i ? "#a855f7" : "rgba(100,80,160,0.5)",
                      fontFamily: "Inter, monospace",
                      letterSpacing: "0.06em",
                    }}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Main viewport */}
              <div
                className="relative flex items-center justify-center py-6"
                style={{ minHeight: 340 }}
              >
                {/* Grid floor */}
                <div
                  className="absolute inset-0 opacity-[0.04]"
                  style={{
                    backgroundImage: `
                      linear-gradient(rgba(168,85,247,1) 1px, transparent 1px),
                      linear-gradient(90deg, rgba(168,85,247,1) 1px, transparent 1px)
                    `,
                    backgroundSize: "28px 28px",
                  }}
                />

                {/* Ambient glow */}
                <div
                  className="absolute rounded-full pointer-events-none"
                  style={{
                    width: 280, height: 280,
                    top: "50%", left: "50%",
                    transform: "translate(-50%, -50%)",
                    background: "radial-gradient(circle, rgba(168,85,247,0.12) 0%, transparent 70%)",
                  }}
                />

                {/* Canvas bone */}
                <div className="relative z-10">
                  <BoneCanvas />
                </div>

                {/* Data annotation cards */}
                {[
                  { label: "Density",  value: "1.24 g/cm³", side: "left",  top: 60,  color: "#00d4ff" },
                  { label: "Stress",   value: "HIGH ⚠",     side: "right", top: 80,  color: "#ef4444" },
                  { label: "Volume",   value: "186 cm³",     side: "left",  top: 180, color: "#a855f7" },
                  { label: "T-Score",  value: "-1.8 SD",     side: "right", top: 200, color: "#f59e0b" },
                ].map(({ label, value, side, top, color }) => (
                  <motion.div
                    key={label}
                    className="absolute flex items-center gap-1.5"
                    style={{
                      top,
                      [side]: 12,
                      flexDirection: side === "right" ? "row-reverse" : "row",
                    }}
                    animate={{ y: [0, -3, 0] }}
                    transition={{ duration: 3.5 + Math.random() * 1.5, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <div
                      className="px-2 py-1 rounded-lg"
                      style={{ background: "rgba(4,2,14,0.92)", border: `1px solid ${color}25` }}
                    >
                      <div style={{ fontSize: "0.42rem", color: "rgba(100,140,180,0.6)", fontFamily: "Inter, monospace", fontWeight: 600 }}>{label}</div>
                      <div style={{ fontSize: "0.62rem", color, fontFamily: "Inter, monospace", fontWeight: 700 }}>{value}</div>
                    </div>
                    <div className="w-5 h-px" style={{ background: `linear-gradient(${side === "left" ? "90deg" : "-90deg"}, ${color}50, transparent)` }} />
                  </motion.div>
                ))}

                {/* Scanning ring */}
                <motion.div
                  className="absolute left-1/2 -translate-x-1/2 pointer-events-none"
                  style={{
                    width: 180, height: 8, borderRadius: "50%",
                    background: "radial-gradient(ellipse, rgba(0,212,255,0.35) 0%, transparent 70%)",
                    border: "1px solid rgba(0,212,255,0.18)",
                  }}
                  animate={{ top: ["12%", "88%", "12%"] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                />
              </div>

              {/* Heatmap legend */}
              <div
                className="flex items-center justify-between px-4 py-2.5"
                style={{ background: "rgba(4,2,14,0.85)", borderTop: "1px solid rgba(168,85,247,0.08)" }}
              >
                <div className="flex items-center gap-3">
                  {HEATMAP_LEGEND.map(({ label, color }) => (
                    <div key={label} className="flex items-center gap-1">
                      <div className="w-2 h-2 rounded-sm" style={{ background: color }} />
                      <span style={{ fontSize: "0.45rem", color: "rgba(100,80,150,0.6)", fontFamily: "Inter, monospace" }}>{label}</span>
                    </div>
                  ))}
                </div>
                <span style={{ fontSize: "0.45rem", color: "rgba(80,50,120,0.5)", fontFamily: "Inter, monospace" }}>
                  L FEMUR · 14 SLICES
                </span>
              </div>

              {/* Layer selector */}
              <div
                className="flex items-center gap-1.5 px-4 py-2"
                style={{ background: "rgba(3,2,12,0.9)", borderTop: "1px solid rgba(168,85,247,0.06)" }}
              >
                <span style={{ fontSize: "0.45rem", color: "rgba(80,60,120,0.6)", fontFamily: "Inter, monospace", marginRight: 4 }}>LAYER:</span>
                {["Full Bone", "Cortical", "Trabecular", "Marrow"].map((l, i) => (
                  <button
                    key={l}
                    onClick={() => setActiveLayer(i)}
                    className="px-2 py-0.5 rounded transition-all duration-150"
                    style={{
                      background: activeLayer === i ? "rgba(168,85,247,0.15)" : "transparent",
                      border: `1px solid ${activeLayer === i ? "rgba(168,85,247,0.3)" : "rgba(80,60,120,0.15)"}`,
                      fontSize: "0.44rem",
                      color: activeLayer === i ? "#c084fc" : "rgba(80,60,120,0.5)",
                      fontFamily: "Inter, monospace",
                    }}
                  >
                    {l}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
