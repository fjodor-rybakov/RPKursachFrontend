import React, {Component} from "react";
import "./Header.scss";
import {HeaderStore} from "./HeaderStore";
import classnames from "classnames";
import {observer} from "mobx-react";
import {AppContext} from "../../services/transport/AppContext";

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
                    AppContext.isLogin() ? <div className={"header__logout"}/> : void 0
                }
                <div className={"header__basket"}/>
            </div>
        );
    }
}

export {Header};
