import PasswordItem from './PasswordItem';

export default function PasswordList({ passwords, onDelete, onUpdate }) {
  if (passwords.length === 0) {
    return <p style={styles.empty}>No passwords found</p>;
  }

  return (
    <div style={styles.list}>
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
  list: { display: 'flex', flexDirection: 'column', gap: '10px' },
  empty: { textAlign: 'center', color: '#999', padding: '40px' }
};
