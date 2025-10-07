import { Outlet } from "react-router-dom";
import Footer from "./components/Footer";
import Topnav from "./components/Topnav";
import "./css/layout.css"
const Layout=()=>{
    return(
        <>
          <Topnav/>
          <div id="outlet">
            <Outlet/>
          </div>
          
          <Footer/>
        </>
    )
}
export default Layout;