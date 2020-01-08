import { Injectable } from '@angular/core';
import { WebsocketService } from './websocket.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(
    public wsService: WebsocketService
  ) { }

  sendMessage( mensaje: string ) {
    const payload = {
      de: 'Danilo',
      cuerpo: mensaje
    };

    this.wsService.emitir('mensaje', payload );

  }

  getMessages() {
    // enviamos el observable donde lo necesitemos
    return this.wsService.listen('mensaje-nuevo');
  }
}
