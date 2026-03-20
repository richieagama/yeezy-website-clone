import React, { useEffect } from "react";
import { motion, useMotionValue, animate } from "framer-motion";
import { useTransform } from "framer-motion";

import "../styles/PaperModal.css";
import ProductImageSlider from "./ProductImageSlider";

/**
 * PaperModal:
 * - Slides in from the RIGHT (framer motion)
 * - Clicking overlay (outside paper) calls onClose() immediately
 * - Clicking inside paper does not close (we stopPropagation)
 * - Mobile-first responsive
 */
export default function PaperModal({ product, onClose }) {


  useEffect(() => {
    // close on Escape
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);




  // Motion value for horizontal drag
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  // const overlayOpacity = useTransform(x, [-220, 0, 220], [0.08, 0.35, 0.08]);

  // Tune these:
  const DISMISS_X = 140;
  const DISMISS_Y = 140;
  const DISMISS_VX = 900; // px/s
  const DISMISS_VY = 900; // px/s

  const handleDragEnd = (_event, info) => {

    // console.log(info);

    const dx = info.offset.x;
    const dy = info.offset.y;
    const vx = info.velocity.x;
    const vy = info.velocity.y;

    const dismissByDistance = Math.abs(dx) > DISMISS_X || Math.abs(dy) > DISMISS_Y;
    const dismissByVelocity = Math.abs(vx) > DISMISS_VX || Math.abs(vy) > DISMISS_VY;

    if (dismissByDistance || dismissByVelocity) {

      //decide which axis wins (stronger gesture)
      const useX = Math.abs(dx) * 1.0 + Math.abs(vx) * 0.2 >= Math.abs(dy) * 1.0 + Math.abs(vy) * 0.2;

      if(useX){
        const dirX = (dx !== 0 ? Math.sign(dx) : Math.sign(vx || 1));

        animate(x, dirX * window.innerWidth, {
          type: "spring",
          stiffness: 260,
          damping: 28,
          onComplete: onClose,
        });

        //keep y stable during x-dismiss
        animate(y, 0, {type: "spring", stiffness: 260, damping: 28});

      }else{
        const dirY = (dy !== 0 ? Math.sign(dy) : Math.sign(vy || 1));

        animate(y, dirY * window.innerHeight, {
          type: "spring",
          stiffness: 260,
          damping: 28,
          onComplete: onClose,
        });

        //keep x stable during y-dismiss
        animate(x, 0, {type: "spring", stiffness: 260, damping: 28});

      }


    }else{
      //else snap back to center
      animate(x, 0, {type: "spring", stiffness: 260, damping: 22});
      animate(y, 0, {type: "spring", stiffness: 260, damping: 22});

    }
  };




  // Overlay click directly calls onClose (immediate)
  return (
    <motion.div className="modal-overlay"  onClick={() => onClose()}>

      <motion.div
        className="paper-sheet"
        role="dialog"
        aria-modal="true"

        
        onClick={(e) => e.stopPropagation()}  // clicking inside does not close
        
        // ENTRY animation: from right to center
        initial={{ x: -580, opacity: 1 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 140, damping: 18 }}
        // DRAG behavior
        drag
        dragConstraints={{ left: 0, right: 0 , top: 0, bottom: 0}} // we control dismissal manually
        dragElastic={0.18} // a little stretch
        style={{ x, y }}
        onDragEnd={handleDragEnd}
      >


        <div className="paper-header">
          <div className="left type">1/13/26, 11:42 PM</div>
          <div className="center type">bsktbl-pdp-Hat-Mockup.png</div>
          <div className="right type">[i]</div>
        </div>

<div className="paper-body">

  <div className="item1">
    <div className="slip-brand">PORTFOLIO</div>
    <div className="slip-meta-grid">
      <span className="slip-label">LOT #</span>
      <span className="slip-label">MONTH</span>
      <span className="slip-label">YEAR</span>
      <span className="slip-label">ITEM #</span>
      <span>001</span>
      <span>{new Date(product.date).toLocaleString('default', { month: 'short' }).toUpperCase()}</span>
      <span>{new Date(product.date).getFullYear()}</span>
      <span>{String(product.id).padStart(3, '0')}</span>
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
    <div className="qty-large">{product.price}</div>
    <div className="brand-block">
      <div className="brand-stripes">
        <span /><span /><span />
      </div>
      <div className="brand-word">PORTFOLIO</div>
    </div>
    <div className="barcode-block">
      <div className="barcode-bars" />
      <div className="barcode-label">R.AGAMA · {new Date(product.date).getFullYear()}</div>
    </div>
  </div>

  <div className="item4">
    <table className="paper-table">
      <thead>
        <tr>
          <th>PRODUCT</th>
          <th>NOTES</th>
          <th>QTY</th>
          <th>DESCRIPTION</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>001&nbsp;&nbsp;{product.name.toUpperCase()}</td>
          <td>—</td>
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
