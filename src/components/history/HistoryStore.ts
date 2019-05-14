import {observable} from "mobx";
import {IPurchaseUserHistory} from "../../services/transport/interfaces/user/IPurchaseUserHistory";

export class HistoryStore {
    @observable productList: IPurchaseUserHistory[] = [];
}