import React, { useState, useEffect } from "react";
import { motion, useMotionValue, useAnimationControls, animate } from "framer-motion";

import "../styles/PaperModal.css";
import ProductImageSlider from "./ProductImageSlider";

export default function PaperModal({ product, onClose }) {
  const [isDismissing, setIsDismissing] = useState(false);

  useEffect(() => {
    const handleEsc = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  // Motion values — x/y for drag, rotate for gravity-fall tilt
  const x      = useMotionValue(0);
  const y      = useMotionValue(0);
  const rotate = useMotionValue(0);

  // Controls the overlay background independently from the paper child
  const overlayControls = useAnimationControls();

  // ── Overlay-click dismiss: gravity fall ────────────────────────────────────
  const handleOverlayClick = () => {
    if (isDismissing) return;
    setIsDismissing(true);

    // Fade the backdrop out while the paper is still visible and falling
    overlayControls.start({
      backgroundColor: "rgba(250,250,249,0)",
      transition: { duration: 0.48, ease: "easeOut" },
    });

    // y: ease-in tween → simulates gravity (slow start, accelerates off-screen)
    animate(y, window.innerHeight + 320, {
      type: "tween",
      duration: 0.54,
      ease: [0.4, 0, 1, 0.48],
      onComplete: onClose,
    });

    // random tilt between -10° and +10° — different every dismiss
    const tiltDeg = (Math.random() * 10 - 5);

    animate(rotate, tiltDeg, {
      type: "spring",
      stiffness: 95,
      damping: 9,
      mass: 1.2,
    });

    // x-drift follows the tilt direction so the paper "slides" the way it leans
    animate(x, tiltDeg * 4.2, {
      type: "spring",
      stiffness: 85,
      damping: 14,
    });
  };

  // ── Swipe-to-dismiss (unchanged) ──────────────────────────────────────────
  const DISMISS_X  = 140;
  const DISMISS_Y  = 140;
  const DISMISS_VX = 900;
  const DISMISS_VY = 900;

  const handleDragEnd = (_event, info) => {
    if (isDismissing) return;

    const dx = info.offset.x;
    const dy = info.offset.y;
    const vx = info.velocity.x;
    const vy = info.velocity.y;

    const dismissByDistance = Math.abs(dx) > DISMISS_X || Math.abs(dy) > DISMISS_Y;
    const dismissByVelocity = Math.abs(vx) > DISMISS_VX || Math.abs(vy) > DISMISS_VY;

    if (dismissByDistance || dismissByVelocity) {
      const useX = Math.abs(dx) + Math.abs(vx) * 0.2 >= Math.abs(dy) + Math.abs(vy) * 0.2;

      if (useX) {
        const dirX = dx !== 0 ? Math.sign(dx) : Math.sign(vx || 1);
        animate(x, dirX * window.innerWidth,  { type: "spring", stiffness: 260, damping: 28, onComplete: onClose });
        animate(y, 0,                          { type: "spring", stiffness: 260, damping: 28 });
      } else {
        const dirY = dy !== 0 ? Math.sign(dy) : Math.sign(vy || 1);
        animate(y, dirY * window.innerHeight,  { type: "spring", stiffness: 260, damping: 28, onComplete: onClose });
        animate(x, 0,                          { type: "spring", stiffness: 260, damping: 28 });
      }
    } else {
      animate(x, 0, { type: "spring", stiffness: 260, damping: 22 });
      animate(y, 0, { type: "spring", stiffness: 260, damping: 22 });
    }
  };

  // ─────────────────────────────────────────────────────────────────────────
  return (
    <motion.div
      className="modal-overlay"
      initial={{ backgroundColor: "rgba(250,250,249,0.9)" }}
      animate={overlayControls}
      onClick={handleOverlayClick}
    >

      <motion.div
        className="paper-sheet"
        role="dialog"
        aria-modal="true"

        onClick={(e) => e.stopPropagation()}

        // Entry: slides in from the left
        initial={{ x: -580, opacity: 1 }}
        animate={{ x: 0,    opacity: 1 }}
        transition={{ type: "spring", stiffness: 140, damping: 18 }}

        // Drag — disabled once the gravity fall starts
        drag={!isDismissing}
        dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
        dragElastic={0.18}
        style={{ x, y, rotate }}
        onDragEnd={handleDragEnd}
      >


        <div className="paper-header">
          <div className="left type">1/13/26, 11:42 PM</div>
          <div className="center type">bsktbl-pdp-Hat-Mockup.png</div>
          <div className="right type">[i]</div>
        </div>

<div className="paper-body">

  <div className="item1">
    <div className="slip-brand">PACKAGE</div>
    <div className="slip-meta-grid">
      <span className="slip-label">LOT #</span>
      <span className="slip-label">MONTH</span>
      <span className="slip-label">YEAR</span>
      {/* <span className="slip-label">ITEM #</span> */}
      <span className="tung-tung-sahur">001</span>
      <span className="tung-tung-sahur">{new Date(product.date).toLocaleString('default', { month: 'short' }).toUpperCase()}</span>
      <span className="tung-tung-sahur">{new Date(product.date).getFullYear()}</span>
      {/* <span className="tung-tung-sahur">{String(product.id).padStart(3, '0')}</span> */}
    </div>
    <div className="slip-contact-block">
      <div><span className="slip-label">FROM:</span> R. AGAMA</div>
      <div><span className="slip-label">CONTACT:</span> THE FOOT</div>
    </div>
  </div>

  <div className="item2">
    <span className="item-name-label">ITEM NAME:</span>
    <div className="item-name-value">{product.name}</div>
  </div>

  <div className="item3">
    
    <div className="brand-block">
      <ProductImageSlider images={product.images} />
    </div>
    <div className="barcode-block">
      <div className="qty-large">{product.price}</div>
      <div className="barcode-bars">03815402</div>
      <div className="barcode-label">0010010100 {/*new Date(product.date).getFullYear()*/}</div>
    </div>
  </div>

  <div className="item4">
    <table className="paper-table">
      <thead>
        <tr>
          <th>PRODUCT</th>
          <th>QTY</th>
          <th>DESCRIPTION</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>001&nbsp;&nbsp;{product.name.toUpperCase()}</td>
          <td>1</td>
          <td>{product.description}</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div className="item5">
    <div className="slip-footer-strip">
      <span>{product.date}</span>
      <span>© {new Date().getFullYear()} PORTFOLIO</span>
    </div>
  </div>

</div>

        <div className="paper-footer">
          <div className="footer-left type">{product.id}/3</div>
                    {/* <div className="footer-left">Printed: {new Date().toLocaleDateString()}</div> */}
          {/* <div className="footer-center type">34.103158, -118.285103</div> */}
          <div className="footer-right type">{product.filepath}</div>
        </div>


      </motion.div>
    
    
    </motion.div>
  );
}
