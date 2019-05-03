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
            this.links.concat([
                    {isActive: false, title: "Регистрация", id: "3", url: "/"},
                    {isActive: false, title: "Вход", id: "4", url: "/"}
                ]
            )
        }
        this.links.forEach(item => {
            item.isActive = item.id === AppContext.getSelectedTab();
        })
    }

    private onLkClick(url: string, index: number): void {
        this.links.forEach((item, i) => {
            if (index !== i) {
                item.isActive = false;
                return;
            }
            item.isActive = true;
        });
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