import {IProduct} from "./IProduct";

export interface IProductListResponse {
    totalCount: number;
    data: IProduct[];
}