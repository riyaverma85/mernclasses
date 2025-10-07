import "../css/navbar.css";


const Topnav = () => {
  return (
    <nav className="navbar">
      <div className="logo">🌿 OrganicMart</div>

      <ul className="nav-links">
        <li><a href="#home">Home</a></li>
        <li><a href="#shop">Shop</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#blog">Blog</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>

      {/* Search Bar */}
      <div className="search-container">
        <input type="text" placeholder="Search organic products..." />
        <button><i className="bi bi-search"></i></button>
      </div>

      <div className="nav-icons">
        <i className="bi bi-cart3"></i>
        <i className="bi bi-person-circle"></i>
      </div>
    </nav>
  );
};

export default Topnav;
