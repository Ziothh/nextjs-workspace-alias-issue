import { Field, Int, ObjectType, registerEnumType } from "type-graphql"
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, JoinTable, ManyToOne, ManyToMany, CreateDateColumn, UpdateDateColumn } from "typeorm"
import Image from "../Image.model"
import Site from "../Site.model"
import UserRole from "./UserRole"


@ObjectType()
@Entity("users")
class User extends BaseEntity {
    @Field()
    @PrimaryGeneratedColumn("uuid")
    id: string
    
    @Field()
    @Column()
    username!: string
    
    @Field(() => String)
    @Column({unique: true})
    email!: string
    
    @Column()
    password: string
    
    @Field(() => UserRole, {defaultValue: UserRole.ADMIN})
    @Column({type: "enum", enum: UserRole, default: UserRole.ADMIN})
    role: UserRole = UserRole.ADMIN

    @Field(() => [Site])
    @ManyToMany(() => Site, site => site.users)
    @JoinTable()
    sites: Site[]

    /** A version number of the refreshToken. 
     * Used for invalidation 
     * @default 0 
    */
    @Column("int", {default: 0})
    tokenVersion: number // 

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    public created_at: Date;        

    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    public updated_at: Date;
}

export default User