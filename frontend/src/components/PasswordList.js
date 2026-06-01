import PasswordItem from './PasswordItem';

export default function PasswordList({ passwords, onDelete, onUpdate, isLoading }) {
  const colors = {
    primary: '#6366F1',
    accent: '#06B6D4',
    text: '#F1F5F9',
    textSecondary: '#CBD5E1'
  };

  if (isLoading) {
    return (
      <div style={styles.centerContainer}>
        <div style={styles.loader} />
        <p style={styles.loadingText}>Loading your passwords...</p>
      </div>
    );
  }

  if (!passwords || passwords.length === 0) {
    return (
      <div style={styles.emptyState}>
        <div style={styles.emptyIcon}>🔑</div>
        <h3 style={styles.emptyTitle}>No passwords yet</h3>
        <p style={styles.emptyDescription}>Create your first password entry to get started. Your passwords are encrypted with AES-256.</p>
      </div>
    );
  }

  return (
    <div style={styles.list}>
      <div style={styles.listHeader}>
        <p style={styles.count}>
          <span style={styles.countNumber}>{passwords.length} </span>
          password{passwords.length !== 1 ? 's' : ''} saved
        </p>
      </div>
      {passwords.map(password => (
        <PasswordItem
          key={password.id}
          password={password}
          onDelete={onDelete}
          onUpdate={onUpdate}
        />
      ))}
    </div>
  );
}

const styles = {
  list: { marginTop: '20px' },
  listHeader: { marginBottom: '20px', paddingBottom: '16px', borderBottom: '1px solid rgba(99, 102, 241, 0.1)' },
  count: { margin: 0, fontSize: '14px', color: '#CBD5E1', fontWeight: 600 },
  countNumber: { fontFamily: "'Space Mono', monospace", color: '#06B6D4', fontWeight: 700, fontSize: '16px' },
  centerContainer: { textAlign: 'center', padding: '80px 20px' },
  loader: {
    width: '50px',
    height: '50px',
    border: '3px solid rgba(99, 102, 241, 0.1)',
    borderTop: '3px solid #06B6D4',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
    margin: '0 auto 20px'
  },
  loadingText: { margin: 0, fontSize: '15px', color: '#CBD5E1', fontWeight: 500 },
  emptyState: {
    textAlign: 'center',
    padding: '60px 20px',
    backgroundColor: 'rgba(30, 41, 59, 0.4)',
    borderRadius: '16px',
    border: '2px dashed rgba(99, 102, 241, 0.2)',
    backdropFilter: 'blur(10px)'
  },
  emptyIcon: { fontSize: '64px', marginBottom: '16px', animation: 'pulse 2s ease-in-out infinite' },
  emptyTitle: { margin: '0 0 8px 0', fontSize: '20px', fontWeight: 700, color: '#F1F5F9', fontFamily: "'Space Mono', monospace" },
  emptyDescription: { margin: 0, fontSize: '14px', color: '#CBD5E1', lineHeight: 1.6 }
};
