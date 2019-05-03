import {observable} from "mobx";
import {IProduct} from "../../services/transport/interfaces/catalog/IProduct";

export class ProductListStore {
    @observable products: IProduct[] = [];
}