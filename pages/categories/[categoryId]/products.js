import Link from 'next/link'
import { useRouter } from 'next/router'
import API_URLS from '../../../api_urls'

const Products = ({products}) => {
  const router = useRouter()
  const buy = (e)=>{
    const sku = e.target.value
    router.push({
      pathname: '/billingaddress',
      query: { sku: sku }
    })
  }
  if (products) {
      console.log(products.items);
      return (
      <section>
            <div className="container">
                <div className="row align-items-center">
                  <ul>
                 {
                     products.items.map((product)=>(
                         <li key={product.sku}>
                         <Link href={{
                              pathname: '/products/[sku]',
                              query: { sku: product.sku }
                            }}>
                              <a>{product.name}</a>
                              </Link> &nbsp;&nbsp;
                              <button type="button" className="btn btn-primary" value={product.sku} onClick={buy}>Buy</button>
                             </li>
                         ))
                  }
                 </ul>
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

export async function getStaticProps({params}) {
  /*const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username: 'magebit', password: 'Demo123' })
  }
  const res = await fetch(API_URLS.ADMIN_TOKEN, requestOptions)
  const tokenResult = await res.json()*/

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


export async function getStaticPaths() {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username: 'magebit', password: 'Demo123' })
  }
  const res = await fetch("https://magento2-demo.magebit.com/index.php/rest/V1/integration/admin/token", requestOptions)
  const tokenResult = await res.json()
  console.log(tokenResult)

  const res1 = await fetch("https://magento2-demo.magebit.com/index.php/rest/V1/categories", {headers: {Authorization: "Bearer "+tokenResult}})
  const categoriesResponse = await res1.json()

  const categories = categoriesResponse.children_data

  const paths = []
  categories.map(category=>{
    paths.push({params: {categoryId: category.id.toString()}})
  })

  paths.map(path=>console.log(path.params.categoryId))

  return { paths, fallback: true }
}
