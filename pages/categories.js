import { route } from 'next/dist/server/router'
import Link from 'next/link'
import { useRouter } from 'next/router'
import API_URLS from '../api_urls'


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
            <div className="row align-items-center">
            
             <ul>
                 {
                     categories.map((category)=>(
                         <li key={category.id}>
                         <Link href={{
              pathname: '/categories/[categoryId]/products',
              query: { categoryId: category.id }
            }}>
              <a>{category.name} {category.product_count}</a>
                          </Link>
                         </li>
                     ))
                 }
             </ul>
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
  
    // By returning { props: { categories } }, the categories component
    // will receive `categories` as a prop at build time
    return {
      props: {
        categories
      }
    }
  }