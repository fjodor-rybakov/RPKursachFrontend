import React from "react";
import {autobind} from "core-decorators";
import {Transport} from "../../services/transport/Transport";
import {AxiosResponse} from "axios";
import {Omit} from "react-router";
import {HistoryStore} from "./HistoryStore";
import {observer} from "mobx-react";
import "./History.scss";
import {IPurchaseUserHistory} from "../../services/transport/interfaces/user/IPurchaseUserHistory";

@autobind
@observer
export class History extends React.Component {
    private readonly transport = new Transport();
    private readonly store = new HistoryStore();

    componentDidMount(): void {
        this.transport.getPurchaseHistory().then(this.onSuccessGetHistory)
    }

    render(): React.ReactNode {
        return (
            <div className={"history"}>
                <h3>История покупок</h3>
                <div className={"history__list"}>
                    {
                        this.store.productList.map((item, index) => {
                            return (
                                <div key={index}>
                                    <span>Название: {item.productName} | </span>
                                    <span>Цена: {item.price} | </span>
                                    <span>Количество: {item.productCount} </span>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        )
    }

    private onSuccessGetHistory(response: AxiosResponse<IPurchaseUserHistory[]>): void {
        console.log(response.data);
        this.store.productList = response.data;
    }
}