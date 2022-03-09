import { useRouter } from 'next/router'
import API_URLS from '../../api_urls'
import styles from '../../styles/Pdp.module.css';
import Cookies from 'js-cookie'
import Link from 'next/link'

const Product = ({product}) => {
  const router = useRouter()
  const buy = (e)=>{
    const sku = e.target.value
    const email = Cookies.get('userlogin');
    if (email) {
      router.push({
        pathname: '/billingaddress',
        query: { sku: sku }
      })
    } else {
      router.push({
        pathname: '/registeruser',
      })
    }
  }
  const registerUser = async event => {
    event.preventDefault()
    const res = await fetch(process.env.MAGENTO_URL + PLACE_ORDER, {
      body: JSON.stringify({
        name: event.target.name.value
      }),
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST'
    })

    const result = await res.json()
  }

  return (
  <section>
      <div className={styles.container}>

        <div className={styles.leftcolumn}>
          {Object.entries(product.media_gallery_entries).length !== 0  && <img class={styles.active} src={process.env.MEDIA_URL + "/catalog/product" + product.media_gallery_entries[0].file} />}
        </div>
        <div className={styles.rightcolumn}>
          <div className={styles.productdescription}>
            <h3>{ product.name }</h3>
            {
              product.custom_attributes.map( productcustom => {
                if (productcustom.attribute_code == 'short_description') {
                  const shortDescription = productcustom.value;
                  const shortDescriptionStrip = shortDescription.replace(/(<([^>]+)>)/gi, "");
                  return (
                    <p>{shortDescriptionStrip}</p>
                    )
                  }
              })
            }
          </div>
          <div className={styles.productconfiguration}>
          </div>
          <div className={styles.productprice}>
            <span>${product.price}</span>
            <button type="button" className="btn btn-primary" value={product.sku} onClick={buy}>Buy Property</button>
          </div>
        </div>
      </div>
  </section>
  )
}

export default Product

export async function getServerSideProps(context) {

    const sku  = context.params.sku

    /*const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: 'magebit', password: 'Demo123' })
    }
    const res = await fetch(API_URLS.ADMIN_TOKEN, requestOptions)
    const tokenResult = await res.json()*/

    const productURL = API_URLS.PRODUCT.replace(":sku",sku)
    console.log(productURL);
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
