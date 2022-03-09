

const computeURL = (url)=>{

    return `${process.env.MAGENTO_URL}${url}`
}

const API_URLS = {


    "ADMIN_TOKEN" : computeURL("/rest/V1/integration/admin/token"),
    "CATEGORIES" : computeURL("/rest/V1/categories"),
    "PRODUCTS" : computeURL("/rest/V1/products"),
    "PRODUCT_MEDIA" : computeURL("/rest/V1/products/:sku/media"),
    "PRODUCT" : computeURL("/rest/V1/products/:sku"),
    "PLACE_ORDER": computeURL("/rest/V1/custom/order-creation"),
    "ORDER_LISTING": computeURL("/rest/V1/orders"),
    "BUSINESS_REGISTRATION": computeURL("/rest/V1/businessregistration"),
    "CUSTOMER_DETAILS": computeURL("/rest/V1/customers/search"),
    "REGISTER_CUSTOMER": computeURL("/rest/V1/customers")


}

export default API_URLS
