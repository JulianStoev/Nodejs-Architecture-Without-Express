import { mysqlInit } from "../lib/mysql/mysql.lib";

export default function DbStartup(): void {

    mysqlInit();

}