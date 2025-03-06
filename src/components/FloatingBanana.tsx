
import React, { useState, useEffect } from 'react';
import { playRandomSound } from '../assets/sounds';

// Array of emojis for floating objects
const floatingEmojis = ['🍌', '🐒', '🙈', '⏰', '💣', '🤪', '😱', '🎯', '🌀', '🔥'];

interface FloatingObjectProps {
  emoji: string;
  style: React.CSSProperties;
  onClick?: () => void;
}

const FloatingObject: React.FC<FloatingObjectProps> = ({ emoji, style, onClick }) => {
  return (
    <div 
      className="floating-object text-4xl"
      style={style}
      onClick={onClick}
    >
      {emoji}
    </div>
  );
};

interface CursorStealerProps {
  onRelease: () => void;
}

const CursorStealer: React.FC<CursorStealerProps> = ({ onRelease }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [showBanana, setShowBanana] = useState(false);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Follow the mouse with a slight delay
      setPosition({
        x: e.clientX - 40, // Offset for the gorilla
        y: e.clientY - 40,
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    // After 3 seconds, show the banana and then release
    const bananaTimer = setTimeout(() => {
      setShowBanana(true);
      playRandomSound();
      
      // Release after showing banana
      const releaseTimer = setTimeout(() => {
        onRelease();
      }, 1500);
      
      return () => clearTimeout(releaseTimer);
    }, 3000);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(bananaTimer);
    };
  }, [onRelease]);
  
  return (
    <>
      <div 
        className="cursor-stealer text-5xl z-50"
        style={{
          position: 'fixed',
          left: `${position.x}px`,
          top: `${position.y}px`,
          pointerEvents: 'none',
        }}
      >
        🦍
      </div>
      {showBanana && (
        <div 
          className="cursor-stealer text-4xl animate-float"
          style={{
            position: 'fixed',
            left: `${position.x + 60}px`,
            top: `${position.y - 20}px`,
            pointerEvents: 'none',
            transform: 'rotate(30deg)',
          }}
        >
          🍌
        </div>
      )}
    </>
  );
};

interface FloatingDistractionsProps {
  count?: number;
}

const FloatingDistractions: React.FC<FloatingDistractionsProps> = ({ count = 10 }) => {
  const [objects, setObjects] = useState<Array<{id: number, emoji: string, style: React.CSSProperties}>>([]);
  const [stealCursor, setStealCursor] = useState(false);
  
  useEffect(() => {
    // Create initial floating objects
    const newObjects = Array.from({ length: count }).map((_, index) => {
      const randomEmoji = floatingEmojis[Math.floor(Math.random() * floatingEmojis.length)];
      
      return {
        id: index,
        emoji: randomEmoji,
        style: {
          position: 'fixed' as const,
          left: `${Math.random() * 90}vw`,
          top: `${Math.random() * 90}vh`,
          fontSize: `${Math.random() * 2 + 1.5}rem`,
          transform: `rotate(${Math.random() * 360}deg)`,
          animationDelay: `${Math.random() * 2}s`,
          animationDuration: `${Math.random() * 4 + 2}s`,
        } as React.CSSProperties,
      };
    });
    
    setObjects(newObjects);
    
    // Randomly change positions
    const interval = setInterval(() => {
      setObjects(prevObjects => 
        prevObjects.map(obj => ({
          ...obj,
          style: {
            ...obj.style,
            left: `${Math.random() * 90}vw`,
            top: `${Math.random() * 90}vh`,
            transform: `rotate(${Math.random() * 360}deg)`,
          } as React.CSSProperties,
        }))
      );
    }, 8000);
    
    return () => clearInterval(interval);
  }, [count]);
  
  // Randomly steal cursor every 20-30 seconds
  useEffect(() => {
    const randomTime = Math.random() * 10000 + 20000; // 20-30 seconds
    
    const stealTimer = setTimeout(() => {
      setStealCursor(true);
    }, randomTime);
    
    return () => clearTimeout(stealTimer);
  }, [stealCursor]);
  
  return (
    <>
      {objects.map(obj => (
        <FloatingObject 
          key={obj.id}
          emoji={obj.emoji}
          style={obj.style}
          onClick={() => playRandomSound()}
        />
      ))}
      
      {stealCursor && (
        <CursorStealer onRelease={() => setStealCursor(false)} />
      )}
    </>
  );
};

export default FloatingDistractions;
