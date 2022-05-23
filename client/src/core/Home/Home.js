import {API} from "../../backend"
import axios from 'axios';
import { Fragment, useEffect,useState } from "react";
import Navbar from "../Navebar/Navebar";
import Base from "../Base/Base";
import Card from "../Card/Card";
import { isAuthenticated } from "../../auth/auth";
const Home=()=>{
    const [errorFromAxios,setErrorFromAxios]=useState(false);
    const [responseFromBackEnd,setResponseFromBackEnd]=useState([]);
    
    useEffect(()=>{
        getProducts()
    },[]);

    const getProducts=async()=>{
        try {
            const response = await axios.get(`${API}product/`)
            setResponseFromBackEnd(response.data)
        }catch (error){
            console.log("error")
            setErrorFromAxios(true)
            setResponseFromBackEnd([])
        }
    }
    

    return (<Fragment>
        <Navbar />
<div className="container">
<div className="row">
        {/* {errorFromAxios?"fail":"success"} */}

        {responseFromBackEnd.map((product,index)=>{
                return(
                <div key={index} className="col-4 mb-4">
                    <Card product={product} addtoCart={isAuthenticated()?true:false} removeFromCart={false} img={true}/>
                </div>)
        })}
        </div>
        <Base/>
</div>
       
    </Fragment>);
}

export default Home;