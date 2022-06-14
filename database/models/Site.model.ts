import { Field, Int, ObjectType, registerEnumType } from "type-graphql"
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, JoinTable, ManyToOne, ManyToMany, CreateDateColumn, UpdateDateColumn } from "typeorm"
import Image from "./Image.model"
import User from "./user/User.model"



// export interface SiteColors {
//     navbar: string
//     primaryLight: string
//     primaryDark: string
//     buttonPrimary: string
//     buttonSecondary: string
// }
@ObjectType()
export class SiteColors {
    static DEFAULTS = {
        navbar: "#343a3f",
        primaryDark: "#f2d351",
        primaryLight: "#f7df77",
        buttonPrimary: "#5a656f",
        buttonSecondary: "#ebeced",
    }

    // @Field({defaultValue: SiteColors.DEFAULTS.navbar})
    @Field()
    navbar: string = SiteColors.DEFAULTS.navbar

    // @Field({defaultValue: SiteColors.DEFAULTS.primaryLight})
    @Field()
    primaryLight: string = SiteColors.DEFAULTS.primaryLight

    // @Field({defaultValue: SiteColors.DEFAULTS.primaryDark})
    @Field()
    primaryDark: string = SiteColors.DEFAULTS.primaryDark

    // @Field({defaultValue: SiteColors.DEFAULTS.buttonPrimary})
    @Field()
    buttonPrimary: string = SiteColors.DEFAULTS.buttonPrimary

    // @Field({defaultValue: SiteColors.DEFAULTS.buttonSecondary})
    @Field()
    buttonSecondary: string = SiteColors.DEFAULTS.buttonSecondary
}

export enum DefaultView {
    MAP,
    GRID_DRAWER,
}
registerEnumType(DefaultView, {
    name: "DefaultView",
    description: "The default view of the landing page."
})
export enum BusinessSortingOrder {
    RANDOM,
    ALPHABETICAL,
    NEWEST,
    OLDEST,
}
registerEnumType(BusinessSortingOrder, {
    name: "BusinessSorting",
    description: "The way the businesses are sorted.",
})

@ObjectType()
export class SiteSettings {
    // @Field(() => DefaultView, {defaultValue: DefaultView.MAP})
    @Field(() => DefaultView,)
    defaultView: DefaultView = DefaultView.MAP

    // @Field(() => BusinessSortingOrder, {defaultValue: BusinessSortingOrder.RANDOM})
    @Field(() => BusinessSortingOrder,)
    businessSortingOrder: BusinessSortingOrder = BusinessSortingOrder.RANDOM
}

@ObjectType()
@Entity("sites")
class Site extends BaseEntity {
    @Field()
    @PrimaryGeneratedColumn("uuid")
    id: string
    
    @Field()
    @Column({unique: true})
    township!: string
    
    @Field()
    @Column({unique: true, nullable: false})
    origin!: string
    
    @Field(() => Image)
    @ManyToOne(() => Image,)
    logo: Image

    @Field(() => SiteColors)
    @Column({ type: "json", default: JSON.stringify(SiteColors.DEFAULTS)})
    colors: SiteColors

    @Field(() => SiteSettings)
    @Column({ type: "json", default: JSON.stringify(new SiteSettings()) })
    settings: SiteSettings

    @Field(() => [User], {defaultValue: []})
    @ManyToMany(() => User, user => user.sites, {nullable: false})
    users: User[]


    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    public created_at: Date;        

    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    public updated_at: Date;
}

export default Site