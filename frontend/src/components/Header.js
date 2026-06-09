import { useState } from 'react';

export default function Header({ username, onLogout }) {
  const [showDropdown, setShowDropdown] = useState(false);

  const colors = {
    bg: '#0F172A',
    bgLight: '#1E293B',
    primary: '#6366F1',
    accent: '#06B6D4',
    text: '#F1F5F9',
    textSecondary: '#CBD5E1'
  };

  const styles = {
    header: {
      background: `linear-gradient(135deg, ${colors.bg} 0%, ${colors.bgLight} 100%)`,
      backdropFilter: 'blur(20px)',
      borderBottom: `1px solid rgba(99, 102, 241, 0.1)`,
      padding: '16px 24px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
    },
    left: { display: 'flex', alignItems: 'center', gap: '12px' },
    logo: {
      fontSize: '18px',
      fontWeight: 700,
      color: colors.text,
      fontFamily: "'Space Mono', monospace",
      letterSpacing: '0.5px',
      background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.accent} 100%)`,
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text'
    },
    right: { display: 'flex', alignItems: 'center', gap: '20px' },
    userMenu: { position: 'relative' },
    userButton: {
      backgroundColor: `rgba(99, 102, 241, 0.1)`,
      color: colors.text,
      border: `1px solid rgba(99, 102, 241, 0.2)`,
      padding: '10px 16px',
      borderRadius: '12px',
      cursor: 'pointer',
      fontSize: '14px',
      fontWeight: 600,
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    },
    dropdown: {
      position: 'absolute',
      top: 'calc(100%)',
      right: 0,
      backgroundColor: colors.bgLight,
      border: `1px solid rgba(99, 102, 241, 0.2)`,
      borderRadius: '12px',
      minWidth: '180px',
      boxShadow: '0 20px 50px rgba(0, 0, 0, 0.4)',
      zIndex: 1000,
      backdropFilter: 'blur(20px)'
    },
    dropdownItem: {
      display: 'block',
      width: '100%',
      padding: '12px 16px',
      border: 'none',
      backgroundColor: 'transparent',
      color: colors.text,
      textAlign: 'left',
      cursor: 'pointer',
      fontSize: '14px',
      transition: 'all 0.2s ease',
      borderRadius: '8px',
      margin: '4px'
    }
  };

  const handleLogoutClick = () => {
    setShowDropdown(false);
    onLogout();
  };

  return (
    <header style={styles.header}>
      <div style={styles.left}>
        <div style={styles.logo}>PASSWORD MANAGER</div>
      </div>
      <div style={styles.right}>
        <div style={styles.userMenu}>
          <button
            style={styles.userButton}
            onMouseEnter={() => setShowDropdown(true)}
            onMouseLeave={() => setShowDropdown(false)}
          >
            <span>👤</span>
          </button>
          {showDropdown && (
            <div style={styles.dropdown} onMouseEnter={() => setShowDropdown(true)} onMouseLeave={() => setShowDropdown(false)}>
              <button
                style={{
                  ...styles.dropdownItem,
                  color: '#EF4444'
                }}
                onClick={handleLogoutClick}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
