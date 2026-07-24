import { NavLink } from 'react-router-dom';

export default function Navbar() {
  return (
    <header className="nav-header">
      <div className="nav-content">
        <NavLink to="/" className="brand-logo">
          <div className="brand-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" />
            </svg>
          </div>
          <span className="brand-text">MemeLens</span>
        </NavLink>

        <nav className="nav-links">
          <NavLink
            to="/"
            end
            className={({ isActive }) => `nav-link-btn ${isActive ? 'active' : ''}`}
          >
            Analyze Meme
          </NavLink>
          <NavLink
            to="/annotate"
            className={({ isActive }) => `nav-link-btn ${isActive ? 'active' : ''}`}
          >
            Annotate Dataset
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
