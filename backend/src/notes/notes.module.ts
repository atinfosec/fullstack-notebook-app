import { Module } from '@nestjs/common';
import { NotesController } from './notes.controller';
import { NotesService } from './notes.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Notes, NotesSchema } from 'src/models/Notes.model';

@Module({
  imports: [MongooseModule.forFeature([
    {
      name: Notes.name,
      schema: NotesSchema

    }
  ])],
  controllers: [NotesController],
  providers: [NotesService]
})
export class NotesModule {}
