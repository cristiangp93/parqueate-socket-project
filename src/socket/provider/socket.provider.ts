import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { ParkingSpace } from '../entity/parking.space.entity';
import { City } from '../entity/city.entity';

// Controller Socket Information
const __controllerServerName = 'userControllerServer';
const __controllerClientName = 'controllerUserSocket';
// Citizen Socket Information
const __citizenServerName = 'citizenUserSocketServer';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class SocketProvider
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() socket: Server;

  private logger: Logger = new Logger('ParkingBackEndSocket');

  /**
   *  METHOD USED TO RECEIVE INFORMATION, PROCESS THE ARRIVAL DATA AND RETURN UPDATING DATA
   * **/
  @SubscribeMessage(__controllerServerName)
  controllerUserSocket(client: Socket, parkingSpace: ParkingSpace): void {
    console.log(parkingSpace);
    this.socket.emit(__controllerClientName, parkingSpace);
  }

  /**
   *  METHOD USED TO RECEIVE INFORMATION, PROCESS THE ARRIVAL DATA AND RETURN UPDATING DATA
   * **/
  @SubscribeMessage(__citizenServerName)
  citizenUserSocket(client: Socket, city: City): void {
    console.log(city);
    this.socket.emit('citizenUserSocket', city);
  }

  afterInit(server: Server): any {
    console.log(server);
    this.logger.log('Init');
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client connected: ${client.id}`);
  }
}
