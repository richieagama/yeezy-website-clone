import React, { useEffect } from "react";
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
      </div>
    </div>
  );
}
