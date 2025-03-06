
import React, { useState, useEffect } from 'react';
import { playRandomSound } from '../assets/sounds';
import FloatingDistractions from './FloatingBanana';

const SuccessMessage: React.FC = () => {
  const [confettiCount, setConfettiCount] = useState<number[]>([]);
  const [messageIndex, setMessageIndex] = useState(0);
  
  const funnyMessages = [
    "Congratulations! You're officially a master of frustration!",
    "Your patience is legendary... or maybe you're just stubborn?",
    "We're impressed! Most people throw their computer out the window by now.",
    "Achievement Unlocked: Survived the World's Most Annoying Login!",
    "You must really want to see what's behind this login...",
    "Wow, you actually made it? We didn't think this was possible!",
    "Your therapist will hear about this session.",
    "The gorillas are impressed with your perseverance!"
  ];
  
  // Generate confetti
  useEffect(() => {
    // Create random confetti pieces
    setConfettiCount(Array.from({ length: 100 }, (_, i) => i));
    
    // Play celebration sound
    playRandomSound();
    
    // Change message every few seconds
    const interval = setInterval(() => {
      setMessageIndex(prev => (prev + 1) % funnyMessages.length);
      playRandomSound();
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 flex flex-col items-center justify-center p-6 text-center">
      {/* More floating distractions */}
      <FloatingDistractions count={20} />
      
      {/* Confetti */}
      {confettiCount.map((i) => {
        const size = Math.random() * 10 + 5;
        return (
          <div
            key={i}
            className="absolute animate-fall"
            style={{
              left: `${Math.random() * 100}vw`,
              top: `-${size}px`,
              width: `${size}px`,
              height: `${size}px`,
              backgroundColor: `hsl(${Math.random() * 360}, 100%, 50%)`,
              borderRadius: '50%',
              animationDuration: `${Math.random() * 5 + 2}s`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        );
      })}
      
      {/* Success message */}
      <div 
        className="bg-white/80 backdrop-blur-md p-8 rounded-lg max-w-xl relative z-10 animate-bounce-slow comic-sans-text"
        style={{ transform: `rotate(${Math.sin(Date.now() / 1000) * 5}deg)` }}
      >
        <h1 className="text-4xl font-bold mb-6 text-purple-600 crazy-text">
          LOGIN SUCCESSFUL!
        </h1>
        
        <p className="text-2xl mb-6 font-bold text-pink-600 animate-pulse">
          {funnyMessages[messageIndex]}
        </p>
        
        <div className="flex justify-center space-x-4">
          <button 
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-lg font-bold dancing-button"
          >
            Do it Again!
          </button>
          
          <button 
            onClick={() => alert("There's nothing else. This was the whole point!")}
            className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-bold dancing-button"
          >
            What's Next?
          </button>
        </div>
      </div>
      
      {/* Animated emoji parade */}
      <div className="absolute bottom-4 whitespace-nowrap animate-marquee">
        <span className="text-4xl inline-block">
          {Array.from({ length: 20 }, (_, i) => (
            <span key={i} className="mx-2">
              {['🎉', '🎊', '🦍', '🍌', '😂', '🤯', '🥳', '👏', '🏆'][i % 9]}
            </span>
          ))}
        </span>
      </div>
    </div>
  );
};

export default SuccessMessage;
