import { HttpClient } from "./httpClient";

export class RequestHandler {
    private httpClient: HttpClient;

    constructor() {
        this.httpClient = new HttpClient();
    }

    public async HandleRequest(request: string) {
        let result: any;
        if (request === "current") {
            result = await this.httpClient.getCurrent();
        } else if (request === "five") {
            result = await this.httpClient.get5Day();
        } else {
            result = "Your forecast request is invalid. Choose from: current, 5, 10";
        }
        return result;
    }
}
