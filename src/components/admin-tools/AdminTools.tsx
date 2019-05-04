import * as React from "react";
import {Transport} from "../../services/transport/Transport";
import {autobind} from "core-decorators";
import {AdminToolsStore} from "./AdminToolsStore";
import {SimpleSelect} from "react-selectize";
import 'react-selectize/themes/index.css';
import "./AdminTools.scss";
import {observer} from "mobx-react";
import {AppContext} from "../../services/transport/AppContext";
import {Redirect} from "react-router";

@observer
@autobind
export class AdminTools extends React.Component {
    private transport = new Transport();
    private readonly store = new AdminToolsStore();

    componentDidMount(): void {
        this.transport.getCompaniesList().then(this.store.onSuccessGetCompaniesList);
        this.transport.getCategoriesList().then(this.store.onSuccessGetCategoriesList);
    }

    render(): React.ReactNode {
        if (!AppContext.isLogin()) {
            return <Redirect to={"/"}/>
        }
        return (
            <div className={"admin-tools"}>
                <h3>Добавить товар</h3>
                <div className={"image"}/>
                <div>
                    <input className={"input-field"} placeholder={"Название"} onChange={this.store.onChangeProductName}/>
                    <textarea className={"input-field"} placeholder={"Описание"} onChange={this.store.onChangeDescription}/>
                    <input className={"input-field"} placeholder={"Цена"} onChange={this.store.onChangePrice}/>
                    <SimpleSelect
                        options={this.store.companyOptions}
                        placeholder="Выберете компанию"
                        theme="material"
                        transitionEnter={true}
                        onValueChange={this.store.onChangeCompany}
                    />
                    <SimpleSelect
                        options={this.store.categoryOptions}
                        placeholder="Выберете категорию"
                        theme="material"
                        transitionEnter={true}
                        onValueChange={this.store.onChangeCategory}
                    />
                    <div className={"button"} onClick={this.addProduct}>клик</div>
                </div>
            </div>
        )
    }

    private async addProduct() {
        this.transport.addNewProduct({
            ProductName: this.store.productName,
            Price: +this.store.price,
            CompanyId: this.store.companyId,
            Description: this.store.description,
            CategoryId: this.store.categoryId,
            Count: 1
        }).then(this.store.onSuccessAddProduct);
    }
}