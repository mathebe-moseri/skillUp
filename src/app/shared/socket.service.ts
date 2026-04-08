import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket: Socket;

  constructor() {
    this.socket = io('https://server-su-e7aeh0gmfufna0bk.southafricanorth-01.azurewebsites.net');
  }

  emit(eventName: string, payload: unknown): void {
    this.socket.emit(eventName, payload);
  }

  on<T>(eventName: string): Observable<T> {
    return new Observable<T>((observer) => {
      const handler = (data: T) => observer.next(data);

      this.socket.on(eventName, handler);

      return () => {
        this.socket.off(eventName, handler);
      };
    });
  }
}