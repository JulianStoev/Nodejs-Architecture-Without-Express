export type fetchMethod = 'POST' | 'PUT' | 'GET' | 'PATCH' | 'HEAD' | 'OPTIONS' | 'DELETE';

type Only<T, U> = {
    [P in keyof T]: T[P];
} & {
    [P in keyof U]?: never;
};

type Either<T, U> = Only<T, U> | Only<U, T>;

interface BaseFetchInterface {
    urlencoded?: boolean; // used for file uploads and formData, defaults to json
    data?: { [name: string]: any }; // data object to be send to the backend
    errors?: boolean; // pass true if you want to consume the fetch errors where you are calling it
}


export interface FetchWithUri extends BaseFetchInterface {
    uri: string;
}

export interface FetchWithUrl extends BaseFetchInterface {
    url: string;
}

export type FetchInterface = Either<FetchWithUri, FetchWithUrl>;

export interface ajaxErrorResponse<bodyType> {
    status: number;
    statusText: string;
    body: bodyType;
}