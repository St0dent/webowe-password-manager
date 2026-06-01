import { useState } from 'react';
import EditPasswordModal from './EditPasswordModal';

export default function PasswordItem({ password, onDelete, onUpdate }) {
  const [showPassword, setShowPassword] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [copiedId, setCopiedId] = useState(null);
  const [isHovering, setIsHovering] = useState(false);

  const colors = {
    bg: '#1E293B',
    bgLight: '#334155',
    primary: '#6366F1',
    accent: '#06B6D4',
    success: '#10B981',
    warning: '#F59E0B',
    error: '#EF4444',
    text: '#F1F5F9',
    textSecondary: '#CBD5E1'
  };

  const handleCopyPassword = async () => {
    try {
      await navigator.clipboard.writeText(password.password);
      setCopiedId(password.id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error('Failed to copy');
    }
  };

  const handleEdit = async (newPassword) => {
    setLoading(true);
    try {
      await onUpdate(password.id, newPassword);
      setShowEditModal(false);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = () => {
    if (window.confirm(`Delete password for "${password.title}"?`)) {
      setLoading(true);
      onDelete(password.id).finally(() => setLoading(false));
    }
  };

  const styles = {
    item: {
      background: `linear-gradient(135deg, rgba(30, 41, 59, 0.6) 0%, rgba(51, 65, 85, 0.4) 100%)`,
      border: `1px solid ${isHovering ? 'rgba(99, 102, 241, 0.4)' : 'rgba(99, 102, 241, 0.1)'}`,
      borderRadius: '16px',
      padding: '20px',
      marginBottom: '12px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: '16px',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      boxShadow: isHovering ? '0 12px 40px rgba(99, 102, 241, 0.15)' : '0 4px 12px rgba(0, 0, 0, 0.2)',
      backdropFilter: 'blur(10px)'
    },
    content: { flex: 1, minWidth: 0 },
    titleSection: { display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px' },
    title: { margin: 0, fontSize: '16px', fontWeight: 700, color: colors.text, fontFamily: "'Space Mono', monospace" },
    badge: { display: 'inline-block', backgroundColor: `rgba(16, 185, 129, 0.2)`, color: colors.success, padding: '4px 10px', borderRadius: '8px', fontSize: '11px', fontWeight: 700, border: `1px solid rgba(16, 185, 129, 0.3)` },
    passwordDisplay: { display: 'flex', alignItems: 'center', gap: '12px', backgroundColor: `rgba(0, 0, 0, 0.2)`, padding: '12px', borderRadius: '10px', backdropFilter: 'blur(10px)' },
    passwordText: { fontFamily: "'Space Mono', monospace", fontSize: '13px', color: colors.accent, flex: 1, wordBreak: 'break-all', margin: 0, letterSpacing: '0.5px' },
    maskedPassword: { fontSize: '14px', color: colors.textSecondary, fontWeight: 700, letterSpacing: '3px', fontFamily: "'Space Mono', monospace" },
    copyButton: { padding: '8px 14px', fontSize: '12px', fontWeight: 600, color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', whiteSpace: 'nowrap', transition: 'all 0.2s ease', backgroundColor: copiedId === password.id ? colors.success : colors.accent },
    actions: { display: 'flex', gap: '8px', marginLeft: '12px', flexWrap: 'wrap', justifyContent: 'flex-end' },
    actionButton: (bgColor) => ({
      padding: '10px 14px',
      fontSize: '16px',
      backgroundColor: `rgba(99, 102, 241, 0.1)`,
      border: `1px solid rgba(99, 102, 241, 0.2)`,
      borderRadius: '10px',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minWidth: '44px',
      minHeight: '44px'
    })
  };

  return (
    <>
      <div
        style={styles.item}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <div style={styles.content}>
          <div style={styles.titleSection}>
            <h4 style={styles.title}>{password.title}</h4>
            <span style={styles.badge}>✓ Encrypted</span>
          </div>

          {showPassword ? (
            <div style={styles.passwordDisplay}>
              <code style={styles.passwordText}>{password.password}</code>
              <button
                onClick={handleCopyPassword}
                style={{
                  ...styles.copyButton,
                  backgroundColor: copiedId === password.id ? colors.success : colors.accent
                }}
                onMouseEnter={(e) => {
                  if (copiedId !== password.id) {
                    e.target.style.transform = 'scale(1.05)';
                  }
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'scale(1)';
                }}
              >
                {copiedId === password.id ? '✓ Copied' : '📋 Copy'}
              </button>
            </div>
          ) : (
            <div style={styles.maskedPassword}>
              {'●'.repeat(Math.min(password.password.length, 24))}
            </div>
          )}
        </div>

        <div style={styles.actions}>
          <button
            style={styles.actionButton()}
            onClick={() => setShowPassword(!showPassword)}
            title="Toggle visibility"
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = `rgba(99, 102, 241, 0.2)`;
              e.target.style.borderColor = colors.primary;
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = `rgba(99, 102, 241, 0.1)`;
              e.target.style.borderColor = 'rgba(99, 102, 241, 0.2)';
            }}
          >
            {showPassword ? '👁️' : '👁️‍🗨️'}
          </button>
          <button
            style={styles.actionButton()}
            onClick={() => setShowEditModal(true)}
            disabled={loading}
            title="Edit password"
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = `rgba(245, 158, 11, 0.2)`;
              e.target.style.borderColor = '#F59E0B';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = `rgba(99, 102, 241, 0.1)`;
              e.target.style.borderColor = 'rgba(99, 102, 241, 0.2)';
            }}
          >
            ✏️
          </button>
          <button
            style={styles.actionButton()}
            onClick={handleDelete}
            disabled={loading}
            title="Delete password"
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = `rgba(239, 68, 68, 0.2)`;
              e.target.style.borderColor = '#EF4444';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = `rgba(99, 102, 241, 0.1)`;
              e.target.style.borderColor = 'rgba(99, 102, 241, 0.2)';
            }}
          >
            🗑️
          </button>
        </div>
      </div>

      {showEditModal && (
        <EditPasswordModal
          password={password}
          onSave={handleEdit}
          onCancel={() => setShowEditModal(false)}
          isLoading={loading}
        />
      )}
    </>
  );
}
