import React from "react";


function Cart({ cart }) {
return (
<div className="cart">
<h2>Your Cart ({cart.length})</h2>
{cart.map((c, i) => (
<div className="cart-item" key={i}>
<span>{c.name}</span> - ${c.price}
</div>
))}
{cart.length > 0 && <button className="checkout-btn">Checkout</button>}
</div>
);
}


export default Cart;