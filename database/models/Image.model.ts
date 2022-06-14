import { getFileExtension } from "@workspace/shared/helpers/files"
import { Field, ObjectType } from "type-graphql"
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn,  } from "typeorm"

@ObjectType()
@Entity("images")
class Image extends BaseEntity {
    @Field()
    @PrimaryGeneratedColumn("uuid")
    id: string
    
    @Field()
    @Column({unique: true,})
    filename!: string
    
    @Field()
    @Column()
    alt?: string

    @Field(() => String)
    fileExtension() {
        return getFileExtension(this.filename)
    }

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    public created_at: Date;        

    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    public updated_at: Date;
}

export default Image