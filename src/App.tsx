import React, {Component} from 'react';
import './App.css';
import {Transport} from "./services/transport/Transport";
import {autobind} from "core-decorators";
import {AppContext} from "./services/transport/AppContext";

@autobind
class App extends Component {
    private transport = new Transport();

    public async getProductList() {
        // const result = await this.transport.getProductList(0, 10);
        /*const result = await this.transport.registration({
            Email: "qwerty123@gmail.ru",
            Password: "qwerty",
            FirstName: "My first name",
            LastName: "My last name",
            PaymentCard: "1234 1234 1234 1234"
        });*/
        const result = await this.transport.addNewProduct({
            ProductName: "New my product",
            Price: 300.5,
            CompanyId: 1,
            Description: "qweqweqweqweqweqweqwe",
            CategoryId: 1
        });

        console.log(result);
    }

    render() {
        return (
            <div className="App">
                <div>
                    <button onClick={this.getProductList}>get product</button>
                </div>
            </div>
        );
    }
}

export default App;
