import { useState } from 'react';

export default function AddPasswordForm({ onAdd }) {
  const [title, setTitle] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!title || !password) {
      setError('All fields are required');
      return;
    }

    setLoading(true);
    try {
      await onAdd(title, password);
      setTitle('');
      setPassword('');
    } catch (err) {
      setError('Error adding password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.form}>
      <h3>Add New Password</h3>
      <form onSubmit={handleSubmit} style={styles.formContent}>
        <input
          type="text"
          placeholder="Title (e.g., Gmail)"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={styles.input}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
          required
        />
        <button type="submit" style={styles.button} disabled={loading}>
          {loading ? 'Adding...' : 'Add Password'}
        </button>
      </form>
      {error && <p style={styles.error}>{error}</p>}
    </div>
  );
}

const styles = {
  form: { backgroundColor: '#f5f5f5', padding: '20px', borderRadius: '4px', marginBottom: '20px' },
  formContent: { display: 'flex', flexDirection: 'column', gap: '10px' },
  input: { padding: '10px', fontSize: '14px', border: '1px solid #ddd', borderRadius: '4px' },
  button: { padding: '10px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' },
  error: { color: 'red', marginTop: '10px' }
};
