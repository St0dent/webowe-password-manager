export default function LoadingSpinner({ message = 'Loading...' }) {
  return (
    <div style={styles.container}>
      <div style={styles.spinner} />
      <p style={styles.message}>{message}</p>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '40px 20px',
    gap: '16px'
  },
  spinner: {
    width: '40px',
    height: '40px',
    border: '4px solid #f0f0f0',
    borderTop: '4px solid #007bff',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite'
  },
  message: {
    margin: 0,
    fontSize: '14px',
    color: '#666'
  }
};
