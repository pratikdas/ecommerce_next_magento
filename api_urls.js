

const computeURL = (url)=>{

    return `${process.env.MAGENTO_URL}${url}`
}

const API_URLS = {


    "ADMIN_TOKEN" : computeURL("/rest/V1/integration/admin/token"),
    "CATEGORIES" : computeURL("/rest/V1/categories"),
    "PRODUCTS" : computeURL("/rest/V1/categories/:categoryId/products"),
    "PRODUCT_MEDIA" : computeURL("/rest/V1/products/:sku/media"),
    "PRODUCT" : computeURL("/rest/V1/products/:sku"),
    "PLACE_ORDER": computeURL("/rest/V1/custom/order-create")

}

export default API_URLS