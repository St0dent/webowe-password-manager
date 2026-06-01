export default function SuccessBanner({ message, onClose }) {
  if (!message) return null;

  const styles = {
    banner: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: 'rgba(16, 185, 129, 0.1)',
      color: '#86EFAC',
      padding: '14px 16px',
      borderRadius: '12px',
      border: '1px solid rgba(16, 185, 129, 0.3)',
      marginBottom: '20px',
      animation: 'slideDown 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      backdropFilter: 'blur(10px)',
      boxShadow: '0 4px 12px rgba(16, 185, 129, 0.1)'
    },
    content: { display: 'flex', alignItems: 'center', gap: '12px', flex: 1 },
    icon: { fontSize: '18px', fontWeight: 'bold' },
    message: { margin: 0, fontSize: '14px', fontWeight: 500 },
    closeButton: {
      background: 'none',
      border: 'none',
      color: '#86EFAC',
      cursor: 'pointer',
      fontSize: '18px',
      padding: '4px 8px',
      marginLeft: '12px',
      transition: 'all 0.2s ease',
      borderRadius: '6px'
    }
  };

  return (
    <div style={styles.banner}>
      <div style={styles.content}>
        <span style={styles.icon}>✓</span>
        <p style={styles.message}>{message}</p>
      </div>
      {onClose && (
        <button
          style={styles.closeButton}
          onClick={onClose}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = 'rgba(16, 185, 129, 0.2)';
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = 'transparent';
          }}
        >
          ✕
        </button>
      )}
    </div>
  );
}
