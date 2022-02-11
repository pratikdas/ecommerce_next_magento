import { useRouter } from 'next/router'
import API_URLS from '../../api_urls'

const Product = ({product}) => {
  
  
  return (
  <section>
        <div className="container">
            <div className="row align-items-center">
            
             <ul>
                 {
                   product.name
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
  
    const productURL = API_URLS.PRODUCT.replace(":sku",sku)
    const resp = await fetch(productURL, {headers: {Authorization: `Bearer ${process.env.ADMIN_TOKEN}`}})
    const product = await resp.json()

    console.log("product "+ JSON.stringify(product))
    //const res1 = await fetch(API_URLS.PRODUCT_MEDIA.replace(":sku", sku), {headers: {Authorization: `Bearer ${process.env.ADMIN_TOKEN}`}})
    //const productWIthMedia = await res1.json()
    
  
    return {
      props: {
        product
      }
    }
}
  
  