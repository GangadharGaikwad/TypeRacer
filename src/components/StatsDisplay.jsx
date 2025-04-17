import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

const StatsDisplay = ({ 
  wpm, 
  accuracy, 
  time, 
  isActive,
  timeLimit,
  className = '' 
}) => {
  // Calculate time percentage if there's a time limit
  const timePercentage = timeLimit ? (time / timeLimit) * 100 : null;
  
  return (
    <motion.div 
      className={`stats-display ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="grid grid-cols-3 gap-4">
        <div className="stat-item">
          <span className="stat-label">WPM</span>
          <span className="stat-value">{isActive ? wpm : '--'}</span>
        </div>
        
        <div className="stat-item">
          <span className="stat-label">Accuracy</span>
          <span className="stat-value">{isActive ? `${accuracy}%` : '--'}</span>
        </div>
        
        <div className="stat-item">
          <span className="stat-label">Time</span>
          <span className="stat-value">
            {isActive ? time.toFixed(1) : '--'}s
            {timeLimit && ` / ${timeLimit}s`}
          </span>
        </div>
      </div>
      
      {/* Time limit progress bar */}
      {timeLimit && (
        <div className="mt-4">
          <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-yellow-400"
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(100, timePercentage)}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>
      )}
    </motion.div>
  );
};

StatsDisplay.propTypes = {
  wpm: PropTypes.number,
  accuracy: PropTypes.number,
  time: PropTypes.number,
  isActive: PropTypes.bool,
  timeLimit: PropTypes.number,
  className: PropTypes.string
};

export default StatsDisplay; 