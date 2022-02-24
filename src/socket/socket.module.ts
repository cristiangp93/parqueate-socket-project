import { Module } from '@nestjs/common';
import { SocketProvider } from './provider/socket.provider';

@Module({
  providers: [SocketProvider],
})
export class SocketModule {}
