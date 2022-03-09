import API_URLS from '../../api_urls'

export default function handler(req, res) {
    if (req.method !== 'POST') {
        res.status(405).send({ message: 'Only POST requests allowed' })
        return
    }
    const body = req.body
    const place_order_request = getServerSideProps(body);
    res.status(200).json({status:"success"})
  }

export async function getServerSideProps(context) {
      const userlogin = context.email
      const getUrlWith  =  API_URLS.CUSTOMER_DETAILS + "?searchCriteria[filterGroups][0][filters][0][field]=email&searchCriteria[filterGroups][0][filters][0][value]=" + userlogin + "&searchCriteria[filterGroups][0][filters][0][condition_type]=eq"
      const data = await fetch(getUrlWith, {headers: {Authorization: "Bearer " + process.env.ADMIN_TOKEN}})
      const customerAllDetails = await data.json()
      const customerAddress = customerAllDetails.items[0]['addresses'];
      const customerDetails =   {
                                "value": {
                                  "sku": context.sku,
                                  "email": customerAllDetails.items[0]['email'],
                                  "address": customerAddress
                                }
                              }

      console.log(JSON.stringify(customerDetails));
      const placeOrderUrl =API_URLS.PLACE_ORDER
      const resp = await fetch(placeOrderUrl, {
                    method: "POST",
                    headers: {
                       "Authorization": `Bearer ${process.env.ADMIN_TOKEN}`,
                       "Content-Type": "application/json"
                     },
                     body: JSON.stringify(customerDetails)
                  }
                 )

      const placeOrderIncrementId = await resp.json()
      console.log("placeOrderIncrementId "+ JSON.stringify(placeOrderIncrementId))
      return {
        props: {
          placeOrderIncrementId
        }
      }
  }
