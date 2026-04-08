import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
  ViewChild,
  inject
} from '@angular/core';
import { Subscription, interval } from 'rxjs';
import { ChallengeService } from '../challenge.service';
import { WeeklyChallengeMatch } from '../../../../models/challenge.model';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { SocketService } from '../../../../shared/socket.service';

@Component({
  selector: 'app-challeng-ready',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './challeng-ready.component.html',
  styleUrl: './challeng-ready.component.css'
})
export class ChallengReadyComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('editorHost', { static: false }) editorHost?: ElementRef<HTMLDivElement>;

  match: WeeklyChallengeMatch | null = null;
  elapsedSeconds = 0;

  private sub?: Subscription;
  private timerSub?: Subscription;
  private eventsSub?: Subscription;
  private updateCodeSub?: Subscription;
  private runCodeSub?: Subscription;
  private submitCodeSub?: Subscription;
  private activeFileSub?: Subscription;
  private monaco: typeof import('monaco-editor') | null = null;
  private editor: import('monaco-editor').editor.IStandaloneCodeEditor | null = null;
  private isUpdatingEditor = false;
  private platformId = inject(PLATFORM_ID);

  constructor(
    private challengeService: ChallengeService,
    private socketService: SocketService
  ) {}

  ngOnInit(): void {
    this.sub = this.challengeService.match$.subscribe((match) => {
      this.match = match;

      if (this.editor && this.activeFileContent !== this.editor.getValue()) {
        this.isUpdatingEditor = true;
        this.editor.setValue(this.activeFileContent);

        if (this.monaco && this.editor.getModel()) {
          this.monaco.editor.setModelLanguage(
            this.editor.getModel()!,
            this.getLanguageFromFile(this.activeFileName)
          );
        }

        this.isUpdatingEditor = false;
      }
    });

    const matchId = localStorage.getItem('matchId');
    const userId = localStorage.getItem('userId');

    if (matchId) {
      this.eventsSub = this.socketService
        .connectToMatchEvents(matchId)
        .subscribe({
          next: ({ event, data }) => {
            if (event === 'match_updated') {
              this.challengeService.setMatch(data as WeeklyChallengeMatch);
            }

            if (event === 'match_started') {
              this.challengeService.setMatch(data as WeeklyChallengeMatch);
              this.elapsedSeconds = 0;
            }

            if (event === 'match_finished') {
              const payload = data as { reason?: string; match: WeeklyChallengeMatch };
              this.challengeService.setMatch(payload.match);
            }
          },
          error: (error) => {
            console.error('Match events error:', error);
          }
        });
    }

    if (matchId && userId) {
      this.socketService.joinMatch(matchId, userId).subscribe({
        next: ({ match }) => {
          this.challengeService.setMatch(match);
        },
        error: (error) => {
          console.error('Join match failed:', error);
        }
      });
    }

    this.timerSub = interval(1000).subscribe(() => {
      if (this.match?.status === 'live') {
        this.elapsedSeconds++;
      }
    });
  }

  async ngAfterViewInit(): Promise<void> {
    if (!isPlatformBrowser(this.platformId) || !this.editorHost) return;

    const monaco = await import('monaco-editor');
    this.monaco = monaco;

    this.editor = monaco.editor.create(this.editorHost.nativeElement, {
      value: this.activeFileContent,
      language: this.getLanguageFromFile(this.activeFileName),
      theme: 'vs-dark',
      automaticLayout: true,
      minimap: { enabled: false },
      fontSize: 14,
      roundedSelection: true,
      scrollBeyondLastLine: false,
      wordWrap: 'on'
    });

    this.editor.onDidChangeModelContent(() => {
      if (this.isUpdatingEditor) return;
      this.updateCode(this.editor?.getValue() ?? '');
    });
  }

  get currentUserId(): string {
    return localStorage.getItem('userId') ?? '';
  }

  get me() {
    if (!this.match || !this.currentUserId) return null;
    return this.match.players.find(player => player.id === this.currentUserId) ?? null;
  }

  get opponent() {
    if (!this.match || !this.currentUserId) return null;
    return this.match.players.find(player => player.id !== this.currentUserId) ?? null;
  }

  get myFileNames(): string[] {
    return this.me?.files ? Object.keys(this.me.files) : [];
  }

  get activeFileName(): string {
    return this.me?.activeFile ?? '';
  }

  get activeFileContent(): string {
    if (!this.me?.files || !this.me.activeFile) return '';
    return this.me.files[this.me.activeFile] ?? '';
  }

  selectFile(fileName: string): void {
    const matchId = localStorage.getItem('matchId');
    const userId = this.me?.id;
    if (!matchId || !userId) return;

    this.activeFileSub?.unsubscribe();
    this.activeFileSub = this.socketService
      .setActiveFile(matchId, userId, fileName)
      .subscribe({
        error: (error) => {
          console.error('Set active file failed:', error);
        }
      });
  }

  updateCode(content: string): void {
    const matchId = localStorage.getItem('matchId');
    const userId = this.me?.id;
    const fileName = this.me?.activeFile;

    if (!matchId || !userId || !fileName) return;

    this.updateCodeSub?.unsubscribe();
    this.updateCodeSub = this.socketService
      .updateCode(matchId, userId, fileName, content)
      .subscribe({
        next: ({ match }) => {
          this.challengeService.setMatch(match);
        },
        error: (error) => {
          console.error('Update code failed:', error);
        }
      });
  }

  runCode(): void {
    const matchId = localStorage.getItem('matchId');
    const userId = this.me?.id;
    if (!matchId || !userId) return;

    this.runCodeSub?.unsubscribe();
    this.runCodeSub = this.socketService
      .runCode(matchId, userId)
      .subscribe({
        next: ({ match }) => {
          this.challengeService.setMatch(match);
        },
        error: (error) => {
          console.error('Run code failed:', error);
        }
      });
  }

  submitCode(): void {
    const matchId = localStorage.getItem('matchId');
    const userId = this.me?.id;
    if (!matchId || !userId) return;

    this.submitCodeSub?.unsubscribe();
    this.submitCodeSub = this.socketService
      .submitCode(matchId, userId, this.elapsedSeconds)
      .subscribe({
        next: ({ match }) => {
          this.challengeService.setMatch(match);
        },
        error: (error) => {
          console.error('Submit code failed:', error);
        }
      });
  }

  private getLanguageFromFile(fileName: string): string {
    if (fileName.endsWith('.ts')) return 'typescript';
    if (fileName.endsWith('.html')) return 'html';
    if (fileName.endsWith('.css')) return 'css';
    if (fileName.endsWith('.json')) return 'json';
    return 'plaintext';
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
    this.timerSub?.unsubscribe();
    this.eventsSub?.unsubscribe();
    this.updateCodeSub?.unsubscribe();
    this.runCodeSub?.unsubscribe();
    this.submitCodeSub?.unsubscribe();
    this.activeFileSub?.unsubscribe();
    this.editor?.dispose();
  }
}