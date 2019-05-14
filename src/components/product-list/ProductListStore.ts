import {observable} from "mobx";
import {IProduct} from "../../services/transport/interfaces/catalog/IProduct";
import {AxiosResponse} from "axios";
import {IMessage} from "../../services/transport/interfaces/other/IMessage";
import {IProductListResponse} from "../../services/transport/interfaces/catalog/IProductListResponse";
import {autobind} from "core-decorators";
import * as React from "react";

@autobind
export class ProductListStore {
    @observable products: IProduct[] = [];
    @observable productsCount: Map<number, number> = new Map();
    @observable editableIndex = -1;
    @observable isEditWindowVisible = false;
    @observable isPopupShown = false;

    onSuccessAddProduct(response: AxiosResponse<IMessage>): void {
        console.log("onSuccessAddProduct", response);
    }

    onSuccessDelete(response: AxiosResponse<IMessage>): void {
        console.log("onSuccessDelete", response);
    }

    onSuccessGetProductList(result: AxiosResponse<IProductListResponse>): void {
        this.products = result.data.data;
        this.products.map((item, index) => {
            this.productsCount.set(index, 1);
        })
    }

    onChangeCount(event: React.ChangeEvent<HTMLInputElement>, index: number): void {
        this.productsCount.delete(index);
        const count = +event.target.value;
        if (isNaN(count)) {
            return;
        }
        this.productsCount.set(index, count);
    }
}