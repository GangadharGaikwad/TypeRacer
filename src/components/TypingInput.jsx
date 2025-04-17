import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import './TypingInput.css';

const TypingInput = ({
  currentText,
  onProgress,
  onComplete,
  onError,
  onCorrect,
  disabled = false,
  className = '',
}) => {
  const [userInput, setUserInput] = useState('');
  const [errorCount, setErrorCount] = useState(0);
  const inputRef = useRef(null);
  
  // Reset input if text changes
  useEffect(() => {
    setUserInput('');
    setErrorCount(0);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [currentText]);
  
  // Calculate and report progress
  useEffect(() => {
    if (!currentText) return;
    
    const progress = Math.floor((userInput.length / currentText.length) * 100);
    if (onProgress) onProgress(progress);
    
    // Check for completion
    if (userInput.length === currentText.length && userInput === currentText) {
      if (onComplete) onComplete(errorCount);
      // Clear input after completion
      setUserInput('');
    }
  }, [userInput, currentText, errorCount, onProgress, onComplete]);
  
  // Focus the input field on mount
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleInputChange = (e) => {
    // Prevent default behavior for the hidden input field
    e.preventDefault();
  };
  
  const handleKeyDown = (e) => {
    if (disabled) return;
    
    // Handle special keys
    switch (e.key) {
      case 'Tab':
      case 'Enter':
        // Prevent default behavior
        e.preventDefault();
        return;
        
      case 'Backspace':
        // Handle backspace
        if (userInput.length > 0) {
          setUserInput(userInput.slice(0, -1));
        }
        e.preventDefault();
        return;
        
      case 'Escape':
        // Clear input
        setUserInput('');
        e.preventDefault();
        return;
        
      case 'Control':
      case 'Alt':
      case 'Shift':
      case 'Meta':
      case 'CapsLock':
      case 'NumLock':
      case 'ScrollLock':
      case 'Insert':
      case 'Home':
      case 'End':
      case 'PageUp':
      case 'PageDown':
      case 'ArrowUp':
      case 'ArrowDown':
      case 'ArrowLeft':
      case 'ArrowRight':
        // Ignore these keys
        return;
        
      default:
        // Continue processing
        break;
    }
    
    // Don't accept more input if text is complete
    if (userInput.length >= currentText.length) {
      e.preventDefault();
      return;
    }
    
    // Get the expected character at current position
    const expectedChar = currentText[userInput.length];
    const typedChar = e.key;
    
    // Check if the typed character matches the expected one
    if (typedChar === expectedChar) {
      // Correct input
      setUserInput(prev => prev + typedChar);
      if (onCorrect) onCorrect(typedChar, userInput.length);
    } else {
      // Incorrect input
      setErrorCount(prev => prev + 1);
      if (onError) onError(typedChar, expectedChar, userInput.length);
    }
    
    e.preventDefault();
  };
  
  const handlePaste = (e) => {
    // Prevent paste to ensure manual typing
    e.preventDefault();
  };

  // Force focus back to the input field if clicked away
  const handleFocusLost = () => {
    if (inputRef.current && !disabled) {
      inputRef.current.focus();
    }
  };

  return (
    <div 
      className={`typing-input-container ${className}`}
      onClick={handleFocusLost}
    >
      {/* Hidden input field to capture keyboard events */}
      <input
        ref={inputRef}
        type="text"
        className="typing-input"
        value={userInput}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        onPaste={handlePaste}
        onBlur={handleFocusLost}
        aria-label="Type the displayed text"
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck="false"
        disabled={disabled}
        aria-disabled={disabled}
      />
      
      {/* Visual indicator that input is focused */}
      <div className="typing-status">
        {disabled ? 'Typing disabled' : 'Ready to type'}
      </div>
    </div>
  );
};

TypingInput.propTypes = {
  currentText: PropTypes.string.isRequired,
  onProgress: PropTypes.func,
  onComplete: PropTypes.func,
  onError: PropTypes.func,
  onCorrect: PropTypes.func,
  disabled: PropTypes.bool,
  className: PropTypes.string,
};

export default TypingInput; 