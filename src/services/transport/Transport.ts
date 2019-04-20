import axios, {AxiosInstance, AxiosRequestConfig} from "axios";
import {Config} from "../config";

export class Transport {
    private readonly client: AxiosInstance;

    constructor() {
        const option: AxiosRequestConfig = {
            baseURL: Config.server.url
        };
        this.client = axios.create(option);
    }
}
