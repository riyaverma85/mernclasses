import React, { useState } from "react";
import axios from "axios";
import "./css/dashboard.css"

const API = import.meta.env.VITE_API_URL;

const AdminDashboard = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [desc, setDesc] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null); // for image preview

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) {
      setPreview(URL.createObjectURL(file));
    } else {
      setPreview(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) {
      alert("Please select an image");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("price", price);
      formData.append("description", desc);
      formData.append("image", image);

      const token = localStorage.getItem("token"); // admin token

      const res = await axios.post(`${API}/api/products/add`, formData, {
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" },
      });

      alert("✅ Product added successfully");
      setName(""); setPrice(""); setDesc(""); setImage(null); setPreview(null);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Error adding product");
    }
  };

  return (
    <div className="container mt-4">
      <h2>Add Product</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)} required />
        <input type="number" placeholder="Price" value={price} onChange={e => setPrice(e.target.value)} required />
        <textarea placeholder="Description" value={desc} onChange={e => setDesc(e.target.value)} />
        
        {/* Image Input + Preview */}
        <input type="file" accept="image/*" onChange={handleImageChange} required />
        {preview && (
          <div className="image-preview">
            <img src={preview} alt="Preview" />
          </div>
        )}

        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default AdminDashboard;
