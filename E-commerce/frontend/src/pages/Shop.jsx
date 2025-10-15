import React from "react";
import "../css/productss.css";
import "../css/shop.css";

//  Fruits image
import product1 from "../images/product-2.jpg";
import product2 from "../images/product-4.jpg";
import product3 from "../images/product-8.jpg";
import product4 from "../images/product-9.webp";
import product5 from "../images/product-10.webp";
import product6 from "../images/product-11.webp";

// Vegetables image
import product7 from "../images/product-6.jpg";
import product8 from "../images/product-5.jpg";
import product9 from "../images/carrot.gif";
import product10 from "../images/spanich.webp";
import product11 from "../images/cauliflower.webp";
import product12 from "../images/capsicum.webp";

// Dairy image
import product13 from "../images/milk.webp";
import product14 from "../images/butter.webp";
import product15 from "../images/cheese.webp";
import product16 from "../images/yogurt.webp";
import product17 from "../images/panner.webp";

// Grains & Pulses image
import product18 from "../images/rice.webp";
import product19 from "../images/wheat.webp";
import product20 from "../images/Lentils.webp";
import product21 from "../images/Oats.webp";
import product22 from "../images/Chana.webp";

//Others image
import product23 from "../images/honey.webp";
import product24 from "../images/Olive Oil.webp";
import product25 from "../images/Organic Tea.webp";
import product26 from "../images/Organic Coffee.webp";
import product27 from "../images/Turmeric.webp";
import product28 from "../images/Cinnamon.webp";

import img1 from "../images/fruitss.webp";
import img2 from "../images/vegitables.webp";
import img3 from "../images/dairy.webp";
import img4 from "../images/others.webp";

const productsData = [
  {
    category: "Fruits",
    items: [
      { name: "Pineapple", image: product1, priceNew: "$19", priceOld: "$25" },
      { name: "Strawberry", image:product2, priceNew: "$10", priceOld: "$15" },
      { name: "Banana", image: product3, priceNew: "$20", priceOld: "$30" },
      { name: "Grapes", image:product4, priceNew: "$12", priceOld: "$18" },
      { name: "Mango", image:product5, priceNew: "$25", priceOld: "$30" },
      { name: "Orange", image:product6, priceNew: "$18", priceOld: "$22" },
    ],
  },
  {
    category: "Vegetables",
    items: [
      { name: "Tomato", image:product7, priceNew: "$15", priceOld: "$20" },
      { name: "Cucumber", image:product8, priceNew: "$12", priceOld: "$18" },
      { name: "Carrot", image:product9, priceNew: "$10", priceOld: "$15" },
      { name: "Spinach", image: product10, priceNew: "$8", priceOld: "$12" },
      { name: "Cauliflower", image:product11, priceNew: "$14", priceOld: "$20" },
      { name: "Capsicum", image: product12, priceNew: "$16", priceOld: "$22" },
    ],
  },
  {
    category: "Dairy",
    items: [
      { name: "Milk", image: product13, priceNew: "$5", priceOld: "$7" },
      { name: "Butter", image: product14, priceNew: "$8", priceOld: "$10" },
      { name: "Cheese", image: product15, priceNew: "$12", priceOld: "$15" },
      { name: "Yogurt", image: product16, priceNew: "$6", priceOld: "$8" },
      { name: "Paneer", image: product17, priceNew: "$10", priceOld: "$14" },
    ],
  },
  {
    category: "Grains & Pulses",
    items: [
      { name: "Rice", image: product18, priceNew: "$20", priceOld: "$25" },
      { name: "Wheat", image: product19, priceNew: "$18", priceOld: "$22" },
      { name: "Lentils", image: product20, priceNew: "$15", priceOld: "$20" },
      { name: "Oats", image: product21, priceNew: "$12", priceOld: "$16" },
      { name: "Chana", image: product22, priceNew: "$10", priceOld: "$14" },
    ],
  },
  {
    category: "Others",
    items: [
      { name: "Honey", image: product23, priceNew: "$12", priceOld: "$18" },
      { name: "Olive Oil", image: product24, priceNew: "$20", priceOld: "$25" },
      { name: "Organic Tea", image: product25, priceNew: "$10", priceOld: "$15" },
      { name: "Organic Coffee", image: product26, priceNew: "$15", priceOld: "$20" },
      { name: "Turmeric", image: product27, priceNew: "$8", priceOld: "$12" },
      { name: "Cinnamon", image: product28, priceNew: "$7", priceOld: "$10" },
    ],
  },
];

const Shop= () => {
  return (
    <>
    <section className="shop-content-section">
      <div className="containerr">
        {/* Main Banner */}
        <div className="shop-banner">
          <h1>🌿 Explore Our Organic Products</h1>
          <p>Fresh, healthy, and chemical-free products straight from local farms to your doorstep.</p>
          <button className="shop-btn">Shop Now</button>
        </div>

        {/* Featured Categories */}
        <div className="categories-section">
          <h2>Shop by Category</h2>
          <div className="categories-row">
            <div className="category-box">
              <div className="category-img" style={{ backgroundImage: `url(${img1})` }}></div>
              <h3>Fruits</h3>
            </div>
            <div className="category-box">
              <div className="category-img" style={{ backgroundImage: `url(${img2})` }}></div>
              <h3>Vegetables</h3>
            </div>
            <div className="category-box">
              <div className="category-img" style={{ backgroundImage: `url(${img3})` }}></div>
              <h3>Dairy</h3>
            </div>
            <div className="category-box">
              <div className="category-img" style={{ backgroundImage: `url(${img4})` }}></div>
              <h3>Others</h3>
            </div>
          </div>
        </div>

        {/* Featured Products */}
        <div className="featured-section">
          <h2>Featured Products</h2>
          <p>Our top picks of fresh organic items for you today.</p>
          <ul className="featured-list">
            <li>Fresh Organic Apples - $19</li>
            <li>Bananas from Local Farms - $10</li>
            <li>Mangoes (Seasonal) - $20</li>
            <li>Organic Tomatoes - $15</li>
            <li>Fresh Milk - $5</li>
          </ul>
        </div>

        {/* Call to Action */}
        <div className="shop-cta">
          <h2>Ready to Go Organic?</h2>
          <p>Shop the freshest and healthiest products for your family today!</p>
          <button className="shop-btn">Browse Products</button>
        </div>
      </div>
    </section>

    <section className="products-section">
      <div className="container">
        {productsData.map((category, index) => (
          <div key={index} className="category-section">
            <h2 className="category-title">{category.category}</h2>
            <div className="product-row">
              {category.items.map((item, idx) => (
                <div key={idx} className="product-card">
                  <div className="product-img">
                    <img src={item.image} alt={item.name} />
                    <span className="product-badge">New</span>
                  </div>
                  <div className="product-content">
                    <h4>{item.name}</h4>
                    <div className="price">
                      <span className="new-price">{item.priceNew}</span>
                      <span className="old-price">{item.priceOld}</span>
                    </div>
                    <div className="product-buttons">
                      <button className="view-btn">View Detail</button>
                      <button className="cart-btn">Add to Cart</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
        <div className="view-more-container">
          <button className="view-more-btn">View More Products</button>
        </div>
      </div>
    </section>
  </>
  );
};

export default Shop;
