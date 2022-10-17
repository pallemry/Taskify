export default interface IConsoleMessage {
    title?: string;
    message: string;
    type: MessageType;
}

export enum MessageType {
    Error = "error",
    Warning = "warning",
    Info = "info",
    Nomrmal = "normal",
}

var a: IConsoleMessage = {
    type: MessageType.Error,
    message: "An error occurred"
};

a.type.toString()