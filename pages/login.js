
import { useRouter } from 'next/router'
import { useState } from 'react'
import Link from 'next/link'
import { useAppContext } from '../contexts/state'


export default function Login(){
    const router = useRouter()
    const [loginState, updateLoginState] = useState({email:"", pwd: ""})
    const {userCtx, setUserCtx} = useAppContext();

    const handleChange = (e)=>{
        const {id, value} = e.target;
        console.log(id+" "+value);
        switch(id){
            case "email": updateLoginState(prevState=>{return {...prevState, email: value}});break;
            case "pwd": updateLoginState(prevState=>{return {...prevState, pwd: value}});break;
        }
     };

    const handleSubmit = (e)=>{
        const {id,value} = e.target
        console.log(loginState.email + " " + loginState.pwd)
        fetch('/api/userlogin', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({email:loginState.email, pwd: loginState.pwd}),
          })
          .then((response) => response.json())
          .then((data) => {
              console.log(data)
              setUserCtx({isAuth:true, user:{name:"pratik"}});

              router.push("/myaccount/order-listing")
           });

      }
    return (
        <section>
        <div className="container">
            <div className="row align-items-center">
                <form>
                <div className="mb-3">
                <label htmlFor="email" className="form-label">Email address</label>
                <input type="email" className="form-control" id="email" aria-describedby="emailHelp" onChange={handleChange}/>

                </div>
                <div className="mb-3">
                <label htmlFor="pwd" className="form-label">Password</label>
                <input type="password" className="form-control" id="pwd" onChange={handleChange}/>
                </div>

                <button type="button" onClick={handleSubmit} className="btn btn-primary">Submit</button>
                </form>
            </div>
            <p>
                <Link href="/registeruser">Sign up</Link>
            </p>
        </div>
        </section>
    )
}
