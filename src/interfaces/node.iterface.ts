import http from 'http';

export type Req = http.IncomingMessage;
export type Res = http.ServerResponse<http.IncomingMessage> & {req: http.IncomingMessage;};