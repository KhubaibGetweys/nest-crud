import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module.js';
import { ChatController } from './chat.controller.js';
import { ChatGateway } from './chat.gateway.js';
import { ChatService } from './chat.service.js';
import { ChatSocketDocsController } from './chat-socket-docs.controller.js';

// Vercel serverless cannot host persistent Socket.IO connections.
const isVercel = Boolean(process.env.VERCEL);

@Module({
  imports: [AuthModule],
  controllers: [ChatController, ChatSocketDocsController],
  providers: [ChatService, ...(isVercel ? [] : [ChatGateway])],
  exports: [ChatService],
})
export class ChatModule {}
