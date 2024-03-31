import {
  ICallback, OptionsType, EngineParametres, EngineResponse,
} from '../types';

class EngineApi {
  private baseLink: string;

  private options: OptionsType;

  constructor(baseLink: string, options: OptionsType) {
    this.baseLink = baseLink;
    this.options = options;
  }

  changeEngineStatus(options: EngineParametres, callback: ICallback<EngineResponse>) {
    this.request('PATCH', 'engine', callback, { id: options.id, status: options.status });
  }

  changeCarEngine(options: EngineParametres, callback: ICallback<Response>) {
    fetch(this.makeUrl({
      id: `${options.id}`,
      status: options.status,
    }, 'engine'), {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((data) => callback(data))
      .catch((err) => console.error(err));
  }

  // eslint-disable-next-line class-methods-use-this
  errorHandler(res: Response) {
    if (!res.ok) {
      if (res.status === 401 || res.status === 404) { console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`); }
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

  request(
    method: string,
    endpoint: string,
    callback: ICallback<any>,
    options = {},
  ) {
    fetch(this.makeUrl(options, endpoint), {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(this.errorHandler)
      .then((res) => res.json())
      .then((data) => callback(data))
      .catch((err) => console.error(err));
  }
}

export default EngineApi;
