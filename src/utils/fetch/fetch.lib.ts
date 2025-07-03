import { ajaxErrorResponse, fetchMethod, FetchInterface } from "./fetch.interface";

async function buildError(err: unknown): Promise<ajaxErrorResponse<object>> {
    const response: ajaxErrorResponse<object> = {
        status: 0,
        statusText: '',
        body: err || {}
    };

    if (err instanceof Response) {
        const body = await err.text();
        try {
            // safely check if valid json
            response.body = JSON.parse(body);
        } catch(err) {
            console.error(err);
        }
        response.status = err.status;
        response.statusText = err.statusText;
    }

    return response;
}

function Fetch(data: FetchInterface, method: fetchMethod): Promise<any> {

    let url = (data.url ? data.url : `/${data.uri}`)

    const toSend = {
        method: method,
        mode: 'cors' as RequestMode,
        headers: new Headers({
            'Content-Type': 'application/json'
        }),
        body: ''
    };

    if (data.urlencoded) {
        toSend.headers.set('Content-Type', 'application/x-www-form-urlencoded');
    }

    if (data.data) {
        if (method === 'GET') {
            if (data.uri) {
                url += '?' + new URLSearchParams(data.data);
            }
        } else {
            toSend.body = JSON.stringify(data.data);
        }
    }

    return new Promise((resolve, reject) => {
        const fetchFn = async (): Promise<any> => {
            try {
                await fetch(url, toSend)
                    .then(response => response.ok ? response.text() : Promise.reject(response))
                    .then(response => {
                        // convert the response to text first to avoid error in case of no response when parsing directly to json
                        const json = (response ? JSON.parse(response) : {});
                        resolve(json);
                        return json;
                    });
            } catch(err) {
                if (data.errors === false) {
                    console.error('[Fetch error]', err);
                } else {
                    reject(buildError(err));
                }
            }
        };
        fetchFn();
    });
}

export const post      = (data: FetchInterface): Promise<any> => Fetch(data, 'POST');
export const put       = (data: FetchInterface): Promise<any> => Fetch(data, 'PUT');
export const get       = (data: FetchInterface): Promise<any> => Fetch(data, 'GET');
export const patch     = (data: FetchInterface): Promise<any> => Fetch(data, 'PATCH');
export const head      = (data: FetchInterface): Promise<any> => Fetch(data, 'HEAD');
export const options   = (data: FetchInterface): Promise<any> => Fetch(data, 'OPTIONS');
export const del       = (data: FetchInterface): Promise<any> => Fetch(data, 'DELETE');