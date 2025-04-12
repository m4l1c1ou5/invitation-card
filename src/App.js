import React, { useState, useEffect } from 'react';
import { Howl } from 'howler';
import Confetti from 'react-confetti';
import './App.css';
import CeremonyCard from './components/CeremonyCard';
import AnimatedTrain from './components/AnimatedTrain';
import FloatingBalloons from './components/FloatingBalloons';
import MovingClouds from './components/MovingClouds';
import useWindowSize from './hooks/useWindowSize';
import useMobileDetect from './hooks/useMobileDetect';
import { Analytics } from "@vercel/analytics/react";

function App() {
  const [sound, setSound] = useState(null);
  const [isSoundPlaying, setIsSoundPlaying] = useState(false);
  const { width, height } = useWindowSize();
  const isMobile = useMobileDetect();
  
  // State to manage the two-page design
  const [showCard, setShowCard] = useState(false);
  const [trainMoving, setTrainMoving] = useState(false);

  // Card details - can be customized
  const cardDetails = {
    childName: "MUDRIKA",
    ceremony: "MUNDAN CEREMONY",
    date: "23RD MAY",
    time: "7:00 PM TO 11:00 PM",
    venue: "Pamela Green Lawn, Kanpur",
    rsvp: "9889166661"
  };

  useEffect(() => {
    // Since we don't have an actual train sound file, we'll just create a placeholder effect
    const trainSound = new Howl({
      src: ['./latest.wav'],
      loop: false,
      volume: 0.5,
    });
    setSound(trainSound);

    return () => {
      if (trainSound) {
        trainSound.stop();
      }
    };
  }, []);

  const toggleSound = () => {
    if (sound) {
      if (isSoundPlaying) {
        sound.pause();
      } else {
        sound.play();
      }
      setIsSoundPlaying(!isSoundPlaying);
    }
  };

  // Mobile-specific timing adjustments
  const trainMovementDuration = isMobile ? 3.5 : 5; // Shorter duration on mobile
  const cardAppearDelay = isMobile ? 1000 : 2000; // Shorter delay on mobile

  // Handle the train click to trigger the page transition
  const handleTrainClick = () => {
    if (!trainMoving && !showCard) {
      setTrainMoving(true);
      // Play train sound when clicked
      if (sound && !isSoundPlaying) {
        sound.play();
        setIsSoundPlaying(true);
      }
      
      // After a delay to match the train movement, show the card
      setTimeout(() => {
        setShowCard(true);
      }, cardAppearDelay);
    }
  };

  // Reset to first page
  const resetToTrainPage = () => {
    setShowCard(false);
    setTrainMoving(false);
    // Stop the sound when going back to first page
    if (sound && isSoundPlaying) {
      sound.pause();
      setIsSoundPlaying(false);
    }
  };

  return (
    <div className={`app ${showCard ? 'show-card' : 'show-train'}`}>
      <Confetti
        width={width}
        height={height}
        recycle={true}
        numberOfPieces={isMobile ? 50 : 100}
        gravity={0.05}
        run={showCard} // Only run confetti when card is showing
      />
      <MovingClouds isMobile={isMobile} />
      {showCard && <FloatingBalloons isMobile={isMobile} />}
      
      <div className="pages-container">
        <div className={`train-page ${showCard ? 'train-exiting' : ''}`}>
          <div className="train-intro-text">
            <h2>
              <span className="highlight-text">Tap on the train</span> to onboard the <span className="childish-text">mundan</span> express
            </h2>
          </div>
          <AnimatedTrain 
            isMobile={isMobile}
            onTrainClick={handleTrainClick}
            isMoving={trainMoving}
            showClickableStyle={!trainMoving}
            movementDuration={trainMovementDuration}
          />
        </div>
        
        <div className={`card-page ${showCard ? 'card-entering' : ''}`}>
          {showCard && (
            <CeremonyCard 
              cardDetails={cardDetails} 
              isMobile={isMobile} 
              animationDelay={isMobile ? 0.5 : 1}
            />
          )}
        </div>
      </div>
      
      {/* Moved the button outside of the card-page div to be a separate element */}
      {showCard && (
        <button 
          className="reset-button" 
          onClick={resetToTrainPage}
          aria-label="Go back to train"
        >
          <span role="img" aria-label="train" style={{fontSize: '20px'}}>🚂</span> Go Back
        </button>
      )}
    </div>
  );
}

export default App;
