import { NextApiRequest, NextApiResponse } from "next";


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    // const sendError = () => res.send({ok: false, accessToken: ""})

    // const token = getRefreshToken(req)

    // if (token === null) {
    //     return sendError()
    // }

    // let payload: MyJWTPayload = null!
    // try {
    //     payload = verify(token, process.env.REFRESH_TOKEN_SECRET!) as MyJWTPayload
    // } catch (e) {
    //     console.error(e)
    //     return sendError()
    // }

    // // Token is valid and we can send back an access token
    // const user = await User.findOne({where: {id: payload.userId}})

    // // No user found
    // if (user === null) return sendError()

    // // Token version doesn't match the current version
    // if (user.tokenVersion !== payload.tokenVersion) return sendError()

    // // onSuccess
    // setRefreshToken(res, user) // Set a new refresh token
    // return res.send({ok: true, accessToken: createAccessToken(user)}) // Create a new access token
    return "access token"
}