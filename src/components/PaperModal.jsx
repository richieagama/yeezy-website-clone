import React, { useEffect } from "react";
import "../styles/PaperModal.css";

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

  // Overlay click directly calls onClose (immediate)
  return (
    <div className="modal-overlay" onClick={() => onClose()}>
      <div
        className="paper-sheet"
        role="dialog"
        aria-modal="true"
        aria-label={`${product.name} details`}
        onClick={(e) => e.stopPropagation()} // prevent clicks inside from closing
      >
        <div className="paper-header">
          <div className="left">ITEM DETAILS</div>
          <div className="center">PRODUCT SHEET</div>
          <div className="right">{product.id}</div>
        </div>

        <div className="paper-body">
          <div className="paper-image">
            <img
              src={product.image}
              alt={product.name}
              onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = `https://via.placeholder.com/640x480.png?text=${encodeURIComponent(product.id)}`; }}
            />
          </div>

          <div className="paper-info">
            <h2 className="paper-title">{product.name}</h2>
            <p className="paper-desc">{product.description}</p>

            <div className="paper-price">{product.price}</div>

            <div className="paper-specs">{product.specs}</div>

            <div className="paper-actions">
              <button
                className="btn-primary"
                onClick={() => alert(`${product.name} added to cart (demo)`)}
              >
                Add to cart
              </button>
              <button className="btn-secondary" onClick={() => alert("More details (demo)")}>
                More details
              </button>
            </div>
          </div>
        </div>

        <div className="paper-footer">
          <div className="footer-left">Printed: {new Date().toLocaleDateString()}</div>
          <div className="footer-center">/file/path/{product.id}.jpg</div>
          <div className="footer-right">v1.0</div>
        </div>
      </div>
    </div>
  );
}
