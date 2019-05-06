import axios, {AxiosInstance, AxiosRequestConfig, AxiosResponse} from "axios";
import {IProduct} from "./interfaces/catalog/IProduct";
import {EApiRoutes} from "./EApiRoutes";
import * as config from "../config/config.json";
import {IRegistrationParams} from "./interfaces/user/IRegistrationParams";
import {ILoginParams} from "./interfaces/user/ILoginParams";
import {IToken} from "./interfaces/user/IToken";
import {IProductParams} from "./interfaces/catalog/IProductParams";
import {AppContext} from "./AppContext";
import {IMessage} from "./interfaces/other/IMessage";
import {BasketProductParams} from "./interfaces/basket/BasketProductParams";
import {ICompany} from "./interfaces/catalog/ICompany";
import {ICategory} from "./interfaces/catalog/ICategory";
import {IUser} from "./interfaces/user/IUser";
import {IPurchaseHistory} from "./interfaces/user/IPurchaseHistory";
import {IProductListResponse} from "./interfaces/catalog/IProductListResponse";

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>

export class Transport {
    private readonly client: AxiosInstance;

    constructor() {
        const option: AxiosRequestConfig = {
            baseURL: config.server.url
        };
        this.client = axios.create(option);
    }

    // user

    public async registration(params: IRegistrationParams): Promise<AxiosResponse<IMessage>> {
        return this.client.post(EApiRoutes.REGISTRATION, params);
    }

    public async login(params: ILoginParams): Promise<AxiosResponse<IToken>> {
        return this.client.post(EApiRoutes.LOGIN, params);
    }

    public async getUserInfo(): Promise<AxiosResponse<IUser>> {
        return this.client.get(EApiRoutes.USER_INFO, Transport.getHeaderToken());
    }

    public async getPurchaseHistory(): Promise<AxiosResponse<Omit<IPurchaseHistory, "ProductId" & "UserId" & "Id">>> {
        return this.client.get(EApiRoutes.USER_PURCHASE_HISTORY, Transport.getHeaderToken());
    }

    public async getAllPurchaseHistory(): Promise<AxiosResponse<IPurchaseHistory[]>> {
        return this.client.get(EApiRoutes.PURCHASE_HISTORY_ALL, Transport.getHeaderToken());
    }

    public async cancelOrder(orderId: number): Promise<AxiosResponse<IMessage>> {
        return this.client.delete(EApiRoutes.PURCHASE_HISTORY.replace(":id", orderId.toString()), Transport.getHeaderToken());
    }

    // catalog

    public async getCompaniesList(): Promise<AxiosResponse<ICompany[]>> {
        return this.client.get(EApiRoutes.COMPANIES_LIST);
    }

    public async getCategoriesList(): Promise<AxiosResponse<ICategory[]>> {
        return this.client.get(EApiRoutes.CATEGORIES_LIST);
    }

    public async getProductList(page: number, limit: number, filter?: string): Promise<AxiosResponse<IProductListResponse>> {
        const options = {params: {page, limit, filter}};
        return this.client.get(EApiRoutes.PRODUCTS, options);
    }

    public async addNewProduct(params: IProductParams): Promise<AxiosResponse<IMessage>> {
        return this.client.post(EApiRoutes.PRODUCTS, params, Transport.getHeaderToken());
    }

    public async updateProduct(params: Partial<IProductParams>, productId: number): Promise<AxiosResponse<IMessage>> {
        return this.client.put(EApiRoutes.PRODUCT.replace(":id", productId.toString()), params, Transport.getHeaderToken());
    }

    public async deleteProduct(productId: number): Promise<AxiosResponse<IMessage>> {
        return this.client.delete(EApiRoutes.PRODUCT.replace(":id", productId.toString()), Transport.getHeaderToken());
    }

    public async uploadProductImage(params: File, productId: number): Promise<AxiosResponse<IMessage>> {
        return this.client.post(EApiRoutes.UPLOAD_PRODUCT_IMAGE.replace(":id", productId.toString()), params, Transport.getHeaderToken());
    }

    // basket

    public async addBasketProduct(params: BasketProductParams): Promise<AxiosResponse<IMessage>> {
        return this.client.post(EApiRoutes.BASKET_PRODUCTS, params, Transport.getHeaderToken());
    }

    public async getBasketProductList(): Promise<AxiosResponse<IProduct[]>> {
        return this.client.get(EApiRoutes.BASKET_PRODUCTS, Transport.getHeaderToken());
    }

    public async deleteBasketProduct(productId: number): Promise<AxiosResponse<IMessage[]>> {
        return this.client.delete(EApiRoutes.BASKET.replace(":id", productId.toString()), Transport.getHeaderToken());
    }

    public async buyBasketProducts(params: BasketProductParams[]): Promise<AxiosResponse<IMessage[]>> {
        return this.client.post(EApiRoutes.BUY_PRODUCTS, params, Transport.getHeaderToken());
    }

    private static getHeaderToken() {
        return {headers: {"Authorization": `Bearer ${AppContext.getToken()}`}};
    }
}
