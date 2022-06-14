import "reflect-metadata";
import { IncomingMessage, ServerResponse } from "http";
import { PageConfig } from "next";
import APOLLO_SERVER from "@workspace/backend/config/apollo";
import DB from "@workspace/backend/config/typeorm";
import { isDev } from "@workspace/shared/constants/env";

export const config: PageConfig = {
    api: {
        bodyParser: false,
    }
}

const START_PROMISE = Promise.all([
    DB.initialize(),
    APOLLO_SERVER.start(),
])

await START_PROMISE
// TODO: remove this
await DB.dropDatabase()
await DB.synchronize()

export default async function handler(
    req: IncomingMessage,
    res: ServerResponse
) {
    res.setHeader("Access-Control-Allow-Credentials", "true");
    if (isDev) res.setHeader(
        "Access-Control-Allow-Origin",
        "https://studio.apollographql.com"
    );
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Methods, Access-Control-Allow-Origin, Access-Control-Allow-Credentials, Access-Control-Allow-Headers, authorization"
    );
    // res.setHeader(
        //     "Access-Control-Allow-Methods",
        //     "POST, GET, PUT, PATCH, DELETE, OPTIONS, HEAD"
        // );
    if (req.method === "OPTIONS") {
        res.end();
        return false;
    }
        
    
    await START_PROMISE;
    await APOLLO_SERVER.createHandler({
        path: "/api/graphql",
    })(req, res);
}
