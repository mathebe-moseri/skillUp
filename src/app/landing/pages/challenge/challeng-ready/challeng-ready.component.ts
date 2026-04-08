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
  private matchUpdatedSub?: Subscription;
  private monaco: typeof import('monaco-editor') | null = null;
  private editor: import('monaco-editor').editor.IStandaloneCodeEditor | null = null;
  private isUpdatingEditor = false;
  private platformId = inject(PLATFORM_ID);

  constructor(
    private challengeService: ChallengeService,
    private socketService: SocketService
  ) {}

  ngOnInit(): void {
    this.sub = this.challengeService.match$.subscribe(match => {
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

    this.matchUpdatedSub = this.socketService
      .on<WeeklyChallengeMatch>('match_updated')
      .subscribe((match) => {
        this.challengeService.setMatch(match);
      });

    this.timerSub = interval(1000).subscribe(() => {
      if (this.match?.status === 'live') {
        this.elapsedSeconds++;
      }
    });

    const matchId = localStorage.getItem('matchId');
    if (matchId) {
      this.socketService.emit('join_match', { matchId });
    }
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

  selectFile(fileName: string) {
    const matchId = localStorage.getItem('matchId');
    const userId = this.me?.id;
    if (!matchId || !userId) return;

    this.socketService.emit('set_active_file', {
      matchId,
      userId,
      fileName
    });
  }

  updateCode(content: string) {
    const matchId = localStorage.getItem('matchId');
    const userId = this.me?.id;
    const fileName = this.me?.activeFile;

    if (!matchId || !userId || !fileName) return;

    this.socketService.emit('update_code', {
      matchId,
      userId,
      fileName,
      content
    });
  }

  runCode() {
    const matchId = localStorage.getItem('matchId');
    const userId = this.me?.id;
    if (!matchId || !userId) return;

    this.socketService.emit('run_code', {
      matchId,
      userId
    });
  }

  submitCode() {
    const matchId = localStorage.getItem('matchId');
    const userId = this.me?.id;
    if (!matchId || !userId) return;

    this.socketService.emit('submit_code', {
      matchId,
      userId,
      elapsedSeconds: this.elapsedSeconds
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
    this.matchUpdatedSub?.unsubscribe();
    this.editor?.dispose();
  }
}