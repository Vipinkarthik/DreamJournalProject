import { FaUser, FaEnvelope, FaCalendarAlt } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import '../styles/account.css';

export default function Account() {
  const [userDetails, setUserDetails] = useState({
    name: 'Dreamer',
    email: 'dreamer@example.com',
    joined: '2024-09-01'
  });

  useEffect(() => {
    // You can fetch user data here if connected to backend
  }, []);

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
