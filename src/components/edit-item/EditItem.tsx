import * as React from "react";
import "./EditItem.scss";
import {OptionValue, SimpleSelect} from "react-selectize";
import {AdminToolsStore} from "../admin-tools/AdminToolsStore";
import {Transport} from "../../services/transport/Transport";
import {IEditItemProps} from "./IEditItemProps";
import {autobind} from "core-decorators";
import {observer} from "mobx-react";
import {isUndefined} from "lodash";
import {observable} from "mobx";
import {IMessage} from "../../services/transport/interfaces/other/IMessage";
import {AxiosResponse} from "axios";

@autobind
@observer
export class EditItem extends React.Component<IEditItemProps> {
    private transport = new Transport();
    private readonly store = new AdminToolsStore();
    @observable company = {label: "", value: ""};
    @observable category = {label: "", value: ""};

    componentDidMount(): void {
        this.store.getList$.subscribe(this.onGetList);
        this.transport.getCompaniesList().then(this.store.onSuccessGetCompaniesList);
        this.transport.getCategoriesList().then(this.store.onSuccessGetCategoriesList);
        this.store.count = this.props.product.count && this.props.product.count.toString() || "1";
        this.store.productId = this.props.product.id;
        this.store.description = this.props.product.description;
        this.store.productName = this.props.product.productName;
        this.store.price = this.props.product.price.toString();
    }

    render() {
        return (
            <div className={"edit-container"}>
                <div className={"edit-container__form"}>
                    <div>
                        <input type={"file"} onChange={this.store.setImage} accept=".jpg, .jpeg, .png"/>
                        <input
                            className={"input-field"}
                            placeholder={"Название"}
                            onChange={this.store.onChangeProductName}
                            value={this.store.productName}
                        />
                        <textarea
                            className={"input-field"}
                            placeholder={"Описание"}
                            onChange={this.store.onChangeDescription}
                            value={this.store.description}
                        />
                        <input
                            className={"input-field"}
                            placeholder={"Цена"}
                            onChange={this.store.onChangePrice}
                            value={this.store.price}
                        />
                        <input
                            className={"input-field"}
                            placeholder={"Количество"}
                            onChange={this.store.onChangeCount}
                            value={this.store.count}
                        />
                        <SimpleSelect
                            options={this.store.companyOptions}
                            placeholder="Выберете компанию"
                            theme="material"
                            transitionEnter={true}
                            onValueChange={this.store.onChangeCompany}
                            value={this.company}
                        />
                        <SimpleSelect
                            options={this.store.categoryOptions}
                            placeholder="Выберете категорию"
                            theme="material"
                            transitionEnter={true}
                            onValueChange={this.store.onChangeCategory}
                            value={this.category}
                        />
                        <div className={"button"} onClick={this.updateProduct}>клик</div>
                    </div>
                    <div className={"close"} onClick={this.props.onClose}>x</div>
                </div>
            </div>
        )
    }

    private getValue(arr: OptionValue[], id: number, isCompany: boolean): void {
        arr.map(item => {
            if (item.value !== id) {
                return
            }
            if (isCompany) {
                this.company = item;
            } else {
                this.category = item;
            }
        });
    }

    private onGetList(listName: string): void {
        const isCompanyList = listName === "company";
        const arr = isCompanyList ? this.store.companyOptions : this.store.categoryOptions;
        const name = isCompanyList ? this.props.product.companyName : this.props.product.categoryName;
        this.setIdByName(arr, name, isCompanyList);
    }

    private setIdByName(arr: OptionValue[], name: string, isCompany: boolean): void {
        let id = -1;
        arr.map(item => {
            if (item.label !== name) {
                return
            }
            id = item.value;
            if (isCompany) {
                this.store.companyId = item.value;
            } else {
                this.store.categoryId = item.value;
            }
        });
        this.getValue(arr, id, isCompany)
    }

    private async updateProduct() {
        if (!this.store.productId) {
            return;
        }
        this.transport.updateProduct({
            ProductName: this.store.productName,
            Price: +this.store.price,
            CompanyId: this.store.companyId,
            Description: this.store.description,
            CategoryId: this.store.categoryId,
            Count: +this.store.count
        }, this.store.productId).then(this.uploadFile);
    }

    private uploadFile(): void {
        if (!this.store.file || isUndefined(this.store.productId)) {
            this.props.onUpdate();
            return;
        }
        this.transport.uploadProductImage(this.store.file, this.store.productId).then(this.onSuccessUploadImage);
    }

    private onSuccessUploadImage(): void {
        this.props.onUpdate();
    }
}