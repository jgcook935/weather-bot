import * as discord from "discord.js";
import { CommandProcessor } from "./commandProcessor";
import { token } from "./config";
import { HttpClient } from "./httpClient";
import { MessageBuilder } from "./messageBuilder";

export class Bot {
    private client: discord.Client;
    private httpClient: HttpClient;
    private messageBuilder: MessageBuilder;
    private token = token;

    constructor() {
        this.client = new discord.Client();
        this.httpClient = new HttpClient();
        this.messageBuilder = new MessageBuilder();
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
                    if (args[0] === "current") {
                        message.channel.send(
                            this.messageBuilder.createCurrentMessage(
                                await this.httpClient.getCurrent()
                            )
                        );
                    } else if (args[0] === "five") {
                        const replies = this.messageBuilder.createFiveDayMessage(
                            await this.httpClient.getFiveDay()
                        );
                        for (const reply of replies) {
                            message.channel.send(reply);
                        }
                    } else {
                        message.channel.send(
                            new discord.RichEmbed().setTitle("Invalid argument. Try current or five next time.")
                        );
                    }
                }
            }
        });

        this.client.login(this.token);
    }
}
