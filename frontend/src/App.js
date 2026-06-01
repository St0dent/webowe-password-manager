import { useState, useEffect } from 'react';
import authService from './services/authService';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';

function App() {
  const [currentPage, setCurrentPage] = useState('login');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (authService.isAuthenticated()) {
      setIsAuthenticated(true);
      setCurrentPage('dashboard');
    }
  }, []);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    setCurrentPage('dashboard');
  };

  const handleRegisterSuccess = () => {
    setCurrentPage('login');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentPage('login');
  };

  const handleRegisterSwitch = () => {
    setCurrentPage('register');
  }

  const handleLoginSwitch = () => {
    setCurrentPage('login');
  }

  const styles = {
    app: { minHeight: '100vh', backgroundColor: 'transparent' },
    authPages: { minHeight: '100vh', display: 'flex', flexDirection: 'column' },
    switchPrompt: {
      textAlign: 'center',
      padding: '24px 20px',
      backgroundColor: 'rgba(15, 23, 42, 0.4)',
      borderTop: '1px solid rgba(99, 102, 241, 0.1)',
      backdropFilter: 'blur(10px)'
    },
    switchText: { margin: 0, fontSize: '14px', color: '#CBD5E1', fontWeight: 500 },
    switchLink: {
      background: 'none',
      border: 'none',
      color: '#06B6D4',
      cursor: 'pointer',
      textDecoration: 'underline',
      fontSize: '14px',
      fontWeight: 700,
      padding: 0,
      transition: 'all 0.2s ease'
    }
  };

  return (
    <div style={styles.app}>
      {isAuthenticated ? (
        <Dashboard onLogout={handleLogout} />
      ) : (
        <div style={styles.authPages}>
          {currentPage === 'login' ? (
            <>
              <Login onLoginSuccess={handleLoginSuccess} onRegisterSwitch={handleRegisterSwitch} />
              <div style={styles.switchPrompt}>
                <p style={styles.switchText}>
                  Don't have an account?{' '}
                  <button
                    onClick={() => setCurrentPage('register')}
                    style={styles.switchLink}
                    onMouseEnter={(e) => {
                      e.target.style.color = '#06B6D4';
                      e.target.style.opacity = '0.8';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.color = '#06B6D4';
                      e.target.style.opacity = '1';
                    }}
                  >
                    Create account
                  </button>
                </p>
              </div>
            </>
          ) : (
            <>
              <Register onRegisterSuccess={handleRegisterSuccess} onLoginSwitch={handleLoginSwitch} />
              <div style={styles.switchPrompt}>
                <p style={styles.switchText}>
                  Already have an account?{' '}
                  <button
                    onClick={() => setCurrentPage('login')}
                    style={styles.switchLink}
                    onMouseEnter={(e) => {
                      e.target.style.color = '#06B6D4';
                      e.target.style.opacity = '0.8';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.color = '#06B6D4';
                      e.target.style.opacity = '1';
                    }}
                  >
                    Log in
                  </button>
                </p>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
