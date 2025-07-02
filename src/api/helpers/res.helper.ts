import { ServerResponse } from "http";

export function sendJSON(res: ServerResponse, statusCode: number, data: any) {
  res.statusCode = statusCode;
  res.end(JSON.stringify(data));
}