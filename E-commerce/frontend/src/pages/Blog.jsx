
import "../css/blog.css";

const Blog = () => {
  
  const blogPosts = [
    {
      title: "10 Benefits of Eating Organic Food",
      image: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6",
      desc: "Discover how organic food helps improve your health, immunity, and overall lifestyle naturally.",
    },
    {
      title: "How to Grow Your Own Organic Garden",
      image: "https://images.unsplash.com/photo-1492496913980-501348b61469",
      desc: "Learn the basics of starting your own organic garden — from soil prep to eco-friendly pest control.",
    },
    {
      title: "Why Choose Eco-Friendly Packaging",
      image: "https://images.unsplash.com/photo-1596909403860-bf0d3a02e2c8",
      desc: "Reduce your carbon footprint with sustainable packaging and support a greener planet.",
    },
  ];

  return (
    <>
   
    <section className="blog-section">
      <h2 className="blog-title">🌿 Our Organic Blog</h2>
      <p className="blog-subtitle">
        Stay updated with the latest trends, tips, and stories from the organic world.
      </p>

      <div className="blog-container">
        {blogPosts.map((post, index) => (
          <div className="blog-card" key={index}>
            <img src={post.image} alt={post.title} />
            <div className="blog-content">
              <h3>{post.title}</h3>
              <p>{post.desc}</p>
              <button className="read-more">Read More →</button>
            </div>
          </div>
        ))}
      </div>
    </section>

    
    </>
  );
};

export default Blog;
