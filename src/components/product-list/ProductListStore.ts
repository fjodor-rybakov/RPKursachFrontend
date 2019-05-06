import {observable} from "mobx";
import {IProduct} from "../../services/transport/interfaces/catalog/IProduct";
import {AxiosResponse} from "axios";
import {IMessage} from "../../services/transport/interfaces/other/IMessage";

export class ProductListStore {
    @observable products: IProduct[] = [];

    onSuccessAddProduct(response: AxiosResponse<IMessage>): void {
        console.log("onSuccessAddProduct", response);
    }
}