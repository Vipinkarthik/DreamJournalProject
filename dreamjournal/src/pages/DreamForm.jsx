import { useState } from 'react';
import '../styles/dreamform.css';

export default function DreamForm() {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [mood, setMood] = useState('');
  const [tags, setTags] = useState('');
  const [isLucid, setIsLucid] = useState(false);

  const handleSubmitDream = (e) => {
    e.preventDefault();
    const dreamData = { title, date, description, mood, tags, isLucid };
    console.log(dreamData);
    // You will replace this with an API POST call
  };

  return (
    <div className="dreamform-wrapper-bg">
      <div className="dreamform-glass-box">
        <h2 className="dreamform-title">Log a New Dream</h2>
        <form onSubmit={handleSubmitDream} className="dreamform-form-container">
          <input
            type="text"
            placeholder="Dream Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="dreamform-input"
            required
          />

          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="dreamform-input"
            required
          />

          <textarea
            placeholder="Describe your dream..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="dreamform-textarea"
            required
          />

          <select
            value={mood}
            onChange={(e) => setMood(e.target.value)}
            className="dreamform-select"
            required
          >
            <option value="">Select Mood</option>
            <option value="Happy">Happy</option>
            <option value="Sad">Sad</option>
            <option value="Scary">Scary</option>
            <option value="Confused">Confused</option>
            <option value="Curious">Curious</option>
          </select>

          <input
            type="text"
            placeholder="Tags (comma separated)"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="dreamform-input"
          />

          <div className="dreamform-checkbox-wrapper">
            <input
              type="checkbox"
              checked={isLucid}
              onChange={(e) => setIsLucid(e.target.checked)}
              id="dreamform-lucid-checkbox"
            />
            <label htmlFor="dreamform-lucid-checkbox">Lucid Dream</label>
          </div>

          <button type="submit" className="dreamform-submit-btn">Save Dream</button>
        </form>
      </div>
    </div>
  );
}
