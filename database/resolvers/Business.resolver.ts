import { BusinessState, Business } from "@database/models/business";
import { Arg, Field, InputType, Mutation, Query, Resolver } from "type-graphql";

// @InputType()
// class CreateBusinessInput {
//     @Field()
//     name: string

//     @Field()
//     subCategoryId: number

//     @Field(() => [Number], {defaultValue: []})
//     amenityIds: number[]

//     @Field()
//     featuredImage: unknown // todo

//     @Field({defaultValue: []})
//     galleryImages: unknown[] // todo
// }

@Resolver(() => Business)
export default class BusinessResolver {
    @Query(
        () => [Business], 
        {
            description: `This fetches all of the public businesses based on the current site.`
        }
    )
    async getAllBusinesses() {
        return Business.find({
            where: {
                state: BusinessState.PUBLIC
                // site: currentSite
            }
        })
    }

    // @Mutation()
    // async createBusiness(@Arg("data") data: CreateBusinessInput) {
    //     const state = "isLoggedIn" 
    //     ? "data.state" ?? BusinessState.PUBLIC 
    //     : BusinessState.PENDING_APROVAL 

    //     const newBusiness = Business.create({
    //         subCategoryId: 1,
            
    //     })
    // }
}