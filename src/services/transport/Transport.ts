import axios, {AxiosInstance, AxiosRequestConfig, AxiosResponse} from "axios";
import {IProduct} from "./interfaces/IProduct";
import {EApiRoutes} from "./EApiRoutes";
import * as config from "../config/config.json";

export class Transport {
    private readonly client: AxiosInstance;

    constructor() {
        const option: AxiosRequestConfig = {
            baseURL: config.server.url
        };
        this.client = axios.create(option);
    }

    public async getAllProducts(): Promise<AxiosResponse<IProduct[]>> {
        return this.client.get(EApiRoutes.GET_PRODUCT_LIST)
    }
}
