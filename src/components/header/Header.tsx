import React, {Component} from "react";
import "./Header.scss";
import {HeaderStore} from "./HeaderStore";
import classnames from "classnames";
import {observer} from "mobx-react";

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
                <div className={"header__basket"}/>
            </div>
        );
    }
}

export {Header};
