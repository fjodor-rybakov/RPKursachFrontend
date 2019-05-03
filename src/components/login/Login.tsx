import React from "react";
import {autobind} from "core-decorators";
import {LoginStore} from "./LoginStore";
import {Transport} from "../../services/transport/Transport";
import {IMessage} from "../../services/transport/interfaces/other/IMessage";
import {AxiosResponse} from "axios";
import {observer} from "mobx-react";
import {IToken} from "../../services/transport/interfaces/user/IToken";
import {AppContext} from "../../services/transport/AppContext";

@autobind
@observer
export class Login extends React.Component {
    private readonly store = new LoginStore();
    private readonly transport = new Transport();

    render(): React.ReactNode {
        const text = this.store.isRegistration ? "Зарегетироваться" : "Войти";
        return (
            <div className={"login"}>
                <div onClick={this.store.setRegistration}>Регистрация</div>
                <div onClick={this.store.setLogin}>Вход</div>
                <input onChange={this.store.setEmail} placeholder={"email"}/>
                {
                    this.store.isRegistration
                        ? <div>
                            <input onChange={this.store.setFirstName} placeholder={"setFirstName"}/>
                            <input onChange={this.store.setLastName} placeholder={"setLastName"} />
                        </div>
                        : void 0
                }
                <input onChange={this.store.setPassword} placeholder={"setPassword"}/>
                <button onClick={this.onButtonClick}>{text}</button>
            </div>
        )
    }

    private onButtonClick(): void {
        if (this.store.isRegistration) {
            this.transport.registration({
                Email: this.store.email,
                Password: this.store.password,
                FirstName: this.store.firstName,
                LastName: this.store.lastName,
                PaymentCard: "123456"
            }).then(this.onSuccess);
            return;
        }
        this.transport.login({Email: this.store.email, Password: this.store.password}).then(this.onSuccessLogin)
    }

    private onSuccess(response: AxiosResponse<IMessage>): void {
        console.log(response);
    }
    private onSuccessLogin(response: AxiosResponse<IToken>): void {
        console.log(response);
        AppContext.setToken(response.data.accessToken);
        history.replaceState("", "", "/admin");
    }
}