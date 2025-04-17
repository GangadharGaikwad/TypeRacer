// Difficulty level configurations
export const DIFFICULTY_LEVELS = {
  EASY: {
    id: 'easy',
    name: 'Easy',
    minLength: 20,
    maxLength: 40,
    timeLimit: 60, // 1 minute for easy mode
    minWpmForSuccess: 20,
    minWpmForHighScore: 40,
    scoreMultiplier: 1.0,
    description: 'Perfect for beginners. Short texts with common words and a generous time limit.'
  },
  MEDIUM: {
    id: 'medium',
    name: 'Medium',
    minLength: 50,
    maxLength: 80,
    timeLimit: 90, // 1.5 minutes
    minWpmForSuccess: 40,
    minWpmForHighScore: 60,
    scoreMultiplier: 1.5,
    description: 'Balanced challenge. Medium-length texts with varied vocabulary and moderate time pressure.'
  },
  HARD: {
    id: 'hard',
    name: 'Hard',
    minLength: 100,
    maxLength: 150,
    timeLimit: 120, // 2 minutes
    minWpmForSuccess: 60,
    minWpmForHighScore: 80,
    scoreMultiplier: 2.0,
    description: 'Expert level. Longer texts with complex vocabulary and tight time constraints.'
  }
};

// Text pools for each difficulty level
const TEXT_POOLS = {
  EASY: [
    "The quick brown fox jumps over the lazy dog.",
    "Learning to type is fun and useful. Practice makes perfect!",
    "Hello world! This is a typing exercise for beginners.",
    "The sun is bright and the sky is blue today.",
    "Type these words carefully and with good rhythm."
  ],
  MEDIUM: [
    "The art of typing requires both speed and accuracy. Regular practice helps improve your skills.",
    "Programming is a valuable skill in today's digital world. Many careers involve coding.",
    "The human brain is capable of amazing things with sufficient practice and dedication.",
    "Technology continues to evolve rapidly in our increasingly connected global society.",
    "Effective communication is essential in any profession. Typing well is part of that."
  ],
  HARD: [
    "The intricate mechanisms of quantum computing represent a paradigm shift in computational capabilities, challenging our traditional understanding of information processing.",
    "Neuroscience research has revealed that the human brain's plasticity allows for remarkable adaptation to new skills, with typing proficiency being a prime example.",
    "The philosophical implications of artificial intelligence raise profound questions about consciousness, free will, and the nature of human cognition.",
    "Climate change mitigation strategies require comprehensive international cooperation, innovative technological solutions, and significant behavioral changes.",
    "The intersection of biotechnology and artificial intelligence presents both unprecedented opportunities for medical advancement and complex ethical considerations."
  ]
};

// Utility functions
export const getRandomText = (level) => {
  const pool = TEXT_POOLS[level.toUpperCase()];
  if (!pool) {
    throw new Error(`Invalid difficulty level: ${level}`);
  }
  const randomIndex = Math.floor(Math.random() * pool.length);
  return pool[randomIndex];
};

export const checkLevelRequirements = (level, wpm, accuracy) => {
  const levelConfig = DIFFICULTY_LEVELS[level.toUpperCase()];
  if (!levelConfig) {
    throw new Error(`Invalid difficulty level: ${level}`);
  }

  return {
    meetsMinimum: wpm >= levelConfig.minWpmForSuccess,
    meetsHighScore: wpm >= levelConfig.minWpmForHighScore,
    accuracy: accuracy
  };
};

export const calculateScore = (level, wpm, accuracy) => {
  const levelConfig = DIFFICULTY_LEVELS[level.toUpperCase()];
  if (!levelConfig) {
    throw new Error(`Invalid difficulty level: ${level}`);
  }

  // Base score is WPM * accuracy percentage
  const baseScore = wpm * (accuracy / 100);
  
  // Apply difficulty multiplier
  const finalScore = baseScore * levelConfig.scoreMultiplier;
  
  return Math.round(finalScore);
};

export const getLevelDescription = (level) => {
  const levelConfig = DIFFICULTY_LEVELS[level.toUpperCase()];
  if (!levelConfig) {
    throw new Error(`Invalid difficulty level: ${level}`);
  }
  return levelConfig.description;
};

export const getLevelTimeLimit = (level) => {
  const levelConfig = DIFFICULTY_LEVELS[level.toUpperCase()];
  if (!levelConfig) {
    throw new Error(`Invalid difficulty level: ${level}`);
  }
  return levelConfig.timeLimit;
};

// Helper function to validate text length for a level
export const validateTextLength = (level, text) => {
  const levelConfig = DIFFICULTY_LEVELS[level.toUpperCase()];
  if (!levelConfig) {
    throw new Error(`Invalid difficulty level: ${level}`);
  }

  const length = text.length;
  return length >= levelConfig.minLength && length <= levelConfig.maxLength;
};

// Export all difficulty levels for easy access
export const getAllLevels = () => Object.values(DIFFICULTY_LEVELS); 