
import React, { useState, useEffect } from 'react';
import MovingForm from './MovingForm';
import FloatingDistractions from './FloatingBanana';
import ErrorMessage from './ErrorMessages';
import { playRandomSound } from '../assets/sounds';

const AnnoyingLogin: React.FC = () => {
  const [showError, setShowError] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [showSystemUpdate, setShowSystemUpdate] = useState(false);
  const [updateProgress, setUpdateProgress] = useState(0);
  const [backgroundMode, setBackgroundMode] = useState<'swirl' | 'color'>('color');
  
  // Timer countdown effect
  useEffect(() => {
    if (timeLeft <= 0) {
      // Reset the page when time runs out
      window.location.reload();
      return;
    }
    
    const timer = setInterval(() => {
      setTimeLeft(prevTime => prevTime - 1);
    }, 1000);
    
    return () => clearInterval(timer);
  }, [timeLeft]);
  
  // Random popup effects
  useEffect(() => {
    // Schedule popups every 10-15 seconds
    const popupInterval = setInterval(() => {
      const popupType = Math.floor(Math.random() * 3);
      
      // 0: System update, 1: Error message, 2: Background change
      switch (popupType) {
        case 0:
          setShowSystemUpdate(true);
          break;
        case 1:
          setShowError(true);
          break;
        case 2:
          setBackgroundMode(prev => prev === 'color' ? 'swirl' : 'color');
          break;
      }
      
      playRandomSound();
    }, Math.random() * 5000 + 10000);
    
    return () => clearInterval(popupInterval);
  }, []);
  
  // System update progress effect
  useEffect(() => {
    if (showSystemUpdate) {
      let progress = 0;
      
      const updateInterval = setInterval(() => {
        progress += Math.random() * 10 + 5;
        
        if (progress >= 99) {
          // Reset to 0 when reaching 99%
          progress = 0;
          playRandomSound();
        }
        
        setUpdateProgress(progress);
      }, 400);
      
      // Close after some time
      const closeTimer = setTimeout(() => {
        setShowSystemUpdate(false);
      }, Math.random() * 5000 + 7000);
      
      return () => {
        clearInterval(updateInterval);
        clearTimeout(closeTimer);
      };
    }
  }, [showSystemUpdate]);
  
  const handleLoginSubmit = () => {
    // Show error message on form submit
    setShowError(true);
  };
  
  const handleCloseError = () => {
    setShowError(false);
  };
  
  const renderSystemUpdate = () => {
    if (!showSystemUpdate) return null;
    
    return (
      <div className="popup-overlay">
        <div className="popup-content max-w-md">
          <h3 className="text-xl font-bold mb-2">System Update Required</h3>
          <p className="mb-4">Please wait while we update your system. Do not turn off your computer.</p>
          
          <div className="progress-bar mb-2">
            <div 
              className="progress-value"
              style={{ width: `${updateProgress}%` }}
            ></div>
          </div>
          
          <p className="text-right text-sm">{Math.floor(updateProgress)}% Complete</p>
          
          <button
            className="mt-4 px-4 py-2 bg-gray-200 rounded dancing-button"
            onClick={() => setShowSystemUpdate(false)}
          >
            Cancel (Not Recommended)
          </button>
        </div>
      </div>
    );
  };
  
  return (
    <div 
      className={`min-h-screen relative overflow-hidden ${
        backgroundMode === 'swirl' ? 'swirling-pattern' : 'annoying-background'
      }`}
    >
      {/* Countdown Timer */}
      <div className="timer-container">
        <span>{timeLeft}</span>
      </div>
      
      {/* Floating Distractions */}
      <FloatingDistractions count={15} />
      
      {/* Login Form */}
      <MovingForm onSubmit={handleLoginSubmit} />
      
      {/* Error Message Popup */}
      <ErrorMessage show={showError} onClose={handleCloseError} />
      
      {/* System Update Popup */}
      {renderSystemUpdate()}
      
      {/* Shake the whole page on click */}
      <div 
        className="fixed inset-0 pointer-events-none animate-violent-shake"
        style={{ animationPlayState: showError || showSystemUpdate ? 'running' : 'paused' }}
      ></div>
    </div>
  );
};

export default AnnoyingLogin;
