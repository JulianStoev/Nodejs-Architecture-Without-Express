import { Req, Res } from "../../interfaces/node.iterface";
import { RouterType } from "../../interfaces/router.interface";
import { sendJSON } from "../api/res.util";

export function buildRouter(router: RouterType, parsedUrl: string, req: Req, res: Res) {
    if (req.method === undefined) {
        sendJSON(res, 404, "Request method not defined");
        return;
    }

    try {
        router[parsedUrl][req.method](req, res);
    } catch (error: any) {
        sendJSON(res, 404, {
            message: error
        });
    }
}
