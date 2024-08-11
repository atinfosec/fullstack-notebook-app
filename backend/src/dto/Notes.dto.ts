import { IsMongoId, IsNotEmpty } from "class-validator";

export class CreatesNotesDto {
    @IsNotEmpty({message: 'Title is required'})
    title: string

    @IsNotEmpty({message: 'Description is required'})
    short_desc: string

    @IsNotEmpty({message: 'Content is required'})
    content: string
}

export class GetNoteDto {
    @IsMongoId({message: 'Please enter a valid mongo id'})
    @IsNotEmpty({message: 'Title is required'})
    id: string
}


export class UpdateNotesDto {
    @IsNotEmpty({message: 'Title is required'})
    title: string

    @IsNotEmpty({message: 'Description is required'})
    short_desc: string

    @IsNotEmpty({message: 'Content is required'})
    content: string

    slug: string

}