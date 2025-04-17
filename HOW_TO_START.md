# How to Start the TypeRacer Game

Follow these simple steps to get the TypeRacer game up and running on your local machine.

## Prerequisites

- Node.js (v14 or higher) installed on your system
- npm or yarn package manager
- A modern web browser (Chrome, Firefox, Safari, or Edge)

## Installation

1. Clone the repository (if you haven't already):

```bash
git clone https://github.com/yourusername/type-racer-v0.git
```

2. Navigate to the project directory:

```bash
cd type-racer-v0
```

3. Install all the dependencies:

```bash
npm install
```

or with yarn:

```bash
yarn install
```

## Running the Development Server

4. Start the development server:

```bash
npm start
```

or with yarn:

```bash
yarn start
```

5. Open your browser and navigate to:

```
http://localhost:3000
```

The TypeRacer game should now be running in your browser.

## Using the Game

1. **Home Screen**: 
   - Select a difficulty level from the dropdown
   - Try the daily challenge for consistent practice
   - Read the "How to Play" guide for more information

2. **Game Screen**:
   - Type the displayed text as accurately and quickly as possible
   - View your real-time WPM, accuracy, and error count
   - Use F1 for help, F5 to restart, and ESC to return home

3. **Results Screen**:
   - Review your performance statistics
   - Choose to play again or return to the home screen

## Building for Production

If you want to create a production build:

```bash
npm run build
```

or with yarn:

```bash
yarn build
```

This will create an optimized build in the `build` folder, which you can deploy to any static hosting service.

## Deployment Options

### Netlify

1. Create a `netlify.toml` file in the root directory:

```toml
[build]
  command = "npm run build"
  publish = "build"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

2. Connect your GitHub repository to Netlify

### Vercel

1. Install Vercel CLI:

```bash
npm i -g vercel
```

2. Deploy:

```bash
vercel
```

### GitHub Pages

1. Install gh-pages:

```bash
npm install --save-dev gh-pages
```

2. Add to package.json:

```json
"homepage": "https://yourusername.github.io/type-racer-v0",
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d build"
}
```

3. Deploy:

```bash
npm run deploy
```

## Troubleshooting

- **Port Already in Use**: If port 3000 is already in use, the development server will prompt you to use a different port. Type 'Y' to accept.

- **Dependency Issues**: If you encounter any problems with dependencies, try:
  ```bash
  rm -rf node_modules
  npm install
  ```

- **Browser Compatibility**: Ensure you're using a modern browser with JavaScript enabled.

- **Node Version**: Check your Node.js version:
  ```bash
  node --version
  ```
  Update if needed to v14 or higher.

- **Console Errors**: Check your browser's developer console (F12) for any error messages.

## Getting Help

If you encounter any issues not covered in this guide, please:

1. Check the [DEVELOPER.md](./DEVELOPER.md) file for technical details
2. Open an issue on the GitHub repository
3. Consult the React documentation for React-specific problems 