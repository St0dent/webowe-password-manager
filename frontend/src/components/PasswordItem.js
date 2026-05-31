import { useState } from 'react';

export default function PasswordItem({ password, onDelete, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleEdit = async () => {
    if (!newPassword) return;

    setLoading(true);
    try {
      await onUpdate(password.id, newPassword);
      setIsEditing(false);
      setNewPassword('');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm(`Delete "${password.title}"?`)) {
      setLoading(true);
      try {
        await onDelete(password.id);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div style={styles.item}>
      <div style={styles.header}>
        <h4 style={styles.title}>{password.title}</h4>
        <div style={styles.actions}>
          <button onClick={() => setShowPassword(!showPassword)} style={styles.viewBtn}>
            {showPassword ? 'Hide' : 'Show'}
          </button>
          <button onClick={() => setIsEditing(!isEditing)} style={styles.editBtn}>
            Edit
          </button>
          <button onClick={handleDelete} style={styles.deleteBtn} disabled={loading}>
            Delete
          </button>
        </div>
      </div>

      {showPassword && (
        <p style={styles.password}>{password.password}</p>
      )}

      {isEditing && (
        <div style={styles.editForm}>
          <input
            type="password"
            placeholder="New password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            style={styles.input}
          />
          <div style={styles.editActions}>
            <button onClick={handleEdit} style={styles.saveBtn} disabled={loading}>
              Save
            </button>
            <button onClick={() => setIsEditing(false)} style={styles.cancelBtn}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  item: { border: '1px solid #ddd', borderRadius: '4px', padding: '15px', backgroundColor: '#fff' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  title: { margin: '0', flex: 1 },
  actions: { display: 'flex', gap: '5px' },
  viewBtn: { padding: '5px 10px', fontSize: '12px', backgroundColor: '#17a2b8', color: 'white', border: 'none', borderRadius: '3px', cursor: 'pointer' },
  editBtn: { padding: '5px 10px', fontSize: '12px', backgroundColor: '#ffc107', color: 'black', border: 'none', borderRadius: '3px', cursor: 'pointer' },
  deleteBtn: { padding: '5px 10px', fontSize: '12px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '3px', cursor: 'pointer' },
  password: { marginTop: '10px', padding: '10px', backgroundColor: '#f5f5f5', borderRadius: '3px', fontFamily: 'monospace', wordBreak: 'break-all' },
  editForm: { marginTop: '10px', display: 'flex', flexDirection: 'column', gap: '10px' },
  input: { padding: '8px', fontSize: '14px', border: '1px solid #ddd', borderRadius: '3px' },
  editActions: { display: 'flex', gap: '5px' },
  saveBtn: { padding: '8px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '3px', cursor: 'pointer' },
  cancelBtn: { padding: '8px', backgroundColor: '#6c757d', color: 'white', border: 'none', borderRadius: '3px', cursor: 'pointer' }
};
