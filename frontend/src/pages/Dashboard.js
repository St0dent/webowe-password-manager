import { useState, useEffect } from 'react';
import passwordService from '../services/passwordService';
import authService from '../services/authService';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import PasswordList from '../components/PasswordList';
import AddPasswordForm from '../components/AddPasswordForm';
import ErrorBanner from '../components/ErrorBanner';
import SuccessBanner from '../components/SuccessBanner';

export default function Dashboard({ onLogout }) {
  const [passwords, setPasswords] = useState([]);
  const [displayedPasswords, setDisplayedPasswords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [username, setUsername] = useState('');

  useEffect(() => {
    const token = authService.getToken();
    if (token) {
      try {
        const parts = token.split('.');
        if (parts.length > 0) {
          setUsername(parts[0].substring(0, 10));
        }
      } catch (err) {}
    }
    fetchPasswords();
  }, []);

  const fetchPasswords = async () => {
    try {
      setError('');
      setLoading(true);
      const data = await passwordService.getAll();
      setPasswords(data);
      setDisplayedPasswords(data);
    } catch (err) {
      setError('Failed to load passwords');
      setPasswords([]);
      setDisplayedPasswords([]);
    } finally {
      setLoading(false);
    }
  };

  const handleAddPassword = async (title, password) => {
    try {
      setError('');
      await passwordService.add(title, password);
      setSuccess('Password added successfully!');
      setShowAddForm(false);
      setTimeout(() => setSuccess(''), 3000);
      fetchPasswords();
    } catch (err) {
      setError(err.message || 'Failed to add password');
    }
  };

  const handleDeletePassword = async (id) => {
    try {
      setError('');
      await passwordService.delete(id);
      setSuccess('Password deleted successfully!');
      setTimeout(() => setSuccess(''), 3000);
      fetchPasswords();
    } catch (err) {
      setError(err.message || 'Failed to delete password');
    }
  };

  const handleUpdatePassword = async (id, newPassword) => {
    try {
      setError('');
      await passwordService.update(id, newPassword);
      setSuccess('Password updated successfully!');
      setTimeout(() => setSuccess(''), 3000);
      fetchPasswords();
    } catch (err) {
      setError(err.message || 'Failed to update password');
    }
  };

  const handleSearch = async (query) => {
    setSearchQuery(query);
    try {
      setError('');
      if (query.trim() === '') {
        setDisplayedPasswords(passwords);
      } else {
        const results = await passwordService.search(query);
        setDisplayedPasswords(results);
      }
    } catch (err) {
      setError('Search failed');
      setDisplayedPasswords([]);
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

  const styles = {
    container: { minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'transparent' },
    main: { flex: 1, display: 'flex', justifyContent: 'center', padding: '24px 20px' },
    content: { width: '100%', maxWidth: '1000px' },
    toolbar: {
      display: 'grid',
      gridTemplateColumns: 'minmax(0, 1fr) auto',
      gap: '16px',
      marginBottom: '28px',
      alignItems: 'flex-end'
    },
    addButton: {
      padding: '12px 24px',
      backgroundColor: '#10B981',
      color: 'white',
      border: 'none',
      borderRadius: '12px',
      cursor: 'pointer',
      fontWeight: 700,
      fontSize: '14px',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      textTransform: 'uppercase',
      letterSpacing: '0.5px',
      whiteSpace: 'nowrap',
      minHeight: '46px'
    },
    footer: {
      backgroundColor: 'rgba(15, 23, 42, 0.6)',
      borderTop: '1px solid rgba(99, 102, 241, 0.1)',
      color: '#CBD5E1',
      textAlign: 'center',
      padding: '20px',
      fontSize: '12px',
      marginTop: 'auto',
      backdropFilter: 'blur(10px)'
    }
  };

  return (
    <div style={styles.container}>
      <Header username={username} onLogout={handleLogout} />

      <main style={styles.main}>
        <div style={styles.content}>
          {error && <ErrorBanner message={error} onClose={() => setError('')} />}
          {success && <SuccessBanner message={success} onClose={() => setSuccess('')} />}

          <div style={styles.toolbar}>
            <SearchBar
              onSearch={handleSearch}
              placeholder="Search passwords by service name..."
            />
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              style={{
                ...styles.addButton,
                backgroundColor: showAddForm ? '#EF4444' : '#10B981'
              }}
              onMouseEnter={(e) => {
                if (!loading) {
                  e.target.style.boxShadow = `0 12px 30px rgba(${showAddForm ? '239, 68, 68' : '16, 185, 129'}, 0.3)`;
                }
              }}
            >
              {showAddForm ? '✕ Cancel' : '+ New'}
            </button>
          </div>

          {showAddForm && (
            <AddPasswordForm
              onAdd={handleAddPassword}
              onCancel={() => setShowAddForm(false)}
            />
          )}

          <PasswordList
            passwords={displayedPasswords}
            onDelete={handleDeletePassword}
            onUpdate={handleUpdatePassword}
            isLoading={loading}
          />
        </div>
      </main>

      <footer style={styles.footer}>
        <p style={{margin: 0}}>Aleksandra Wilkosz, Zuzanna Kępa</p>
      </footer>
    </div>
  );
}
