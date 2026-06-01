import { useState } from 'react';

export default function EditPasswordModal({ password, onSave, onCancel, isLoading }) {
  const [newPassword, setNewPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!newPassword || newPassword.trim().length === 0) {
      setError('New password cannot be empty');
      return;
    }

    onSave(newPassword);
  };

  const styles = {
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
      zIndex: 1000,
      animation: 'fadeIn 0.3s ease'
    },
    modal: {
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      backgroundColor: '#1E293B',
      borderRadius: '16px',
      boxShadow: '0 25px 50px rgba(0, 0, 0, 0.5)',
      zIndex: 1001,
      maxWidth: '440px',
      width: '90%',
      maxHeight: '90vh',
      overflowY: 'auto',
      border: '1px solid rgba(99, 102, 241, 0.2)',
      backdropFilter: 'blur(20px)',
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '24px',
      borderBottom: '1px solid rgba(99, 102, 241, 0.1)'
    },
    title: { margin: 0, fontSize: '20px', fontWeight: 700, color: '#F1F5F9', fontFamily: "'Space Mono', monospace" },
    closeButton: {
      background: 'none',
      border: 'none',
      fontSize: '24px',
      cursor: 'pointer',
      color: '#CBD5E1',
      transition: 'all 0.2s ease',
      padding: '4px 8px'
    },
    form: { padding: '24px', display: 'flex', flexDirection: 'column', gap: '18px' },
    field: { display: 'flex', flexDirection: 'column', gap: '10px' },
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
    inputDisabled: {
      width: '100%',
      padding: '16px 18px',
      fontSize: '15px',
      fontWeight: 500,
      border: '2px solid rgba(99, 102, 241, 0.1)',
      backgroundColor: 'rgba(15, 23, 42, 0.2)',
      borderRadius: '10px',
      color: '#64748B',
      boxSizing: 'border-box',
      fontFamily: 'inherit'
    },
    passwordInput: { position: 'relative', display: 'flex' },
    showButton: {
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
    actions: { display: 'flex', gap: '12px', marginTop: '8px' },
    saveButton: {
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
    error: { color: '#FCA5A5', fontSize: '13px', backgroundColor: 'rgba(239, 68, 68, 0.1)', padding: '10px 12px', borderRadius: '8px', border: `1px solid rgba(239, 68, 68, 0.3)` }
  };

  return (
    <>
      <div style={styles.overlay} onClick={onCancel} />
      <div style={styles.modal}>
        <div style={styles.header}>
          <h3 style={styles.title}>Edit Password</h3>
          <button
            style={styles.closeButton}
            onClick={onCancel}
            onMouseEnter={(e) => {
              e.target.style.color = '#EF4444';
              e.target.style.transform = 'scale(1.2)';
            }}
            onMouseLeave={(e) => {
              e.target.style.color = '#CBD5E1';
              e.target.style.transform = 'scale(1)';
            }}
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.field}>
            <label style={styles.label}>Service</label>
            <input
              type="text"
              value={password.title}
              disabled
              style={styles.inputDisabled}
            />
          </div>

          <div style={styles.field}>
            <label style={styles.label}>New Password</label>
            <div style={styles.passwordInput}>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
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
                style={styles.showButton}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? '👁️' : '👁️‍🗨️'}
              </button>
            </div>
          </div>

          {error && <p style={styles.error}>{error}</p>}

          <div style={styles.actions}>
            <button
              type="submit"
              style={styles.saveButton}
              disabled={isLoading}
              onMouseEnter={(e) => {
                if (!isLoading) {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 8px 20px rgba(16, 185, 129, 0.3)';
                }
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = 'none';
              }}
            >
              {isLoading ? '⏳ Saving...' : '✓ Save'}
            </button>
            <button
              type="button"
              style={styles.cancelButton}
              onClick={onCancel}
              disabled={isLoading}
              onMouseEnter={(e) => {
                if (!isLoading) {
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
          </div>
        </form>
      </div>
    </>
  );
}
