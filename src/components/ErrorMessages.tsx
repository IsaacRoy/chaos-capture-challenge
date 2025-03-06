
import React from 'react';

// List of annoying error messages
const errorMessages = [
  "Your password is too happy. Please make it sadder.",
  "The gorilla ate your credentials. Try again.",
  "Your username is too mainstream. Please choose a more obscure one.",
  "Login failed: Mercury is in retrograde.",
  "Error 404: Your willpower not found.",
  "Please verify you're not a robot by solving this quantum physics equation.",
  "Your computer doesn't like you. Maybe try being nicer?",
  "Password must contain at least one letter from a 19th century novel.",
  "Authentication server is currently having an existential crisis.",
  "Your username made our database laugh so hard it crashed.",
  "Login attempt rejected: Insufficient frustration detected.",
  "Our AI has determined you're too sane to use this application.",
  "Your mouse clicks are not annoyed enough. Please click more angrily.",
  "Login denied: Your keyboard hasn't been annoyed in the last 24 hours.",
  "Error: Too many correct characters in your password."
];

interface ErrorMessageProps {
  show: boolean;
  onClose: () => void;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ show, onClose }) => {
  const [message, setMessage] = React.useState<string>("");
  
  React.useEffect(() => {
    if (show) {
      // Pick a random error message
      const randomIndex = Math.floor(Math.random() * errorMessages.length);
      setMessage(errorMessages[randomIndex]);
    }
  }, [show]);
  
  if (!show) return null;
  
  return (
    <div className="popup-overlay" onClick={onClose}>
      <div 
        className="popup-content comic-sans-text"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-xl font-bold mb-2 crazy-text">Error!</h3>
        <p className="mb-4">{message}</p>
        <div className="flex justify-end space-x-2">
          <button
            className="px-4 py-2 bg-red-500 text-white rounded dancing-button"
            onClick={onClose}
            style={{
              transform: `rotate(${Math.random() * 5 - 2.5}deg)`
            }}
          >
            Fine, I'll try again
          </button>
          <button
            className="px-4 py-2 bg-green-500 text-white rounded dancing-button"
            onClick={onClose}
            style={{
              transform: `rotate(${Math.random() * 5 - 2.5}deg)`
            }}
          >
            I give up!
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorMessage;
