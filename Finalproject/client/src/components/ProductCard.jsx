import React from "react";


function ProductCard({ product, addToCart }) {
return (
<div className="product-card">
{product.images && product.images[0] && (
<img src={product.images[0]} alt={product.name} className="product-img" />
)}
<h3>{product.name}</h3>
<p>{product.description}</p>
<span>${product.price}</span>
<button onClick={() => addToCart(product)}>Add to Cart</button>
</div>
);
}


export default ProductCard;