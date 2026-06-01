import { useState } from 'react';

export default function SearchBar({ onSearch, placeholder = 'Search passwords...' }) {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const styles = {
    container: { position: 'relative', width: '100%' },
    input: {
      width: '100%',
      padding: '14px 18px 14px 44px',
      fontSize: '15px',
      fontWeight: 500,
      border: `2px solid ${isFocused ? '#6366F1' : 'rgba(99, 102, 241, 0.15)'}`,
      backgroundColor: isFocused ? 'rgba(15, 23, 42, 0.5)' : 'rgba(15, 23, 42, 0.3)',
      borderRadius: '10px',
      color: '#F1F5F9',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      backdropFilter: 'blur(10px)',
      boxShadow: isFocused ? `0 0 0 3px rgba(99, 102, 241, 0.1)` : 'none',
      outline: 'none',
      fontFamily: 'inherit'
    },
    clearButton: {
      position: 'absolute',
      right: '14px',
      top: '50%',
      transform: 'translateY(-50%)',
      background: 'none',
      border: 'none',
      color: '#CBD5E1',
      cursor: 'pointer',
      fontSize: '18px',
      padding: '4px 8px',
      borderRadius: '6px',
      transition: 'all 0.2s ease',
      display: query ? 'block' : 'none'
    },
    icon: {
      position: 'absolute',
      left: '14px',
      top: '50%',
      transform: 'translateY(-50%)',
      pointerEvents: 'none',
      fontSize: '18px',
      opacity: 0.6
    }
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value);
  };

  const handleClear = () => {
    setQuery('');
    onSearch('');
  };

  return (
    <div style={styles.container}>
      <input
        type="text"
        placeholder={placeholder}
        value={query}
        onChange={handleChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        style={styles.input}
      />
      <button
        style={styles.clearButton}
        onClick={handleClear}
        onMouseEnter={(e) => {
          e.target.style.backgroundColor = 'rgba(239, 68, 68, 0.1)';
          e.target.style.color = '#EF4444';
        }}
        onMouseLeave={(e) => {
          e.target.style.backgroundColor = 'transparent';
          e.target.style.color = '#CBD5E1';
        }}
      >
        ✕
      </button>
    </div>
  );
}
