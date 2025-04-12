import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import '../styles/CeremonyCard.css';
import PhotoGallery from './PhotoGallery';

const CeremonyCard = ({ cardDetails, isMobile, animationDelay = 1 }) => {
  const { childName, ceremony, date, time, venue, rsvp } = cardDetails;
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);

  useEffect(() => {
    // Letter animation for main title
    const letters = document.querySelectorAll('.letter');
    
    gsap.fromTo(letters, 
      { y: -20, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        stagger: isMobile ? 0.05 : 0.1, // Faster animation on mobile
        delay: isMobile ? 0.3 : 0.5,
        ease: "elastic.out(1, 0.3)",
        duration: isMobile ? 0.8 : 1
      }
    );
  }, [isMobile]);

  // Animation for card being pulled in by train
  const cardVariants = {
    hidden: { 
      x: "100%", // Start from the right side
      opacity: 0.5,
    },
    visible: { 
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: isMobile ? 20 : 30, // Less damping on mobile for faster entry
        stiffness: isMobile ? 70 : 80,
        duration: isMobile ? 1 : 1.5,
        delay: animationDelay // Use passed delay prop
      }
    }
  };

  const openGallery = () => {
    setIsGalleryOpen(true);
  };

  const closeGallery = () => {
    setIsGalleryOpen(false);
  };

  return (
    <>
      <motion.div 
        className={`ceremony-card ${isMobile ? 'mobile-card' : ''}`}
        variants={cardVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="card-header">
          <h1 className="chugga-text">
            {Array.from(isMobile ? "CHOO CHOO" : "CHOO CHOO").map((letter, index) => (
              <span key={index} className="letter" style={{color: `hsl(${index * 20}, 80%, 60%)`}}>
                {letter}
              </span>
            ))}
          </h1>
          <h1 className="choo-text">
            {Array.from("CHOO CHOO!").map((letter, index) => (
              <span key={index} className="letter" style={{color: `hsl(${(index + 10) * 20}, 80%, 60%)`}}>
                {letter}
              </span>
            ))}
          </h1>
        </div>

        <motion.div 
          className="train-tracks"
          animate={{ 
            backgroundPosition: ["0% 0%", "100% 0%"]
          }}
          transition={{ 
            repeat: Infinity, 
            duration: isMobile ? 15 : 20,
            ease: "linear"
          }}
        />
        
        <motion.div 
          className="card-content"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.8 }}
        >
          <h2 className="all-aboard">
            {isMobile ? "MUNDAN EXPRESS" : "ALL ABOARD THE MUNDAN EXPRESS TO CELEBRATE"}
          </h2>
          
          <div className="child-name">
            {Array.from(childName).map((letter, index) => (
              <motion.span 
                key={index} 
                className="name-letter"
                animate={{ 
                  y: [0, -10, 0],
                  color: [
                    `hsl(${index * 40}, 100%, 50%)`,
                    `hsl(${index * 40 + 20}, 100%, 50%)`,
                    `hsl(${index * 40}, 100%, 50%)`
                  ],
                }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 2,
                  delay: index * (isMobile ? 0.1 : 0.2)
                }}
              >
                {letter}
              </motion.span>
            ))}
          </div>
          
          <div className="ceremony-badge">
            <h3>{ceremony}</h3>
          </div>
          
          <div className="details-section">
            <motion.div 
              className="detail-item"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="detail-icon">📆</span>
              <span className="detail-text">{date}</span>
            </motion.div>
            
            <motion.div 
              className="detail-item"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="detail-icon">⏰</span>
              <span className="detail-text">{time}</span>
            </motion.div>
            
            <motion.a 
              href="https://maps.app.goo.gl/tg5mzPofjywkC6or5?g_st=ia"
              target="_blank"
              rel="noopener noreferrer"
              className="detail-item venue-link"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="detail-icon">📍</span>
              <span className="detail-text">
                {venue}
                <span className="map-indicator" role="img" aria-label="Open in Maps">🗺️</span>
              </span>
            </motion.a>
            
            <motion.a 
              href="tel:+91-9889166661"
              className="detail-item phone-link"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="detail-icon">📞</span>
              <span className="detail-text">
                {isMobile ? "RSVP" : "RSVP: "}{isMobile ? <br/> : ""}{rsvp}
                <span className="phone-indicator" role="img" aria-label="Call">📱</span>
              </span>
            </motion.a>
          </div>
          
          {/* Photo Gallery Button */}
          <motion.button
            className="gallery-button"
            onClick={openGallery}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span role="img" aria-label="photos" className="gallery-button-icon">📸</span> 
            View Photo Gallery
          </motion.button>
        </motion.div>

        <div className="railway-crossing">
          <div className="crossing-bar"></div>
          <div className="crossing-light"></div>
        </div>
        
        {/* Pull handles */}
        <div className="pull-handle"></div>
        <div className="pull-handle right-handle"></div>
        <div className="pull-handle left-handle"></div>
      </motion.div>
      
      <PhotoGallery 
        isOpen={isGalleryOpen} 
        onClose={closeGallery} 
        isMobile={isMobile} 
      />
    </>
  );
};

export default CeremonyCard;
