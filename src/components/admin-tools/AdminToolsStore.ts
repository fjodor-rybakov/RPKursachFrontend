import {OptionValue} from "react-selectize";
import * as React from "react";
import {AxiosResponse} from "axios";
import {ICompany} from "../../services/transport/interfaces/catalog/ICompany";
import {observable} from "mobx";
import {autobind} from "core-decorators";
import {ICategory} from "../../services/transport/interfaces/catalog/ICategory";
import {IMessage} from "../../services/transport/interfaces/other/IMessage";
import { Subject } from "rxjs";

@autobind
export class AdminToolsStore {
    @observable productName = "";
    @observable price = "";
    @observable companyId = -1;
    @observable description = "";
    @observable categoryId = -1;
    file?: File;
    productId?: number;
    @observable count = "";
    @observable companyOptions: OptionValue[] = [];
    @observable categoryOptions: OptionValue[] = [];
    readonly getList$ = new Subject<string>();

    onChangeCompany(value: OptionValue): void {
        this.companyId = value.value;
    }

    onChangeCategory(value: OptionValue): void {
        this.categoryId = value.value;
    }

    onChangeDescription(event: React.ChangeEvent<HTMLTextAreaElement>): void {
        this.description = event.target.value;
    }

    onChangePrice(event: React.ChangeEvent<HTMLInputElement>): void {
        this.price = event.target.value;
    }

    onChangeCount(event: React.ChangeEvent<HTMLInputElement>): void {
        this.count = event.target.value;
    }

    onChangeProductName(event: React.ChangeEvent<HTMLInputElement>): void {
        this.productName = event.target.value;
    }

    onSuccessGetCompaniesList(response: AxiosResponse<ICompany[]>): void {
        this.companyOptions = response.data.map(item => {
            return {label: item.companyName, value: item.id}
        });
        this.getList$.next("company");
    }

    onSuccessGetCategoriesList(response: AxiosResponse<ICategory[]>): void {
        this.categoryOptions = response.data.map(item => {
            return {label: item.categoryName, value: item.id}
        });
        this.getList$.next("category");
    }

    onSuccessAddProduct(response: AxiosResponse<IMessage>): void {
        console.log("onSuccessAddProduct", response);
        this.productId = response.data.id;
    }

    setImage(event: React.ChangeEvent<HTMLInputElement>): void {
        const files = event.target.files;
        if (!files) {
            return;
        }
        this.file = files[0];
    }

    onSuccessUploadImage(): void {

    }
}