import { Req, Res } from '../../interfaces/node.iterface';
import { RouterType } from '../../interfaces/router.interface';
import { sendJSON } from '../../utils/api/res.util';
import { buildRouter } from '../helpers/router.helper';

const router: RouterType = {
    '/healthCheck': {
        'GET': getHealthCheck
    },
};

export default function HealthCheck(parsedUrl: string, req: Req, res: Res): void {
    buildRouter(router, parsedUrl, req, res);
}

async function getHealthCheck(_req: Req, res: Res): Promise<void> {
    try {
        sendJSON(res, 200, {
            uptime: process.uptime(),
            timestamp: new Date()
        });
    } catch (error) {
        sendJSON(res, 503, {
            message: error
        });
    }
}