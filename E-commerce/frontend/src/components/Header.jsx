// frontend/src/components/Header.jsx
import { useContext, useState } from 'react';
import { Container } from 'react-bootstrap';
import { FaCartArrowDown } from 'react-icons/fa';
import { IoPersonCircle } from 'react-icons/io5';
import logo from '../images/logo2.jpg';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import "../css/header.css"

const Header = () => {
  const { auth, logout } = useContext(AuthContext);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const handleProfileClick = () => {
    if (auth && auth.user) navigate(auth.user.role === 'admin' ? '/dashboard' : '/profile');
    else navigate('/login');
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (search.trim() !== '') {
      console.log('Searching for:', search);
      setSearch('');
    }
  };

  return (
    <header className="header shadow-sm py-2">
      <Container fluid className="d-flex align-items-center justify-content-between flex-wrap">
        
        {/* Logo */}
        <div className="d-flex align-items-center" style={{ cursor: 'pointer' }} onClick={() => navigate('/')}>
          <img src={logo} alt="logo" className="header-logo" />
          <h3 className="brand-name ms-2">OrganicMart</h3>
        </div>

        {/* Search Bar */}
        <form className="search-container" onSubmit={handleSearchSubmit}>
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button type="submit"></button>
        </form>

        {/* Cart & Profile */}
        <div className="header-icons d-flex align-items-center">
          <FaCartArrowDown className="icon" />
          {auth && auth.user ? (
            <>
              <button className="btn btn-link me-2" onClick={() => navigate('/profile')}>
                {auth.user.name}
              </button>
              <button className="btn btn-outline-danger btn-sm" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <button className="btn btn-link" onClick={handleProfileClick}>
              <IoPersonCircle className="icon" />
            </button>
          )}
        </div>
      </Container>
    </header>
  );
};

export default Header;
