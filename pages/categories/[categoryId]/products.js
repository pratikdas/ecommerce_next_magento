import Link from 'next/link'
import { useRouter } from 'next/router'
import API_URLS from '../../../api_urls'
import Cookies from 'js-cookie'
import styles from '../../../styles/Product.module.css';

const Products = ({products}) => {
  const router = useRouter()
  const buy = (e)=>{
    const sku = e.target.value
    const email = Cookies.get('userlogin');
    console.log(email);
    console.log(sku);
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
  if (products) {
      console.log(products.items);
      return (
      <section>
      <div className="container">
          <h3>Product Listing</h3>
            <div className={styles.listingsection}>
            {
               products.items.map((product)=>(
                <div className={styles.product}>
                    <div class={styles.imagebox}>
                        {Object.entries(product.media_gallery_entries).length !== 0  && <img class={styles.images} src={process.env.MEDIA_URL + "/catalog/product" + product.media_gallery_entries[0].file} />}
                    </div>
                    <div class={styles.textbox}>
                        <h3 key={product.sku}>
                           <Link href={{
                                pathname: '/products/[sku]',
                                query: { sku: product.sku }
                              }}>
                                <a>{product.name}</a>
                                </Link> &nbsp;&nbsp;
                            <button type="button" className="btn btn-primary" value={product.sku} onClick={buy}>Buy Property</button>
                         </h3>
                    </div>
                </div>
              ))  }
          </div>
        </div>
            </section>)
  } else {
    return (
      <section>
      </section>
    )
  }
  console.log("rendering products")
}

export default Products

export async function getServerSideProps({params}) {
  const productsUrlWithParam = API_URLS.PRODUCTS + "?searchCriteria[filter_groups][0][filters][0][field]=category_id&searchCriteria[filter_groups][0][filters][0][value]=:categoryId&searchCriteria[filter_groups][0][filters][0][condition_type]=eq"
  const productsURL = productsUrlWithParam.replace(":categoryId",params.categoryId)
  const res = await fetch(productsURL, {headers: {Authorization: `Bearer ${process.env.ADMIN_TOKEN}`}})
  const products = await res.json()
  console.log(products);
  return {
    props: {
      products
    }
  }
}
