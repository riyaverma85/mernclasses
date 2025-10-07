import React, { useState } from "react";
import axios from "axios";


const API_URL = "http://localhost:8000/api";


function AuthForm({ setUser }) {
const [form, setForm] = useState({ email: "", password: "" });
const [authMode, setAuthMode] = useState("login");


const handleSubmit = async (e) => {
e.preventDefault();
try {
const endpoint = authMode === "login" ? "login" : "register";
const res = await axios.post(`${API_URL}/auth/${endpoint}`, form);
setUser(res.data);
localStorage.setItem("token", res.data.token);
} catch (err) {
console.error(err);
}
};


return (
<form className="auth-form" onSubmit={handleSubmit}>
<h2>{authMode === "login" ? "Login" : "Register"}</h2>
<input
type="email"
placeholder="Email"
value={form.email}
onChange={(e) => setForm({ ...form, email: e.target.value })}
/>
<input
type="password"
placeholder="Password"
value={form.password}
onChange={(e) => setForm({ ...form, password: e.target.value })}
/>
<button type="submit">
{authMode === "login" ? "Login" : "Register"}
</button>
<p onClick={() => setAuthMode(authMode === "login" ? "register" : "login")}>
{authMode === "login" ? "No account? Register" : "Have account? Login"}
</p>
</form>
);
}


export default AuthForm;