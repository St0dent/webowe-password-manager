import { useState, useEffect } from 'react';
import { authService } from './services/authService';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';

function App() {
  const [currentPage, setCurrentPage] = useState('login');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = authService.getToken();
    if (token) {
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

  return (
    <div style={styles.app}>
      {isAuthenticated ? (
        <Dashboard onLogout={handleLogout} />
      ) : (
        <div style={styles.authContainer}>
          {currentPage === 'login' ? (
            <div>
              <Login onLoginSuccess={handleLoginSuccess} />
              <p style={styles.switchText}>
                No account?{' '}
                <button
                  onClick={() => setCurrentPage('register')}
                  style={styles.switchButton}
                >
                  Register here
                </button>
              </p>
            </div>
          ) : (
            <div>
              <Register onRegisterSuccess={handleRegisterSuccess} />
              <p style={styles.switchText}>
                Already have an account?{' '}
                <button
                  onClick={() => setCurrentPage('login')}
                  style={styles.switchButton}
                >
                  Login here
                </button>
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

const styles = {
  app: { minHeight: '100vh', backgroundColor: '#f9f9f9' },
  authContainer: { minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' },
  switchText: { textAlign: 'center', marginTop: '20px' },
  switchButton: { background: 'none', border: 'none', color: '#007bff', cursor: 'pointer', textDecoration: 'underline' }
};

export default App;
