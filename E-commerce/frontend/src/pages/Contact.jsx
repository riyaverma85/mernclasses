import React, { useState } from "react";
import "../css/contact.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thank you for contacting us! We'll reply soon. 🌿");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <section className="contact-section">
      <div className="contact-container">
        <div className="contact-info">
          <h2>📞 Get in Touch</h2>
          <p>
            Have questions about our organic products or want to collaborate?
            We'd love to hear from you!
          </p>
          <ul>
            <li><strong>📍 Address:</strong> Green Street, Eco City, India</li>
            <li><strong>📧 Email:</strong> support@organicmart.com</li>
            <li><strong>📞 Phone:</strong> +91 98765 43210</li>
          </ul>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <h3>Send Us a Message</h3>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <textarea
            name="message"
            placeholder="Your Message"
            rows="5"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>
          <button type="submit">Send Message 🌱</button>
        </form>
      </div>
    </section>
    
  );
};

export default Contact;
