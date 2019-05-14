import * as React from "react";
import {ProductListStore} from "./ProductListStore";
import {autobind} from "core-decorators";
import {observer} from "mobx-react";
import {Transport} from "../../services/transport/Transport";
import defaultImgPc from "./img/default_img_pc.png";
import "./ProductList.scss";
import {AppContext} from "../../services/transport/AppContext";
import {EditItem} from "../edit-item/EditItem";

@autobind
@observer
export class ProductList extends React.Component {
    private readonly store = new ProductListStore();
    private transport = new Transport();

    componentDidMount(): void {
        this.getProductList();
    }

    private getProductList(): void {
        this.transport.getProductList(0, 10).then(this.store.onSuccessGetProductList);
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
                                        {
                                            AppContext.isAdmin()
                                                ?
                                                <div className={"admin"}>
                                                    <div
                                                        className={"remove-icon"}
                                                        onClick={() => this.onClickRemoveIcon(item.id)}
                                                    />
                                                    <div
                                                        className={"edit-icon"}
                                                        onClick={() => this.onClickEditIcon(index)}
                                                    />
                                                </div>
                                                : void 0
                                        }
                                        <div className={"info"}>
                                            <div className={"description"}>{item.description}</div>
                                            <div className={"info-button"}>i</div>
                                        </div>
                                        <img className={"card_img"} src={item.image || defaultImgPc} alt={"pc_image"}/>
                                        <p className={"name"}>{item.productName}</p>
                                        <p className={"price"}>{item.price}p.</p>
                                        <div
                                            className={"card-button"}
                                            onClick={() => this.addProductToBasket(item.id, index)}
                                        >
                                            добавить в корзину
                                        </div>
                                        <input
                                            className={"count"}
                                            value={this.store.productsCount.get(index) || 0}
                                            onChange={(
                                                event: React.ChangeEvent<HTMLInputElement>
                                            ) => this.store.onChangeCount(event, index)}
                                        />
                                        <span>max: {item.count}</span>
                                    </div>
                                </div>
                            )
                        })
                    }
                    <div className={"clear"}/>
                </div>
                {
                    this.store.isEditWindowVisible
                        ? <EditItem product={this.store.products[this.store.editableIndex]}/>
                        : void 0
                }
            </div>
        )
    }

    private onClickEditIcon(index: number) {
        this.store.editableIndex = index;
        this.store.isEditWindowVisible = true;
    }

    private onClickRemoveIcon(id: number): void {
        this.transport.deleteProduct(id).then(this.store.onSuccessDelete).then(this.getProductList);
    }

    private addProductToBasket(id: number, index: number): void {
        this.transport.addBasketProduct(
            {
                ProductId: id,
                ProductCount: this.store.productsCount.get(index) || 0
            }
        ).then(this.store.onSuccessAddProduct);
    }
}
