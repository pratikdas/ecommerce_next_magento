export default function handler(req, res) {
    if (req.method !== 'POST') {
        res.status(405).send({ message: 'Only POST requests allowed' })
        return
    }
    // const body = JSON.parse(req.body)
    const body = req.body
    console.log("body " + body.firstName)
    res.status(200).json({status:"success"})
    
  }