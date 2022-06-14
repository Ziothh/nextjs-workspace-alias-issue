import { isDev } from "@workspace/shared/constants";
import Image from "@models/Image.model";
import Site from "@models/Site.model";
import { Mutation, Query, Resolver } from "type-graphql";

@Resolver(() => Site)
export default class SiteResolver {
    @Mutation(() => String)
    async createDevSite() {
        if (!isDev) return false

        const DEV_SERVER_ORIGIN = "http://localhost:3000"

        if (await Site.findOne({
            where: {
                origin: DEV_SERVER_ORIGIN
            }
        }) === null) {
            const dummyImg = Image.create({
                filename: "dummy-img.png"
            })

            await dummyImg.save()

            const site = Site.create({
                township: "Wortegem-Petegem",
                origin: DEV_SERVER_ORIGIN,
                logo: dummyImg
            })

            await site.save()

            console.log("Created a dev site: ", site)
        }
        return true
    }

    @Query(() => [Site])
    async getAllSites() {
        return Site.find()
    }
}