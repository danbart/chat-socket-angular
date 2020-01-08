import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  public socketStatus = false;

  constructor(
    private socket: Socket
  ) {
    this.checkStatus();
   }

  checkStatus() {


    this.socket.on('connect', () => {
      console.log('Conectado al servidor');
      this.socketStatus = true;
    });

    this.socket.on('disconnect', () => {
      console.log('Desconectado del servidor');
      this.socketStatus = false;
    });

  }
  // visual code me pedia cambiar Function por () => void
  emitir( evento: string, payload?: any, callback?: () => void ) {

    console.log('Emitiendo mensaje');
    // emit('EVENTO', payload, callbac?)
    this.socket.emit(evento, payload, callback);
  }

  listen(evento: string ) {
    // regresa un observable de tipo generico por que puede ser cualquier cosa que se emita
    return this.socket.fromEvent( evento );
  }

}
