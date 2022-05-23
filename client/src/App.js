import { Fragment } from "react";
import {Routes,Route} from "react-router-dom";
// import PrivateRoutes from "./auth/PrivateRoutes";
import Home from "./core/Home/Home";
import { isAuthenticated } from "./auth/auth";
import UserInfo from "./core/UserInfo/UserInfo";
import Signup from "./general/Signup";
import Singnin from '../src/general/Signin'
import { Navigate } from "react-router-dom";
// import { BrowserRouter } from "react-router-dom";
import CartUI from "./core/Cart/CartUI";
const App=()=> {
  return (
    <Fragment>
      
      <Routes>
      {/* <Switch> */}
      <Route path="/" element={<Home/>}/>
      <Route path="/signup" element={<Signup/>}/> 
      <Route path="/user/dashboard" element={isAuthenticated()?<UserInfo/>:<Navigate to ="/signin"/>}/>
      <Route path="/signin" element={<Singnin />}/>
      <Route path="/cart" element={<CartUI />}/>
      {/* {isAuthenticated?} */}
      {/* <PrivateRoutes path="/user/dashboard" element={<UserInfo/>}/> */}
      {/* </Switch> */}
      
      </Routes>
      
    </Fragment>
  );
}

export default App;