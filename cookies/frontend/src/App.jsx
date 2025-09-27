
//=============================================COOKIES========================================================
import  { useState } from "react";
import axios from "axios"


axios.defaults.withCredentials = true; // Allow cookies

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [profile, setProfile] = useState(null);

  const clearInputs = () => {
    setUsername("");
    setPassword("");
  };

  const register = async () => {
    if (!username || !password) {
      alert("Please fill in both fields");
      return;
    }
    const res = await axios.post("http://localhost:5000/register", { username, password });
    alert(res.data.message);
    clearInputs(); // ✅ clear after click
  };

  const login = async () => {
    if (!username || !password) {
      alert("Please enter username and password");
      return;
    }
    try {
      const res = await axios.post("http://localhost:5000/login", { username, password });
      alert(res.data.message);
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
    clearInputs(); // ✅ clear after click
  };

  const getProfile = async () => {
    try {
      const res = await axios.get("http://localhost:5000/profile");
      setProfile(res.data);
    } catch (err) {
      alert("Not logged in");
    }
    clearInputs(); // ✅ clear after click
  };

  const logout = async () => {
    await axios.post("http://localhost:5000/logout");
    setProfile(null);
    alert("Logged out");
    clearInputs(); // ✅ clear after click
  };

  return (
    <div className="container">
      <h1>MERN Cookie Auth</h1>
      <input
        placeholder="Username"
        value={username}
        onChange={e => setUsername(e.target.value)}
      />
      <input
        placeholder="Password"
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />

      <div className="button-group">
        <button onClick={register}>Register</button>
        <button onClick={login}>Login</button>
        <button onClick={getProfile}>Get Profile</button>
        <button onClick={logout}>Logout</button>
      </div>

      {profile && (
        <div className="profile">
          <h2>Profile</h2>
          <pre>{JSON.stringify(profile, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default App;
