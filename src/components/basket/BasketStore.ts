import {AxiosResponse} from "axios";
import {IProduct} from "../../services/transport/interfaces/catalog/IProduct";
import {observable} from "mobx";
import {autobind} from "core-decorators";

@autobind
export class BasketStore {
    @observable products: IProduct[] = [];
    @observable generalPrice = 0;

    onSuccessGetList(response: AxiosResponse<IProduct[]>): void {
        console.log("onSuccessGetList", response);
        this.products = response.data;
        this.updateGeneralPrice();
    }

    updateGeneralPrice(): void {
        this.generalPrice = 0;
        this.products.forEach(item => this.generalPrice += item.price * (item.productCount || 1))
    }

    onSuccessDelete(): void {

    }

    onSuccess(): void {

    }

    getFormattedPrice(): string {
        const price = this.generalPrice.toString().split("").reverse();
        let formatted = [];
        let k = 0;
        for (let i = 0; i < price.length; i++) {
            if (k === 3) {
                formatted.push(" ");
                k = 1;
            } else {
                k++;
            }
            formatted.push(price[i]);
        }
        return formatted.reverse().join("");
    }
}