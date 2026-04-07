import React, { useState } from "react";
import ProductGrid from "./components/ProductGrid";
import PaperModal from "./components/PaperModal";
import "./styles/App.css";

/**
 * Sample products
 */
const home_products = [
    {
    id: 1,
    name: "HT-01",
    images: [
      "/images/product3-3.png",
      "/images/product3-3.png",
      "/images/product3-3.png"
    ],
    price: "$120",
    description: "Sample description",
    image: "/images/product3-3.png",
    date: "2024-01-01",
    filepath: "file://C:/Users/RichardAgama/Documents/HT-01.png"
  },
  {
    id: 2,
    name: "HT-02",
    images: [
      "/images/product4-4.png",
      "/images/product4-4.png",
      "/images/product4-4.png"
    ],
    price: "$120",
    description: "Sample description",
    image: "/images/product4-4.png",
    date: "2024-01-01",
    filepath: "file://C:/Users/RichardAgama/Documents/HT-01.png"

  },
  {
    id: 3,
    name: "HT-03",
    images: [
      "/images/product5-5.png",
      "/images/product5-5.png",
      "/images/product5-5.png"
    ],
    price: "$140",
    description: "Sample description",
    image: "/images/product5-5.png",
    date: "2024-01-01",
    filepath: "file://C:/Users/RichardAgama/Documents/HT-01.png"
  },
  {
    id: 4,
    name: "HT-04",
    images: [
      "/images/product3-3.png",
      "/images/product3-3.png",
      "/images/product3-3.png"
    ],
    price: "$120",
    description: "Sample description",
    image: "/images/product3-3.png",
    date: "2024-01-01",
    filepath: "file://C:/Users/RichardAgama/Documents/HT-01.png"
  },
  {
    id: 5,
    name: "HT-05",
    images: [
      "/images/product3-3.png",
      "/images/product3-3.png",
      "/images/product3-3.png"
    ],
    price: "$120",
    description: "Sample description",
    image: "/images/product3-3.png",
    date: "2024-01-01",
    filepath: "file://C:/Users/RichardAgama/Documents/HT-01.png"
  },
  {
    id: 6,
    name: "HT-06",
    images: [
      "/images/product3-3.png",
      "/images/product3-3.png",
      "/images/product3-3.png"
    ],
    price: "$120",
    description: "Sample description",
    image: "/images/product3-3.png",
    date: "2024-01-01",
    filepath: "file://C:/Users/RichardAgama/Documents/HT-01.png"
  },
  {
    id: 7,
    name: "HT-07",
    images: [
      "/images/product3-3.png",
      "/images/product3-3.png",
      "/images/product3-3.png"
    ],
    price: "$120",
    description: "Sample description",
    image: "/images/product3-3.png",
    date: "2024-01-01",
    filepath: "file://C:/Users/RichardAgama/Documents/HT-01.png"
  },
    {
    id: 8,
    name: "HT-08",
    images: [
      "/images/product3-3.png",
      "/images/product3-3.png",
      "/images/product3-3.png"
    ],
    price: "$120",
    description: "Sample description",
    image: "/images/product3-3.png",
    date: "2024-01-01",
    filepath: "file://C:/Users/RichardAgama/Documents/HT-01.png"
  },
  {
    id: 9,
    name: "HT-09",
    images: [
      "/images/product3-3.png",
      "/images/product3-3.png",
      "/images/product3-3.png"
    ],
    price: "$120",
    description: "Sample description",
    image: "/images/product3-3.png",
    date: "2024-01-01",
    filepath: "file://C:/Users/RichardAgama/Documents/HT-01.png"
  },
  {
    id: 10,
    name: "HT-10",
    images: [
      "/images/product3-3.png",
      "/images/product3-3.png",
      "/images/product3-3.png"
    ],
    price: "$120",
    description: "Sample description",
    image: "/images/product3-3.png",
    date: "2024-01-01",
    filepath: "file://C:/Users/RichardAgama/Documents/HT-01.png"
  }
];

export default function App() {
  const [selected, setSelected] = useState(null);

  return (
    <div className="app-root">
      <main className="site-container">
        <header className="hero">
          <h1 className="brand">http://localhost:3000/</h1>
          <p className="sub"></p> {/* <p className="note">Click a product for details</p> */ }
        </header>

        <ProductGrid products={home_products} onSelect={(p) => setSelected(p)} />


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
