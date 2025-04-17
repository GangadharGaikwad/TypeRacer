/**
 * Daily challenges utility for TypeRacer
 * Manages daily challenge texts, rotation, and tracking
 */

// Remove the unused import
// import { DIFFICULTY_LEVELS } from './difficultyLevels';

// Collection of daily challenge texts
const DAILY_CHALLENGES = [
  {
    text: "The only way to learn a new programming language is by writing programs in it. The programming language is the medium of expression in the art of computer programming.",
    author: "Dennis Ritchie"
  },
  {
    text: "Software engineering is programming integrated over time. Programming integrated over time equals software engineering.",
    author: "Titus Winters"
  },
  {
    text: "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    author: "Martin Fowler"
  },
  {
    text: "The function of good software is to make the complex appear to be simple. If you're willing to restrict the flexibility of your approach, you can almost always do something better.",
    author: "John Carmack"
  },
  {
    text: "First, solve the problem. Then, write the code. The sooner you start to code, the longer the program will take.",
    author: "David Heinemeier Hansson"
  },
  {
    text: "Programming isn't about what you know; it's about what you can figure out. Simplicity is prerequisite for reliability.",
    author: "Edsger W. Dijkstra"
  },
  {
    text: "Code is like humor. When you have to explain it, it's bad. Always code as if the guy who ends up maintaining your code will be a violent psychopath who knows where you live.",
    author: "Martin Golding"
  },
  {
    text: "The most important property of a program is whether it accomplishes the intention of its user. Programs must be written for people to read, and only incidentally for machines to execute.",
    author: "Harold Abelson"
  },
  {
    text: "Most good programmers do programming not because they expect to get paid but because it is fun to program. The best programs are written when programmers are having fun.",
    author: "Linus Torvalds"
  },
  {
    text: "There's a fine line between being on the leading edge and being in the lunatic fringe. Good judgement is the result of experience, and experience the result of bad judgement.",
    author: "Frederick P. Brooks"
  }
];

/**
 * Get the daily challenge based on the current date
 * @returns {Object} The daily challenge with text and author
 */
export function getDailyChallenge() {
  const today = new Date();
  const dayOfYear = getDayOfYear(today);
  
  // Use the day of year to select a challenge (rotate through challenges)
  const challengeIndex = dayOfYear % DAILY_CHALLENGES.length;
  
  return {
    ...DAILY_CHALLENGES[challengeIndex],
    difficulty: 'medium', // Daily challenges use medium difficulty
    expiresAt: getEndOfDay(today)
  };
}

/**
 * Calculate days until the challenge changes
 * @returns {number} Hours until next challenge
 */
export function getDaysUntilChange() {
  const now = new Date();
  const endOfDay = getEndOfDay(now);
  
  // Calculate hours difference
  const diffMs = endOfDay - now;
  const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));
  
  return diffHrs;
}

/**
 * Get the day of the year (1-366)
 * @param {Date} date - The date to calculate day of year for
 * @returns {number} Day of year (1-366)
 */
function getDayOfYear(date) {
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = date - start;
  const oneDay = 1000 * 60 * 60 * 24;
  return Math.floor(diff / oneDay);
}

/**
 * Get the timestamp for the end of the current day
 * @param {Date} date - The current date
 * @returns {Date} Date object representing end of day
 */
function getEndOfDay(date) {
  const endOfDay = new Date(date);
  endOfDay.setHours(23, 59, 59, 999);
  return endOfDay;
}

/**
 * Check if the current date matches the challenge date
 * @param {Date} challengeDate - The date of the challenge
 * @returns {boolean} Whether the challenge is for today
 */
export function isChallengeForToday(challengeDate) {
  const today = new Date();
  return (
    challengeDate.getDate() === today.getDate() &&
    challengeDate.getMonth() === today.getMonth() &&
    challengeDate.getFullYear() === today.getFullYear()
  );
} 