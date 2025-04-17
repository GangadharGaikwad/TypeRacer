import React, { memo, useMemo } from 'react';
import PropTypes from 'prop-types';

const Character = memo(({ char, status, index }) => {
  return (
    <span className={`character ${status}`}>
      {char}
    </span>
  );
});

Character.propTypes = {
  char: PropTypes.string.isRequired,
  status: PropTypes.oneOf(['correct', 'incorrect', 'pending']).isRequired,
  index: PropTypes.number.isRequired
};

Character.displayName = 'Character';

const TextDisplay = memo(({ text, userInput, className = '' }) => {
  const characters = useMemo(() => {
    return text.split('').map((char, index) => {
      let status = 'pending';
      if (index < userInput.length) {
        status = userInput[index] === char ? 'correct' : 'incorrect';
      }
      return (
        <Character
          key={`${char}-${index}`}
          char={char}
          status={status}
          index={index}
        />
      );
    });
  }, [text, userInput]);

  // Group characters into words for better readability
  const words = useMemo(() => {
    const textArray = text.split('');
    const wordBreaks = [];
    
    // Find all word break indices
    textArray.forEach((char, index) => {
      if (char === ' ' || char === '\n') {
        wordBreaks.push(index);
      }
    });
    
    // Group characters into words
    const result = [];
    let lastBreak = -1;
    
    wordBreaks.forEach((breakIndex) => {
      result.push(characters.slice(lastBreak + 1, breakIndex + 1));
      lastBreak = breakIndex;
    });
    
    // Add the last word
    if (lastBreak < characters.length - 1) {
      result.push(characters.slice(lastBreak + 1));
    }
    
    return result;
  }, [characters, text]);

  return (
    <div className={`text-display ${className}`}>
      <div className="text-container">
        {words.map((word, index) => (
          <div key={`word-${index}`} className="word">
            {word}
          </div>
        ))}
      </div>
    </div>
  );
});

TextDisplay.propTypes = {
  text: PropTypes.string.isRequired,
  userInput: PropTypes.string.isRequired,
  className: PropTypes.string
};

TextDisplay.displayName = 'TextDisplay';

export default TextDisplay; 