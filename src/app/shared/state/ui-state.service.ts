import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UiStateService {
  private overlayOpenSubject = new BehaviorSubject<boolean>(false);

  overlayOpen$ = this.overlayOpenSubject.asObservable();

  openOverlay(): void {
    this.overlayOpenSubject.next(true);
  }

  closeOverlay(): void {
    this.overlayOpenSubject.next(false);
  }

  setOverlayState(isOpen: boolean): void {
    this.overlayOpenSubject.next(isOpen);
  }
}