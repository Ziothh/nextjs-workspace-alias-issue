// import { sign, verify } from "jsonwebtoken";
// import { User } from "../entity/User";
// import type { MiddlewareFn } from "type-graphql";
// import type { MyJWTPayload, MyContext } from "../types/context";
// import type { Request, Response } from "express";

// // Creating tokens (see interface JWTPayload)
// export const createAccessToken = (user: User) => sign(
//     { userId: user.id }, 
//     process.env.ACCESS_TOKEN_SECRET, 
//     {expiresIn: "15m"}
// )
// export const createRefreshToken = (user: User) => sign(
//     { userId: user.id, tokenVersion: user.tokenVersion }, 
//     process.env.REFRESH_TOKEN_SECRET, 
//     {expiresIn: "7d"}
// )

// /** An authentication middleware that checks if the request headers contains 
//  * a valid `JWT token` (the access token) in the `authorization` property.
// */
// export const authMiddleware: MiddlewareFn<MyContext> = ({context}, next) => {
//     const authorization = context.req.headers.authorization

//     if (authorization === undefined)  {
//         throw Error("Not authenticated")
//     }

//     try {
//         const token = authorization.split(" ")[1] // Removes "bearer " from the auth token
//         const payload = verify(token, process.env.ACCESS_TOKEN_SECRET!)
//         context.payload = payload as MyJWTPayload
//     } catch (e) {
//         console.error(e)
//         throw Error("Not authenticated")
//     }

//     return next()
// }

// /** A helper function for response.cookie().\
//  * It will create a new `refresh token` and set it as a httpOnly cookie.
//  * 
//  * Uses the `process.env.REFRESH_TOKEN_NAME` as the cookie name.
//  */
// export const setRefreshToken = (response: Response, user: User) => {
//     response.cookie(
//         process.env.REFRESH_TOKEN_NAME,
//         createRefreshToken(user), 
//         {
//             httpOnly: true, // Make it not accessible by JS
//             path: "/refresh_token" // Make website only send this cookie on /refresh_token
//         }
//     )
// }

// /** A helper function that gets the `refresh token` by the name defined in `process.env.REFRESH_TOKEN_NAME` from the request header. */
// export const getRefreshToken = (req: Request) => req.cookies[process.env.REFRESH_TOKEN_NAME!] || null as string | null