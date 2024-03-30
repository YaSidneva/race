import { Car, EndpointConfiguration, GetWinnersOptions, Winner, ICallback, OptionsType, TableResponse } from "../types";

class WinnersApi {
    private baseLink: string;
    private options: OptionsType;

    constructor(baseLink: string, options: OptionsType) {
        this.baseLink = baseLink;
        this.options = options;
    }

    getWinners(options: GetWinnersOptions, callback: ICallback<TableResponse<Winner>>) {
        this.requestTable('GET', 'winners', callback, { "_page": options.page, "_limit": options.limit, "_sort": options.sort, "_order": options.order });
    }

    errorHandler(res: Response) {
        if (!res.ok) {
            if (res.status === 401 || res.status === 404)
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            throw Error(res.statusText);
        }

        return res;
    }

    makeUrl(options: OptionsType, endpoint: string) {
        const urlOptions = { ...this.options, ...options };
        let url = `${this.baseLink}${endpoint}?`;

        Object.keys(urlOptions).forEach((key) => {
            url += `${key}=${urlOptions[key]}&`;
        });

        return url.slice(0, -1);
    }

    request(method: string, endpoint: string, callback: ICallback<any>,
        options = {}, body?: Winner) {
        fetch(this.makeUrl(options, endpoint), {
            method: method,
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json",
            }
        })
            .then(this.errorHandler)
            .then((res) => {
                const headerValue = res.headers.get("X-Total-Count");
                console.log('Значение заголовка:', headerValue);
                return res;
            })
            .then((res) => res.json())
            .then((data) => callback(data))
            .catch((err) => console.error(err));
    }

    requestTable(method: string, endpoint: string, callback: ICallback<TableResponse<Winner>>,
        options = {},) {
        fetch(this.makeUrl(options, endpoint), {
            method: method,
            headers: {
                "Content-Type": "application/json",
            }
        })
            .then(this.errorHandler)
            .then((res) => {
                const headerValue = res.headers.get("X-Total-Count");
                console.log('Значение заголовка:', headerValue);
                return res;
            })
            .then((res) => res.json()
                .then((data) => callback({
                    rows: data,
                    totalCount: + res.headers.get("X-Total-Count")
                })))
            .catch((err) => console.error(err));
    }
}

export default WinnersApi;
