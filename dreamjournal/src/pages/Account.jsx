import { FaUser, FaEnvelope, FaCalendarAlt } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import '../styles/account.css';

export default function Account() {
  const [userDetails, setUserDetails] = useState({
    name: 'Loading...',
    email: 'Loading...',
    joined: 'Loading...'
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userEmail = localStorage.getItem('userEmail');
        const token = localStorage.getItem('token');

        if (!userEmail || !token) {
          console.error('User email or token not found');
          setUserDetails({
            name: 'Unknown',
            email: 'Unknown',
            joined: 'Unknown'
          });
          setLoading(false);
          return;
        }

        const response = await fetch(`http://localhost:8080/api/auth/user/${userEmail}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.ok) {
          const data = await response.json();
          setUserDetails({
            name: data.username,
            email: data.email,
            joined: data.joined
          });
        } else {
          console.error('Failed to fetch user data');
          setUserDetails({
            name: 'Error loading',
            email: 'Error loading',
            joined: 'Error loading'
          });
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        setUserDetails({
          name: 'Error loading',
          email: 'Error loading',
          joined: 'Error loading'
        });
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return (
      <div className="acc-ios-fullscreen">
        <div className="acc-ios-card">
          <h2 className="acc-ios-heading">Loading Account Details...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="acc-ios-fullscreen">
      <div className="acc-ios-card">
        <h2 className="acc-ios-heading">Account Details</h2>

        <div className="acc-ios-info">
          <FaUser className="acc-ios-icon" />
          <div className="acc-ios-textblock">
            <label className="acc-ios-label">Name</label>
            <p className="acc-ios-data">{userDetails.name}</p>
          </div>
        </div>

        <div className="acc-ios-info">
          <FaEnvelope className="acc-ios-icon" />
          <div className="acc-ios-textblock">
            <label className="acc-ios-label">Email</label>
            <p className="acc-ios-data">{userDetails.email}</p>
          </div>
        </div>

        <div className="acc-ios-info">
          <FaCalendarAlt className="acc-ios-icon" />
          <div className="acc-ios-textblock">
            <label className="acc-ios-label">Joined</label>
            <p className="acc-ios-data">{userDetails.joined}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
