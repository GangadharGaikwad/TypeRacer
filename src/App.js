import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// Import pages
import Home from './pages/Home';
import GamePage from './pages/GamePage';
import ResultsPage from './pages/ResultsPage';

// Import components
import Header from './components/Header';

// Layout wrapper component that conditionally renders header
const AppLayout = ({ children, showHeader, crtEffectEnabled, toggleCrtEffect }) => {
  return (
    <div className="App min-h-screen bg-black text-white flex flex-col">
      {/* Responsive Header - only shown when showHeader is true */}
      {showHeader && <Header />}
      
      {/* Settings Toggle Bar - only shown when showHeader is true */}
      {showHeader && (
        <div className="bg-gray-800/80 backdrop-blur-sm py-2 px-4 border-b border-green-500/20">
          <div className="container mx-auto flex justify-end items-center space-x-4">
            <button 
              className={`px-3 py-1 rounded-md text-sm md:text-base font-vt323 transition-colors ${
                crtEffectEnabled 
                  ? 'bg-green-500/20 text-green-400 hover:bg-green-500/30' 
                  : 'bg-gray-700 text-gray-400 hover:bg-gray-600'
              }`}
              onClick={toggleCrtEffect}
            >
              {crtEffectEnabled ? 'CRT: ON' : 'CRT: OFF'}
            </button>
          </div>
        </div>
      )}
      
      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>
    </div>
  );
};

// Route observer component to check current path
// This component is currently unused and can be removed
/* 
const RouteObserver = ({ children, setCrtEnabled }) => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  
  // Disable CRT on home page
  useEffect(() => {
    if (isHomePage) {
      setCrtEnabled(false);
    }
  }, [isHomePage, setCrtEnabled]);
  
  return (
    <AppLayout 
      showHeader={!isHomePage} 
      crtEffectEnabled={!isHomePage} 
      toggleCrtEffect={() => {}}
    >
      {children}
    </AppLayout>
  );
};
*/

function App() {
  const [crtEffectEnabled, setCrtEffectEnabled] = useState(false);

  // Toggle CRT effect
  const toggleCrtEffect = () => {
    setCrtEffectEnabled(prev => !prev);
    localStorage.setItem('crtEffectEnabled', !crtEffectEnabled);
  };

  // Load settings from localStorage when the app loads
  useEffect(() => {
    const storedCrtEffect = localStorage.getItem('crtEffectEnabled');
    
    if (storedCrtEffect !== null) {
      setCrtEffectEnabled(storedCrtEffect === 'true');
    }
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home crtEnabled={false} />} />
        <Route path="/game" element={
          <AppLayout showHeader={false} crtEffectEnabled={crtEffectEnabled} toggleCrtEffect={toggleCrtEffect}>
            <GamePage crtEnabled={crtEffectEnabled} />
          </AppLayout>
        } />
        <Route path="/results" element={
          <AppLayout showHeader={false} crtEffectEnabled={crtEffectEnabled} toggleCrtEffect={toggleCrtEffect}>
            <ResultsPage crtEnabled={crtEffectEnabled} />
          </AppLayout>
        } />
        <Route path="/stats" element={
          <AppLayout showHeader={false} crtEffectEnabled={crtEffectEnabled} toggleCrtEffect={toggleCrtEffect}>
            <div className="container mx-auto p-8 text-center">Statistics Coming Soon</div>
          </AppLayout>
        } />
        <Route path="/settings" element={
          <AppLayout showHeader={false} crtEffectEnabled={crtEffectEnabled} toggleCrtEffect={toggleCrtEffect}>
            <div className="container mx-auto p-8 text-center">Settings Coming Soon</div>
          </AppLayout>
        } />
        <Route path="*" element={
          <AppLayout showHeader={false} crtEffectEnabled={crtEffectEnabled} toggleCrtEffect={toggleCrtEffect}>
            <div className="container mx-auto p-8 text-center">Page Not Found</div>
          </AppLayout>
        } />
      </Routes>
    </Router>
  );
}

export default App;
