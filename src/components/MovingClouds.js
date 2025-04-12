import React from 'react';
import { motion } from 'framer-motion';
import '../styles/MovingClouds.css';

const MovingClouds = ({ isMobile }) => {
  // Fewer clouds for mobile
  const cloudsData = isMobile ? [
    { size: 80, top: '10%', delay: 0 },
    { size: 60, top: '5%', delay: 10 },
    { size: 70, top: '15%', delay: 5 },
  ] : [
    { size: 100, top: '10%', delay: 0 },
    { size: 80, top: '5%', delay: 10 },
    { size: 120, top: '15%', delay: 5 },
    { size: 70, top: '20%', delay: 15 },
    { size: 90, top: '8%', delay: 20 },
  ];

  return (
    <div className="clouds-container">
      {cloudsData.map((cloud, index) => (
        <motion.div
          key={index}
          className="cloud"
          style={{
            width: cloud.size,
            height: cloud.size / 2,
            top: cloud.top,
          }}
          initial={{ x: '-100vw' }}
          animate={{ x: '100vw' }}
          transition={{
            repeat: Infinity,
            duration: (isMobile ? 20 : 30) + Math.random() * (isMobile ? 10 : 20),
            delay: cloud.delay,
            ease: "linear"
          }}
        >
          <div className="cloud-puff"></div>
          <div className="cloud-puff"></div>
          <div className="cloud-puff"></div>
        </motion.div>
      ))}
    </div>
  );
};

export default MovingClouds;
