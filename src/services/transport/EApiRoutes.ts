export enum EApiRoutes {
    PRODUCTS = "/api/catalog/products",
    PRODUCT = "/api/catalog/products/:id",
    COMPANIES_LIST = "/api/catalog/companies",
    CATEGORIES_LIST = "/api/catalog/categories",
    UPLOAD_PRODUCT_IMAGE = "/api/catalog/products/image/:id",

    BASKET = "/api/basket/:id",
    BASKET_PRODUCTS = "/api/basket/products",
    BUY_PRODUCTS = "/api/basket/buy",

    REGISTRATION = "/api/user/registration",
    LOGIN = "/api/user/login",
    USER_INFO = "/api/user",
    USER_PURCHASE_HISTORY = "/api/user/history",
    PURCHASE_HISTORY_ALL = "/api/user/history/all",
    PURCHASE_HISTORY = "/api/user/history/:id",
}
