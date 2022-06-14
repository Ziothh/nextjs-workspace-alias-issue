import { Field, InputType, ObjectType } from "type-graphql"

@InputType()
export class AddressInput implements Omit<Address, "lat" | "lng">{
    // TODO: set default city & postal code for site
    @Field()
    street: string
    @Field()
    houseNumber: string
    @Field()
    city: string
    @Field() 
    postalCode: string
}

@ObjectType()
export default class Address {
    @Field()
    street: string
    @Field()
    houseNumber: string
    @Field()
    city: string
    @Field()
    postalCode: string
    @Field()
    lat: number
    @Field()
    lng: number
}