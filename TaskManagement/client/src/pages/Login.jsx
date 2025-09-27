import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import BackendUrl from '../utils/BackendUrl';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const [input,setInput] = useState({email:"",password:""});
  const navigate = useNavigate();

  const handleInput=(e)=>{
  let name=e.target.name;
  let value=e.target.value;
  setInput(values=>({...values, [name]:value}));
  console.log(input);
} 
  const handleSubmit = async (e) => {
    e.preventDefault();
    let api=`${BackendUrl}user/login`
    try{
      const res = await axios.post(api, input);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);
      toast.success("Login successful!");
      if(res.data.role==='user') navigate('/user-dashboard');
      else navigate('/admin-dashboard');
    }catch(err){
      toast.error(err.response.data.message);
    }
  }

  return (
    <div className="container mt-5" style={{maxWidth:'400px'}}>
      <h2 className="mb-4 text-center">Login</h2>
      <form >
        <div className="mb-3">
          <label>Email</label>
          <input type="email" name="email" className="form-control" onChange={handleInput} required/>
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input type="password" name="password" className="form-control" onChange={handleInput} required/>
        </div>
        <button type="submit" className="btn btn-primary w-100" onClick={handleSubmit}>Login</button>
      </form>
      <ToastContainer position="top-center"/>
    </div>
  )
}

export default Login;
