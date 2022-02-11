
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useForm } from "react-hook-form";



export default function RegisterUser(){
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const router = useRouter()
    
    const [loginState, updateLoginState] = useState({email:"", pwd: ""})

    const handleChange = (e)=>{
        const {id, value} = e.target;
        console.log(id+" "+value);
        switch(id){
            case "email": updateLoginState(prevState=>{return {...prevState, email: value}});break;
            case "pwd": updateLoginState(prevState=>{return {...prevState, pwd: value}});break;
        }
     }; 

    const onSubmit = (data) => {

        console.log(loginState.email + " " + loginState.pwd)
        fetch('/api/userlogin', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
          })
          .then((response) => response.json())
          .then((data) => {
              console.log(data)
              router.push("/login")
           });
    };


    return (
        <section>
        <div className="container">
            <div className="row align-items-center">
                <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-3">
                   <label htmlFor="firstName" className="form-label">First Name</label>
                   <input type="text" className="form-control" id="firstName"  {...register("firstName", { required: true, maxLength: 20 })}/>
                   <p>{errors.firstName?.type === 'required' && "First name is required"}</p>
                </div>  
                <div className="mb-3">
                   <label htmlFor="lastName" className="form-label">Last Name</label>
                   <input type="text" className="form-control" id="lastName"  {...register("lastName", { required: true, maxLength: 20 })}/>
                   <p>{errors.lastName?.type === 'required' && "Last name is required"}</p>
                </div>    
                <div className="mb-3">
                   <label htmlFor="gender" className="form-label">Gender</label>
                   <select className="form-control" {...register("gender")}>
                        <option value="-1">--Select--</option>
                        <option value="female">female</option>
                        <option value="male">male</option>
                   </select>
                </div>   
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email"  {...register("email")}/>               
                </div>
                <div className="mb-3">
                    <label htmlFor="pwd" className="form-label">Password</label>
                    <input type="password" className="form-control" id="pwd" {...register("pwd")}/>
                </div>

                <div className="mb-3">
                    <label htmlFor="repwd" className="form-label">Reenter Password</label>
                    <input type="password" className="form-control" id="repwd" {...register("repwd")}/>
                </div>
    
                <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        </div>
        </section>
    );
}