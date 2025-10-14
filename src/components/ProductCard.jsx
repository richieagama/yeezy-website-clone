import React from "react";
import "../styles/ProductGrid.css";

export default function ProductCard({ product, onClick }) {
  return (
    <div
      className="product-card"
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => (e.key === "Enter" ? onClick() : null)}
      aria-label={`Open ${product.name}`}
    >
      <div className="product-media">
        <img
          src={product.image}
          alt={product.name}
          onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = `https://via.placeholder.com/420x420.png?text=${encodeURIComponent(product.id)}`; }}
        />
      </div>
      <div className="product-meta">
        <div className="product-name">{product.name}</div>
        <div className="product-price"></div>
      </div>
    </div>
  );
}
