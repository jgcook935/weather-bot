export class CommandProcessor {
    public static isValid(message: string): boolean {
        return message.substr(0, 1) === "!";
    }

    public static split(message: string): string[] {
        return message.substr(1).split(" ");
    }
}
