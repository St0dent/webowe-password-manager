import { useState } from 'react';
import authService from '../services/authService';
import ErrorBanner from '../components/ErrorBanner';

export default function Login({ onLoginSuccess, onRegisterSwitch }) {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await authService.login(login, password);
      onLoginSuccess();
    } catch (err) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const styles = {
    container: {
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 50%, #0F172A 100%)'
    },
    card: {
      background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.8) 0%, rgba(51, 65, 85, 0.4) 100%)',
      borderRadius: '20px',
      boxShadow: '0 25px 50px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(99, 102, 241, 0.1)',
      padding: '48px 40px',
      maxWidth: '420px',
      width: '100%',
      border: '1px solid rgba(99, 102, 241, 0.2)',
      backdropFilter: 'blur(20px)',
      animation: 'slideUp 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
    },
    header: { textAlign: 'center', marginBottom: '40px' },
    title: {
      margin: '0 0 8px 0',
      fontSize: '28px',
      fontWeight: 700,
      fontFamily: "'Space Mono', monospace",
      background: 'linear-gradient(135deg, #6366F1 0%, #06B6D4 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      letterSpacing: '0.5px'
    },
    subtitle: { margin: 0, fontSize: '14px', color: '#CBD5E1', fontWeight: 500 },
    form: { display: 'flex', flexDirection: 'column', gap: '20px' },
    field: {
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
      width: '100%'
    },
    label: { fontSize: '13px', fontWeight: 700, color: '#CBD5E1', textTransform: 'uppercase', letterSpacing: '0.5px' },
    input: {
      width: '100%',
      padding: '16px 18px',
      fontSize: '15px',
      fontWeight: 500,
      border: '2px solid rgba(99, 102, 241, 0.15)',
      backgroundColor: 'rgba(15, 23, 42, 0.3)',
      borderRadius: '10px',
      color: '#F1F5F9',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      boxSizing: 'border-box',
      backdropFilter: 'blur(10px)',
      fontFamily: 'inherit',
      outline: 'none'
    },
    passwordInputWrapper: {
      position: 'relative',
      width: '100%',
      display: 'flex'
    },
    toggleButton: {
      position: 'absolute',
      right: '14px',
      top: '50%',
      transform: 'translateY(-50%)',
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      fontSize: '18px',
      padding: '4px 8px',
      transition: 'all 0.2s ease'
    },
    submitButton: {
      padding: '14px 20px',
      backgroundColor: 'linear-gradient(135deg, #6366F1 0%, #06B6D4 100%)',
      color: 'white',
      border: 'none',
      borderRadius: '10px',
      cursor: 'pointer',
      fontWeight: 700,
      fontSize: '14px',
      marginTop: '10px',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      textTransform: 'uppercase',
      letterSpacing: '0.5px',
      width: '100%',
      background: 'linear-gradient(135deg, #6366F1 0%, #06B6D4 100%)'
    },
    footer: { textAlign: 'center', marginTop: '32px', paddingTop: '24px', borderTop: '1px solid rgba(99, 102, 241, 0.1)' },
    footerText: { margin: 0, fontSize: '12px', color: '#64748B' }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.header}>
          <h1 style={styles.title}>PASSWORD MANAGER</h1>
          <p style={styles.subtitle}>Secure password storage</p>
        </div>

        {error && <ErrorBanner message={error} onClose={() => setError('')} />}

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.field}>
            <label style={styles.label}>Username</label>
            <input
              type="text"
              placeholder="Enter your username"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
              style={styles.input}
              required
              disabled={loading}
              onFocus={(e) => {
                e.target.style.borderColor = '#6366F1';
                e.target.style.backgroundColor = 'rgba(15, 23, 42, 0.5)';
                e.target.style.boxShadow = '0 0 0 3px rgba(99, 102, 241, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'rgba(99, 102, 241, 0.15)';
                e.target.style.backgroundColor = 'rgba(15, 23, 42, 0.3)';
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>

          <div style={styles.field}>
            <label style={styles.label}>Password</label>
            <div style={styles.passwordInputWrapper}>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ ...styles.input, paddingRight: '44px' }}
                required
                disabled={loading}
                onFocus={(e) => {
                  e.target.style.borderColor = '#6366F1';
                  e.target.style.backgroundColor = 'rgba(15, 23, 42, 0.5)';
                  e.target.style.boxShadow = '0 0 0 3px rgba(99, 102, 241, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'rgba(99, 102, 241, 0.15)';
                  e.target.style.backgroundColor = 'rgba(15, 23, 42, 0.3)';
                  e.target.style.boxShadow = 'none';
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={styles.toggleButton}
              >
                {showPassword ? '👁️' : '👁️‍🗨️'}
              </button>
            </div>
          </div>

          <button
            type="submit"
            style={styles.submitButton}
            disabled={loading}
            onMouseEnter={(e) => {
              if (!loading) {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 12px 30px rgba(99, 102, 241, 0.3)';
              }
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = 'none';
            }}
          >
            {loading ? '⏳ Logging in...' : '→ Login'}
          </button>

        </form>

        <button
          style={styles.submitButton}
          onMouseEnter={(e) => {
            if (!loading) {
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 12px 30px rgba(99, 102, 241, 0.3)';
            }
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = 'none';
          }}
          onClick={() => {
            onRegisterSwitch();
          }}
        >
          → Register
        </button>

        <div style={styles.footer}>
          <p style={styles.footerText}>Aleksandra Wilkosz, Zuzanna Kępa</p>
        </div>
      </div>
    </div>
  );
}
