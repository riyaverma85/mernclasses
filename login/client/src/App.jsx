
import {BrowserRouter ,Routes,Route} from "react-router-dom"
import Login from "./pages/Login";
import UserDashboard from "./pages/UserDashboard";
const App=()=>{
  return(
    <>
     <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login/>}>
          
        </Route>
        </Routes>
        <Routes>
         <Route path="/dashboard" element={<UserDashboard/>}>
         
         </Route>
       </Routes>
       
     </BrowserRouter>
    </>
  )
}
export default App;