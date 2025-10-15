import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const API = import.meta.env.VITE_API_URL || "";

const Cart = () => {
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token") || auth?.token;
  useEffect(() => {
    if (!token) { navigate("/login"); return; }
    const fetchCart = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${API}/api/cart`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setCart(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchCart();
  }, [token, navigate]);

  const updateQuantity = async (productId, qty) => {
    try {
      const res = await axios.put(`${API}/api/cart/update`, { productId, quantity: qty }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCart(res.data.cart);
    } catch (err) {
      console.error(err);
    }
  };

  const removeItem = async (productId) => {
    try {
      const res = await axios.delete(`${API}/api/cart/remove/${productId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCart(res.data.cart);
    } catch (err) {
      console.error(err);
    }
  };

  const total = cart?.items?.reduce((s, i) => s + (i.product.price * i.quantity), 0) || 0;

  if (loading) return <p>Loading cart...</p>;
  if (!cart) return <p>Your cart is empty</p>;

  return (
    <div className="container cart-page">
      <h2>Your Cart</h2>
      {cart.items.length === 0 ? <p>Cart is empty</p> : (
        <>
          <div className="cart-list">
            {cart.items.map(i => (
              <div className="cart-item" key={i.product._id} style={{display:"flex",gap:"16px",alignItems:"center",marginBottom:"12px"}}>
                <img src={i.product.image} alt={i.product.name} style={{width:100,height:80,objectFit:"cover",borderRadius:8}} />
                <div style={{flex:1}}>
                  <h4>{i.product.name}</h4>
                  <p>₹{i.product.price}</p>
                </div>
                <div className="qty-control">
                  <button onClick={() => updateQuantity(i.product._id, i.quantity - 1)}>-</button>
                  <span style={{margin:"0 8px"}}>{i.quantity}</span>
                  <button onClick={() => updateQuantity(i.product._id, i.quantity + 1)}>+</button>
                </div>
                <div>
                  <button onClick={() => removeItem(i.product._id)} className="remove-btn">Remove</button>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary" style={{marginTop:20}}>
            <h3>Total: ₹{total}</h3>
            <button className="checkout-btn">Proceed to Checkout</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
