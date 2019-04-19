import * as discord from "discord.js";
import { CommandProcessor } from "./commandProcessor";
import { token } from "./config";
import { MessageBuilder } from "./messageBuilder";
import { RequestHandler } from "./requestHandler";

export class Bot {
    private client: discord.Client;
    private messageBuilder: MessageBuilder;
    private requestHandler: RequestHandler;
    private token = token;

    constructor() {
        this.client = new discord.Client();
        this.messageBuilder = new MessageBuilder();
        this.requestHandler = new RequestHandler();
    }

    public init() {
        this.client.on("ready", () => {
            this.client.user.setStatus("online");
            this.client.user.setActivity("with TypeScript", { type: "PLAYING" });
        });

        this.client.on("message", async message => {
            const text = message.cleanContent;
            if (message.author.id !== this.client.user.id && CommandProcessor.isValid(text)) {
                const splitText = CommandProcessor.split(text);
                const command = splitText[0];
                const args = splitText.slice(1);
                if (command.toLowerCase() === "weather") {
                    const response = await this.requestHandler.HandleRequest(args[0]);
                    let reply: discord.RichEmbed;
                    reply = this.messageBuilder.createCurrentMessage(response);

                    // if (args[0] === "current") {
                    //     reply = this.messageBuilder.createCurrentMessage(response);
                    // } else if (args[0] === "5") {
                    //     reply = this.messageBuilder.createFiveDayMessage(response);
                    // }

                    message.channel.send(reply);
                }
            }
        });

        this.client.login(this.token);
    }
}
