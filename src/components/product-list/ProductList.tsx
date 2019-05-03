import * as React from "react";
import {ProductListStore} from "./ProductListStore";
import {autobind} from "core-decorators";
import {observer} from "mobx-react";
import {Transport} from "../../services/transport/Transport";
import {IProduct} from "../../services/transport/interfaces/catalog/IProduct";
import {AxiosResponse} from "axios";
import {IProductListResponse} from "../../services/transport/interfaces/catalog/IProductListResponse";
import "./ProductList.scss";

@autobind
@observer
export class ProductList extends React.Component {
    private readonly store = new ProductListStore();
    private transport = new Transport();

    componentDidMount(): void {
        this.transport.getProductList(0, 10).then(this.onSuccessGetProductList);
    }

    private onSuccessGetProductList(result: AxiosResponse<IProductListResponse>): void {
        this.store.products = result.data.data;
    }

    render(): React.ReactNode {
        return (
            <div className={"product-list"}>
                <div className={"container"}>
                    {
                        this.store.products.map((item, index) => {
                            return (
                                <div className={"product-list__card"} key={index}>
                                    <div className={"card-container"}>
                                        <div className={"info-button"}>i</div>
                                        <img className={"card_img"} src={"http://i.kompiu-pomosch.ru/u/e5/f4eeca8f6d11e5ad3ff5ae86d9d947/-/%D0%9E%D1%81%D0%BD%D0%BE%D0%B2%D0%BD%D1%8B%D0%B5%20%D0%BD%D0%B5%D0%B8%D1%81%D0%BF%D1%80%D0%B0%D0%B2%D0%BD%D0%BE%D1%81%D1%82%D0%B8%20%D0%BA%D0%BE%D0%BC%D0%BF%D1%8C%D1%8E%D1%82%D0%B5%D1%80%D0%B0.jpg"}/>
                                        <p className={"name"}>{item.productName}</p>
                                        <p className={"price"}>{item.price}p.</p>
                                        <div className={"card-button"}>добавить в корзину</div>
                                    </div>
                                </div>
                            )
                        })
                    }
                    <div className={"clear"}/>
                </div>
            </div>
        )
    }
}