import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WeeklyChallengeMatch } from '../models/challenge.model';

type MatchEventPayload =
  | WeeklyChallengeMatch
  | { seconds: number; match: WeeklyChallengeMatch }
  | { ok: true; matchId: string };

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private readonly baseUrl =
    'https://server-su-e7aeh0gmfufna0bk.southafricanorth-01.azurewebsites.net';

  constructor(
    private http: HttpClient,
    private zone: NgZone
  ) {}

  createMatch(player1: unknown, player2: unknown, task: unknown) {
    return this.http.post<{ matchId: string; match: WeeklyChallengeMatch }>(
      `${this.baseUrl}/matches/create`,
      { player1, player2, task }
    );
  }

  joinMatch(matchId: string, userId: string) {
    return this.http.post<{ matchId: string; match: WeeklyChallengeMatch }>(
      `${this.baseUrl}/matches/join`,
      { matchId, userId }
    );
  }

  playerReady(matchId: string, userId: string) {
    return this.http.post<{ ok: true; match: WeeklyChallengeMatch }>(
      `${this.baseUrl}/matches/ready`,
      { matchId, userId }
    );
  }

  setActiveFile(matchId: string, userId: string, fileName: string | null) {
    return this.http.post<{ ok: true }>(
      `${this.baseUrl}/matches/active-file`,
      { matchId, userId, fileName }
    );
  }

  updateCode(matchId: string, userId: string, fileName: string, content: string) {
    return this.http.post<{ ok: true; match: WeeklyChallengeMatch }>(
      `${this.baseUrl}/matches/update-code`,
      { matchId, userId, fileName, content }
    );
  }

  runCode(matchId: string, userId: string) {
    return this.http.post<{ ok: true; match: WeeklyChallengeMatch }>(
      `${this.baseUrl}/matches/run-code`,
      { matchId, userId }
    );
  }

  submitCode(matchId: string, userId: string, elapsedSeconds: number) {
    return this.http.post<{ ok: true; match: WeeklyChallengeMatch }>(
      `${this.baseUrl}/matches/submit-code`,
      { matchId, userId, elapsedSeconds }
    );
  }

  connectToMatchEvents(matchId: string): Observable<{
    event: string;
    data: MatchEventPayload;
  }> {
    return new Observable((observer) => {
      const eventSource = new EventSource(`${this.baseUrl}/matches/${matchId}/events`);

      const handle = (eventName: string) => (event: Event) => {
        const messageEvent = event as MessageEvent;

        this.zone.run(() => {
          observer.next({
            event: eventName,
            data: JSON.parse(messageEvent.data) as MatchEventPayload
          });
        });
      };

      const onConnected = handle('connected');
      const onUpdated = handle('match_updated');
      const onStarted = handle('match_started');
      const onFinished = handle('match_finished');
      const onCountdown = handle('countdown_started');

      eventSource.addEventListener('connected', onConnected as EventListener);
      eventSource.addEventListener('match_updated', onUpdated as EventListener);
      eventSource.addEventListener('match_started', onStarted as EventListener);
      eventSource.addEventListener('match_finished', onFinished as EventListener);
      eventSource.addEventListener('countdown_started', onCountdown as EventListener);

      eventSource.onerror = (error) => {
        this.zone.run(() => observer.error(error));
      };

      return () => {
        eventSource.close();
      };
    });
  }
}