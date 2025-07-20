import { useState, useEffect } from 'react';
import '../styles/dreamlist.css';

export default function DreamList() {
  const [dreams, setDreams] = useState([]);

  useEffect(() => {
    // Dummy data - replace with real API later
    const dummyDreams = [
      {
        id: 1,
        title: 'Flying Over Mountains',
        date: '2025-07-18',
        mood: 'Happy',
        tags: ['Flying', 'Freedom'],
        isLucid: true,
      },
      {
        id: 2,
        title: 'Trapped in a Room',
        date: '2025-07-17',
        mood: 'Scary',
        tags: ['Escape', 'Dark'],
        isLucid: false,
      }
    ];
    setDreams(dummyDreams);
  }, []);

  const handleDelete = (id) => {
    const updatedList = dreams.filter(dream => dream.id !== id);
    setDreams(updatedList);
  };

  return (
    <div className="dreamlist-wrapper-bg">
      <div className="dreamlist-glass-box">
        <h2 className="dreamlist-main-title">Your Dream Log</h2>
        <div className="dreamlist-card-container">
          {dreams.map(dream => (
            <div key={dream.id} className="dreamlist-entry-card">
              <h3 className="dreamlist-entry-title">{dream.title}</h3>
              <p className="dreamlist-entry-date">{dream.date}</p>
              <p className="dreamlist-entry-mood"><strong>Mood:</strong> {dream.mood}</p>
              <p className="dreamlist-entry-tags">
                <strong>Tags:</strong> {dream.tags.join(', ')}
              </p>
              <p className="dreamlist-entry-lucid">
                <strong>Lucid:</strong> {dream.isLucid ? 'Yes' : 'No'}
              </p>
              <button className="dreamlist-delete-btn" onClick={() => handleDelete(dream.id)}>Delete</button>
            </div>
          ))}
          {dreams.length === 0 && <p className="dreamlist-empty">No dreams logged yet.</p>}
        </div>
      </div>
    </div>
  );
}
