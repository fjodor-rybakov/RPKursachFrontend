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
                                        <img className={"card_img"} src={item.image}/>
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
