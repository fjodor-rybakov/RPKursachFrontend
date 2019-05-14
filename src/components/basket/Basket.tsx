import {AppContext} from "../../services/transport/AppContext";
import React from "react";
import {Transport} from "../../services/transport/Transport";
import {BasketStore} from "./BasketStore";
import {autobind} from "core-decorators";
import {observer} from "mobx-react";
import uuid4 from "uuid/v4";
import "./Basket.scss";
import {isUndefined} from "lodash";

@autobind
@observer
export class Basket extends React.Component {
    private transport = new Transport();
    private store = new BasketStore();

    componentWillMount(): void {
        AppContext.setSelectedTab("");
    }

    componentDidMount(): void {
        this.getList();
    }

    private getList(): void {
        this.transport.getBasketProductList().then(this.store.onSuccessGetList)
    }

    render(): React.ReactNode {
        return (
            <div className={"basket"}>
                <div className={"basket__line b-header"}>
                    <div className={"basket__line-item photo"}> </div>
                    <div className={"basket__line-item name"}>Товар</div>
                    <div className={"basket__line-item count"}>Количество</div>
                    <div className={"basket__line-item price"}>Цена</div>
                </div>
                {
                    this.store.products.map((item) => {
                        return (
                            <div key={uuid4()} className={"basket__line"}>
                                <div className={"remove-button"} onClick={() => this.onClickRemoveIcon(item.productId)}/>
                                <div className={"basket__line-item photo"}>
                                    <img className={"img"} src={item.image}/>
                                </div>
                                <div className={"basket__line-item name"}>{item.productName}</div>
                                <div className={"basket__line-item count"}>{item.productCount}</div>
                                <div className={"basket__line-item price"}>{item.price}</div>
                            </div>
                        )
                    })
                }
                <div className={"basket__price"}>
                    {this.store.getFormattedPrice()}₽
                    <div className={"basket__button"} onClick={this.onSubmit}>Купить</div>
                </div>
                <div className={"clear"}/>
            </div>
        )
    }

    private onSubmit(): void {
        const res = this.store.products.map(item => {return {ProductId: item.productId!, ProductCount: item.productCount!}})
        this.transport.buyBasketProducts(res).then(this.store.onSuccess).then(this.getList)
    }

    private onClickRemoveIcon(id?: number): void {
        if (isUndefined(id)) {
            return
        }
        this.transport.deleteBasketProduct(id).then(this.getList);
    }
}