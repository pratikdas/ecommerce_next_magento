import Link from "next/link"

export default function OrderResult(){
    console.log("rendering home")
    return (
        <>
          <section>
             <h1>Order Placed</h1>
             <button><Link href="/myaccount/order-listing">View My Orders</Link></button>
          </section>
        </>
    )
}
