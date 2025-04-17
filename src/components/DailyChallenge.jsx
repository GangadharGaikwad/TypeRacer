import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getDailyChallenge, getDaysUntilChange } from '../utils/dailyChallenges';
import './DailyChallenge.css';

const DailyChallenge = () => {
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate();
  
  // Get today's challenge
  const todaysChallenge = getDailyChallenge();
  
  // Calculate hours until change
  const hoursUntilChange = getDaysUntilChange();
  
  // Handle clicking the "Take Challenge" button
  const handleTakeChallenge = () => {
    navigate('/game', { 
      state: { 
        customText: todaysChallenge.text,
        difficulty: todaysChallenge.difficulty,
        isChallenge: true,
        challengeAuthor: todaysChallenge.author
      } 
    });
  };
  
  return (
    <div className={`daily-challenge-container ${expanded ? 'expanded' : ''}`}>
      <div 
        className="daily-challenge-header" 
        onClick={() => setExpanded(!expanded)}
      >
        <div className="challenge-title">
          <span className="blinking-dot"></span> DAILY CHALLENGE
        </div>
        <div className="expand-icon">{expanded ? '▲' : '▼'}</div>
      </div>
      
      {expanded && (
        <div className="daily-challenge-content">
          <div className="challenge-timer">
            <div className="timer-label">REFRESHES IN:</div>
            <div className="timer-value">{hoursUntilChange} HOURS</div>
          </div>
          
          <div className="challenge-text-preview">
            <p>"{todaysChallenge.text.substring(0, 75)}..."</p>
            <p className="author">— {todaysChallenge.author}</p>
          </div>
          
          <div className="challenge-info">
            <div className="info-item">
              <div className="info-label">DIFFICULTY:</div>
              <div className="info-value">MEDIUM</div>
            </div>
            <div className="info-item">
              <div className="info-label">LENGTH:</div>
              <div className="info-value">{todaysChallenge.text.split(' ').length} WORDS</div>
            </div>
          </div>
          
          <button 
            className="take-challenge-button"
            onClick={handleTakeChallenge}
          >
            TAKE CHALLENGE
          </button>
        </div>
      )}
    </div>
  );
};

export default DailyChallenge; 