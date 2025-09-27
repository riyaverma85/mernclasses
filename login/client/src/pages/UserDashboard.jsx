
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
const UserDashboard=()=>{
    const navigate = useNavigate();
    const logout=()=>{
          localStorage.clear();
         navigate("/login");
    }
   useEffect(()=>{
       if (!localStorage.getItem("username"))
       {
         navigate("/login");
       }
   })
    return(
        <>
          <h2 className="h2"> Welcome To User DashBoard</h2>
          <div id="dashboard">
            Welcome : {localStorage.getItem("username") }  Email : {localStorage.getItem("useremail")}
      
            <a href="#" onClick={logout}>Logout</a> 
          </div>
        </>
    )
}
export default UserDashboard;