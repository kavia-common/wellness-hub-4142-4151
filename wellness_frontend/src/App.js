import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import './App.css';
import ResourcesPage from './pages/ResourcesPage';
import TrackPage from './pages/TrackPage';
import HomePage from './pages/HomePage';
import { ApiProvider } from './context/ApiContext';

// PUBLIC_INTERFACE
function App() {
  const [theme, setTheme] = useState('light');

  // Apply theme to document element
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // PUBLIC_INTERFACE
  const toggleTheme = () => setTheme(prev => (prev === 'light' ? 'dark' : 'light'));

  return (
    <ApiProvider>
      <div className="App">
        <BrowserRouter>
          <header className="navbar">
            <div className="navbar__brand">Wellness Hub</div>
            <nav className="navbar__nav">
              <NavLink className="nav__link" to="/">Home</NavLink>
              <NavLink className="nav__link" to="/resources">Resources</NavLink>
              <NavLink className="nav__link" to="/track">Track</NavLink>
            </nav>
            <button
              className="theme-toggle"
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            >
              {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
            </button>
          </header>

          <main className="container">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/resources" element={<ResourcesPage />} />
              <Route path="/track" element={<TrackPage />} />
            </Routes>
          </main>

          <footer className="footer">
            <span>© {new Date().getFullYear()} Wellness Hub</span>
          </footer>
        </BrowserRouter>
      </div>
    </ApiProvider>
  );
}

export default App;
