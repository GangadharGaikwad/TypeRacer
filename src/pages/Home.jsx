import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { DIFFICULTY_LEVELS } from '../utils/difficultyLevels';
import DailyChallenge from '../components/DailyChallenge';
import Footer from '../components/Footer';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();
  const [selectedDifficulty, setSelectedDifficulty] = useState('medium');
  const [showInstructions, setShowInstructions] = useState(false);
  const [showGuide, setShowGuide] = useState(false);
  const [loading, setLoading] = useState(true);
  const [animationComplete, setAnimationComplete] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const mainContentRef = useRef(null);
  const secondaryContentRef = useRef(null);
  const dropdownRef = useRef(null);
  
  // Loading animation sequence
  useEffect(() => {
    // Prevent scrolling during loading
    document.body.style.overflow = 'hidden';
    
    // Define animation timing
    const squareAnimationDuration = 2800; // Total animation time for square drawing + fading
    const contentDelay = 500; // Time after square animation before showing content
    
    // First wait for square animation to complete
    const squareTimer = setTimeout(() => {
      setAnimationComplete(true);
    }, squareAnimationDuration);
    
    // Then show main content after a delay
    const contentTimer = setTimeout(() => {
      setLoading(false);
      // Allow scrolling only after content appears
      document.body.style.overflow = 'auto';
    }, squareAnimationDuration + contentDelay);
    
    return () => {
      clearTimeout(squareTimer);
      clearTimeout(contentTimer);
      document.body.style.overflow = 'auto';
    };
  }, []);

  // Handle scroll effects for content
  useEffect(() => {
    if (loading) return; // Skip if still loading

    const handleScroll = () => {
      // Removed unused scrollPosition variable
      
      // We're disabling the parallax effect for consistency
      
      // Fade in effect for secondary content
      if (secondaryContentRef.current) {
        const elements = secondaryContentRef.current.querySelectorAll('.fade-in-element');
        elements.forEach((element) => {
          const elementTop = element.getBoundingClientRect().top;
          const windowHeight = window.innerHeight;
          
          // If element is in viewport
          if (elementTop < windowHeight * 0.9) {
            element.classList.add('visible');
          }
        });
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Call once on load to initialize positions
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading]);

  // Handle click outside dropdown to close it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleStartGame = () => {
    navigate('/game', { state: { difficulty: selectedDifficulty } });
  };

  const handleDifficultyChange = (difficulty) => {
    console.log('Selecting difficulty:', difficulty);
    setSelectedDifficulty(difficulty);
    setDropdownOpen(false);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const toggleInstructions = () => {
    setShowInstructions(!showInstructions);
    if (showGuide) setShowGuide(false);
  };

  const toggleGuide = () => {
    setShowGuide(!showGuide);
    if (showInstructions) setShowInstructions(false);
  };

  const scrollToSecondary = () => {
    if (secondaryContentRef.current) {
      window.scrollTo({
        top: secondaryContentRef.current.offsetTop,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Background grid */}
      <div className="pixel-grid"></div>
      
      {/* Loading sequence */}
      {loading && (
        <div className={`loading-sequence ${animationComplete ? 'fade-out' : ''}`}>
          <div className="square-container">
            <div className="animated-square square-top"></div>
            <div className="animated-square square-right"></div>
            <div className="animated-square square-bottom"></div>
            <div className="animated-square square-left"></div>
            <div className="square-complete"></div>
            <div className="loading-text">TYPING...</div>
            <div className="loading-cursor"></div>
          </div>
        </div>
      )}
      
      {/* Main content - will show after loading completes */}
      <div className={`main-content ${!loading ? 'visible' : ''}`}>
        {/* First section with title and controls */}
        <div className="content-section" ref={mainContentRef}>
          <div className="flex flex-col items-center justify-center p-6 sm:p-10">
            {/* Title with line grid background and description in one container */}
            <div className="text-center">
              <h1 className="pixel-title text-5xl sm:text-6xl md:text-7xl mb-6 inline-block">
                TYPERACER
                <div className="line-grid-bg animated-grid"></div>
              </h1>
              
              <div className="mb-14">
                <p className="pixel-text text-lg sm:text-xl">
                  Test your typing speed and accuracy<br />
                  in a classic typing race game.
                </p>
              </div>
            </div>

            {/* Start game button */}
            <button 
              onClick={handleStartGame}
              className="start-button text-2xl sm:text-3xl mb-10 px-6 py-3 flex items-center justify-center w-64"
            >
              <span className="mr-2">&gt;</span> START GAME
            </button>

            {/* Difficulty selection */}
            <div className="difficulty-selector mb-10 text-xl sm:text-2xl">
              <div className="flex items-center justify-center">
                <span>DIFFICULTY: </span>
                <div className="relative ml-2 dropdown-wrapper" ref={dropdownRef}>
                  <button className="flex items-center" onClick={toggleDropdown}>
                    {DIFFICULTY_LEVELS[selectedDifficulty.toUpperCase()].name} <span className="ml-2">▼</span>
                  </button>
                  {dropdownOpen && (
                    <div className="difficulty-dropdown-active">
                      {Object.values(DIFFICULTY_LEVELS).map((level) => (
                        <button
                          key={level.id}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDifficultyChange(level.id);
                          }}
                          className={`dropdown-item ${selectedDifficulty === level.id ? 'selected' : ''}`}
                        >
                          {level.name}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Spacer div to ensure dropdown has room */}
            <div style={{ height: "80px" }}></div>
            
            {/* Daily Challenge */}
            <DailyChallenge />

            {/* Control buttons */}
            <div className="control-buttons">
              <button 
                onClick={toggleInstructions}
                className="how-to-play-button text-xl sm:text-2xl"
              >
                HOW TO PLAY
              </button>
              
              <button 
                onClick={toggleGuide}
                className="guide-button text-xl sm:text-2xl"
              >
                GUIDE
              </button>
            </div>
            
            {/* Instructions panel */}
            {showInstructions && (
              <div className="instructions-panel mt-6 p-4 border border-terminal-green max-w-xl">
                <h3 className="text-xl mb-3">How to Play:</h3>
                <ul className="text-left space-y-2">
                  <li>• Type the text shown on screen as quickly and accurately as possible</li>
                  <li>• Your WPM (Words Per Minute) and accuracy are tracked in real-time</li>
                  <li>• Different difficulty levels have different text complexity</li>
                  <li>• Complete the text before time runs out to achieve a high score</li>
                </ul>
                <button className="close-panel mt-4" onClick={() => setShowInstructions(false)}>
                  CLOSE
                </button>
              </div>
            )}
            
            {/* Game guide panel */}
            {showGuide && (
              <div className="guide-panel mt-6 p-4 border border-terminal-green max-w-xl">
                <h3 className="text-xl mb-3">TypeRacer Guide</h3>
                <ul className="text-left space-y-3">
                  <li>
                    <span className="key-command">ENTER</span>
                    Start typing when you're ready
                  </li>
                  <li>
                    <span className="key-command">ESC</span>
                    Pause the game
                  </li>
                  <li>
                    <span className="key-command">TAB</span>
                    Skip to next word (counts as error)
                  </li>
                  <li>
                    <span className="key-command">CTRL+R</span>
                    Restart current game
                  </li>
                  <li>
                    <span className="key-command">SCROLL</span>
                    Adjust text size during the game
                  </li>
                </ul>
                <button className="close-panel mt-4" onClick={() => setShowGuide(false)}>
                  CLOSE
                </button>
              </div>
            )}

            {/* Down arrow to scroll to secondary content */}
            <div className="down-arrow-container">
              <button onClick={scrollToSecondary} className="down-arrow-button" aria-label="Scroll down">
                <div className="down-arrow"></div>
              </button>
            </div>
          </div>
        </div>
        
        {/* Secondary content section with typing tips */}
        <div className="secondary-content" ref={secondaryContentRef}>
          <div className="flex flex-col items-center justify-center p-6 text-terminal-green">
            <div className="max-w-3xl w-full">
              <h2 className="text-3xl md:text-4xl mb-6 text-center fade-in-element">IMPROVE YOUR TYPING SKILLS</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-black/90 border border-terminal-green p-4 fade-in-element">
                  <h3 className="text-xl mb-2">TRACK PROGRESS</h3>
                  <p>Monitor your WPM and accuracy improvements over time with detailed statistics.</p>
                </div>
                <div className="bg-black/90 border border-terminal-green p-4 fade-in-element">
                  <h3 className="text-xl mb-2">CHALLENGE YOURSELF</h3>
                  <p>Gradually increase difficulty as you become more proficient.</p>
                </div>
                <div className="bg-black/90 border border-terminal-green p-4 fade-in-element">
                  <h3 className="text-xl mb-2">PRACTICE REGULARLY</h3>
                  <p>Consistent practice leads to significant typing speed improvements.</p>
                </div>
                <div className="bg-black/90 border border-terminal-green p-4 fade-in-element">
                  <h3 className="text-xl mb-2">FOCUS ON ACCURACY</h3>
                  <p>Speed comes naturally with accuracy. Focus on correct typing first.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Home; 