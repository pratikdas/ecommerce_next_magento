import API_URLS from '../../api_urls'

export default function handler(req, res) {
    if (req.method !== 'POST') {
        res.status(405).send({ message: 'Only POST requests allowed' })
        return
    }
    const body = req.body
    const context = {"customer" : body}
    context['customer']['addresses'][0]['firstname'] = context['customer']['firstname']
    context['customer']['addresses'][0]['lastname'] =  context['customer']['lastname']
    const place_order_request = getServerSideProps(context, res);
    console.log(place_order_request);
  }

export async function getServerSideProps(context, res) {
      const registerUserUrl = process.env.MAGENTO_URL + API_URLS.REGISTER_CUSTOMER
      console.log(registerUserUrl);
      console.log(JSON.stringify(context));
      const resp = await fetch(registerUserUrl, {
                    method: "POST",
                    headers: {
                       "Authorization": `Bearer ${process.env.ADMIN_TOKEN}`,
                       "Content-Type": "application/json"
                     },
                     body: JSON.stringify(context)
                  }
                 )

      const registerUserDetails = await resp.json()
      console.log("IncrementId "+ JSON.stringify(registerUserDetails))
      if(!registerUserDetails.hasOwnProperty('message')){
        res.status(200).json({status:"success"})
      }else{
        res.status(400).json({status:500,message:registerUserDetails})
      }
  }
