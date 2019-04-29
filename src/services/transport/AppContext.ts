export class AppContext {
    private static readonly tokenName = "AccessToken";

    public static getToken(): string | null {
        return localStorage.getItem(AppContext.tokenName);
    }

    public static setToken(token: string): void {
        localStorage.setItem(AppContext.tokenName, token);
    }
}
