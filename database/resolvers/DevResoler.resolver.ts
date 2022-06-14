import DB from "@database/config/typeorm";
import Image from "@database/models/Image.modell";
import Site from "@database/models/Site.model";
import { GraphQLUpload, Upload,  } from "graphql-upload";
import { Arg, Args, Mutation, Query, Resolver } from "type-graphql";

const DEV_SERVER_ORIGIN = "http://localhost:3000"
const getDevSite = async () => await Site.findOne({
    where: {
        origin: DEV_SERVER_ORIGIN
    }
})

@Resolver()
export default class DevResolver {
    @Mutation(() => String) 
    async resetDB() {
        await DB.synchronize(true)

        return "Database reset"
    }

    @Mutation(() => String) 
    async removeDevSite() {
        const devsite = await getDevSite()

        if (devsite === null) return "No dev site to remove"


        await devsite.logo.remove()
        await devsite.remove()

        return "Dev site removed"
    }

    @Mutation(() => String)
    async createDevSite() {
        if (await getDevSite() !== null) return "Dev site already exists"
        
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
        
        return "Dev site created"
    }

    @Query(() => [Site],)
    async getAllSites() {
        const sites = await Site.find({
            relations: {
                logo: true,
                users: true
            }
        })
        console.log(sites)
        return sites
    }

    @Mutation(() => Boolean) 
    async addImg(@Arg("img", () => GraphQLUpload) upload: Upload ) {
        console.log("image uploaded")
        console.log(upload)

        return true
    }
}