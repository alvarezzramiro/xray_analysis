import { Activity, Mail } from "lucide-react";

import { Twitter, Github, Linkedin } from "@/components/ui/SocialIcons";

const links = {
  Product: ["Features", "3D Analysis", "Integrations", "API Reference", "Changelog"],
  Company: ["About", "Blog", "Careers", "Press Kit", "Contact"],
  Legal: ["Privacy Policy", "Terms of Service", "HIPAA BAA", "Cookie Policy", "Accessibility"],
  Resources: ["Documentation", "Research Papers", "Case Studies", "Webinars", "Support"],
};

const socials = [
  { icon: Twitter, label: "Twitter" },
  { icon: Github, label: "GitHub" },
  { icon: Linkedin, label: "LinkedIn" },
  { icon: Mail, label: "Email" },
];

const complianceBadges = ["HIPAA", "GDPR", "ISO 13485", "SOC 2 Type II"];

export function Footer() {
  return (
    <footer
      style={{
        background: "linear-gradient(180deg, #030b14 0%, #02080f 100%)",
        borderTop: "1px solid rgba(0,212,255,0.07)",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16">

        {/* Top: Brand + Links */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-10 mb-14">
          {/* Brand column */}
          <div className="col-span-2 sm:col-span-3 lg:col-span-1 flex flex-col gap-5">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-[#00d4ff]/10 border border-[#00d4ff]/30 flex items-center justify-center">
                <Activity className="w-3.5 h-3.5 text-[#00d4ff]" strokeWidth={2.5} />
              </div>
              <span
                className="text-[#e8f4ff]"
                style={{ fontSize: "1.05rem", fontWeight: 700, fontFamily: "Inter, sans-serif" }}
              >
                Fractur<span className="text-[#00d4ff]">AI</span>
              </span>
            </div>
            <p style={{ fontSize: "0.8rem", color: "#2a4a6a", lineHeight: 1.7, fontFamily: "Inter, sans-serif", maxWidth: "200px" }}>
              AI-powered bone fracture detection and 3D analysis.
            </p>
            {/* Socials */}
            <div className="flex items-center gap-3">
              {socials.map(({ icon: Icon, label }) => (
                <button
                  key={label}
                  aria-label={label}
                  className="w-7 h-7 rounded-lg flex items-center justify-center border border-[#0f2035] hover:border-[#00d4ff]/30 hover:bg-[#00d4ff]/05 transition-all duration-200"
                >
                  <Icon className="w-3.5 h-3.5 text-[#2a4a6a] hover:text-[#6b8cae]" strokeWidth={2} />
                </button>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(links).map(([category, items]) => (
            <div key={category} className="flex flex-col gap-4">
              <h4
                style={{
                  fontSize: "0.7rem",
                  fontWeight: 700,
                  color: "#4a6a8a",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  fontFamily: "Inter, sans-serif",
                }}
              >
                {category}
              </h4>
              <ul className="flex flex-col gap-2.5">
                {items.map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      style={{ fontSize: "0.8rem", color: "#2a4a6a", fontFamily: "Inter, sans-serif", fontWeight: 400 }}
                      className="hover:text-[#6b8cae] transition-colors duration-200"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="h-px mb-8" style={{ background: "rgba(0,212,255,0.06)" }} />

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 flex-wrap justify-center sm:justify-start">
            {complianceBadges.map((badge) => (
              <span
                key={badge}
                className="px-2.5 py-1 rounded-md"
                style={{
                  fontSize: "0.6rem",
                  fontWeight: 700,
                  color: "#2a4a6a",
                  background: "rgba(0,212,255,0.05)",
                  border: "1px solid rgba(0,212,255,0.1)",
                  letterSpacing: "0.06em",
                  fontFamily: "Inter, sans-serif",
                }}
              >
                {badge}
              </span>
            ))}
          </div>

          <p style={{ fontSize: "0.72rem", color: "#1a3050", fontFamily: "Inter, sans-serif" }}>
            FracturAI - 2026
          </p>
        </div>
      </div>
    </footer>
  );
}
