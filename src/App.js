import React, { useState } from "react";
import ProductGrid from "./components/ProductGrid";
import PaperModal from "./components/PaperModal";
import "./styles/App.css";

/**
 * Sample products - replace image paths with real files you put in public/images/
 */
const PRODUCTS = [
  {
    id: "HT-01",
    name: "TS-01",
    price: "$49.99",
    image: "/images/HT-01.png",
    description: "Classic lightweight cotton tee. Perfect for daily wear.",
    specs: "100% cotton • Machine wash • Fits true to size",
  },
  {
    id: "HT-02",
    name: "TS-01",
    price: "$89.00",
    image: "/images/HT-01.png",
    description: "Soft fleece-lined pullover hoodie with roomy pocket.",
    specs: "80% cotton / 20% polyester • Heavyweight • Warm fit",
  },
  {
    id: "HT-03",
    name: "TS-01",
    price: "$129.00",
    image: "/images/HT-01.png",
    description: "Lightweight windbreaker that packs small into its pocket.",
    specs: "Water resistant • Packable • Breathable",
  },
  {
    id: "HT-04",
    name: "TS-01",
    price: "$59.00",
    image: "/images/HT-01.png",
    description: "Long sleeve, slim fit with clean seams.",
    specs: "Modal-blend • Breathable knit • Slim fit",
  },

  {
    id: "HT-05",
    name: "TS-01",
    price: "$59.00",
    image: "/images/HT-01.png",
    description: "Long sleeve, slim fit with clean seams.",
    specs: "Modal-blend • Breathable knit • Slim fit",
  },
  
  {
    id: "LS-06",
    name: "TS-01",
    price: "$59.00",
    image: "/images/HT-01.png",
    description: "Long sleeve, slim fit with clean seams.",
    specs: "Modal-blend • Breathable knit • Slim fit",
  },

  {
    id: "HT-07",
    name: "TS-01",
    price: "$59.00",
    image: "/images/HT-01.png",
    description: "Long sleeve, slim fit with clean seams.",
    specs: "Modal-blend • Breathable knit • Slim fit",
  },

  {
    id: "HT-08",
    name: "TS-01",
    price: "$59.00",
    image: "/images/HT-01.png",
    description: "Long sleeve, slim fit with clean seams.",
    specs: "Modal-blend • Breathable knit • Slim fit",
  },

  {
    id: "HT-09",
    name: "TS-01",
    price: "$59.00",
    image: "/images/HT-01.png",
    description: "Long sleeve, slim fit with clean seams.",
    specs: "Modal-blend • Breathable knit • Slim fit",
  }
];

export default function App() {
  const [selected, setSelected] = useState(null);

  return (
    <div className="app-root">
      <main className="site-container">
        <header className="hero">
          <h1 className="brand">dieselkennedy.com</h1>
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
