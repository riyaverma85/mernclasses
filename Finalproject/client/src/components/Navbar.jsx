



function Navbar({ user }) {
return (
<header className="header">
<h1>🛒 Multi-Vendor E-Commerce</h1>
{user ? <p>Welcome, {user.name}</p> : <p>Please Login/Register</p>}
</header>
);
}


export default Navbar;