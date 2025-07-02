import url from 'url';
import HealthCheck from '../api/routes/healthCheck.route';
import { Req, Res } from '../interfaces/node.iterface';
import { RoutesInterface } from '../interfaces/router.interface';

const routes: RoutesInterface = {
    'healthCheck': HealthCheck
};

export default function Routes(req: Req, res: Res): void {
    if (req.url === undefined || req.method !== 'GET') {
        res.statusCode = 401;
        res.end();
        return;
    }

    res.setHeader('Content-Type', 'application/json');

    let route = '';

    const parsedUrl = url.parse(req.url, true);
    if (parsedUrl.path) {
        route = parsedUrl.path.split('/')[1];
    }

    if (typeof routes[route] == 'function') {
        routes[route](parsedUrl, req, res);
    } else {
        res.statusCode = 404;
        res.end();
    }

}