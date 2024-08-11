import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { CreatesNotesDto, GetNoteDto, UpdateNotesDto } from 'src/dto/Notes.dto';
import { NotesService } from './notes.service';

@Controller('notes')
export class NotesController {
    constructor(private notesService: NotesService){}

    @Post('/create')
    createNote(@Body() data: CreatesNotesDto) {
        return this.notesService.createNote(data);
    }

    @Get('/get-all')
    getNotes() {
        return this.notesService.getNotes();
    }

    @Delete('/delete/:id')
    deleteNoteById(@Param() data: GetNoteDto) {
        // console.log(id);
        return this.notesService.deleteNoteById(data);
    }

    @Put('/publish/:id')
    toggleUpdate(@Param() data: GetNoteDto) {
        return this.notesService.toggleUpdate(data);
    }

    @Patch('/update/:id')
    updateById(@Body() data: UpdateNotesDto, @Param() param) {
        return this.notesService.updateById(data, param);
    }

    @Get('/get-note-by-id/:id')
    getNote(@Param() data: GetNoteDto) {
        return this.notesService.getNoteById(data);
    }


}
