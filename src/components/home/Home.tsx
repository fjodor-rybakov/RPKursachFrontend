import * as React from "react";
import "./Home.scss";
import {ProductList} from "../product-list";

export class Home extends React.Component {
    render(): React.ReactNode {
        return (
            <div className={"home"}>
                <div className={"home__image"}>
                    <div className={"text"}>
                        <p className={"text-header"}>какая-то информация текст</p>
                        <p className={"text-description"}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do</p>
                    </div>
                </div>
                <ProductList/>
            </div>
        )
    }
}