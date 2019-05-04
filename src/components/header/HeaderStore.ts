import {observable} from "mobx";
import {ILink} from "./ILink";
import {AppContext} from "../../services/transport/AppContext";

export class HeaderStore {
    @observable links: ILink[] = [{isActive: true, title: "Главная", id: "1", url: "/"}];

    updateLinks(): void {
        if (AppContext.isLogin()) {
            this.links.push({
                isActive: false,
                title: "Личный кабинет",
                id: "2",
                url: "/admin"
            });
        } else {
            this.links.push({isActive: false, title: "Регистрация/Вход", id: "3", url: "/login"})
        }
        this.links.forEach(item => {
            item.isActive = item.id === AppContext.getSelectedTab();
        })
    }

    onItemClick(id: string) {
        AppContext.setSelectedTab(id);
        window.location.replace(this.getLinkById(id).url);
    }

    private getLinkById(id: string): ILink {
        let res: ILink = {isActive: true, title: "Главная", id: "1", url: "/"};
        this.links.forEach(item => {
            if (item.id === id) {
                res = item;
            }
        });
        return res;
    }
}