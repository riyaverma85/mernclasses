

//====================================SESSION=====================================================


import { useState } from "react";
import BackendUrl from "./utils/BackendUrl";
import Button from "react-bootstrap/Button";
import axios from "axios"
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App= () => {
  const [message, setMessage] = useState("");

  const handleSubmit = async () => {
    let api = `${BackendUrl}/`;
    try {
      const response = await axios.get(api, { withCredentials: true });
      console.log(response.data);
      setMessage(response.data);
      toast.success(response.data); 
    } catch (error) {
      console.error(error);
      toast.error("Error while saving!");
    }
  };

  const handleSubmit1 = async () => {
    let api = `${BackendUrl}display`;
    try {
      const response = await axios.get(api, { withCredentials: true });
      console.log(response.data);
      setMessage(response.data);
      toast.info(response.data); 
    } catch (error) {
      console.error(error);
      toast.error("Error while displaying!");
    }
  };

  return (
    <>
      <center style={{marginTop: "50px",display: "flex",flexDirection: "column",alignItems: "center",gap: "30px",
        }}
      >
        <div style={{ display: "flex", gap: "30px" }}>
          <Button onClick={handleSubmit}>Save</Button>
          <Button onClick={handleSubmit1}>Display</Button>
        </div>

        
        <h3 style={{ marginTop: "20px", color: "blue" }}>{message}</h3>
      </center>

     
      <ToastContainer position="top-center" autoClose={2000} />
    </>
  );
};

export default App;
