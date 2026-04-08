import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket: Socket;

  constructor() {
    this.socket = io('https://server-su-e7aeh0gmfufna0bk.southafricanorth-01.azurewebsites.net', {
      transports: ['polling', 'websocket'],
      upgrade: true,
      withCredentials: false,
      timeout: 20000,
      reconnection: true,
      reconnectionAttempts: 20,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      autoConnect: true
    });

    this.socket.on('connect', () => {
      console.log('[socket] connected:', this.socket.id);
    });

    this.socket.on('connect_error', (err: Error) => {
      console.error('[socket] connect_error:', err.message, err);
    });

    this.socket.on('disconnect', (reason: string) => {
      console.warn('[socket] disconnected:', reason);
    });

    this.socket.io.on('reconnect_attempt', (attempt: number) => {
      console.log('[socket] reconnect_attempt:', attempt);
    });

    this.socket.io.on('reconnect', (attempt: number) => {
      console.log('[socket] reconnected after:', attempt);
    });
  }

  emit(eventName: string, payload: unknown): void {
    this.socket.emit(eventName, payload);
  }

  on<T>(eventName: string): Observable<T> {
    return new Observable<T>((observer) => {
      const handler = (data: T) => observer.next(data);
      this.socket.on(eventName, handler);

      return () => this.socket.off(eventName, handler);
    });
  }

  connect(): void {
    if (!this.socket.connected) {
      this.socket.connect();
    }
  }

  disconnect(): void {
    this.socket.disconnect();
  }
}