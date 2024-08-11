import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type NotesType = HydratedDocument<Notes>

@Schema({timestamps: true})
export class Notes {
    @Prop({isRequired: true, trim: true})
    title: string

    @Prop({isRequired: true, trim: true, lowercase: true})
    slug: string

    @Prop({isRequired: true, trim: true})
    short_desc: string

    @Prop({isRequired: true, trim: true})
    content: string

    @Prop({default: true})
    isPublished: boolean
}

export const NotesSchema = SchemaFactory.createForClass(Notes)