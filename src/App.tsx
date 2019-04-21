import React, {Component} from 'react';
import './App.css';
import {Transport} from "./services/transport/Transport";
import {autobind} from "core-decorators";

@autobind
class App extends Component {
    private transport = new Transport();

    public async getProductList() {
        const result = await this.transport.getAllProducts();
        console.log(result)
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
