import {observable} from "mobx";
import * as React from "react";
import {autobind} from "core-decorators";

@autobind
export class LoginStore {
    @observable email = "";
    @observable password = "";
    @observable firstName = "";
    @observable lastName = "";
    @observable paymentCard = "";
    @observable isRegistration = true;
    @observable showLoader = false;

    setEmail(event: React.ChangeEvent<HTMLInputElement>): void {
        this.email = event.target.value;
    }

    setPassword(event: React.ChangeEvent<HTMLInputElement>): void {
        this.password = event.target.value;
    }

    setFirstName(event: React.ChangeEvent<HTMLInputElement>): void {
        this.firstName = event.target.value;
    }

    setLastName(event: React.ChangeEvent<HTMLInputElement>): void {
        this.lastName = event.target.value;
    }

    setRegistration() {
        this.isRegistration = true;
    }

    setLogin() {
        this.isRegistration = false;
    }
}