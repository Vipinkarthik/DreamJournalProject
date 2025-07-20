import { NavLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { FaPlusCircle, FaListAlt, FaUserShield, FaUserCog, FaSignOutAlt, FaSlidersH } from 'react-icons/fa';
import '../styles/navbar.css';

export default function Navbar() {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <nav className="nav-container-ios-dark">
      <div className="nav-title">DreamVerse</div>
      <div className="nav-links">
        <NavLink to="/dreamform" activeClassName="nav-active">
          <FaPlusCircle className="nav-icon" /> DreamForm
        </NavLink>
        <NavLink to="/dreamlist" activeClassName="nav-active">
          <FaListAlt className="nav-icon" /> DreamList
        </NavLink>

        <div className="settings-dropdown">
          <span className="settings-toggle" onClick={() => setSettingsOpen(!settingsOpen)}>
            <FaSlidersH className="nav-icon" /> Settings
          </span>
          {settingsOpen && (
            <div className="settings-menu">
              <NavLink to="/account" className="settings-item">
                <FaUserCog className="nav-icon" /> My Account
              </NavLink>
              <span className="settings-item" onClick={handleLogout}>
                <FaSignOutAlt className="nav-icon" /> Log Out
              </span>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
