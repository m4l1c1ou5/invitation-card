import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import '../styles/PhotoGallery.css';

const PhotoGallery = ({ isOpen, onClose, isMobile }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  
  // Sample placeholder images (replace with actual event photos)
  const images = [
    { id: 1, src: "https://source.unsplash.com/300x300/?baby,indian", alt: "Mudrika's Ceremony 1" },
    { id: 2, src: "https://source.unsplash.com/300x300/?ceremony,celebration", alt: "Mudrika's Ceremony 2" },
    { id: 3, src: "https://source.unsplash.com/300x300/?baby,celebration", alt: "Mudrika's Ceremony 3" },
    { id: 4, src: "https://source.unsplash.com/300x300/?child,indian", alt: "Mudrika's Ceremony 4" },
    { id: 5, src: "https://source.unsplash.com/300x300/?hindu,ceremony", alt: "Mudrika's Ceremony 5" },
    { id: 6, src: "https://source.unsplash.com/300x300/?family,celebration", alt: "Mudrika's Ceremony 6" },
  ];

  const openImage = (image) => {
    setSelectedImage(image);
  };

  const closeImage = () => {
    setSelectedImage(null);
  };

  const navigateImage = (direction) => {
    const currentIndex = images.findIndex(img => img.id === selectedImage.id);
    let newIndex = currentIndex + direction;
    
    // Loop back to the beginning or end if out of bounds
    if (newIndex < 0) newIndex = images.length - 1;
    if (newIndex >= images.length) newIndex = 0;
    
    setSelectedImage(images[newIndex]);
  };

  // Gallery overlay animation variants
  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };

  // Gallery content animation variants
  const galleryVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    },
    exit: {
      opacity: 0,
      y: 50,
      transition: { 
        duration: 0.3
      }
    }
  };

  // Image item animation variants
  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { type: "spring", stiffness: 300, damping: 24 }
    }
  };

  // Modal animation variants
  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { type: "spring", stiffness: 300, damping: 24 }
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: { duration: 0.2 }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          className="gallery-overlay"
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          <motion.div 
            className={`gallery-container ${isMobile ? 'mobile-gallery' : ''}`}
            variants={galleryVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="gallery-header">
              <h2 className="gallery-title">Mudrika's Photo Gallery</h2>
              <button className="gallery-close" onClick={onClose}>
                <span aria-label="Close gallery">✖</span>
              </button>
            </div>
            
            <div className="gallery-grid">
              {images.map((image) => (
                <motion.div 
                  key={image.id}
                  className="gallery-item"
                  variants={imageVariants}
                  onClick={() => openImage(image)}
                >
                  <img 
                    src={image.src} 
                    alt={image.alt}
                    loading="lazy"
                  />
                  <div className="gallery-item-overlay">
                    <span className="gallery-item-icon">🔍</span>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <p className="gallery-note">Click on any image to view in full size</p>
            
            <div className="gallery-trains">
              <span className="gallery-train-left">🚂</span>
              <span className="gallery-train-right">🚂</span>
            </div>
          </motion.div>
          
          <AnimatePresence>
            {selectedImage && (
              <motion.div 
                className="image-modal-overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <motion.div
                  className="image-modal"
                  variants={modalVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <img 
                    src={selectedImage.src} 
                    alt={selectedImage.alt} 
                    className="modal-image"
                  />
                  <button className="modal-close" 
                    onClick={closeImage}
                    style={{ right: isMobile ? "5px" : "-10px" }} // Adjust position on mobile
                  >
                    ✖
                  </button>
                  
                  <div className="image-navigation">
                    <button 
                      className="nav-button prev" 
                      onClick={() => navigateImage(-1)}
                    >
                      ◀
                    </button>
                    <button 
                      className="nav-button next" 
                      onClick={() => navigateImage(1)}
                    >
                      ▶
                    </button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PhotoGallery;
