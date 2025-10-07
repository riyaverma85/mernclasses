import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";


const API_URL = "http://localhost:8000/api";


function ProductList({ cart, setCart }) {
const [products, setProducts] = useState([]);


useEffect(() => {
fetchProducts();
}, []);


const fetchProducts = async () => {
try {
const res = await axios.get(`${API_URL}/products`);
setProducts(res.data);
} catch (err) {
console.error(err);
}
};


const addToCart = (product) => {
setCart([...cart, product]);
};


return (
<div className="main">
<h2>Products</h2>
<div className="products-grid">
{products.map((p) => (
<ProductCard key={p._id} product={p} addToCart={addToCart} />
))}
</div>
</div>
);
}


export default ProductList;