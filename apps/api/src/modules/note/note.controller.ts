import { Body, Controller, Post } from '@nestjs/common';
import { NoteService } from './note.service';

@Controller('note')
export class NoteController {
  constructor(private readonly noteService: NoteService) {}

  @Post('summarize')
  async summarize(@Body('note') note: string) {
    const summary = await this.noteService.summarizeNote(note);
    return { summary };
  }
} 