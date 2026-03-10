"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function PageLoader() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 1800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "white",
          }}
        >
          <motion.img
            src="/images/Ricrene logo transparent.png"
            alt="Ricrene"
            animate={{ scale: [1, 1.08, 1] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            style={{ width: 130, height: 130, objectFit: "contain" }}
            onError={(e) => {
              const img = e.currentTarget;
              if (!img.src.includes("Ricrene_logo")) {
                img.src = "/images/Ricrene_logo.jpeg";
              }
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}