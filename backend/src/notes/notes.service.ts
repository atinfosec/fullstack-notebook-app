import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatesNotesDto, GetNoteDto, UpdateNotesDto } from 'src/dto/Notes.dto';
import { Notes } from 'src/models/Notes.model';
import slugify from 'slugify'
@Injectable()
export class NotesService {

    constructor(@InjectModel(Notes.name) private NotesModel: Model<Notes>){}

    async createNote(data: CreatesNotesDto){
        const {content, short_desc, title} = data;
        const slug = slugify(title+" "+ new Date().getTime(), {
            lower: true,
            replacement: '-',
            trim: true
        })
        await this.NotesModel.create({
            slug,
            content,
            short_desc,
            title,
        })
        return {
            msg: "Note created successfully"
        }
    }

    async getNotes() {
        const notes = await this.NotesModel.find();
        return {
            data: notes,
            length: notes.length
        }
    }

    async getNoteById(data: GetNoteDto){
        const note = await this.NotesModel.findById(data.id);
        if(!note) {
            throw new NotFoundException('Note not found')
        }
        return  {
            data: note,
        }
    }

    async deleteNoteById(data: GetNoteDto){
        const note = await this.NotesModel.findByIdAndDelete(data.id);
        if(!note) {
            throw new NotFoundException('Note not found')
        }
        return  {
            data: note,
        }
    }

    async toggleUpdate(data: GetNoteDto) {
        const record = await this.NotesModel.findById(data.id);
        if(!record) {
            throw new NotFoundException('Note not found');
        }

        if(record.isPublished) {
            await this.NotesModel.findByIdAndUpdate(data.id, {
                isPublished: false
            });
            return {
                msg: "Note unpublished"
            }
        } else {
            await this.NotesModel.findByIdAndUpdate(data.id, {
                isPublished: true
            });
            return {
                msg: "Note published"
            }
        }

    }

    async updateById(data: UpdateNotesDto, param: GetNoteDto){
        
        const slug = slugify(data.title+" "+ new Date().getTime(), {
            lower: true,
            replacement: '-',
            trim: true
        });
        data['slug'] = slug;
        
        const note = await this.NotesModel.findByIdAndUpdate(param.id, {
            title: data.title,
            short_desc: data.short_desc,
            content: data.content,
            slug: data.slug
        });


        if(!note) {
            throw new NotFoundException('Note not found');
        }

        return {
            msg: 'Note Updated successfully'
        }
    }
}
