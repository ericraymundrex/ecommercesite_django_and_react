import { Fragment } from 'react';
import Base from '../core/Base/Base'

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { signup } from '../auth/auth';
import Navbar from '../core/Navebar/Navebar';
const Signup=()=>{

    const [values,setValues]=useState({
        name:"",
        email:"",
        password:"",
        error:"",
        success:false,
        message:""
    })

    const {name,email, password,error,success,message}=values
    
    //higher order function 
    const handlerChange=name=>event=>{
        setValues({...values,error:false,[name]:event.target.value})
    }
    const onSubmitHandler=(event)=>{
        event.preventDefault();
        setValues({
            ...values,error:false
        })
        signup({name,email,password}).then(data=>{
            console.log(data)
            if(data.email===email){
                setValues({
                    ...values,
                    name:"",
                    email:"",
                    password:"",
                    error:"",
                    success:true
                })
            }else if(data.email[0]==="user with this email already exists."){
                setValues({
                    ...values,
                    error:true,
                    success:false,
                    message:data.email[0]
                })
            }
        }
        ).catch(e=>console.log(e))
    }
    const successMessage=()=>{
        
        return(
            
            <div className='row'>
                <div className='col-md-6 offset-sm-3 text-center'>
                    <div className='alert alert-success'
                     style={{display:success?"":"none"}}>
                        Account created successfully <br/>
                        <Link to="/signin">Login now.</Link>
                    </div>
                </div>
            </div>
        )
    }
    const errorMessage=(message)=>{
        return(
            <div className='row'>
                <div className='col-md-6 offset-sm-3 text-center'>
                    <div className='alert alert-danger'
                    style={{display:error?"":"none"}}>
                        
                        {message}
                    </div>
                </div>
            </div>
        )
    }
    return (
    <Fragment>
        <Navbar />
        <div className='col-md-6 offset-sm-3 text-left pb-4'>
        {successMessage()}
        {errorMessage(message)}
            <label>Name</label>
            <input
                className='form-control'
                value={name}
                onChange={handlerChange("name")}
                type="text"
            ></input>

            <label>E-Mail</label>
            <input
                className='form-control'
                value={email}
                onChange={handlerChange("email")}
                type="text"
            ></input>

            <label>password</label>
            <input
                className='form-control'
                value={password}
                onChange={handlerChange("password")}
                type="text"
            ></input>

            <button className='btn btn-success mt-5'
            onClick={onSubmitHandler}>
                SignUP!
            </button>
        </div>
        <Base />
    </Fragment>    
    )
    
}

export default Signup;