import API_URLS from '../../api_urls'

export default function handler(req, res) {
    if (req.method !== 'POST') {
        res.status(405).send({ message: 'Only POST requests allowed' })
        return
    }
    const body = req.body
    const context = {"value" : body}
    const place_order_request = getServerSideProps(context);
    res.status(200).json({status:"success"})
  }

export async function getServerSideProps(context) {
      const placeOrderUrl =API_URLS.BUSINESS_REGISTRATION
      const resp = await fetch(placeOrderUrl, {
                    method: "POST",
                    headers: {
                       "Authorization": `Bearer ${process.env.ADMIN_TOKEN}`,
                       "Content-Type": "application/json"
                     },
                     body: JSON.stringify(context)
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
