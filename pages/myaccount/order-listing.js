import { route } from 'next/dist/server/router'
import Link from 'next/link'
import { useRouter } from 'next/router'
import API_URLS from '../../api_urls'
import Cookies from 'js-cookie'

export default function Products({orderlistingResponse}){
  const customerEmail = Cookies.get() // => 'value'
    const router = useRouter()
    return (
        <section>
        <div className="container">
            <div className="row align-items-center">
                <table id="customers">
                      <tr>
                        <th>Order Id</th>
                        <th>Order Status</th>
                        <th>Email</th>
                        <th>Total Price</th>
                        <th>Action</th>
                      </tr>
                     {
                       orderlistingResponse.items.map((order)=>(
                           <tr>
                             <td>{ order.increment_id }</td>
                             <td>{ order.status }</td>
                             <td>{ order.customer_email }</td>
                             <td>{ order.subtotal_incl_tax }</td>
                             <td>View</td>
                           </tr>
                       ))
                     }
                  </table>
            </div>
        </div>
        </section>
    );
}
export async function getServerSideProps(context) {
  const userlogin = context.req.cookies['userlogin']
  const getUrlWith  =  API_URLS.ORDER_LISTING + "?searchCriteria[filter_groups][0][filters][0][field]=customer_email&searchCriteria[filter_groups][0][filters][0][value]=" + userlogin
  const data = await fetch(getUrlWith, {headers: {Authorization: "Bearer " + process.env.ADMIN_TOKEN}})
  const orderlistingResponse = await data.json()

  const orderlisting = orderlistingResponse.children_data
  return {
      props: {
        orderlistingResponse
      }
    }
  }
