# TypeRacer Game

A React-based typing game with a retro terminal aesthetic to test and improve your typing speed and accuracy.

![TypeRacer Screenshot](./public/images/typeracer-screenshot.png)

## Features

- **Multiple Difficulty Levels**: Easy, Medium, and Hard modes with varying text complexity and time limits
- **Real-time Statistics**: Live tracking of WPM (Words Per Minute), accuracy, and error count
- **Daily Challenges**: New programming quotes each day to keep practice fresh
- **Detailed Results**: Comprehensive post-game analysis of your typing performance
- **Terminal Aesthetic**: Authentic CRT monitor styling with scanlines and green text
- **Responsive Design**: Fully playable on desktop and mobile devices
- **Keyboard Shortcuts**: Quick access to game controls with keyboard commands

## Technologies Used

- React (with Create React App)
- React Router for navigation
- Tailwind CSS for styling
- Custom React hooks for typing logic

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Start the development server:
   ```
   npm start
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser

## How to Play

1. **Home Screen**: Select your difficulty level and press "START GAME"
2. **Daily Challenge**: Try the daily challenge for a consistent way to track improvement
3. **Game Screen**: Type the displayed text as accurately and quickly as possible
4. **Results Screen**: Review your performance statistics when you complete the text

## Game Controls

- **F1**: Open help menu
- **F5**: Restart current game
- **ESC**: Return to home screen

## Game Mechanics

### Difficulty Levels

| Level | Description | Time Limit | Min. WPM | Text Length |
|-------|-------------|------------|----------|------------|
| Easy  | Short, simple sentences | None | 20 WPM | 20-60 chars |
| Medium | Moderate complexity | 90 seconds | 40 WPM | 100-200 chars |
| Hard | Complex paragraphs | 60 seconds | 60 WPM | 200-400 chars |

### Performance Metrics

TypeRacer calculates several metrics to help you understand your typing performance:

- **WPM (Words Per Minute)**: Standard measure of typing speed (5 characters = 1 word)
- **Gross WPM**: Raw typing speed without accounting for errors
- **Net WPM**: Typing speed with penalties for errors
- **Accuracy**: Percentage of correctly typed characters
- **Error Count**: Total number of typing mistakes

## Project Structure

```
src/
├── components/       # Reusable UI components
│   ├── Footer.jsx    # Footer with scanline effect
│   ├── Header.jsx    # Navigation header
│   └── ...
├── hooks/            # Custom React hooks
│   └── useTyping.js  # Core typing logic and calculations
├── pages/            # Main application views
│   ├── Home.jsx      # Landing page
│   ├── GamePage.js   # Main typing game interface
│   └── ResultsPage.js # Performance results display
├── utils/            # Helper functions and data
│   ├── difficultyLevels.js # Game difficulty settings
│   ├── dailyChallenges.js  # Daily challenge texts
│   └── sounds.js     # Sound effect utilities
└── styles/           # Additional CSS stylesheets
```

## Core Components

### useTyping Hook

The central hook that handles:
- Real-time typing input processing
- WPM and accuracy calculations
- Error detection and handling
- Game completion logic

### Home.jsx

The landing page featuring:
- Loading animation with terminal aesthetic
- Difficulty selection dropdown
- Daily challenge access
- Instructions and game guide

### GamePage.js

The main game interface with:
- Text display with character-by-character highlighting
- Real-time statistics display
- Timer for timed modes
- Help menu with keyboard shortcuts

### ResultsPage.js

The post-game results screen showing:
- Final WPM, accuracy, and score
- Option to play again or return home
- Statistics breakdown

## Future Enhancements

- Multiplayer mode
- User accounts to track progress over time
- Custom themes
- Additional difficulty levels
- Text categories (code, literature, quotes, etc.)

## License

MIT

## Author

Gangadhar Gaikwad
