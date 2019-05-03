import {OptionValue} from "react-selectize";
import * as React from "react";
import {AxiosResponse} from "axios";
import {ICompany} from "../../services/transport/interfaces/catalog/ICompany";
import {observable} from "mobx";
import {autobind} from "core-decorators";
import {ICategory} from "../../services/transport/interfaces/catalog/ICategory";
import {IMessage} from "../../services/transport/interfaces/other/IMessage";

@autobind
export class AdminToolsStore {
    productName = "";
    price = "";
    companyId = -1;
    description = "";
    categoryId = -1;
    @observable companyOptions: OptionValue[] = [];
    @observable categoryOptions: OptionValue[] = [];

    onChangeCompany(value: OptionValue): void {
        this.companyId = value.value;
    }

    onChangeCategory(value: OptionValue): void {
        this.categoryId = value.value;
    }

    onChangeDescription(event: React.ChangeEvent<HTMLTextAreaElement>): void {
        this.description = event.target.value;
    }

    onChangePrice(event: React.ChangeEvent<HTMLInputElement>): void {
        this.price = event.target.value;
    }

    onChangeProductName(event: React.ChangeEvent<HTMLInputElement>): void {
        this.productName = event.target.value;
    }

    onSuccessGetCompaniesList(response: AxiosResponse<ICompany[]>): void {
        this.companyOptions = response.data.map(item => {return {label: item.companyName, value: item.id}})
    }

    onSuccessGetCategoriesList(response: AxiosResponse<ICategory[]>): void {
        this.categoryOptions = response.data.map(item => {return {label: item.categoryName, value: item.id}})
    }

    onSuccessAddProduct(response: AxiosResponse<IMessage>): void {
        console.log("onSuccessAddProduct", response);
    }
}