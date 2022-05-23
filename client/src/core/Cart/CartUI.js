import Navbar from "../Navebar/Navebar";
import Base from "../Base/Base";
import { Fragment } from "react";
import { useState,useEffect } from "react";
import { loadCart } from "./Cart";
import Card from "../Card/Card";
import Payment from "../Payment/Payment";
const CartUI=()=>{
    const [reload,setReload]=useState(false)

    const [products,setProducts]=useState([]);
    useEffect(()=>{
        setProducts(loadCart())
    },[reload])

    const loadAllProducts=(products)=>{
        console.log(products)
        return(
            <div>
                {products.map((product,index)=>(
                   <Card key={index} product={product} addtoCart={false} removeFromCart={true} reload={reload} setReload={setReload}/>
                ))}
            </div>
        )
    }
    // const loadCheckout=()=>{
    //     return(
    //         <Payment products={products} reload={reload} setReload={setReload}/>
    //     )
    // }
    return(
        <Fragment>
            <div className="container">
            <Navbar />
        <div className="row text-center">
            <div className="col-6">{loadAllProducts(products)}</div>
            <div className="col-6">{products.length>0?(
                <Payment products={products} reload={reload} setReload={setReload}/>
                
            ):(
                <h3>Please login or add something in cart</h3> 
            )}</div>
        </div>
        <Base />
            </div>

        </Fragment>

    )
}

export default CartUI;