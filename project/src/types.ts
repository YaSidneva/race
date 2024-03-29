export type Car = {
    "name": string,
    "color": string,
    "id"?: number
}

export type OptionsType = {
    [key: string]: string;
}

export type EndpointConfiguration = {
    endpoint: string,
    options?: OptionsType;
}

export type ICallback<T> = (data?: T) => void;

export type GetWinners = {
    page: number,
    limit: number,
    sort: ['id' | 'wins' | 'time'],
    order: ['ASC' | 'DESC'];
}

