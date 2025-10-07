
import React, { useState } from "react";
import Navbar from "./components/Navbar";
import AuthForm from "./components/AuthForm";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import "./App.css";


function App() {
const [user, setUser] = useState(null);
const [cart, setCart] = useState([]);


return (
<div className="container">
<Navbar user={user} />
{!user && <AuthForm setUser={setUser} />}
<ProductList cart={cart} setCart={setCart} />
<Cart cart={cart} />
</div>
);
}


export default App;