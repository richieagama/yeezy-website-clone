import React, { useEffect } from "react";
import { motion, useMotionValue, animate } from "framer-motion";
import { useTransform } from "framer-motion";

import "../styles/PaperModal.css";
import ProductImageSlider from "./ProductImageSlider";



/**
 * PaperModal:
 * - Slides in from the RIGHT (CSS animation)
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
  
  // const overlayOpacity = useTransform(x, [-220, 0, 220], [0.08, 0.35, 0.08]);

  // Tune these:
  const DISMISS_DISTANCE = 140;  // px dragged
  const DISMISS_VELOCITY = 900;  // px/sec swipe speed

  const handleDragEnd = (_event, info) => {
    const dragged = info.offset.x;      // total distance dragged
    const velocity = info.velocity.x;   // swipe velocity

    const shouldDismiss =
      Math.abs(dragged) > DISMISS_DISTANCE ||
      Math.abs(velocity) > DISMISS_VELOCITY;

    if (shouldDismiss) {
      // Slide the paper off-screen in the swipe direction, then close.
      const direction = dragged > 0 ? 1 : -1;
      animate(x, direction * window.innerWidth, {
        type: "spring",
        stiffness: 260,
        damping: 28,
        onComplete: onClose,
      });
    } else {
      // Snap back to center
      animate(x, 0, { type: "spring", stiffness: 260, damping: 22 });
    }
  };




  // Overlay click directly calls onClose (immediate)
  return (
    <motion.div className="modal-overlay"  onClick={() => onClose()}>

      <motion.div
        className="paper-sheet"
        role="dialog"
        aria-modal="true"
        aria-label={`${product.name} details`}
        onClick={(e) => e.stopPropagation()}  // clicking inside does not close
        // ENTRY animation: from right to center
        initial={{ x: 80, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 140, damping: 18 }}
        // DRAG behavior
        drag="x"
        dragConstraints={{ left: 0, right: 0 }} // we control dismissal manually
        dragElastic={0.18} // a little stretch
        style={{ x }}
        onDragEnd={handleDragEnd}
      >


        <div className="paper-header">
          <div className="left type">1/13/26, 11:42 PM</div>
          <div className="center type">bsktbl-pdp-Hat-Mockup.png</div>
          <div className="right type">[i]</div>
        </div>

        <div className="paper-body">
          <div className="paper-image">
            {/* <img
              src={product.image}
              alt={product.name}
              onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = `https://via.placeholder.com/640x480.png?text=${encodeURIComponent(product.id)}`; }}
            /> */}
            <div className="paper-content">
  <ProductImageSlider images={product.images} />


</div>
          </div>

          {/* <div className="paper-info"> */}
            {/* <h2 className="paper-title">{product.name}</h2>
            <p className="paper-desc">{product.description}</p>

            <div className="paper-price">{product.price}</div>

            <div className="paper-specs">{product.specs}</div>

            <div className="paper-actions">
              <button
                className="btn-primary"
                onClick={() => alert(`${product.name} added to cart (demo)`)}
              >
                Add
              </button>
              <button className="btn-secondary" onClick={() => alert("More details (demo)")}>
                Details
              </button>
            </div>
          </div> */}

          <div className="paper-info">
            <h2 className="paper-title">{product.name}</h2>
            <table className="paper-table">
              <tr>
                <th>Item Name</th>
                <th>Distressed HT</th>
              </tr>

              <tr>
                <th>Frame</th>
                <th>5 Panel</th>
              </tr>

                <tr>
                  <th>Year</th>
                  <th>2026</th>
              </tr>

              <tr>
                <th>Price</th>
                <th>$40</th>
              </tr>
            </table>
            

            <div className="paper-actions">
              <button
                className="btn-primary"
                onClick={() => alert(`${product.name} added to cart (demo)`)}
              >
                Add
              </button>
              <button className="btn-secondary" onClick={() => alert("More details (demo)")}>
                Details
              </button>
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
