import React from 'react';
import { motion } from 'framer-motion';
import '../styles/FloatingBalloons.css';

const FloatingBalloons = ({ isMobile }) => {
  // Generate random balloons with different colors - fewer on mobile
  const generateBalloons = (count) => {
    // Reduce the number of balloons on mobile
    const actualCount = isMobile ? Math.min(count, 6) : count;
    
    const colors = [
      '#FF6B6B', '#4ECDC4', '#FFD166', '#06D6A0', '#118AB2', 
      '#FF9F1C', '#F15BB5', '#9B5DE5', '#00BBF9', '#00F5D4'
    ];
    
    return Array.from({ length: actualCount }, (_, i) => {
      const randomDelay = Math.random() * (isMobile ? 10 : 20);
      const randomDuration = (isMobile ? 10 : 15) + Math.random() * 10;
      const randomX = Math.random() * (isMobile ? 50 : 100) - (isMobile ? 25 : 50);
      const size = (isMobile ? 20 : 30) + Math.random() * (isMobile ? 25 : 40);
      const color = colors[Math.floor(Math.random() * colors.length)];
      
      return (
        <motion.div
          key={i}
          className="balloon"
          style={{
            backgroundColor: color,
            width: size,
            height: size * 1.2,
            left: `${i * (100 / actualCount)}%`,
          }}
          initial={{ y: '110vh', x: 0 }}
          animate={{ 
            y: '-20vh', 
            x: randomX,
            transition: { 
              y: { 
                duration: randomDuration, 
                delay: randomDelay, 
                repeat: Infinity, 
                repeatType: 'loop',
                // Use simpler animation on mobile for better performance
                ease: isMobile ? "easeIn" : "easeInOut"  
              },
              x: { 
                duration: randomDuration / 3, 
                delay: randomDelay, 
                repeat: Infinity, 
                repeatType: 'reverse', 
                ease: "easeInOut" 
              }
            }
          }}
        >
          <span className="balloon-string"></span>
        </motion.div>
      );
    });
  };

  return (
    <div className="balloons-container">
      {generateBalloons(10)}
    </div>
  );
};

export default FloatingBalloons;
