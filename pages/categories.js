import { route } from 'next/dist/server/router'
import Link from 'next/link'
import { useRouter } from 'next/router'
import API_URLS from '../api_urls'
import styles from '../styles/Product.module.css';


export default function Products({categories}){
    const router = useRouter()

    const handleChange = (e)=>{
      const {id,value} = e.target
    }

    const handleSubmit = (e)=>{
        const {id,value} = e.target
        router.push("/")
      }

    return (
        <section>
        <div className="container">
           <h3>Category Listing</h3>
              <div className={styles.listingsection}>
              {
                 categories.map((category)=>(
                  <div className={styles.product}>
                      <div class={styles.textbox}>
                          <h3>
                          <Link href={{
                             pathname: '/categories/[categoryId]/products',
                             query: { categoryId: category.id }
                           }}>
                             <a>{category.name} ({category.product_count})</a>
                                         </Link>
                           </h3>
                      </div>
                  </div>
                ))  }
            </div>
          </div>
        </section>
    );
}

export async function getStaticProps() {
  /*const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username: 'magebit', password: 'Demo123' })
  }

  const res = await fetch(API_URLS.ADMIN_TOKEN, requestOptions)
  const tokenResult = await res.json()
  console.log(tokenResult)*/
  const data = await fetch(API_URLS.CATEGORIES, {headers: {Authorization: "Bearer " + process.env.ADMIN_TOKEN}})

  /*if (errors || !data) {
    return { notFound: true };
  }*/

  const categoriesResponse = await data.json()

  const categories = categoriesResponse.children_data
  console.log(categories);
    // By returning { props: { categories } }, the categories component
    // will receive `categories` as a prop at build time
    return {
      props: {
        categories
      }
    }
  }
