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
      de: this.wsService.getUsuario().nombre,
      cuerpo: mensaje
    };

    this.wsService.emitir('mensaje', payload );

  }

  getMessages() {
    // enviamos el observable donde lo necesitemos
    return this.wsService.listen('mensaje-nuevo');
  }

  // Mensajes privados
  getMessagePrivate() {
    return this.wsService.listen('mensaje-privado');
  }

  // Escuchar a los usuarios activos
  getUsuariosActivos() {
    return this.wsService.listen('usuarios-activos');
  }

  emitirUsuariosActivos() {
    return this.wsService.emitir('obtener-usuarios');
  }
}
