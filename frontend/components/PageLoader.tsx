"use client";

import { useEffect, useState } from "react";

export default function PageLoader() {
  const [phase, setPhase] = useState<"loading" | "exit" | "done">("loading");

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("exit"), 1800);
    const t2 = setTimeout(() => setPhase("done"), 2400);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  if (phase === "done") return null;

  const blades = [
    "#DC2626", "#111111", "#DC2626", "#111111",
    "#DC2626", "#111111", "#DC2626", "#111111",
  ];

  return (
    <div
      style={{
        position: "fixed", inset: 0, zIndex: 9999,
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        backgroundColor: "white", gap: "20px",
        opacity: phase === "exit" ? 0 : 1,
        transition: "opacity 0.5s ease-out",
        pointerEvents: phase === "exit" ? "none" : "all",
      }}
    >
      {/* Spinning pinwheel with fixed R in center */}
      <div style={{ position: "relative", width: 100, height: 100 }}>

        {/* The spinning wheel */}
        <svg
          width="100" height="100" viewBox="0 0 100 100"
          style={{ animation: "spinWheel 1s linear infinite", display: "block" }}
        >
          {blades.map((color, i) => (
            <g key={i} transform={`rotate(${i * 45}, 50, 50)`}>
              <polygon points="50,50 38,8 62,8" fill={color} opacity="0.93" />
            </g>
          ))}
        </svg>

        {/* White circle + R — stationary */}
        <div style={{
          position: "absolute", inset: 0,
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <div style={{
            width: 38, height: 38, borderRadius: "50%",
            backgroundColor: "white",
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "0 0 0 2px rgba(220,38,38,0.15)",
          }}>
            <span style={{
              fontFamily: "Georgia, serif", fontSize: "23px",
              fontWeight: "900", color: "#DC2626",
              lineHeight: 1, userSelect: "none",
            }}>R</span>
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div style={{ width: 72, height: 2, backgroundColor: "#f0f0f0", borderRadius: 999, overflow: "hidden" }}>
        <div style={{
          height: "100%",
          background: "linear-gradient(90deg, #DC2626, #991B1B)",
          borderRadius: 999,
          animation: "loadBar 1.6s cubic-bezier(0.4,0,0.2,1) 0.1s both",
        }} />
      </div>

      <style>{`
        @keyframes spinWheel {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes loadBar {
          from { width: 0%; }
          to   { width: 100%; }
        }
      `}</style>
    </div>
  );
}