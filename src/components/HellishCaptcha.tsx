
import React, { useState, useEffect } from 'react';
import { playRandomSound } from '../assets/sounds';

interface MathCaptchaProps {
  onVerify: (success: boolean) => void;
}

const MathCaptcha: React.FC<MathCaptchaProps> = ({ onVerify }) => {
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [operator, setOperator] = useState('+');
  const [answer, setAnswer] = useState('');
  const [showWarning, setShowWarning] = useState(false);
  
  // Update the math problem every 3 seconds
  useEffect(() => {
    const updateMathProblem = () => {
      setNum1(Math.floor(Math.random() * 50) + 1);
      setNum2(Math.floor(Math.random() * 20) + 1);
      const operators = ['+', '-', '*', '/'];
      setOperator(operators[Math.floor(Math.random() * operators.length)]);
      setShowWarning(false);
    };
    
    updateMathProblem();
    const interval = setInterval(updateMathProblem, 3000);
    
    return () => clearInterval(interval);
  }, []);
  
  const calculateCorrectAnswer = (): number => {
    switch (operator) {
      case '+': return num1 + num2;
      case '-': return num1 - num2;
      case '*': return num1 * num2;
      case '/': return parseFloat((num1 / num2).toFixed(2));
      default: return 0;
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    playRandomSound();
    
    const userAnswer = parseFloat(answer);
    const correctAnswer = calculateCorrectAnswer();
    
    if (Math.abs(userAnswer - correctAnswer) < 0.1) {
      onVerify(true);
    } else {
      setShowWarning(true);
      onVerify(false);
    }
  };
  
  return (
    <div className="impossible-captcha text-center">
      <h3 className="font-bold mb-2 crazy-text">Solve This Math Problem</h3>
      <p className="text-xl font-mono animate-pulse-fast mb-3">
        {num1} {operator} {num2} = ?
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <input
          type="text"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          className="w-24 px-2 py-1 text-center border border-gray-300 rounded animate-shake"
          placeholder="???"
        />
        <button 
          type="submit"
          className="mt-2 px-4 py-2 bg-purple-600 text-white rounded dancing-button"
        >
          Verify
        </button>
      </form>
      {showWarning && (
        <p className="text-red-500 mt-2 animate-shake">
          Wrong! Hurry, the numbers are changing!
        </p>
      )}
    </div>
  );
};

interface FloatingBananaCaptchaProps {
  onVerify: (success: boolean) => void;
}

const FloatingBananaCaptcha: React.FC<FloatingBananaCaptchaProps> = ({ onVerify }) => {
  const [bananaPosition, setBananaPosition] = useState({ x: 50, y: 50 });
  const [gorillaPosition, setGorillaPosition] = useState({ x: 150, y: 150 });
  const [caught, setCaught] = useState(false);
  
  // Move the banana randomly
  useEffect(() => {
    const moveInterval = setInterval(() => {
      setBananaPosition({
        x: Math.random() * 200 + 50,
        y: Math.random() * 100 + 50,
      });
    }, 1000);
    
    return () => clearInterval(moveInterval);
  }, []);
  
  const handleGorillaMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - 30; // Adjust for gorilla size
    const y = e.clientY - rect.top - 30;
    
    setGorillaPosition({ x, y });
    
    // Check if gorilla caught the banana
    const distance = Math.sqrt(
      Math.pow(gorillaPosition.x - bananaPosition.x, 2) + 
      Math.pow(gorillaPosition.y - bananaPosition.y, 2)
    );
    
    if (distance < 50 && !caught) {
      setCaught(true);
      playRandomSound();
      onVerify(true);
    }
  };
  
  return (
    <div 
      className="impossible-captcha"
      style={{ 
        height: '200px',
        position: 'relative',
        overflow: 'hidden',
        cursor: 'none'
      }}
      onMouseMove={handleGorillaMove}
    >
      <h3 className="font-bold mb-2 crazy-text text-center">
        Catch the banana with the gorilla!
      </h3>
      
      <div
        style={{
          position: 'absolute',
          left: `${bananaPosition.x}px`,
          top: `${bananaPosition.y}px`,
          fontSize: '2rem',
          transition: 'all 0.2s ease',
        }}
      >
        🍌
      </div>
      
      <div
        style={{
          position: 'absolute',
          left: `${gorillaPosition.x}px`,
          top: `${gorillaPosition.y}px`,
          fontSize: '2.5rem',
          zIndex: 2,
          transition: 'all 0.05s linear',
        }}
      >
        🦍
      </div>
      
      {caught && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/60">
          <p className="text-xl font-bold text-green-600 animate-pulse-fast">
            Banana caught! Good job!
          </p>
        </div>
      )}
    </div>
  );
};

interface SpinningImageCaptchaProps {
  onVerify: (success: boolean) => void;
}

const SpinningImageCaptcha: React.FC<SpinningImageCaptchaProps> = ({ onVerify }) => {
  const images = ['🏠', '🚗', '🐱', '🐶', '🌮', '🍕', '🚀', '🐘'];
  const [targetImage, setTargetImage] = useState('');
  const [options, setOptions] = useState<string[]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  
  useEffect(() => {
    // Pick a random target image
    const target = images[Math.floor(Math.random() * images.length)];
    setTargetImage(target);
    
    // Create a shuffled array of options
    const shuffled = [...images].sort(() => 0.5 - Math.random());
    setOptions(shuffled.slice(0, 4));
  }, []);
  
  const handleSelect = (image: string) => {
    setSelected(image);
    playRandomSound();
    
    onVerify(image === targetImage);
  };
  
  return (
    <div className="impossible-captcha text-center">
      <h3 className="font-bold mb-2 crazy-text">
        Select the {targetImage} from these spinning images
      </h3>
      
      <div className="grid grid-cols-2 gap-4 mt-4">
        {options.map((image, index) => (
          <button
            key={index}
            onClick={() => handleSelect(image)}
            className={`w-16 h-16 mx-auto text-4xl flex items-center justify-center rounded-full
              ${selected === image ? 'bg-green-200' : 'bg-gray-100'}`}
            style={{
              animation: `spin ${Math.random() * 3 + 2}s linear infinite`,
              filter: `blur(${Math.random() * 2}px)`,
            }}
          >
            {image}
          </button>
        ))}
      </div>
    </div>
  );
};

interface HellishCaptchaProps {
  onComplete: (success: boolean) => void;
}

const HellishCaptcha: React.FC<HellishCaptchaProps> = ({ onComplete }) => {
  const [captchaType, setCaptchaType] = useState<number>(0);
  const [verified, setVerified] = useState(false);
  
  useEffect(() => {
    // Choose a random captcha type
    setCaptchaType(Math.floor(Math.random() * 3));
  }, []);
  
  const handleVerify = (success: boolean) => {
    if (success) {
      setVerified(true);
      setTimeout(() => {
        onComplete(true);
      }, 1000);
    } else {
      // If failed, switch to another captcha type
      let newType = Math.floor(Math.random() * 3);
      while (newType === captchaType) {
        newType = Math.floor(Math.random() * 3);
      }
      setCaptchaType(newType);
    }
  };
  
  return (
    <div>
      <h2 className="text-lg font-bold mb-2 comic-sans-text">
        Prove you're not a robot (or a patient human)
      </h2>
      
      {verified ? (
        <div className="text-center py-4 text-green-600 font-bold animate-pulse">
          Verification successful! Somehow...
        </div>
      ) : (
        <>
          {captchaType === 0 && <MathCaptcha onVerify={handleVerify} />}
          {captchaType === 1 && <FloatingBananaCaptcha onVerify={handleVerify} />}
          {captchaType === 2 && <SpinningImageCaptcha onVerify={handleVerify} />}
        </>
      )}
    </div>
  );
};

export default HellishCaptcha;
