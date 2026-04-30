import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import ProductCard from "./ProductCard";
import "../styles/ProductGrid.css";

const COLS_ALL     = [1, 3, 6];
const COLS_DESKTOP = [3, 6];       // no single-column view on desktop
const MOBILE_BP    = 768;
const PINCH_PX     = 28;           // min distance-delta to register a gesture

const isMobile  = () => window.innerWidth < MOBILE_BP;
const initCols  = (mob) => (mob ? 3 : 6);
const hypot2    = (t) => Math.hypot(t[0].clientX - t[1].clientX, t[0].clientY - t[1].clientY);

const cardVariants = {
  hidden: { opacity: 0, scale: 0.82 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 340, damping: 26 },
  },
};

export default function ProductGrid({ products, onSelect }) {
  const mobRef  = useRef(isMobile());
  const [cols, setCols] = useState(() => initCols(mobRef.current));
  const gridRef = useRef(null);

  // Reset to default cols when the user crosses the mobile / desktop breakpoint
  useEffect(() => {
    const onResize = () => {
      const now = isMobile();
      if (now !== mobRef.current) {
        mobRef.current = now;
        setCols(initCols(now));
      }
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Pinch-to-zoom: spread = fewer cols (zoom in), pinch = more cols (zoom out)
  useEffect(() => {
    const el = gridRef.current;
    if (!el) return;

    let anchor = null;   // distance at gesture start
    let fired  = false;  // one change per gesture

    const onStart = (e) => {
      if (e.touches.length === 2) {
        anchor = hypot2(e.touches);
        fired  = false;
      }
    };

    const onMove = (e) => {
      if (e.touches.length !== 2 || anchor === null || fired) return;
      const delta = hypot2(e.touches) - anchor;
      if (Math.abs(delta) < PINCH_PX) return;

      fired = true;
      const spreading = delta > 0; // true → spread → fewer cols

      setCols((prev) => {
        const available = mobRef.current ? COLS_ALL : COLS_DESKTOP;
        const i = available.indexOf(prev);
        if (spreading) return i > 0                  ? available[i - 1] : prev;
        else           return i < available.length-1 ? available[i + 1] : prev;
      });
    };

    const onEnd = () => { anchor = null; fired = false; };

    el.addEventListener("touchstart", onStart, { passive: true });
    el.addEventListener("touchmove",  onMove,  { passive: true });
    el.addEventListener("touchend",   onEnd);
    return () => {
      el.removeEventListener("touchstart", onStart);
      el.removeEventListener("touchmove",  onMove);
      el.removeEventListener("touchend",   onEnd);
    };
  }, []);

  return (
    <motion.section
      ref={gridRef}
      className="product-grid"
      aria-label="Product grid"
      style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
      layout
      transition={{ layout: { type: "spring", stiffness: 280, damping: 32 } }}
    >
      {products.map((p, i) => (
        <motion.div
          key={p.id}
          layout
          className="product-grid-item"
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          transition={{
            layout: { type: "spring", stiffness: 320, damping: 30 },
            delay: i * 0.04,
          }}
          whileTap={{ scale: 0.96 }}
        >
          <ProductCard product={p} onClick={() => onSelect(p)} />
        </motion.div>
      ))}
    </motion.section>
  );
}
