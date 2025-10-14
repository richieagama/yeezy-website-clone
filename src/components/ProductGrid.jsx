import React from "react";
import ProductCard from "./ProductCard";
import "../styles/ProductGrid.css";

export default function ProductGrid({ products, onSelect }) {
  return (
    <section className="product-grid" aria-label="Product grid">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} onClick={() => onSelect(p)} />
      ))}
    </section>
  );
}
