import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import '../styles/AnimatedTrain.css';

const AnimatedTrain = ({ isMobile, onTrainClick, isMoving, showClickableStyle, movementDuration = 5 }) => {
  const trainRef = useRef(null);
  const smokeInterval = useRef(null);

  // Animation variants for train movement
  const trainVariants = {
    idle: {
      x: isMobile ? "-45%" : "-30%", 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20
      }
    },
    moving: {
      x: "120%", 
      y: 0,
      transition: {
        duration: movementDuration,
        ease: "easeInOut",
        times: isMobile ? [0, 0.3, 0.7, 1] : [0, 0.2, 0.8, 1],
      }
    }
  };

  useEffect(() => {
    const createSmokeParticle = () => {
      if (!trainRef.current) return;
      
      if (isMobile && Math.random() > 0.5) return;
      
      const smoke = document.createElement('div');
      smoke.classList.add('smoke');
      
      const trainRect = trainRef.current.getBoundingClientRect();
      smoke.style.left = `${trainRect.left + (isMobile ? 40 : 80)}px`;
      smoke.style.top = `${trainRect.top - (isMobile ? 10 : 20)}px`;
      
      document.body.appendChild(smoke);
      
      setTimeout(() => {
        if (smoke.parentNode) {
          smoke.parentNode.removeChild(smoke);
        }
      }, isMobile ? 2000 : 3000);
    };
    
    if (isMoving || !isMoving) {
      smokeInterval.current = setInterval(createSmokeParticle, isMobile ? 600 : 400);
    }
    
    return () => {
      clearInterval(smokeInterval.current);
    };
  }, [isMobile, isMoving]);

  return (
    <motion.div
      className={`train-container ${isMobile ? 'mobile-train' : ''} ${showClickableStyle ? 'clickable-train' : ''} ${isMoving ? 'train-moving' : ''}`}
      variants={trainVariants}
      initial="idle"
      animate={isMoving ? "moving" : "idle"}
      onClick={onTrainClick}
      whileHover={showClickableStyle ? { scale: 1.05 } : {}}
      whileTap={showClickableStyle ? { scale: 0.95 } : {}}
    >
      <div className="train realistic-train" ref={trainRef}>
        {/* Locomotive */}
        <div className="locomotive">
          {/* Boiler and main body */}
          <div className="boiler">
            <div className="boiler-bands">
              <div className="boiler-band"></div>
              <div className="boiler-band"></div>
              <div className="boiler-band"></div>
            </div>
            
            {/* Chimney */}
            <div className="chimney">
              <div className="chimney-top"></div>
              <div className="smoke-hole"></div>
            </div>
            
            {/* Steam dome and whistle */}
            <div className="steam-dome"></div>
            <div className="steam-whistle"></div>
            
            {/* Front details */}
            <div className="headlight"></div>
            <div className="pilot-cowcatcher"></div>
            
            {/* Cabin */}
            <div className="cabin">
              <div className="cabin-window"></div>
              <div className="cabin-door"></div>
              <div className="cabin-roof"></div>
            </div>
          </div>
          
          {/* Undercarriage details */}
          <div className="undercarriage">
            <div className="cylinder left-cylinder"></div>
            <div className="cylinder right-cylinder"></div>
          </div>
          
          <div className="connector"></div>
        </div>
        
        {/* Coal Tender */}
        <div className="tender">
          <div className="tender-body">
            <div className="coal-pile"></div>
            <div className="tender-side-panel"></div>
          </div>
          <div className="connector"></div>
        </div>
        
        {/* Passenger/Freight Cars */}
        {(!isMobile || window.innerWidth > 375) && (
          <div className="passenger-car">
            <div className="passenger-body">
              <div className="passenger-windows">
                <div className="p-window"></div>
                <div className="p-window"></div>
                <div className="p-window"></div>
              </div>
              <div className="passenger-door"></div>
              <div className="passenger-steps"></div>
            </div>
            <div className="connector"></div>
          </div>
        )}
        
        {/* Caboose with rope */}
        {(!isMobile || window.innerWidth >= 480) && (
          <div className="caboose">
            <div className="caboose-body">
              <div className="caboose-windows">
                <div className="c-window"></div>
              </div>
              <div className="caboose-cupola">
                <div className="cupola-window"></div>
              </div>
            </div>
            <div className="rope"></div>
          </div>
        )}
        
        {/* For smaller screens, add rope to appropriate car */}
        {isMobile && window.innerWidth < 480 && window.innerWidth > 375 && (
          <div className="rope last-wagon-rope"></div>
        )}
        
        {isMobile && window.innerWidth <= 375 && (
          <div className="rope first-wagon-rope"></div>
        )}
        
        {/* Wheels with detailed design */}
        <div className="wheels">
          {/* Drive wheels */}
          <div className="wheel drive-wheel wheel-1">
            <motion.div 
              className="wheel-inner"
              animate={{ rotate: 360 }}
              transition={{ duration: isMobile ? 0.7 : 1, repeat: Infinity, ease: "linear" }}
            >
              <div className="wheel-spoke"></div>
              <div className="wheel-spoke"></div>
              <div className="wheel-spoke"></div>
              <div className="wheel-center"></div>
            </motion.div>
          </div>
          
          <div className="wheel drive-wheel wheel-2">
            <motion.div 
              className="wheel-inner"
              animate={{ rotate: 360 }}
              transition={{ duration: isMobile ? 0.7 : 1, repeat: Infinity, ease: "linear" }}
            >
              <div className="wheel-spoke"></div>
              <div className="wheel-spoke"></div>
              <div className="wheel-spoke"></div>
              <div className="wheel-center"></div>
            </motion.div>
          </div>

          {/* Connecting rod animation */}
          <motion.div 
            className="connecting-rod"
            animate={{ rotate: [0, 360] }}
            transition={{ duration: isMobile ? 1.4 : 2, repeat: Infinity, ease: "linear" }}
          ></motion.div>
          
          <motion.div 
            className="piston-rod"
            animate={{ 
              x: [-5, 5, -5],
            }}
            transition={{ duration: isMobile ? 0.7 : 1, repeat: Infinity, ease: "easeInOut" }}
          ></motion.div>
          
          {/* Smaller wheels */}
          <div className="wheel small-wheel wheel-3">
            <motion.div 
              className="wheel-inner"
              animate={{ rotate: 360 }}
              transition={{ duration: isMobile ? 0.7 : 1, repeat: Infinity, ease: "linear" }}
            ></motion.div>
          </div>
          
          {/* Remaining car wheels */}
          <div className="wheel small-wheel wheel-4">
            <motion.div className="wheel-inner" animate={{ rotate: 360 }} transition={{ duration: isMobile ? 0.7 : 1, repeat: Infinity, ease: "linear" }}></motion.div>
          </div>
          <div className="wheel small-wheel wheel-5">
            <motion.div className="wheel-inner" animate={{ rotate: 360 }} transition={{ duration: isMobile ? 0.7 : 1, repeat: Infinity, ease: "linear" }}></motion.div>
          </div>
          <div className="wheel small-wheel wheel-6">
            <motion.div className="wheel-inner" animate={{ rotate: 360 }} transition={{ duration: isMobile ? 0.7 : 1, repeat: Infinity, ease: "linear" }}></motion.div>
          </div>
          <div className="wheel small-wheel wheel-7">
            <motion.div className="wheel-inner" animate={{ rotate: 360 }} transition={{ duration: isMobile ? 0.7 : 1, repeat: Infinity, ease: "linear" }}></motion.div>
          </div>
          <div className="wheel small-wheel wheel-8">
            <motion.div className="wheel-inner" animate={{ rotate: 360 }} transition={{ duration: isMobile ? 0.7 : 1, repeat: Infinity, ease: "linear" }}></motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AnimatedTrain;
