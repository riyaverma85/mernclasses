
import {BrowserRouter, Route, Routes} from "react-router-dom"
import Layout from "./Layout";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import About from "./pages/About";
import Dashboard from "./Dashboard";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";


const App=()=>{
    return(
        <>
        <BrowserRouter>
           <Routes>
            <Route path="/" element={<Layout/>}>
               <Route index element={<Home/>}/>
               <Route path="/home" element={<Home/>}/>
               <Route path="/shop" element={<Shop/>}/>
                <Route path="/about" element={<About/>}/>
                <Route path="blog" element={<Blog/>}/>
                <Route path="contact" element={<Contact/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>
            </Route>
            <Route>
                <Route path="/dashboard" element={
            <ProtectedRoute adminOnly={true}>
              <Dashboard />
            </ProtectedRoute>} />
            </Route>
           </Routes>
        </BrowserRouter>
         
        </>
    )
}
export default App;
