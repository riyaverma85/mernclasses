import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import UserDashboard from './pages/UserDashboard';

function App() {
  const role = localStorage.getItem("role");
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login"/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/admin-dashboard" element={role==='owner' || role==='admin'? <AdminDashboard/> : <Navigate to="/login"/>}/>
        <Route path="/user-dashboard" element={role==='user'? <UserDashboard/> : <Navigate to="/login"/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
