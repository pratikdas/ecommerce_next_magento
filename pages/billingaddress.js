
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useForm } from "react-hook-form";



export default function BillingAddress(){
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const router = useRouter()
    
    const [billingAddressState, updateBillingAddressState] = useState({firstName:"", lastName: ""})

    /*const handleChange = (e)=>{
        const {id, value} = e.target;
       
        switch(id){
            case "firstName": updateBillingAddressState(prevState=>{return {...prevState, firstName: value}});break
            case "lastName": updateBillingAddressState(prevState=>{return {...prevState, lastName: value}});break
            case "street": updateBillingAddressState(prevState=>{return {...prevState, street: value}});break;
            case "city": updateBillingAddressState(prevState=>{return {...prevState, city: value}});break;
        }
     }; */

    const onSubmit = (data) => {
        
        console.log(updateBillingAddressState.firstName + " " + updateBillingAddressState.lastName)
       
        data.sku = router.query.sku
        fetch('/api/placeorder', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
          })
          .then((response) => response.json())
          .then((data) => {
              console.log(data)
              router.push("/orderresult")
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
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email"  {...register("email")}/>               
                </div>
                <div className="mb-3">
                    <label htmlFor="pwd" className="form-label">Street</label>
                    <input type="text" className="form-control" id="pwd" {...register("street")}/>
                </div>                
                <div className="mb-3">
                    <label htmlFor="pwd" className="form-label">City</label>
                    <input type="text" className="form-control" id="pwd" {...register("city")}/>
                </div>

                <div className="mb-3">
                   <label htmlFor="country" className="form-label">Country</label>
                   <select className="form-control" {...register("country")}>
                        <option value="-1">--Select--</option>
                        <option value="India">India</option>
                        <option value="UAE">UAE</option>
                        <option value="KSA">KSA</option>
                   </select>
                </div>   
                                
    
                <button type="submit" className="btn btn-primary">Buy</button>
                </form>
            </div>
        </div>
        </section>
    );
}