import { useState, useEffect } from 'react';
import { passwordService } from '../services/passwordService';
import { authService } from '../services/authService';
import PasswordList from '../components/PasswordList';
import AddPasswordForm from '../components/AddPasswordForm';

export default function Dashboard({ onLogout }) {
  const [passwords, setPasswords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const token = authService.getToken();

  useEffect(() => {
    fetchPasswords();
  }, []);

  const fetchPasswords = async () => {
    try {
      const data = await passwordService.getPasswords(token);
      setPasswords(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Error fetching passwords');
    } finally {
      setLoading(false);
    }
  };

  const handleAddPassword = async (title, password) => {
    try {
      await passwordService.addPassword(title, password, token);
      setShowAddForm(false);
      fetchPasswords();
    } catch (err) {
      console.error('Error adding password');
    }
  };

  const handleDeletePassword = async (id) => {
    try {
      await passwordService.deletePassword(id, token);
      fetchPasswords();
    } catch (err) {
      console.error('Error deleting password');
    }
  };

  const handleUpdatePassword = async (id, newPassword) => {
    try {
      await passwordService.updatePassword(id, newPassword, token);
      fetchPasswords();
    } catch (err) {
      console.error('Error updating password');
    }
  };

  const handleSearch = async (query) => {
    setSearchQuery(query);
    if (query.trim() === '') {
      fetchPasswords();
    } else {
      try {
        const data = await passwordService.searchPasswords(query, token);
        setPasswords(Array.isArray(data) ? data : []);
      } catch (err) {
        setPasswords([]);
      }
    }
  };

  const handleLogout = async () => {
    await authService.logout(token);
    onLogout();
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1>Password Manager</h1>
        <button onClick={handleLogout} style={styles.logoutBtn}>Logout</button>
      </div>

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
        <p>Loading...</p>
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
  controls: { display: 'flex', gap: '10px', marginBottom: '20px' },
  searchInput: { flex: 1, padding: '10px', fontSize: '14px', border: '1px solid #ddd', borderRadius: '4px' },
  addBtn: { padding: '10px 20px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' },
  logoutBtn: { padding: '10px 20px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }
};
