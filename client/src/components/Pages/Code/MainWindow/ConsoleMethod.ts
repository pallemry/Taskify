export default class ConsoleMethod<T extends Function> implements IConsoleMethod<T> {
    constructor(public readonly method: T) { }

    private afterMethodCall() {
        const wrapper = document.getElementById("console");
        if (wrapper)
            wrapper.scrollTop = wrapper.scrollHeight;
    }

    getFunction(): T {
        //@ts-ignore
        return (...args: any[]) => {
            this.beforeMethodCall();
            this.method(...args);
            this.afterMethodCall();
        };
    }

    execute(...args: any[]) {
        this.getFunction()(...args);
    }

    private beforeMethodCall() {
        // ignore
    }
}
export interface IConsoleMethod<T extends Function> {
    getFunction(): T;
    execute(...args: any[]): void;
}