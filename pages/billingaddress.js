
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
                   <input type="text" className="form-control" id="firstname"  {...register("address[firstname]", { required: true, maxLength: 20 })}/>
                   <p>{errors.firstname?.type === 'required' && "First name is required"}</p>
                </div>
                <div className="mb-3">
                   <label htmlFor="lastName" className="form-label">Last Name</label>
                   <input type="text" className="form-control" id="lastname"  {...register("address[lastname]", { required: true, maxLength: 20 })}/>
                   <p>{errors.lastname?.type === 'required' && "Last name is required"}</p>
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email"  {...register("email")}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="pwd" className="form-label">Street</label>
                    <input type="text" className="form-control" id="pwd" {...register("address[street]")}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="pwd" className="form-label">City</label>
                    <input type="text" className="form-control" id="pwd" {...register("address[city]")}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="pwd" className="form-label">Post Code</label>
                    <input type="text" className="form-control" id="pwd" {...register("address[postcode]")}/>
                </div>
                <div className="mb-3">
                   <label htmlFor="country_id" className="form-label">Country</label>
                   <select className="form-control" {...register("address[country_id]")}>
                        <option value="-1">--Select--</option>
                        <option value="IN">India</option>
                        <option value="UAE">UAE</option>
                        <option value="KSA">KSA</option>
                   </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="pwd" className="form-label">State / Province</label>
                    <input type="text" className="form-control" id="pwd" {...register("address[region_id]")}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="pwd" className="form-label">Mobile / Phone</label>
                    <input type="text" className="form-control" id="pwd" {...register("address[telephone]")}/>
                </div>
                <button type="submit" className="btn btn-primary">Buy</button>
                </form>
            </div>
        </div>
        </section>
    );
}
