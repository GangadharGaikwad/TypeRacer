# TypeRacer Developer Documentation

This document provides technical details and architecture information for developers working on or contributing to the TypeRacer project.

## Architecture Overview

TypeRacer follows a component-based architecture using React functional components and hooks. The application is organized into the following key areas:

### Core Modules

1. **Typing Logic (`src/hooks/useTyping.js`)**
   - Central hook that handles all typing-related functionality
   - Calculates performance metrics in real-time
   - Manages game state (in progress, completed)
   - Handles timer-based completion for timed modes

2. **Game Progression**
   - Home → Game → Results flow
   - State passed between components using React Router's location state
   - Completion triggers navigation to results page with stats

3. **UI Components**
   - Terminal-styled interface with CSS for retro aesthetics
   - Responsive design using Tailwind CSS
   - Character-by-character text display with highlighting

## Key Components

### useTyping Hook

```javascript
// Core typing logic hook
const {
  input,              // Current user input
  handleInputChange,  // Input change handler
  currentWPM,         // Current WPM calculation
  grossWPM,           // Gross WPM (without error penalty)
  netWPM,             // Net WPM (with error penalty)
  accuracy,           // Accuracy percentage
  elapsedTime,        // Time elapsed in seconds
  timeLimit,          // Time limit for current difficulty
  isComplete,         // Whether typing is complete
  errorCount,         // Number of typing errors
  resetTyping         // Function to reset typing state
} = useTyping(text, handleComplete, difficulty);
```

### TextDisplay Component

Handles the character-by-character display of text with status highlighting:
- Green: Correctly typed characters
- Red: Incorrectly typed characters
- Default: Pending characters

### DailyChallenge System

- Rotates through a predefined set of programming quotes
- Selection based on the day of the year
- Difficulty locked to Medium

## State Management

The application uses React's built-in state management:

1. **Local Component State**:
   - `useState` for component-specific state
   - `useRef` for DOM references and values that don't trigger re-renders

2. **Custom Hooks**:
   - `useTyping` encapsulates typing-related state and logic
   - React Router for passing state between pages

## CSS Architecture

The styling system combines Tailwind CSS with custom CSS:

1. **Global Styles**: 
   - `index.css`: Base styles and Tailwind directives
   - `App.css`: Application-wide styles

2. **Component Styles**:
   - `Home.css`: Landing page styles
   - `GamePage.css`: Game interface styles
   - `ResultsPage.css`: Results page styles

3. **Component-specific CSS**:
   - `Footer.css`, `Header.css`, etc.

## Performance Optimizations

1. **Memoization**:
   - TextDisplay uses React.memo to prevent unnecessary re-renders
   - Callbacks wrapped with useCallback where appropriate

2. **Conditional Rendering**:
   - Elements conditionally rendered to minimize DOM operations
   - Loading states to manage rendering order

3. **CSS Animations**:
   - Hardware-accelerated CSS transforms for animations
   - Reduced motion preferences respected

## Build and Deployment

The application uses the standard Create React App build process:

```bash
# Development
npm start

# Production build
npm run build
```

## Adding New Features

### Adding a New Difficulty Level

1. Update the `DIFFICULTY_LEVELS` object in `src/utils/difficultyLevels.js`:
   ```javascript
   EXPERT: {
     id: "expert",
     name: "Expert",
     minLength: 300,
     maxLength: 500,
     timeLimit: 45, // seconds
     minWpmForSuccess: 80,
     minWpmForHighScore: 100,
     scoreMultiplier: 4.0,
     description: "For typing masters only."
   }
   ```

2. Add text samples for the new difficulty level
3. Update UI components to include the new difficulty level option

### Adding Sound Effects

1. Import sound files to `src/assets/sounds/`
2. Update `src/utils/sounds.js` to include new sound effects
3. Call `playSound()` function at appropriate points in the game flow

## Testing

The application can be tested using Jest and React Testing Library:

```bash
# Run all tests
npm test

# Run with coverage
npm test -- --coverage
```

### Key Areas to Test

1. **Typing Logic**:
   - WPM calculation accuracy
   - Error detection
   - Game completion conditions

2. **UI Components**:
   - Rendering of character states
   - Timer functionality
   - Navigation between pages

## Known Issues and Limitations

1. **Browser Compatibility**:
   - Full functionality in modern browsers
   - Limited support for Internet Explorer

2. **Performance**:
   - Long texts may cause performance issues on low-end devices
   - Consider text chunking for very long texts

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Implement changes
4. Add tests if applicable
5. Submit a pull request

Please follow the existing code style and component patterns when contributing.

## Code Style Guide

- Use functional components with hooks
- Destructure props and state
- Use consistent naming conventions
- Add appropriate comments for complex logic
- Follow the existing project structure

## License

This project is licensed under the MIT License. 