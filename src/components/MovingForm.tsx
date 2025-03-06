
import React, { useState, useEffect, useRef } from 'react';
import HellishCaptcha from './HellishCaptcha';
import { playRandomSound, playTypingSound } from '../assets/sounds';

interface MovingFormProps {
  onSubmit: () => void;
}

const MovingForm: React.FC<MovingFormProps> = ({ onSubmit }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [formPosition, setFormPosition] = useState({ x: 0, y: 0 });
  const [isMoving, setIsMoving] = useState(false);
  const [showPasswordRules, setShowPasswordRules] = useState(false);
  const [captchaCompleted, setCaptchaCompleted] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);
  
  // Move the form randomly every few seconds
  useEffect(() => {
    const moveForm = () => {
      // Only move the form if it's not currently being moved
      if (!isMoving) {
        // Get the available screen dimensions
        const maxX = Math.max(0, window.innerWidth - (formRef.current?.offsetWidth || 400));
        const maxY = Math.max(0, window.innerHeight - (formRef.current?.offsetHeight || 600));
        
        // Set a new random position
        setFormPosition({
          x: Math.random() * maxX,
          y: Math.random() * maxY,
        });
      }
    };
    
    // Move initially after a delay
    const initialTimer = setTimeout(moveForm, 2000);
    
    // Then move every 5-10 seconds
    const interval = setInterval(() => {
      const randomDelay = Math.random() * 5000 + 5000;
      setTimeout(moveForm, randomDelay);
    }, 10000);
    
    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
    };
  }, [isMoving]);
  
  // Move the form when mouse approaches
  const handleMouseMove = (e: React.MouseEvent) => {
    if (formRef.current && !isMoving) {
      const formRect = formRef.current.getBoundingClientRect();
      const mouseX = e.clientX;
      const mouseY = e.clientY;
      
      // Check if mouse is getting close to the form
      const distance = Math.sqrt(
        Math.pow((formRect.left + formRect.width / 2) - mouseX, 2) +
        Math.pow((formRect.top + formRect.height / 2) - mouseY, 2)
      );
      
      // If mouse is very close, run away
      if (distance < 150) {
        setIsMoving(true);
        
        // Get the direction to run away
        const dirX = (formRect.left + formRect.width / 2) - mouseX;
        const dirY = (formRect.top + formRect.height / 2) - mouseY;
        
        // Normalize and amplify
        const length = Math.sqrt(dirX * dirX + dirY * dirY);
        const normalizedDirX = (dirX / length) * 300;
        const normalizedDirY = (dirY / length) * 300;
        
        // Calculate new position (bounded by viewport)
        const maxX = window.innerWidth - formRect.width;
        const maxY = window.innerHeight - formRect.height;
        
        let newX = formRect.left + normalizedDirX;
        let newY = formRect.top + normalizedDirY;
        
        newX = Math.max(0, Math.min(newX, maxX));
        newY = Math.max(0, Math.min(newY, maxY));
        
        // Update position
        setFormPosition({ x: newX, y: newY });
        
        // Reset moving flag after a short delay
        setTimeout(() => {
          setIsMoving(false);
        }, 500);
      }
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    playRandomSound();
    onSubmit();
  };
  
  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
    playTypingSound();
  };
  
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    playTypingSound();
    
    // Show password rules after typing in the password field
    if (!showPasswordRules && e.target.value.length > 0) {
      setShowPasswordRules(true);
    }
  };
  
  const handleCaptchaComplete = (success: boolean) => {
    if (success) {
      setCaptchaCompleted(true);
    }
  };
  
  const renderPasswordRules = () => {
    if (!showPasswordRules) return null;
    
    return (
      <div className="insane-password-rules animate-shake">
        <h4 className="font-bold mb-1">Password must include:</h4>
        <ul className="list-disc pl-5 space-y-1">
          <li>Exactly 42 characters</li>
          <li>At least one emoji</li>
          <li>One hieroglyph (𓀀, 𓀁, 𓀂)</li>
          <li>One symbol from The Lord of the Rings</li>
          <li>No vowels allowed</li>
          <li>Must contain your childhood pet's middle name</li>
          <li>Should smell like cinnamon</li>
          <li>Must be pronounceable backwards</li>
        </ul>
      </div>
    );
  };
  
  return (
    <div 
      ref={formRef}
      className="form-container max-w-md w-full z-10"
      style={{
        position: 'absolute',
        left: `${formPosition.x}px`,
        top: `${formPosition.y}px`,
        transition: isMoving ? 'all 0.5s ease-out' : 'none',
      }}
      onMouseMove={handleMouseMove}
    >
      <h2 className="text-2xl font-bold mb-4 text-center comic-sans-text crazy-text">
        Login to Chaos
      </h2>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label 
            htmlFor="username" 
            className="block mb-1 font-medium comic-sans-text"
            style={{ transform: `rotate(${Math.random() * 5 - 2.5}deg)` }}
          >
            Username
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={handleUsernameChange}
            className="w-full px-3 py-2 border border-gray-300 rounded animate-wiggle"
            required
          />
        </div>
        
        <div className="mb-4">
          <label 
            htmlFor="password" 
            className="block mb-1 font-medium comic-sans-text"
            style={{ transform: `rotate(${Math.random() * 5 - 2.5}deg)` }}
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            className="w-full px-3 py-2 border border-gray-300 rounded animate-wiggle"
            required
          />
          {renderPasswordRules()}
        </div>
        
        <div className="mb-6">
          <HellishCaptcha onComplete={handleCaptchaComplete} />
        </div>
        
        <div className="flex justify-center">
          <button
            type="submit"
            className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-bold dancing-button"
            style={{ transform: `rotate(${Math.random() * 3 - 1.5}deg)` }}
            disabled={!captchaCompleted}
          >
            {captchaCompleted ? "Login (Good Luck!)" : "Complete CAPTCHA First"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default MovingForm;
