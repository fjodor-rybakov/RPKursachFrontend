import axios, {AxiosInstance, AxiosRequestConfig, AxiosResponse} from "axios";
import {IProduct} from "./interfaces/catalog/IProduct";
import {EApiRoutes} from "./EApiRoutes";
import * as config from "../config/config.json";
import {IRegistrationParams} from "./interfaces/user/IRegistrationParams";
import {ILoginParams} from "./interfaces/user/ILoginParams";
import {IResponseLogin} from "./interfaces/user/IResponseLogin";
import {IProductParams} from "./interfaces/catalog/IProductParams";
import {AppContext} from "./AppContext";
import {IMessage} from "./interfaces/other/IMessage";

export class Transport {
    private readonly client: AxiosInstance;

    constructor() {
        const option: AxiosRequestConfig = {
            baseURL: config.server.url
        };
        this.client = axios.create(option);
    }

    public async registration(params: IRegistrationParams): Promise<AxiosResponse<IMessage>> {
        return this.client.post(EApiRoutes.REGISTRATION, params);
    }

    public async login(params: ILoginParams): Promise<AxiosResponse<IResponseLogin>> {
        return this.client.post(EApiRoutes.LOGIN, params);
    }

    public async getProductList(page: number, limit: number): Promise<AxiosResponse<IProduct[]>> {
        const options = {params: {page, limit}};
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

    public async addBasketProduct(productId: number): Promise<AxiosResponse<IMessage>> {
        return this.client.get(EApiRoutes.BASKET.replace(":id", productId.toString()), Transport.getHeaderToken());
    }

    public async getBasketProductList(): Promise<AxiosResponse<IProduct[]>> {
        return this.client.get(EApiRoutes.BASKET_PRODUCTS, Transport.getHeaderToken());
    }

    public async deleteBasketProduct(productId: number): Promise<AxiosResponse<IMessage[]>> {
        return this.client.delete(EApiRoutes.BASKET.replace(":id", productId.toString()), Transport.getHeaderToken());
    }

    private static getHeaderToken() {
        return {headers: {"Authorization": `Bearer ${AppContext.getToken()}`}};
    }
}
