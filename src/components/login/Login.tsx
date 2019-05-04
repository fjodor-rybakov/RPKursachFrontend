import React from "react";
import {autobind} from "core-decorators";
import {LoginStore} from "./LoginStore";
import {Transport} from "../../services/transport/Transport";
import {IMessage} from "../../services/transport/interfaces/other/IMessage";
import {AxiosResponse} from "axios";
import {observer} from "mobx-react";
import {IToken} from "../../services/transport/interfaces/user/IToken";
import {AppContext} from "../../services/transport/AppContext";
import classNames from "classnames";
import "./Login.scss";
import {Redirect} from "react-router";

@autobind
@observer
export class Login extends React.Component {
    private readonly store = new LoginStore();
    private readonly transport = new Transport();

    render(): React.ReactNode {
        const text = this.store.isRegistration ? "Зарегетироваться" : "Войти";
        if (AppContext.isLogin()) {
            return <Redirect to={"/"}/>
        }
        return (
            <div className={"login"}>
                <div className={"tabs"}>
                    <div
                        className={classNames({
                            "login__tab": true,
                            active: this.store.isRegistration
                        })}
                        onClick={this.store.setRegistration}
                    >
                        Регистрация
                    </div>
                    <div
                        className={classNames({
                            "login__tab": true,
                            active: !this.store.isRegistration
                        })}
                        onClick={this.store.setLogin}
                    >
                        Вход
                    </div>
                </div>
                {
                    !this.store.showLoader
                        ? (
                            <>
                                <div className={"login__form"}>
                                    {
                                        this.store.isRegistration
                                            ?
                                            <div>
                                                <input
                                                    className={"input-field"}
                                                    onChange={this.store.setFirstName}
                                                    placeholder={"setFirstName"}
                                                />
                                                <input
                                                    className={"input-field"}
                                                    onChange={this.store.setLastName}
                                                    placeholder={"setLastName"}
                                                />
                                            </div>
                                            : void 0
                                    }
                                    <input className={"input-field"} onChange={this.store.setEmail} placeholder={"email"}/>
                                    <input
                                        className={"input-field"}
                                        type={"password"}
                                        onChange={this.store.setPassword}
                                        placeholder={"setPassword"}
                                    />
                                </div>
                                <div className={"button"} onClick={this.onButtonClick}>{text}</div>
                            </>
                        )
                        : (
                            <div className="container">
                                <div className="item-1"></div>
                                <div className="item-2"></div>
                                <div className="item-3"></div>
                                <div className="item-4"></div>
                                <div className="item-5"></div>
                            </div>
                        )

                }
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
        window.location.replace("/");
        console.log(response);
    }

    private onSuccessLogin(response: AxiosResponse<IToken>): void {
        console.log(response);
        this.store.showLoader = true;
        AppContext.setToken(response.data.accessToken);
        window.location.replace("/admin");
    }
}