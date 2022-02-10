import { useRouter } from 'next/router'
import API_URLS from '../../api_urls'

const Product = ({product}) => {
  
  console.log("rendering products " + product)
  return (
  <section>
        <div className="container">
            <div className="row align-items-center">
            
             <ul>
                 {
                   product[0].file
                 }
             </ul>
            </div>
        </div>
        </section>)
}

export default Product



export async function getServerSideProps(context) {
    
    const sku  = context.params.sku

    console.log("sku " + sku)
    /*const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: 'magebit', password: 'Demo123' })
    }
    const res = await fetch(API_URLS.ADMIN_TOKEN, requestOptions)
    const tokenResult = await res.json()*/
  
    const res1 = await fetch(API_URLS.PRODUCT_MEDIA.replace(":sku", sku), {headers: {Authorization: `Bearer ${process.env.ADMIN_TOKEN}`}})
    const product = await res1.json()
    
  
    return {
      props: {
        product
      }
    }
}
  
  