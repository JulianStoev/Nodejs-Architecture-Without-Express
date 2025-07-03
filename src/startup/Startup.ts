import http from 'http';
import Routes from './Routes';
import { cors } from '../utils/api/cors.util';
import { SERVER_HOST, SERVER_PORT } from '../config/server.config';
import DbStartup from './Db.startup';
import EventsStartup from './Events.startup';

export default function Startup() {

    const server = http.createServer((req, res) => {

        if (cors(req, res)) return; // handled preflight OPTIONS request

        DbStartup();

        EventsStartup();
        
        Routes(req, res);
        
    });

    server.listen(SERVER_PORT, () => {
        console.log(`Server running at http://${SERVER_HOST}:${SERVER_PORT}`);
    });

}