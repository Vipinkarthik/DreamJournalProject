import { useEffect, useState } from 'react';
import '../styles/dashboard.css';
import Navbar from '../components/Navbar';

export default function Dashboard() {
  const [dreamCount, setDreamCount] = useState(0);
  const [mostCommonMood, setMostCommonMood] = useState('');
  const [frequentTags, setFrequentTags] = useState([]);

  useEffect(() => {
    // Dummy static data for now. Replace with API calls later.
    setDreamCount(12);
    setMostCommonMood('Curious');
    setFrequentTags(['Flying', 'Falling', 'Dark', 'Adventure']);
  }, []);

  return (
    <>
    <Navbar />
    <div className="dash-bg-container">
      <div className="dash-glass-wrapper">
        <h1 className="dash-heading">Welcome Back 🌙</h1>
        <div className="dash-info-grid">
          <div className="dash-info-card">
            <h3 className="dash-info-title">Total Dreams Logged</h3>
            <p className="dash-info-value">{dreamCount}</p>
          </div>
          <div className="dash-info-card">
            <h3 className="dash-info-title">Most Common Mood</h3>
            <p className="dash-info-value">{mostCommonMood}</p>
          </div>
          <div className="dash-info-card dash-tag-card">
            <h3 className="dash-info-title">Frequent Tags</h3>
            <div className="dash-tag-list">
              {frequentTags.map((tag, index) => (
                <span key={index} className="dash-tag">{tag}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}