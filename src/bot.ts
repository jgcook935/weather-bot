import * as discord from "discord.js";
import { token } from "./config";

export class Bot {
    private client: discord.Client;
    private token = token;

    constructor() {
        this.client = new discord.Client();
    }

    public init() {
        this.client.on("ready", () => {
            this.client.user.setStatus("online");
        });

        this.client.login(this.token);
    }
}
