import { Field, Int, ObjectType, registerEnumType } from "type-graphql"
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, JoinTable, ManyToOne, CreateDateColumn, UpdateDateColumn, ManyToMany } from "typeorm"
import Image from "../Image.model"
import Site from "../Site.model"
import BusinessState from "./BusinessState"
import { OpeningHoursController, OpeningHoursDaySlot } from "./OpeningHours"
import type { OpeningHoursTuple } from "./OpeningHours"
import Address from "./Address"



@ObjectType()
@Entity("businesses")
class Business extends BaseEntity {
    @Field()
    @PrimaryGeneratedColumn("uuid")
    id: string
    
    @Field()
    @Column(() => String)
    name!: string
    
    @Field()
    @Column()
    subCategoryId!: number

    @Field(() => [Number], {defaultValue: []})
    @Column({type: "json", default: JSON.stringify([])},)
    amenityIds!: number[]
    
    @Field(() => Image)
    @ManyToOne(() => Image)
    @JoinTable()
    featuredImage: Image
    
    @Field(() => [Image])
    @ManyToMany(() => Image)
    @JoinTable()
    galleryImages: Image[]

    @Field(() => Address)
    @Column({type: "json"}) 
    address: Address

    @Field(() => [[OpeningHoursDaySlot]])
    @Column({
        type: "json", 
        default: JSON.stringify(OpeningHoursController.createDefaultValues())
    })
    openingHours: OpeningHoursTuple

    @Field(() => BusinessState, {defaultValue: BusinessState.PENDING_APROVAL})
    @Column({
        type: "enum", 
        enum: BusinessState, 
        default: BusinessState.PENDING_APROVAL
    })
    state: BusinessState
    
    @Field(() => Site,)
    @ManyToOne(() => Site, {})
    site!: Site

    // @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    // public created_at: Date;        

    // @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    // public updated_at: Date;
}

export default Business