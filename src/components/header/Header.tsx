import React, {Component} from "react";
import "./Header.scss";
import {HeaderStore} from "./HeaderStore";
import classnames from "classnames";
import {observer} from "mobx-react";
import {AppContext} from "../../services/transport/AppContext";
import {autobind} from "core-decorators";

@autobind
@observer
class Header extends Component {
    private readonly store = new HeaderStore();

    componentDidMount(): void {
        this.store.updateLinks();
    }

    render() {
        return (
            <div className={"header"}>
                <div className={"header__logo"}/>
                <div className={"header__tabs"}>
                    {
                        this.store.links.map((item, index) => {
                            return (
                                <div
                                    className={classnames({
                                        "header__link": true,
                                        "active": item.isActive
                                    })}
                                    key={index}
                                    onClick={() => this.store.onItemClick(item.id)}
                                >
                                    {item.title}
                                </div>
                            )
                        })
                    }
                </div>
                {
                    AppContext.isLogin() ? <div className={"header__logout"} onClick={Header.logout}/> : void 0
                }
                <div className={"header__basket"} onClick={Header.redirectToBasket}/>
            </div>
        );
    }

    private static logout(): void {
        AppContext.removeToken();
        window.location.replace("/");
        AppContext.setSelectedTab("1");
    }

    private static redirectToBasket(): void {
        window.location.replace("/basket");
    }
}

export {Header};
