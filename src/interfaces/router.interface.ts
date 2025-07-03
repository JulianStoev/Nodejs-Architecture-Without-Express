import { Req, Res } from "./node.iterface";

export type RouterType = {
    [key: string]: {
        [key: string]: (req: Req, res: Res) => void;
    }
};

export interface RoutesInterface {
    [key: string]: (parsedsUrl: string, req: Req, res: Res) => void;
}