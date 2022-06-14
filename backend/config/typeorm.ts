import { DataSource } from "typeorm"
import { isDev } from "@workspace/shared/constants/env"
import { DB_MODELS } from "@workspace/database/config"

// Config
/** `TypeORM DataSource` class instance.
 * Manages the database.
 */
const DB = new DataSource({
    type: "mysql",
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: isDev,
    logging: false,
    // entities: ["../models/**/*.ts"],
    entities: DB_MODELS,
    migrations: [],
    subscribers: [],
})

export default DB