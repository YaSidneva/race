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

export type GetWinnersOptions = {
    page: number,
    limit: number,
    sort: 'id' | 'wins' | 'time',
    order: 'ASC' | 'DESC';
}

export type Winner = {
    "id": number,
    "wins": number,
    "time": number
}

export type PageResponse<T> = {
    totalCount: number,
    rows: Array<T>;
}

export type EngineParametres = {
    id: number,
    status: "started" | "stopped"
}

export type EngineResponse = {
    velocity: number,
    distance: number
}
