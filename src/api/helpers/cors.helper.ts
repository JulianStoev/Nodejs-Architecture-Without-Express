import { Req, Res } from "../../interfaces/node.iterface";

export function cors(req: Req, res: Res): boolean {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    if (req.method === 'OPTIONS') {
        // preflight request: respond immediately
        res.statusCode = 204; // no Content
        res.end();
        return true; // signal that request is handled here
    }

    return false; // continue normal processing
}