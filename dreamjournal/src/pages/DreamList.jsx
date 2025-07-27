import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/dreamlist.css';

export default function DreamList() {
  const [dreams, setDreams] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userEmail = localStorage.getItem('userEmail');

    if (!token || !userEmail) {
      alert('User not logged in.');
      navigate('/login');
      return;
    }

    fetch(`http://localhost:8080/api/dreams/${userEmail}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(res => {
        if (!res.ok) throw new Error('Unauthorized or server error');
        return res.json();
      })
      .then(data => setDreams(data))
      .catch(err => {
        console.error('Failed to fetch dreams:', err);
        alert('Error fetching dreams');
      });
  }, [navigate]);

  const handleDelete = async (id) => {
    const token = localStorage.getItem('token');
    try {
      const res = await fetch(`http://localhost:8080/api/dreams/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (res.ok) {
        setDreams(prev => prev.filter(dream => dream.id !== id));
      } else {
        alert('Failed to delete dream.');
      }
    } catch (err) {
      console.error('Error deleting dream:', err);
    }
  };

  return (
    <div className="dreamlist-wrapper-bg">
      <div className="dreamlist-glass-box">
        <h2 className="dreamlist-main-title">Your Dream Log</h2>
        <div className="dreamlist-card-container">
          {dreams.map((dream) => (
            <div key={dream.id} className="dreamlist-entry-card">
              <h3 className="dreamlist-entry-title">{dream.title}</h3>
              <p className="dreamlist-entry-date">{dream.date || dream.createdAt?.split('T')[0]}</p>
              <p className="dreamlist-entry-mood"><strong>Mood:</strong> {dream.mood || '—'}</p>
              <p className="dreamlist-entry-tags"><strong>Tags:</strong> {(dream.tags || []).join(', ')}</p>
              <p className="dreamlist-entry-lucid"><strong>Lucid:</strong> {dream.isLucid ? 'Yes' : 'No'}</p>
              <p className="dreamlist-entry-description">{dream.description}</p>
              <button className="dreamlist-delete-btn" onClick={() => handleDelete(dream.id)}>Delete</button>
            </div>
          ))}
          {dreams.length === 0 && <p className="dreamlist-empty">No dreams logged yet.</p>}
        </div>
      </div>
    </div>
  );
}
