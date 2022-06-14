import { SiteUrls } from "../../config/urls";
import { NextMiddleware, NextResponse } from "next/server";

export const middleware: NextMiddleware = (req, ev) => {
    // is logged in?

    // if not: redirect to login
    return NextResponse.redirect(SiteUrls.LOGIN)

    // else
    const url = req.nextUrl

    console.log(url)
    // if url

    return NextResponse.next()
}