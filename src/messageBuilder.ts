export class MessageBuilder {
    public createMessage(response: any) {
        let data = response[0];
        const temperature = `Temperature: ${data["Temperature"]["Imperial"]["Value"]} F`;
        const realFeel = `Real Feel Temperature: ${data["RealFeelTemperature"]["Imperial"]["Value"]} F`;
        const visibility = `Visibility: ${data["WeatherText"]}`;
        const windSpeed = `Wind Speed: ${data["Wind"]["Speed"]["Imperial"]["Value"]} MPH`;
        const windChill = `Wind Chill Temperature: ${data["WindChillTemperature"]["Imperial"]["Value"]} F`;
        return `${temperature} - ${realFeel} - ${visibility} - ${windSpeed} - ${windChill}`;
    }
}
