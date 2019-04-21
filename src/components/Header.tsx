import React, {Component} from "react";

class Header extends Component {
    render() {
        return (
            <div className={"header"}>
                <button>Вход</button>
                <button>Регистрация</button>
            </div>
        );
    }
}

export {Header};
