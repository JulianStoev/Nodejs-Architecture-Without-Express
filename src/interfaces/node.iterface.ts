import http from 'http';
import url from 'url';

export type ParsedsUrl = url.UrlWithParsedQuery;
export type Req = http.IncomingMessage;
export type Res = http.ServerResponse<http.IncomingMessage> & {req: http.IncomingMessage;};