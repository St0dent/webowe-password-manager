import { useState } from 'react';

export default function AddPasswordForm({ onAdd, onCancel }) {
  const [title, setTitle] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!title || !password) {
      setError('Service name and password are required');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    try {
      await onAdd(title, password);
      setTitle('');
      setPassword('');
      setConfirmPassword('');
    } catch (err) {
      setError(err.message || 'Failed to add password');
    } finally {
      setLoading(false);
    }
  };

  const strength = getStrength(password);
  const strengthColor = getStrengthColor(strength);

  const styles = {
    formContainer: { marginBottom: '24px', animation: 'slideUp 0.3s cubic-bezier(0.4, 0, 0.2, 1)' },
    formCard: {
      background: `linear-gradient(135deg, rgba(30, 41, 59, 0.6) 0%, rgba(51, 65, 85, 0.4) 100%)`,
      border: `1px solid rgba(99, 102, 241, 0.2)`,
      borderRadius: '16px',
      padding: '28px',
      backdropFilter: 'blur(10px)',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)'
    },
    title: { margin: '0 0 24px 0', fontSize: '20px', fontWeight: 700, color: '#F1F5F9', fontFamily: "'Space Mono', monospace" },
    form: { display: 'flex', flexDirection: 'column', gap: '18px' },
    field: { display: 'flex', flexDirection: 'column', gap: '10px' },
    label: { fontSize: '13px', fontWeight: 700, color: '#CBD5E1', textTransform: 'uppercase', letterSpacing: '0.5px' },
    input: {
      padding: '16px 18px',
      fontSize: '15px',
      fontWeight: 500,
      border: '2px solid rgba(99, 102, 241, 0.15)',
      backgroundColor: 'rgba(15, 23, 42, 0.3)',
      borderRadius: '10px',
      color: '#F1F5F9',
      boxSizing: 'border-box',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      backdropFilter: 'blur(10px)',
      fontFamily: 'inherit',
      outline: 'none',
      width: '100%'
    },
    passwordInputWrapper: { 
      position: 'relative',
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
    strengthIndicator: { backgroundColor: 'rgba(0, 0, 0, 0.2)', padding: '12px', borderRadius: '10px', backdropFilter: 'blur(10px)' },
    strengthLabel: { fontSize: '12px', color: '#CBD5E1', fontWeight: 600, marginBottom: '8px' },
    strengthBar: { height: '6px', backgroundColor: 'rgba(99, 102, 241, 0.1)', borderRadius: '3px', overflow: 'hidden' },
    strengthFill: { height: '100%', backgroundColor: strengthColor, borderRadius: '3px', transition: 'width 0.3s, background-color 0.3s' },
    strengthText: { fontSize: '11px', marginTop: '6px', fontWeight: 700, color: strengthColor },
    actions: { display: 'flex', gap: '12px', marginTop: '12px' },
    submitButton: {
      flex: 1,
      padding: '12px 20px',
      fontSize: '14px',
      fontWeight: 700,
      backgroundColor: '#10B981',
      color: 'white',
      border: 'none',
      borderRadius: '10px',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      textTransform: 'uppercase',
      letterSpacing: '0.5px'
    },
    cancelButton: {
      flex: 1,
      padding: '12px 20px',
      fontSize: '14px',
      fontWeight: 700,
      backgroundColor: 'rgba(99, 102, 241, 0.1)',
      color: '#F1F5F9',
      border: '1px solid rgba(99, 102, 241, 0.2)',
      borderRadius: '10px',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      textTransform: 'uppercase',
      letterSpacing: '0.5px'
    },
    error: { backgroundColor: 'rgba(239, 68, 68, 0.1)', color: '#FCA5A5', padding: '12px 14px', borderRadius: '10px', border: `1px solid rgba(239, 68, 68, 0.3)`, fontSize: '13px', fontWeight: 500 }
  };

  return (
    <div style={styles.formContainer}>
      <div style={styles.formCard}>
        <h3 style={styles.title}>Add New Password</h3>
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.field}>
            <label style={styles.label}>Service Name</label>
            <input
              type="text"
              placeholder="e.g., Gmail, GitHub, Netflix"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              style={styles.input}
              required
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
                placeholder="Create a strong password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={styles.input}
                required
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

          <div style={styles.field}>
            <label style={styles.label}>Confirm Password</label>
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Re-enter password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              style={styles.input}
              required
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

          {password && (
            <div style={styles.strengthIndicator}>
              <p style={styles.strengthLabel}>Password Strength</p>
              <div style={styles.strengthBar}>
                <div
                  style={{
                    ...styles.strengthFill,
                    width: `${strength}%`
                  }}
                />
              </div>
              <p style={styles.strengthText}>{getStrengthText(strength)}</p>
            </div>
          )}

          {error && <div style={styles.error}>{error}</div>}

          <div style={styles.actions}>
            <button
              type="submit"
              style={styles.submitButton}
              disabled={loading}
              onMouseEnter={(e) => {
                if (!loading) {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 8px 20px rgba(16, 185, 129, 0.3)';
                }
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = 'none';
              }}
            >
              {loading ? '⏳ Adding...' : '+ Add Password'}
            </button>
            {onCancel && (
              <button
                type="button"
                onClick={onCancel}
                style={styles.cancelButton}
                disabled={loading}
                onMouseEnter={(e) => {
                  if (!loading) {
                    e.target.style.backgroundColor = 'rgba(99, 102, 241, 0.2)';
                    e.target.style.borderColor = '#6366F1';
                  }
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = 'rgba(99, 102, 241, 0.1)';
                  e.target.style.borderColor = 'rgba(99, 102, 241, 0.2)';
                }}
              >
                ✕ Cancel
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

function getStrength(password) {
  let strength = 0;
  if (password.length >= 8) strength += 25;
  if (password.length >= 12) strength += 25;
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength += 25;
  if (/\d/.test(password)) strength += 15;
  if (/[!@#$%^&*]/.test(password)) strength += 10;
  return Math.min(strength, 100);
}

function getStrengthColor(strength) {
  if (strength < 30) return '#EF4444';
  if (strength < 60) return '#F59E0B';
  return '#10B981';
}

function getStrengthText(strength) {
  if (strength < 30) return 'Weak';
  if (strength < 60) return 'Fair';
  if (strength < 85) return 'Good';
  return 'Strong';
}
