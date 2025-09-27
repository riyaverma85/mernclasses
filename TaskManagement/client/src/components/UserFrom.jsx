
import { useState } from 'react';
import axios from 'axios';
import BackendUrl from '../utils/BackendUrl';
import {ToastContainer, toast } from 'react-toastify';

const UserForm = ({refresh,setRefresh}) => {
  const [input,setInput] = useState({name:'',email:'',password:'',role:'user'});
  const token = localStorage.getItem("token");

  const handleInput = e => setInput({...input,[e.target.name]:e.target.value});

  const handleSubmit = async (e)=>{
    e.preventDefault();
    try{
      await axios.post(`${BackendUrl}user/create`, input, { headers:{Authorization: token}});
      toast.success("User created!");
      setRefresh(!refresh);
      setInput({name:'',email:'',password:'',role:'user'});
    }catch(err){ toast.error(err.response.data.message);}
  }

  return (
    <>
    
    <div className="card p-3 mb-4">
      <h5>Create User</h5>
      <form onSubmit={handleSubmit}>
        <input className="form-control mb-2" name="name" placeholder="Name" value={input.name} onChange={handleInput} required/>
        <input className="form-control mb-2" name="email" placeholder="Email" value={input.email} onChange={handleInput} required/>
        <input className="form-control mb-2" type="password" name="password" placeholder="Password" value={input.password} onChange={handleInput} required/>
        <select className="form-select mb-2" name="role" value={input.role} onChange={handleInput}>
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        <button className="btn btn-primary w-100">Create User</button>
      </form>
    </div>
    <ToastContainer/>
    </>
  )
}

export default UserForm;
