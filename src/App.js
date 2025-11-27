import React, { useState } from "react";
import ProductGrid from "./components/ProductGrid";
import PaperModal from "./components/PaperModal";
import "./styles/App.css";

/**
 * Sample products
 */
const PRODUCTS = [
  {
    id: "HT-01",
    name: "TS-o1",
    price: "$29.99",
    image: "/images/product1-1.png",
    description: "Classic heavy cotton tee. Perfect for daily wear.",
    specs: "100% cotton fits drop shoulder • Heavyweight • Soft fit",
  },
  {
    id: "HT-02",
    name: "TS-o2",
    price: "$29.99",
    image: "/images/product2-2.png",
    description: "Classic heavy cotton tee. Perfect for daily wear.",
    specs: "100% cotton fits drop shoulder • Heavyweight • Soft fit",
  },
  {
    id: "HT-03",
    name: "HT-o1",
    price: "$20.00",
    image: "/images/product3-3.png",
    description: "Durable shell all-weather comfort.",
    specs: "Water resistant • Packable • Breathable",
  },
  {
    id: "HT-04",
    name: "HT-o2",
    price: "$20.00",
    image: "/images/product4-4.png",
    description: "Durable shell all-weather comfort.",
    specs: "Modal-blend • Breathable knit • UNISEX fit",
  }
];

export default function App() {
  const [selected, setSelected] = useState(null);

  return (
    <div className="app-root">
      <main className="site-container">
        <header className="hero">
          <h1 className="brand">Untitled Header H1</h1>
          <p className="sub"></p> {/* <p className="note">Click a product for details</p> */ }
        </header>

        <ProductGrid products={PRODUCTS} onSelect={(p) => setSelected(p)} />
      </main>

      {selected && (
        <PaperModal
          product={selected}
          onClose={() => setSelected(null)}
        />
      )}
    </div>
  );
}
