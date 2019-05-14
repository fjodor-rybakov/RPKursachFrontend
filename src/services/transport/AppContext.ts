import {isEmpty} from "lodash";

export class AppContext {
    private static readonly tokenName = "AccessToken";
    private static readonly tabName = "Tab";
    private static isAdminName = "isAdmin";

    public static isAdmin(): boolean {
        const res = localStorage.getItem(AppContext.isAdminName);
        return res === "true";
    }

    public static setIsAdmin(value: boolean) {
        localStorage.setItem(AppContext.isAdminName, value.toString());
    }

    public static getToken(): string | null {
        return localStorage.getItem(AppContext.tokenName);
    }

    public static setToken(token: string): void {
        localStorage.setItem(AppContext.tokenName, token);
    }

    public static isLogin(): boolean {
        return !isEmpty(AppContext.getToken());
    }

    public static setSelectedTab(id: string): void {
        localStorage.setItem(AppContext.tabName, id);
    }

    public static getSelectedTab(): string {
        return localStorage.getItem(AppContext.tabName) || "";
    }

    public static removeToken(): void {
        localStorage.removeItem(AppContext.tokenName);
    }
}
