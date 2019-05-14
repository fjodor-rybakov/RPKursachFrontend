import React from "react";
import {AppContext} from "../../services/transport/AppContext";
import {AdminTools} from "../admin-tools/AdminTools";
import {History} from "../history/History";

export class Dashboard extends React.Component {
    render(): React.ReactNode {
        return (
            <div className={"dashboard"}>
                {
                    AppContext.isAdmin()
                        ? <AdminTools/>
                        : <History/>
                }
            </div>
        )
    }
}