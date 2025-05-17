import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class NoteService {
  private readonly logger = new Logger(NoteService.name);

  async summarizeNote(note: string): Promise<string> {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) throw new Error('Missing OpenAI API key');

    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: 'Bạn là một trợ lý tóm tắt ghi chú.' },
          { role: 'user', content: `Tóm tắt ngắn gọn ghi chú sau: ${note}` },
        ],
        max_tokens: 100,
        temperature: 0.7,
      },
      {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
      }
    );

    // Lấy kết quả tóm tắt từ response
    this.logger.log(response.data.choices[0].message);
    return response.data.choices[0].message.content.trim();
  }
} 