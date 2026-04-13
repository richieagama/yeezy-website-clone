import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "../styles/ProductImageSlider.css";

const SWIPE_OFFSET = 50;
const SWIPE_VELOCITY = 500;

const slideVariants = {
  enter: (dir) => ({
    x: dir >= 0 ? "100%" : "-100%",
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (dir) => ({
    x: dir >= 0 ? "-100%" : "100%",
    opacity: 0,
  }),
};

export default function ProductImageSlider({ images }) {
  const [[index, direction], setSlide] = useState([0, 0]);

  const paginate = (dir) => {
    setSlide(([prev]) => [
      (prev + dir + images.length) % images.length,
      dir,
    ]);
  };

  const goTo = (i) => {
    if (i === index) return;
    setSlide(([ prev ]) => [i, i > prev ? 1 : -1]);
  };

  const handleDragEnd = (_, info) => {
    const { offset, velocity } = info;
    if (offset.x < -SWIPE_OFFSET || velocity.x < -SWIPE_VELOCITY) {
      paginate(1);
    } else if (offset.x > SWIPE_OFFSET || velocity.x > SWIPE_VELOCITY) {
      paginate(-1);
    }
  };

  return (
    <div className="slider-container">

      {/* Main image — swipeable */}
      <div className="slider-main">
        <AnimatePresence initial={false} custom={direction}>
          <motion.img
            key={index}
            src={images[index]}
            alt=""
            className="slider-main-image"
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 320, damping: 32 },
              opacity: { duration: 0.12 },
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.18}
            onDragEnd={handleDragEnd}
            whileDrag={{ scale: 0.97, cursor: "grabbing" }}
            style={{ cursor: "grab" }}
          />
        </AnimatePresence>
      </div>

      {/* Thumbnails */}
      <div className="slider-thumbs">
        {images.map((img, i) => (
          <motion.img
            key={i}
            src={img}
            alt=""
            className="thumb"
            onClick={() => goTo(i)}
            initial={{ opacity: 0, y: 8 }}
            animate={{
              opacity: i === index ? 1 : 0.45,
              scale: i === index ? 1.1 : 1,
              y: 0,
              boxShadow: i === index
                ? "0 0 0 2px #000"
                : "0 0 0 0px rgba(0,0,0,0)",
            }}
            transition={{
              type: "spring",
              stiffness: 360,
              damping: 26,
              opacity: { duration: 0.18 },
            }}
            whileHover={{
              opacity: i === index ? 1 : 0.75,
              scale: i === index ? 1.1 : 1.06,
            }}
            whileTap={{ scale: 0.92 }}
          />
        ))}
      </div>

    </div>
  );
}
