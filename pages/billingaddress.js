import API_URLS from '../api_urls'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useForm } from "react-hook-form";
import Cookies from 'js-cookie'

  const customerAddress = ({customerAddress}) => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const router = useRouter()
    console.log(customerAddress);
    const contactAddress = {};
    customerAddress.items.map( productcustom => {
      productcustom.addresses.map( billingAddress => {
        console.log(billingAddress);
        contactAddress.firstname = billingAddress.firstname
        contactAddress.lastname = billingAddress.lastname
        contactAddress.street = billingAddress.street[0]
        contactAddress.city = billingAddress.city
        contactAddress.postcode = billingAddress.postcode
        contactAddress.region = billingAddress.region.region
        contactAddress.country_id = billingAddress.country_id
        contactAddress.telephone = billingAddress.telephone
      })
    })
    console.log(contactAddress);
    const [billingAddressState, updateBillingAddressState] = useState({firstName:"", lastName: ""})
    const onSubmit = (data) => {

        console.log(updateBillingAddressState.firstName + " " + updateBillingAddressState.lastName)

        data.sku = router.query.sku
        data.email = Cookies.get('userlogin');
        fetch('/api/placeorder', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
          })
          .then((response) => response.json())
          .then((data) => {
              router.push("/orderresult")
           });
    };


    return (
        <section>
        <div className="container">
          <div className="row align-items-center leftbill" >
              <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="mb-3">
                      <input name="acceptTerms" type="checkbox" {...register('checkbox2')} id="acceptTerms" className={`form-check-input ${errors.acceptTerms ? 'is-invalid' : ''}`} />
                      <label htmlFor="email" className="form-label">&nbsp;T&C 1 {customerAddress[0]}</label>
                  </div>
                  <div className="mb-3">
                      <input name="acceptTerms" type="checkbox" {...register('checkbox2')} id="acceptTerms" className={`form-check-input ${errors.acceptTerms ? 'is-invalid' : ''}`} />
                      <label htmlFor="email" className="form-label">&nbsp;T&C 2</label>
                  </div>
                  <div className="mb-3">
                      <input name="acceptTerms" type="checkbox" {...register('checkbox3')} id="acceptTerms" className={`form-check-input ${errors.acceptTerms ? 'is-invalid' : ''}`} />
                      <label htmlFor="email" className="form-label">&nbsp; T&C 3</label>
                  </div>

                  <button type="submit" className="btn btn-primary">Buy Property</button>
              </form>
          </div>
          <div className = 'customer-details rightbill'>
              <h4>Contact Address</h4>
              <p>{contactAddress.firstname} {contactAddress.lastname} </p>
              <p>{contactAddress.street}, {contactAddress.city} </p>
              <p>{contactAddress.postcode} ,  {contactAddress.region} </p>
              <p>{contactAddress.country_id} ,  M-{contactAddress.telephone} &nbsp;&nbsp;&nbsp; Edit Address</p>
              <p> </p>
          </div>
        </div>
        </section>
    );
}
export default customerAddress

export async function getServerSideProps(context) {
  const userlogin = context.req.cookies['userlogin']
  console.log(userlogin);
  const getUrlWith  =  API_URLS.CUSTOMER_DETAILS + "?searchCriteria[filterGroups][0][filters][0][field]=email&searchCriteria[filterGroups][0][filters][0][value]=" + userlogin + "&searchCriteria[filterGroups][0][filters][0][condition_type]=eq"
  const data = await fetch(getUrlWith, {headers: {Authorization: "Bearer " + process.env.ADMIN_TOKEN}})
  const customerAllDetails = await data.json()
  const customerAddress = customerAllDetails;
  const orderlisting = customerAddress.children_data
  console.log(customerAddress);
  return {
      props: {
        customerAddress
      }
    }
  }
