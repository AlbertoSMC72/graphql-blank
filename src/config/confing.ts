import { ConnectionOptions } from "mysql2";
import dotenv from "dotenv";
import { createConnection } from "mysql2";
import { Connection } from "mysql2/typings/mysql/lib/Connection";

dotenv.config();

const configConnection: ConnectionOptions = {
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
};

const dbConnection: Connection = createConnection(configConnection);
export const db = dbConnection.promise();
