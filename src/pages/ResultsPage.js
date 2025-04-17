import React, { useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './ResultsPage.css';
import Footer from '../components/Footer';

const ResultsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const { 
    wpm = 0, 
    accuracy = 0, 
    level = 'medium',
    levelConfig = {},
    timeUp = false,
    isChallenge = false,
  } = location.state || {};

  // Play again button handler - wrap in useCallback
  const handlePlayAgain = useCallback(() => {
    navigate('/game', { state: { difficulty: level } });
  }, [navigate, level]);
  
  // Go home button handler - wrap in useCallback
  const handleGoHome = useCallback(() => {
    navigate('/');
  }, [navigate]);

  // Handle key press for ENTER
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Enter') {
        handlePlayAgain();
      } else if (e.key === 'Escape') {
        handleGoHome();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handlePlayAgain, handleGoHome]); // Adding handleGoHome to dependencies

  return (
    <div className="results-page-wrapper">
      <div className="min-h-screen bg-black flex flex-col justify-center items-center">
        <div className="simple-results-container">
          <div className="results-header">
            <div className="header-line"></div>
            <h1 className="title">RESULTS</h1>
            <div className="header-line"></div>
          </div>
          
          <p className="completion-message">
            {isChallenge ? "Daily Challenge Completed!" : (timeUp ? "Time's up!" : "You completed the text!")}
          </p>
          
          <div className="simple-stats-container">
            <div className="simple-stat-row">
              <div className="simple-stat-label">WPM</div>
              <div className="simple-stat-value">{Math.round(wpm)}</div>
            </div>
            
            <div className="simple-stat-row">
              <div className="simple-stat-label">ACCURACY</div>
              <div className="simple-stat-value">{Math.round(accuracy * 10) / 10}%</div>
            </div>
            
            <div className="simple-stat-row">
              <div className="simple-stat-label">DIFFICULTY</div>
              <div className="simple-stat-value">{(levelConfig.name || level).toUpperCase()}</div>
            </div>
            
            {isChallenge && (
              <div className="simple-stat-row challenge-info">
                <div className="simple-stat-label">CHALLENGE</div>
                <div className="simple-stat-value">DAILY</div>
              </div>
            )}
          </div>
          
          <div className="button-container">
            <button 
              onClick={handlePlayAgain}
              className="play-again-button"
            >
              PLAY AGAIN
            </button>
            
            <button 
              onClick={handleGoHome}
              className="home-button"
            >
              HOME
            </button>
          </div>
          
          <p className="enter-prompt">Press ENTER to play again or ESC for home</p>
        </div>
        
        <Footer />
      </div>
    </div>
  );
};

export default ResultsPage;