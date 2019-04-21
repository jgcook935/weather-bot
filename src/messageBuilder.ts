import * as discord from "discord.js";

export class MessageBuilder {
    public createCurrentMessage(response: any): discord.RichEmbed {
        const data = response[0];
        return new discord.RichEmbed()
            .setTitle("Current Forecast")
            .addField("Visibility", data["WeatherText"])
            .addField("Wind Speed", `${data["Wind"]["Speed"]["Imperial"]["Value"]} MPH`)
            .addField("Temperature", `${data["Temperature"]["Imperial"]["Value"]} F`)
            .addField("Real Feel Temperature", `${data["RealFeelTemperature"]["Imperial"]["Value"]} F`)
            .addField("Wind Chill Temperature", `${data["WindChillTemperature"]["Imperial"]["Value"]} F`);
    }

    public createSingleDay(forecast: discord.RichEmbed, day: any): discord.RichEmbed {
        // take the forecast passed in and add the fields to it
        const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        return forecast
            .setTitle(`${days[new Date(day["Date"].split("T")[0]).getDay()]}`)
            .addField("Description", `${day["Day"]["IconPhrase"]}`)
            .addField("Wind Speed", `${day["Day"]["Wind"]["Speed"]["Value"]} MPH`)
            .addField("Low", `${day["Temperature"]["Minimum"]["Value"]} F`)
            .addField("High", `${day["Temperature"]["Maximum"]["Value"]} F`)
            .addField("Real Feel Low", `${day["RealFeelTemperature"]["Minimum"]["Value"]} F`)
            .addField("Real Feel High", `${day["RealFeelTemperature"]["Maximum"]["Value"]} F`);
    }

    public createFiveDayMessage(response: any) {
        let replies = new Array();
        for (let i = 0; i < response["DailyForecasts"].length; i++) {
            replies.push(this.createSingleDay(new discord.RichEmbed(), response["DailyForecasts"][i]));
        }
        return replies;
    }
}
