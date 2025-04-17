import React, { useState, useCallback, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import useTyping from '../hooks/useTyping';
import TextDisplay from './TextDisplay';
import { getRandomText, DIFFICULTY_LEVELS } from '../utils/difficultyLevels';
import './GamePage.css';
import Footer from '../components/Footer';

const GamePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const initialDifficulty = location.state?.difficulty || 'medium';
  const customText = location.state?.customText;
  const isChallenge = location.state?.isChallenge;
  const challengeAuthor = location.state?.challengeAuthor;
  
  const [selectedDifficulty] = useState(initialDifficulty);
  const [text, setText] = useState(customText || getRandomText(selectedDifficulty));
  const [loading, setLoading] = useState(true);
  const [showHelp, setShowHelp] = useState(false);
  const helpRef = useRef(null);
  
  // Handle completion
  const handleComplete = useCallback((stats) => {
    // Calculate score based on difficulty
    const levelConfig = DIFFICULTY_LEVELS[selectedDifficulty.toUpperCase()];
    const score = stats.wpm * (stats.accuracy / 100) * levelConfig.scoreMultiplier;
    
    // Navigate to results after a brief delay
    setTimeout(() => {
      navigate('/results', { 
        state: { 
          ...stats,
          score,
          level: selectedDifficulty,
          levelConfig,
          timeUp: stats.timeUp,
          isChallenge,
          challengeAuthor
        } 
      });
    }, 1000);
  }, [navigate, selectedDifficulty, isChallenge, challengeAuthor]);
  
  // Use our custom typing hook
  const { 
    input, 
    handleInputChange, 
    currentWPM, 
    grossWPM,
    netWPM,
    accuracy, 
    elapsedTime, 
    startTime,
    timeLimit,
    isComplete,
    errorCount,
    resetTyping
  } = useTyping(text, handleComplete, selectedDifficulty);

  // Define handleEscape and handleRestart with useCallback after resetTyping is defined
  const handleEscape = useCallback(() => {
    navigate('/');
  }, [navigate]);

  const handleRestart = useCallback(() => {
    // For daily challenges, keep the same text, otherwise get a new random text
    if (!customText) {
      setText(getRandomText(selectedDifficulty));
    }
    resetTyping();
  }, [customText, resetTyping, selectedDifficulty, setText]);

  // Loading effect
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    
    // Define animation timing - shorter than home page
    const loadTime = 1500;
    
    const timer = setTimeout(() => {
      setLoading(false);
      document.body.style.overflow = 'auto';
    }, loadTime);
    
    return () => {
      clearTimeout(timer);
      document.body.style.overflow = 'auto';
    };
  }, []);

  // Handle click outside the modals
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (helpRef.current && !helpRef.current.contains(event.target)) {
        setShowHelp(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      // ESC to exit
      if (e.key === 'Escape') {
        handleEscape();
      }
      
      // F1 to toggle help
      if (e.key === 'F1') {
        e.preventDefault();
        setShowHelp(prev => !prev);
      }
      
      // F5 to restart
      if (e.key === 'F5') {
        e.preventDefault();
        handleRestart();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleEscape, handleRestart]);
  
  const toggleHelp = () => {
    setShowHelp(prev => !prev);
  };

  return (
    <div className="game-page-wrapper">
      <div className="min-h-screen bg-black flex flex-col justify-center items-center p-4">
        <div className="console-container w-full max-w-3xl rounded-3xl overflow-hidden bg-black border-4 border-gray-800 shadow-2xl mb-8" style={{ backgroundColor: '#000000' }}>
          <div className="console-content p-6 flex flex-col h-full" style={{ backgroundColor: '#000000' }}>
            {/* Title */}
            <div className="text-center mb-6">
              <h1 className="text-5xl font-bold text-green-500 tracking-widest font-vt323">TYPERACER</h1>
            </div>
            
            {/* Divider Line */}
            <div className="border-b border-dashed border-green-500 mb-4"></div>
            
            {/* Status Row */}
            <div className="flex justify-between mb-6">
              <div className={`text-green-500 font-vt323 text-2xl ${loading ? "booting-text" : ""}`}>
                {loading ? "Booting..." : "Ready"}
              </div>
              <div className="text-green-500 font-vt323 text-2xl">
                {DIFFICULTY_LEVELS[selectedDifficulty.toUpperCase()].name}
              </div>
            </div>
            
            {/* Timer display for Medium and Hard difficulties */}
            {timeLimit && !loading && (
              <div className="timer-display mb-4">
                <div className="flex justify-between items-center">
                  <div className="text-green-500 font-vt323 text-xl">TIME REMAINING:</div>
                  <div className={`text-green-500 font-vt323 text-xl ${timeLimit - elapsedTime <= 10 ? "text-red-500" : ""}`}>
                    {Math.max(0, Math.ceil(timeLimit - elapsedTime))}s
                  </div>
                </div>
                <div className="progress-bar mt-1 bg-gray-800 h-2 w-full">
                  <div 
                    className="bg-green-500 h-full" 
                    style={{width: `${Math.max(0, 100 - ((elapsedTime / timeLimit) * 100))}%`}}
                  ></div>
                </div>
              </div>
            )}
            
            {/* Main Content */}
            <div className="flex-grow mb-6">
              <div className="flex">
                <div className="flex-grow pr-6">
                  {/* Text Display Area */}
                  <div className="mb-4 text-green-500 font-vt323 text-2xl">
                    <TextDisplay 
                      text={text} 
                      userInput={input} 
                      className="retro-text-display"
                    />
                  </div>
                  
                  {/* Input Area - Hidden when in loading state */}
                  {!loading && (
                    <div className="relative">
                      <input 
                        type="text"
                        className="bg-transparent w-full border-none outline-none text-green-500 font-vt323 text-xl typing-input"
                        value={input}
                        onChange={handleInputChange}
                        placeholder="Click here and start typing..."
                        disabled={isComplete}
                        autoFocus
                      />
                    </div>
                  )}
                </div>
                
                {/* Stats Display */}
                <div className="text-right">
                  <div className="text-green-500 font-vt323 text-xl">WPM</div>
                  <div className="text-green-500 font-vt323 text-5xl mb-2">{startTime ? currentWPM : "--"}</div>
                  
                  <div className="stats-detail text-sm text-green-500/80 font-vt323 mb-4">
                    <div>GROSS: {startTime ? grossWPM : "--"}</div>
                    <div>NET: {startTime ? netWPM : "--"}</div>
                  </div>
                  
                  <div className="text-green-500 font-vt323 text-xl">Accuracy</div>
                  <div className="text-green-500 font-vt323 text-5xl">{startTime ? `${accuracy}%` : "--"}</div>
                  
                  <div className="stats-detail text-sm text-green-500/80 font-vt323 mt-2">
                    <div>ERRORS: {startTime ? errorCount : "--"}</div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Divider Line */}
            <div className="border-b border-green-500 mb-4"></div>
            
            {/* Game Controls */}
            <div className="flex justify-between items-center">
              <div className="text-green-500 font-vt323 text-2xl">
                {/* Progress indicator */}
                <div className="progress-indicator">
                  <div className="text-sm mb-1">Progress: {Math.round((input.length / text.length) * 100)}%</div>
                  <div className="progress-bar bg-gray-800 h-2 w-48">
                    <div 
                      className="bg-green-500 h-full" 
                      style={{width: `${(input.length / text.length) * 100}%`}}
                    ></div>
                  </div>
                </div>
              </div>
              <div className="flex items-center">
                <button 
                  onClick={toggleHelp}
                  className="text-green-500 font-vt323 text-lg mr-4 hover:text-green-300 focus:outline-none"
                >
                  Help [F1]
                </button>
                <button 
                  onClick={handleRestart}
                  className="text-green-500 font-vt323 text-2xl hover:text-green-300 focus:outline-none"
                >
                  Restart [F5]
                </button>
              </div>
            </div>
          </div>
      </div>
      
        {/* Help Panel */}
        {showHelp && (
          <div className="help-overlay" ref={helpRef}>
            <div className="help-panel">
              <h3 className="text-xl text-green-500 mb-4 font-vt323">Keyboard Controls</h3>
              <ul className="text-green-400 font-vt323">
                <li className="mb-2"><span className="key">ESC</span> - Exit game</li>
                <li className="mb-2"><span className="key">F1</span> - Toggle help</li>
                <li className="mb-2"><span className="key">F5</span> - Restart game</li>
              </ul>
              
              <h3 className="text-xl text-green-500 mb-2 mt-4 font-vt323">Speed Metrics</h3>
              <ul className="text-green-400 font-vt323">
                <li className="mb-2">- <strong>WPM</strong>: Words Per Minute - Completed words divided by time</li>
                <li className="mb-2">- <strong>Gross WPM</strong>: All keystrokes (5 chars = 1 word) divided by time</li>
                <li className="mb-2">- <strong>Net WPM</strong>: Gross WPM minus penalty for errors</li>
              </ul>
              
              <h3 className="text-xl text-green-500 mb-2 mt-4 font-vt323">Accuracy</h3>
              <ul className="text-green-400 font-vt323">
                <li className="mb-2">- Accuracy is calculated based on correct keystrokes</li>
                <li className="mb-2">- Green text means correct typing</li>
                <li className="mb-2">- Red text indicates errors</li>
                <li className="mb-2">- Type as accurately as possible for best score</li>
              </ul>
              
              <button 
                onClick={toggleHelp}
                className="close-help mt-4 font-vt323"
              >
                Close [ESC]
              </button>
            </div>
          </div>
        )}
        
        {/* Footer placed at the bottom of the flex column */}
        <Footer />
      </div>
    </div>
  );
};

export default GamePage;