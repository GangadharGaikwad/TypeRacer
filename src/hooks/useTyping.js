import { useState, useEffect, useCallback, useRef } from 'react';
import { getLevelTimeLimit } from '../utils/difficultyLevels';

/**
 * Custom hook to handle typing logic with improved accuracy and WPM calculations
 * @param {string} text - The text to type
 * @param {Function} onComplete - Callback function when typing is complete
 * @param {string} difficulty - The difficulty level of the text
 */
const useTyping = (text, onComplete, difficulty = 'medium') => {
  const [input, setInput] = useState('');
  const [startTime, setStartTime] = useState(null);
  const [currentWPM, setCurrentWPM] = useState(0);
  const [grossWPM, setGrossWPM] = useState(0);
  const [netWPM, setNetWPM] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [errorCount, setErrorCount] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [timeLimit] = useState(getLevelTimeLimit(difficulty));
  
  // Track detailed stats
  const totalKeystrokesRef = useRef(0);
  const correctKeystrokesRef = useRef(0);
  const backspacesRef = useRef(0);
  const wordCountRef = useRef(0);
  
  // Count actual words in the text
  const countWords = useCallback((str) => {
    return str.trim().split(/\s+/).length;
  }, []);
  
  // Reset typing state
  const resetTyping = useCallback(() => {
    setInput('');
    setStartTime(null);
    setCurrentWPM(0);
    setGrossWPM(0);
    setNetWPM(0);
    setAccuracy(100);
    setElapsedTime(0);
    setErrorCount(0);
    setIsComplete(false);
    totalKeystrokesRef.current = 0;
    correctKeystrokesRef.current = 0;
    backspacesRef.current = 0;
    wordCountRef.current = 0;
  }, []);

  // Reset when text changes
  useEffect(() => {
    resetTyping();
    // Pre-calculate the word count for the given text
    wordCountRef.current = countWords(text);
  }, [text, resetTyping, countWords]);

  // Calculate WPM and accuracy with improved algorithm
  const calculateStats = useCallback(() => {
    if (!startTime) return;

    const now = Date.now();
    const minutesElapsed = (now - startTime) / 60000;
    
    // Get completed words (whole words that are fully typed correctly)
    const inputWords = input.trim().split(/\s+/);
    const textWords = text.trim().split(/\s+/);
    
    let completedWordCount = 0;
    for (let i = 0; i < inputWords.length; i++) {
      if (i < textWords.length && inputWords[i] === textWords[i]) {
        completedWordCount++;
      }
    }
    
    // Calculate total input characters (including backspaces)
    const totalInputChars = totalKeystrokesRef.current;
    
    // Calculate accuracy based on correct keystrokes
    const acc = totalInputChars > 0 
      ? Math.round((correctKeystrokesRef.current / totalInputChars) * 100) 
      : 100;
    
    // Calculate Gross WPM (all typed words / minutes)
    const allTypedWords = input.length / 5; // Standard: 5 characters = 1 word
    const gross = Math.round(allTypedWords / minutesElapsed);
    
    // Calculate Net WPM (gross WPM - [errors / minutes])
    const uncorrectedErrors = errorCount;
    const net = Math.max(0, Math.round(gross - (uncorrectedErrors / minutesElapsed)));
    
    // Standard WPM (completed words / minutes)
    const standardWPM = Math.round(completedWordCount / minutesElapsed);
    
    setAccuracy(acc);
    setGrossWPM(gross);
    setNetWPM(net);
    setCurrentWPM(standardWPM);
    setElapsedTime((now - startTime) / 1000);
  }, [input, startTime, text, errorCount]);

  // Handle input changes with improved error tracking
  const handleInputChange = useCallback((e) => {
    const newInput = e.target.value;
    const prevInput = input;
    
    // Start timer on first input
    if (!startTime) {
      setStartTime(Date.now());
    }
    
    // Detect backspaces (input got shorter)
    if (newInput.length < prevInput.length) {
      backspacesRef.current += prevInput.length - newInput.length;
    } else {
      // Count new keystrokes
      const newKeystrokes = newInput.length - prevInput.length;
      totalKeystrokesRef.current += newKeystrokes;
      
      // Count correct keystrokes in the newly added characters
      for (let i = prevInput.length; i < newInput.length; i++) {
        if (i < text.length && newInput[i] === text[i]) {
          correctKeystrokesRef.current++;
        }
      }
    }
    
    // Count current errors (not corrected yet)
    const currentErrors = newInput.split('').reduce((count, char, i) => {
      return count + (i < text.length && char !== text[i] ? 1 : 0);
    }, 0);
    
    setErrorCount(currentErrors);
    setInput(newInput);
    
    // Update stats immediately for responsive feedback
    if (startTime) {
      calculateStats();
    }
    
    // Check for completion
    if (newInput.length === text.length) {
      setIsComplete(true);
      // Final stats calculation
      calculateStats();
      if (onComplete) {
        // Wait a moment to ensure final calculations are complete
        setTimeout(() => {
          onComplete({
            wpm: currentWPM,
            grossWPM: grossWPM,
            netWPM: netWPM,
            accuracy,
            time: elapsedTime,
            text,
            errorCount: currentErrors,
            totalKeystrokes: totalKeystrokesRef.current,
            backspaces: backspacesRef.current
          });
        }, 100);
      }
    }
  }, [input, startTime, text, onComplete, calculateStats, currentWPM, grossWPM, netWPM, accuracy, elapsedTime]);

  // Update stats periodically
  useEffect(() => {
    if (!startTime || isComplete) return;
    
    const interval = setInterval(calculateStats, 1000);
    return () => clearInterval(interval);
  }, [startTime, isComplete, calculateStats]);

  // Check time limit
  useEffect(() => {
    if (!timeLimit || !startTime || isComplete) return;
    
    const checkTimeLimit = () => {
      const now = Date.now();
      const elapsedSeconds = (now - startTime) / 1000;
      
      if (elapsedSeconds >= timeLimit) {
        setIsComplete(true);
        calculateStats();
        if (onComplete) {
          onComplete({
            wpm: currentWPM,
            grossWPM: grossWPM,
            netWPM: netWPM,
            accuracy,
            time: elapsedTime,
            text,
            errorCount,
            totalKeystrokes: totalKeystrokesRef.current,
            backspaces: backspacesRef.current,
            timeUp: true
          });
        }
      }
    };
    
    const interval = setInterval(checkTimeLimit, 1000);
    return () => clearInterval(interval);
  }, [timeLimit, startTime, isComplete, calculateStats, onComplete, currentWPM, grossWPM, netWPM, accuracy, elapsedTime, text, errorCount]);

  return {
    input,
    handleInputChange,
    currentWPM,
    grossWPM,
    netWPM,
    accuracy,
    elapsedTime,
    startTime,
    isComplete,
    errorCount,
    timeLimit,
    resetTyping
  };
};

export default useTyping; 