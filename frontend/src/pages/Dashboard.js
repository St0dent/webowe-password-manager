import { useState, useEffect } from 'react';
import passwordService from '../services/passwordService';
import authService from '../services/authService';
import PasswordList from '../components/PasswordList';
import AddPasswordForm from '../components/AddPasswordForm';

export default function Dashboard({ onLogout }) {
  const [passwords, setPasswords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    fetchPasswords();
  }, []);

  const fetchPasswords = async () => {
    try {
      setError('');
      const data = await passwordService.getAll();
      setPasswords(data);
    } catch (err) {
      setError('Failed to load passwords');
      setPasswords([]);
    } finally {
      setLoading(false);
    }
  };

  const handleAddPassword = async (title, password) => {
    try {
      await passwordService.add(title, password);
      setShowAddForm(false);
      fetchPasswords();
    } catch (err) {
      setError('Failed to add password');
    }
  };

  const handleDeletePassword = async (id) => {
    try {
      await passwordService.delete(id);
      fetchPasswords();
    } catch (err) {
      setError('Failed to delete password');
    }
  };

  const handleUpdatePassword = async (id, newPassword) => {
    try {
      await passwordService.update(id, newPassword);
      fetchPasswords();
    } catch (err) {
      setError('Failed to update password');
    }
  };

  const handleSearch = async (query) => {
    setSearchQuery(query);
    try {
      setError('');
      if (query.trim() === '') {
        fetchPasswords();
      } else {
        const data = await passwordService.search(query);
        setPasswords(data);
      }
    } catch (err) {
      setError('Search failed');
      setPasswords([]);
    }
  };

  const handleLogout = async () => {
    try {
      await authService.logout();
      onLogout();
    } catch (err) {
      authService.clearToken();
      onLogout();
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1>Password Manager</h1>
        <button onClick={handleLogout} style={styles.logoutBtn}>Logout</button>
      </div>

      {error && <div style={styles.errorBanner}>{error}</div>}

      <div style={styles.controls}>
        <input
          type="text"
          placeholder="Search passwords..."
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          style={styles.searchInput}
        />
        <button onClick={() => setShowAddForm(!showAddForm)} style={styles.addBtn}>
          {showAddForm ? 'Cancel' : 'Add Password'}
        </button>
      </div>

      {showAddForm && <AddPasswordForm onAdd={handleAddPassword} />}

      {loading ? (
        <p style={styles.loading}>Loading...</p>
      ) : (
        <PasswordList
          passwords={passwords}
          onDelete={handleDeletePassword}
          onUpdate={handleUpdatePassword}
        />
      )}
    </div>
  );
}

const styles = {
  container: { maxWidth: '1000px', margin: '0 auto', padding: '20px' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' },
  errorBanner: { backgroundColor: '#f8d7da', color: '#721c24', padding: '12px', borderRadius: '4px', marginBottom: '20px', border: '1px solid #f5c6cb' },
  controls: { display: 'flex', gap: '10px', marginBottom: '20px' },
  searchInput: { flex: 1, padding: '10px', fontSize: '14px', border: '1px solid #ddd', borderRadius: '4px' },
  addBtn: { padding: '10px 20px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' },
  logoutBtn: { padding: '10px 20px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' },
  loading: { textAlign: 'center', padding: '40px', color: '#666' }
};
