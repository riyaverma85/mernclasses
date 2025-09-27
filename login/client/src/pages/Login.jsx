import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from "axios"
import backendURL from '../utils/BackendURL';
import { useNavigate } from 'react-router-dom';
const Login = () => {
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const handleInput = (e) => {
    let name=e.target.name;
    let value=e.target.value;
    setInput(values => ({ ...values, [name]: value }));
  }

  useEffect(() => {
    console.log(input);
  }, [input]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const api =`${backendURL}/user/login`;
      const response = await axios.post(api, input);

      if (response.status === 200 || response.status === 202) {
        localStorage.setItem("username", response.data.User.name);
        localStorage.setItem("useremail", response.data.User.email);
        alert("You are Logged in");
        navigate("/dashboard");
      } else {
        alert("Login failed!");
      }
      console.log(response.data.User);
    } catch (err) {
      console.error(err);
      alert("Something went wrong!");
    }
  }

  return (
    <>
    <div className='login-page'>
       <div className='login-card'>
      <h1 align="center">User Login</h1>
      <Form id='from'>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Enter Email</Form.Label>
          <Form.Control type="email" name="email" onChange={handleInput}  />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Enter Password</Form.Label>
          <Form.Control type="password" name="password" onChange={handleInput}/>
        </Form.Group>
        <Button variant="primary" type="submit" onClick={handleSubmit}>
          Login
        </Button>
      </Form>
      </div>
    </div>
    </>
  );
}

export default Login;
