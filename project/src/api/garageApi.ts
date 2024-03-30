import { Car, EndpointConfiguration, ICallback, OptionsType, PageResponse } from "../types";

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

    getCars(page: number, limit: number, callback: ICallback<PageResponse<Car>>) {
        this.requestPage('GET', 'garage', callback, { "_page": page, "_limit": limit });
    }

    getCar(id: number, callback: ICallback<Car>) {
        this.request('GET', `garage/${id}`, callback, {}, undefined);
    }

    removeCar(id: number, callback: ICallback<Array<Car>>) {
        this.request('DELETE', `garage/${id}`, callback, {}, undefined);
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

    requestPage(method: string, endpoint: string, callback: ICallback<PageResponse<Car>>,
        options = {},) {
        fetch(this.makeUrl(options, endpoint), {
            method: method,
            headers: {
                "Content-Type": "application/json",
            }
        })
            .then(this.errorHandler)
            .then((res) => res.json()
                .then((data) => callback({
                    rows: data,
                    totalCount: + res.headers.get("X-Total-Count")
                })))
            .catch((err) => console.error(err));
    }
}

export default GarageApi;
