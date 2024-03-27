import { Car, EndpointConfiguration, ICallback, OptionsType } from "../../types";

class GarageApi {
    private baseLink: string;
    private options: OptionsType;

    constructor(baseLink: string, options: OptionsType) {
        this.baseLink = baseLink;
        this.options = options;
    }

    createCar(car: Car, callback: ICallback<Car>) {
        this.request('POST', 'garage', callback, undefined, car);
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
        options = {}, body: Car) {
        fetch(this.makeUrl(options, endpoint), {
            method: method,
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json",
            }
        })
            .then(this.errorHandler)
            .then((res) => res.json())
            .then((data) => callback(data))
            .catch((err) => console.error(err));
    }
}

export default GarageApi;
