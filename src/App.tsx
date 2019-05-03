import React, {Component} from 'react';
import './App.scss';
import {Transport} from "./services/transport/Transport";
import {autobind} from "core-decorators";
import { BrowserRouter, Route } from "react-router-dom";
import {Login} from "./components/login";
import {Header} from "./components/header";
import {AdminTools} from "./components/admin-tools/AdminTools";
import {Home} from "./components/home";

@autobind
class App extends Component {
    private transport = new Transport();

    render() {
        return (
            <BrowserRouter>
                <div className={"app"}>
                    <Header />
                    <Route exact path="/" component={Home} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/admin" component={AdminTools} />
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
