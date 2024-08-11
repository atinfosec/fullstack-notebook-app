import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { NotesModule } from './notes/notes.module';

@Module({
  imports: [MongooseModule.forRoot("mongodb://localhost/notebook"), NotesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
