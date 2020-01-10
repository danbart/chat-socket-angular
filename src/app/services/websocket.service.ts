import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Usuario } from '../models/usuario';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  public socketStatus = false;
  public usuario: Usuario = null;

  constructor(
    private socket: Socket,
    private router: Router
  ) {
    this.cargarStorage();
    this.checkStatus();
   }

  checkStatus() {


    this.socket.on('connect', () => {
      console.log('Conectado al servidor');
      this.socketStatus = true;
      this.cargarStorage();
    });

    this.socket.on('disconnect', () => {
      console.log('Desconectado del servidor');
      this.socketStatus = false;
    });

  }
  // visual code me pedia cambiar Function por () => void
  // tslint:disable-next-line:ban-types
  emitir( evento: string, payload?: any, callback?: Function ) {

    console.log('Emitiendo mensaje');
    // emit('EVENTO', payload, callbac?)
    this.socket.emit(evento, payload, callback);
  }

  listen(evento: string ) {
    // regresa un observable de tipo generico por que puede ser cualquier cosa que se emita
    return this.socket.fromEvent( evento );
  }

  loginWS( nombre: string ) {

    return new Promise( (resolve, reject) => {

      this.emitir('configurar-usuario', { nombre }, resp => {
        this.usuario = new Usuario( nombre );
        this.guardarStorage();
        resolve();
      });
    });



    // this.socket.emit('configurar-usuario', { nombre },  (resp) => {
    //     console.log(resp);
    // });
  }

  logoutWS() {
    this.usuario = null;
    localStorage.removeItem('usuario');

    const payload = {
      nombre: 'sin-nombre'
    };

    this.emitir('configurar-usuario', payload, () => {});
    this.router.navigateByUrl('');
  }

  getUsuario() {
    return this.usuario;
  }

  guardarStorage() {
    localStorage.setItem('usuario', JSON.stringify(this.usuario));
  }

  cargarStorage() {

    if ( localStorage.getItem('usuario') ) {
      this.usuario = JSON.parse( localStorage.getItem('usuario'));
      this.loginWS( this.usuario.nombre );
    }

  }

}
