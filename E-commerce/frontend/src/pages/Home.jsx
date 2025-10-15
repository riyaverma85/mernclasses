import Carousel from "react-bootstrap/Carousel";
import ban1 from "../images/carousel-1.jpg";
import ban2 from "../images/carousel-2.jpg";
import ban3 from "../images/carousal.jpeg";
import Upperimage from "../images/fruits.jpg";
import "../css/home.css";
import { FaLeaf, FaSeedling, FaAppleAlt } from "react-icons/fa";
//  Product Section
import "../css/products.css";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import { AuthContext } from "../context/AuthContext"; // if you have it
import { useNavigate } from "react-router-dom";

const API = import.meta.env.VITE_API_URL || "";


import hero from "../images/about.webp";
import image from "../images/blank.jpg";


const rightContent = [
  {
    title: "Modern Farm",
    desc: "Made with passion by 300+ curators across the country.",
  },
  {
    title: "Always Fresh",
    desc: "Eat local, consume local, closer to nature.",
  },
  {
    title: "Sustainable",
    desc: "Chemical-free consumption IN and OUT.",
  },
];
const leftContent = [
  {
    title: "Handmade",
    desc: "Made with passion by 300+ curators across the country.",
  },
  {
    title: "100% Natural",
    desc: "Eat local, consume local, closer to nature.",
  },
  {
    title: "Curated Products",
    desc: "Eat local, consume local, closer to nature.",
  },
];

const Home = () => {
  const [hoverIndex, setHoverIndex] = useState(null);
  const [hoverSide, setHoverSide] = useState(null);

  const handleMouseEnter = (side, index) => {
    setHoverSide(side);
    setHoverIndex(index);
  };

  const handleMouseLeave = () => {
    setHoverIndex(null);
    setHoverSide(null);
  };
  const { auth } = useContext(AuthContext); // auth.user and token
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${API}/api/products`);
        setProducts(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  // Add to cart handler
  const handleAddToCart = async (product) => {
    try {
      // if not logged in, redirect to login
      const token = localStorage.getItem("token") || auth?.token;
      if (!token) {
        // show message then redirect
        alert("Please login to add items to cart");
        navigate("/login");
        return;
      }

      await axios.post(
        `${API}/api/cart/add`,
        { productId: product._id, quantity: 1 },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Simple UI feedback
      alert("✅ Added to cart");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to add to cart");
    }
  };

  // ... your existing Home JSX (carousel, hero etc.) ...

  return (
    <>
      <section className="organic-carousel">
      <Carousel fade interval={4000} controls={true}>
        {/* Slide 1 */}
        <Carousel.Item>
          <img className="carousel-image" src={ban1} alt="Fresh Organic Vegetables" />
          <div className="carousel-overlay"></div>
          <div className="carousel-caption-left">
            <h1>Fresh Organic Vegetables</h1>
            <p>
              Eat healthy, live healthy — fresh, local, and chemical-free produce straight from farms.
            </p>
            <button className="carousel-btn">Shop Now</button>
          </div>
        </Carousel.Item>

        {/* Slide 2 */}
        <Carousel.Item>
          <img className="carousel-image" src={ban2} alt="Natural & Chemical-Free" />
          <div className="carousel-overlay"></div>
          <div className="carousel-caption-left">
            <h1>100% Natural & Chemical-Free</h1>
            <p>
              Pure and eco-friendly products grown with love — just the way nature intended.
            </p>
            <button className="carousel-btn">Explore More</button>
          </div>
        </Carousel.Item>

        {/* Slide 3 */}
        <Carousel.Item>
          <img className="carousel-image" src={ban3} alt="Healthy Lifestyle" />
          <div className="carousel-overlay"></div>
          <div className="carousel-caption-left">
            <h1>Healthy Lifestyle Starts Here</h1>
            <p>
              Make the switch to organic — nourish your body, care for the planet.
            </p>
            <button className="carousel-btn">Get Started</button>
          </div>
        </Carousel.Item>
      </Carousel>
    </section>
    {/*========================= PRODUCTS GRID=========================================== */}
      <section className="products-section">
        <div className="container">
          <h2>Shop Products</h2>
          {loading ? (
            <p>Loading products...</p>
          ) : (
            <div className="products-grid">
              {products.map(p => (
                <ProductCard key={p._id} product={p} onAdd={handleAddToCart} />
              ))}
            </div>
          )}
        </div>
      </section>

  
{/* ==============================================First Section======================================================= */}

      {/* 🥬 Upper Section: Image + Text */}
      <section className="organic-upper">
        <div className="upper-container">
          <div className="upper-text">
            <h2>🌱 Best Organic Fruits & Vegetables</h2>
            <p>
              Discover the freshest, locally grown fruits and vegetables, carefully hand-picked
              and delivered straight to your doorstep — because you deserve better health.
            </p>
            <ul className="organic-list">
              <li>✔️ Fresh from organic farms</li>
              <li>✔️ Hand-picked with care</li>
              <li>✔️ Eco-friendly packaging</li>
            </ul>
            <button className="btnn2">Read More</button>
          </div>
          <div className="upper-image">
            <img src={Upperimage} alt="Organic Vegetables" />
          </div>
        </div>
      </section>
{/* ==============================================Second  Section==========================================
      {/* 🍃 Parallax Banner */}
      <section className="parallax-banner">
        <div className="banner-overlay">
          <h1>🌾 Eat Fresh, Live Organic</h1>
          <p>Pure, fresh, and chemical-free — your health, our priority.</p>
        </div>
      </section>
{/* ==============================================Third Section==========================================
      {/* 🌻 Features Section */}
      <section className="organic-section features-bg" id="features">
        <div className="organic-container">
          <div className="features-section">
            <h3>🌿 Why Choose Us</h3>
            <p>
              Experience the purity of nature with our organically sourced, farm-fresh products.
              Sustainability and quality are at the heart of everything we do.
            </p>

            <div className="feature-cards">
              <div className="feature-card">
                <FaLeaf className="feature-icon" />
                <h4>Natural Process</h4>
                <p>
                  We follow eco-friendly farming methods to protect nature and ensure purity.
                </p>
                <button className="btnn1">Read More</button>
              </div>

              <div className="feature-card">
                <FaAppleAlt className="feature-icon" />
                <h4>Organic Products</h4>
                <p>
                  Every product is certified organic and sourced from trusted farms only.
                </p>
                <button className="btnn">Read More</button>
              </div>

              <div className="feature-card">
                <FaSeedling className="feature-icon" />
                <h4>Biologically Safe</h4>
                <p>
                  Our products are 100% chemical-free and safe for you and your family.
                </p>
                <button className="btnn">Read More</button>
              </div>
            </div>
          </div>
        </div>
      </section>
{/* ==============================================Fourth Section==========================================
      
      {/* 🌿 Modern Hero Section */}
<section className="hero">
  <div className="hero-content">
    <h1>Pure • Natural • Healthy Living 🌿</h1>
    <p>
      Discover the freshness of organic life — where every product is grown with love and care for you and the planet.
    </p>
    <button>Shop Organic</button>
  </div>
  <div className="hero-imagee">
    <img src={hero} alt="web" />
  </div>
</section>

{/* ==============================================Fifth Section==========================================*/}
      {/* About Section */}
      <section className="about">
        <div className="about-inner">
          <h2>About OrganicMart</h2>
          <p>
            We are passionate about reconnecting you with nature through real, chemical-free food. 
            Every product comes straight from farms that respect the earth — delivering quality and nutrition that your body truly deserves.
          </p>
        </div>
      </section>

{/* ==============================================Seventh Section==========================================*/}
      {/* Farm Section */}
      <section className="farm">
        <div className="farm-content">
          <h2>Fresh from the Farm</h2>
          <p>
            Taste the difference of truly fresh produce — handpicked and delivered at peak freshness.
          </p>
          <button>Explore More</button>
        </div>
      </section>

    
    {/* ==============================================Ninth Section==========================================*/}
      
      
          <div className="container">
      <div className="side left">
        {leftContent.map((item, idx) => (
          <div
            key={idx}
            className="content-block"
            onMouseEnter={() => handleMouseEnter("left", idx)}
            onMouseLeave={handleMouseLeave}
          >
            <div className="hover-icon">
              {hoverSide === "left" && hoverIndex === idx && (
                <span className="dot"></span>
              )}
            </div>
            <div>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="image-wrapper">
        <img src={image} alt="Healthy Food" />
        <div className="circle-text">
          <h2>Wholesome Goodness</h2>
          <p>Naturally Curated</p>
        </div>
      </div>

      <div className="side right">
        {rightContent.map((item, idx) => (
          <div
            key={idx}
            className="content-block"
            onMouseEnter={() => handleMouseEnter("right", idx)}
            onMouseLeave={handleMouseLeave}
          >
            <div>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
            <div className="hover-icon">
              {hoverSide === "right" && hoverIndex === idx && (
                <span className="dot"></span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>


    </>
  );
};

export default Home;
