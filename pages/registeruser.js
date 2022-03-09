
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
        fetch('/api/registeruser', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
          })
          .then((response) => response.json())
          .then((data) => {
              if (data.status == 500) {
                alert(JSON.stringify(data['message']));
              }else{
                  router.push("/login")
                  alert('User created successfully');
              }
          });
    };


    return (
        <section>
        <div className="container">
            <div className="row align-items-center">
                <form onSubmit={handleSubmit(onSubmit)}>
                <div><b>Customer Details</b> </div>
                <div>&nbsp; </div>
                <div className="mb-3">
                   <label htmlFor="firstName" className="form-label">First Name</label>
                   <input type="text" className="form-control" id="firstname"  {...register("firstname", { required: true, maxLength: 20 })}/>
                   <p>{errors.firstName?.type === 'required' && "First name is required"}</p>
                </div>
                <div className="mb-3">
                   <label htmlFor="lastName" className="form-label">Last Name</label>
                   <input type="text" className="form-control" id="lastname"  {...register("lastname", { required: true, maxLength: 20 })}/>
                   <p>{errors.lastName?.type === 'required' && "Last name is required"}</p>
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email"  {...register("email")}/>
                </div>
                <div><b>Customer Contact Details</b> </div>
                <div>&nbsp; </div>
                <div className="mb-3">
                    <label htmlFor="pwd" className="form-label">Street</label>
                    <input type="text" className="form-control" id="pwd" {...register("addresses[0][street][0]")}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="pwd" className="form-label">City</label>
                    <input type="text" className="form-control" id="pwd" {...register("addresses[0][city]")}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="pwd" className="form-label">Post Code</label>
                    <input type="text" className="form-control" id="pwd" {...register("addresses[0][postcode]")}/>
                </div>
                <div className="mb-3">
                   <label htmlFor="country_id" className="form-label">Country</label>
                   <select className="form-control" {...register("addresses[0][country_id]")}>
                        <option value="-1">--Select--</option>
                        <option value="IN">India</option>
                        <option value="UAE">UAE</option>
                        <option value="KSA">KSA</option>
                   </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="pwd" className="form-label">State / Province</label>
                    <input type="text" className="form-control" id="pwd" {...register("addresses[0][region_id]")}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="pwd" className="form-label">Mobile</label>
                    <input type="text" className="form-control" id="pwd" {...register("addresses[0][telephone]")}/>
                    <input type="hidden" value="1" className="form-control" id="pwd" {...register("addresses[0][default_billing]")}/>
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        </div>
        </section>
    );
}
