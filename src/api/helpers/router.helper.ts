import { ParsedsUrl, Req, Res } from "../../interfaces/node.iterface";
import { RouterType } from "../../interfaces/router.interface";
import { sendJSON } from "./res.helper";

export function buildRouter(router: RouterType, parsedUrl: ParsedsUrl, req: Req, res: Res) {
    if (parsedUrl.path === null || req.method === undefined) {
        sendJSON(res, 404, "Path or method not defined");
        return;
    }

    try {
        router[parsedUrl.path][req.method](req, res);
    } catch (error: any) {
        sendJSON(res, 404, {
            message: error
        });
    }
}
