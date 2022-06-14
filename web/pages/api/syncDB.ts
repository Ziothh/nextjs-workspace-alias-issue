import { isDev } from "@workspace/shared/constants/env";
import { NextApiRequest, NextApiResponse } from "next";
import DB from "@workspace/backend/config/typeorm";


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
    ) {
    if (!isDev) return "Not allowed"

    if (!DB.isInitialized) await DB.initialize()
    await DB.synchronize()
    res.status(200).send("DB Sync'ed")
}
