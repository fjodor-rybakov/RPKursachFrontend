import {AppContext} from "../../services/transport/AppContext";
import React from "react";
import {Transport} from "../../services/transport/Transport";
import {BasketStore} from "./BasketStore";
import {autobind} from "core-decorators";
import {observer} from "mobx-react";
import uuid4 from "uuid/v4";
import "./Basket.scss";

@autobind
@observer
export class Basket extends React.Component {
    private transport = new Transport();
    private store = new BasketStore();

    componentWillMount(): void {
        AppContext.setSelectedTab("");
    }

    componentDidMount(): void {
        this.transport.getBasketProductList().then(this.store.onSuccessGetList)
    }

    render(): React.ReactNode {
        return (
            <div className={"basket"}>
                <div className={"basket__line b-header"}>
                    <div className={"basket__line-item"}>Товар</div>
                    <div className={"basket__line-item price"}>Цена</div>
                </div>
                {
                    this.store.products.map((item) => {
                        return (
                            <div key={uuid4()} className={"basket__line"}>
                                <div className={"basket__line-item"}>{item.productName}</div>
                                <div className={"basket__line-item price"}>{item.price}</div>
                            </div>
                        )
                    })
                }
                <div className={"basket__price"}>{this.store.getFormattedPrice()}₽</div>
            </div>
        )
    }
}