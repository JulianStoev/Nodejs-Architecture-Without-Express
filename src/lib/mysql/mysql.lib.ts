import mysql from 'mysql2/promise';
import { MYSQL_DATABASE, MYSQL_HOST, MYSQL_PASS, MYSQL_USER } from '../../config/mysql.config';

let connPool!: mysql.Pool;

export function mysqlInit(): void {
    connPool = mysql.createPool({
        host: MYSQL_HOST,
        user: MYSQL_USER,
        password: MYSQL_PASS,
        database: MYSQL_DATABASE,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0
    });
}

export const mysqlQuery = async (query: string, values?: any): Promise<any> => {
    try {
        const [ rows ] = await connPool.execute(query, values);
        return rows;
    } catch (err) {
        throw new Error(err as string);
    }
}
