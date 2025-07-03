import HealthCheck from '../api/routes/healthCheck.route';
import { Req, Res } from '../interfaces/node.iterface';
import { RoutesInterface } from '../interfaces/router.interface';

const routes: RoutesInterface = {
    'healthCheck': HealthCheck,
};

export default function Routes(req: Req, res: Res): void {
    if (req.url === undefined || req.method !== 'GET') {
        res.statusCode = 401;
        res.end();
        return;
    }

    // its a restful api, of course we return JSON
    res.setHeader('Content-Type', 'application/json');

    // get the route from the URL to definde the routes
    const routeArr = req.url.split('/');
    const route = routeArr[1];
    routeArr.splice(0,2);

    // call the route if it matches the map or 404
    if (typeof routes[route] == 'function') {
        routes[route](routeArr.join('/'), req, res);
    } else {
        res.statusCode = 404;
        res.end();
    }

}