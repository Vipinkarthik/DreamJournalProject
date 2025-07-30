import { useEffect, useState } from 'react';
import '../styles/dashboard.css';
import Navbar from '../components/Navbar';

export default function Dashboard() {
  const [dreamCount, setDreamCount] = useState(0);
  const [mostCommonMood, setMostCommonMood] = useState('');
  const [frequentTags, setFrequentTags] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const userEmail = localStorage.getItem('userEmail');
        const token = localStorage.getItem('token');

        if (!userEmail || !token) {
          console.error('User email or token not found');
          setLoading(false);
          return;
        }

        const response = await fetch(`https://dreamjournalbackend.onrender.com/api/dreams/stats/${userEmail}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.ok) {
          const data = await response.json();
          setDreamCount(data.totalDreams);
          setMostCommonMood(data.mostCommonMood);
          setFrequentTags(data.frequentTags);
        } else {
          console.error('Failed to fetch dashboard data');
          // Set default values if API fails
          setDreamCount(0);
          setMostCommonMood('No dreams yet');
          setFrequentTags([]);
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        // Set default values if API fails
        setDreamCount(0);
        setMostCommonMood('No dreams yet');
        setFrequentTags([]);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="dash-bg-container">
          <div className="dash-glass-wrapper">
            <h1 className="dash-heading">Loading Dashboard... 🌙</h1>
          </div>
        </div>
      </>
    );
  }

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
              {frequentTags.length > 0 ? (
                frequentTags.map((tag, index) => (
                  <span key={index} className="dash-tag">{tag}</span>
                ))
              ) : (
                <span className="dash-tag">No tags yet</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}