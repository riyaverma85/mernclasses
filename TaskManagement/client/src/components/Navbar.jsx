

import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  }
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
      <Link className="navbar-brand" to="/">Task Management</Link>
      <div className="ms-auto">
        <button className="btn btn-outline-light" onClick={logout}>Logout</button>
      </div>
    </nav>
  )
}

export default Navbar;
