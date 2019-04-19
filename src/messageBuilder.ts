import * as discord from "discord.js";

export class MessageBuilder {
    public createCurrentMessage(response: any): discord.RichEmbed {
        const data = response[0];
        return new discord.RichEmbed()
            .setTitle("Current Forecast")
            .addField("Temperature", `${data["Temperature"]["Imperial"]["Value"]} F`)
            .addField("Real Feel Temperature", `${data["RealFeelTemperature"]["Imperial"]["Value"]} F`)
            .addField("Visibility", data["WeatherText"])
            .addField("Wind Speed", `${data["Wind"]["Speed"]["Imperial"]["Value"]} MPH`)
            .addField("Wind Chill Temperature", `${data["WindChillTemperature"]["Imperial"]["Value"]} F`);
    }

    public createSingleDay(day: any): string {
        const description = `Description: ${day["Day"]["IconPhrase"]}`;

        const low = `Low: ${day["Temperature"]["Minimum"]["Value"]} F`;
        const high = `High: ${day["Temperature"]["Maximum"]["Value"]} F`;

        const realLow = `Real Feel Low: ${day["RealFeelTemperature"]["Minimum"]["Value"]} F`;
        const realHigh = `Real Feel High: ${day["RealFeelTemperature"]["Maximum"]["Value"]} F`;

        return `${description} - ${low} - ${high} - ${realLow} - ${realHigh}`;
    }

    public createFiveDayMessage(response: any) {
        let one = this.createSingleDay(response["DailyForecasts"][0]);
        let two = this.createSingleDay(response["DailyForecasts"][1]);
        let three = this.createSingleDay(response["DailyForecasts"][2]);
        let four = this.createSingleDay(response["DailyForecasts"][3]);
        let five = this.createSingleDay(response["DailyForecasts"][4]);

        return `
                ${one}
                ${two}
                ${three}
                ${four}
                ${five}
                `;
    }
}
