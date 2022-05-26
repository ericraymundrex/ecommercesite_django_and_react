import { Fragment } from "react";
import { isAuthenticated } from "../../auth/auth";
import { signout } from "../../auth/auth";

const Navbar=()=>{


    return(
        <Fragment> 
            <div className="row pb-5">
                <div className="container">
                <ul className="nav nav-tabs">
                <li className="nav-item">
                    <a className="nav-link" href="/">Home</a>
                </li>
                
                {isAuthenticated()?<Fragment>
                <li className="nav-item">
                    <a className="nav-link" href="/"  onClick={(event)=>{
                        signout(()=>{
                    })}}>signout</a>
                </li>

                <li className="nav-item">
                    <a className="nav-link" href="/Cart">Cart</a>
                </li>   
                </Fragment>:
                <Fragment>
                <li className="nav-item">
                    <a className="nav-link" href="/signin">signin</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="/signup">signup</a>
                </li>
                </Fragment>}
    

                
                </ul>
                </div>
            </div>          
        </Fragment>
    )
}

export default Navbar;