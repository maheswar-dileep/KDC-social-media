import { Link, useNavigate } from 'react-router-dom';
import './navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.clear();
    navigate('/signin');
  };

  return (
    <nav className="navbar">
      <Link to="/" className="brand">
        Social Media
      </Link>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/profile">profile</Link>
        </li>
        <li>
          <Link to="/search">Search</Link>
        </li>
      </ul>
      <div className="nav-right">
        <button type="button" onClick={() => handleLogout()} className="logout-button">
          logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
