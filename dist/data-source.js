"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
require("dotenv").config();
exports.AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    url: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV === "production" ?
        { rejectUnauthorized: false }
        : false,
    synchronize: false,
    logging: true,
    entities: process.env.NODE_ENV === "production"
        ? ["dist/entities/*.js"]
        : ["src/entities/*.ts"],
    migrations: process.env.NODE_ENV === "production"
        ? ["dist/migrations/*.js"]
        : ["src/migrations/*.ts"],
});
exports.AppDataSource.initialize().then(() => {
    console.log("Data Source Initalized");
}).catch((err) => {
    console.error("Error during Data Source Initialization", err);
});
