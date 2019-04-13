import axios, { AxiosResponse } from "axios";
import { apiKey } from "./config";

export class HttpClient {
    private apiKey: string = apiKey;
    private baseUrl: string = "http://dataservice.accuweather.com/";
    private location: string = "329507";

    public async getCurrent() {
        const type: string = "/currentconditions/v1/";
        return await this.get(type, false);
    }

    public async get5Day() {
        const type: string = "forecasts/v1/daily/5day/";
        return await this.get(type, true);
    }

    public async get10Day() {
        const type: string = "forecasts/v1/daily/10day/";
        return await this.get(type, true);
    }

    private async get(type: string, hasMetric: boolean | undefined) {
        const result = await axios.get(
            `${this.baseUrl}${type}${this.location}?apikey=${this.apiKey}&language=en-us&details=true${
                hasMetric ? "&metric=false" : ""
            }`
        );
        return result.data;
    }
}
