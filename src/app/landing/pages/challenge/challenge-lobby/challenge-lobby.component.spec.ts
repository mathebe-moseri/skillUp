import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChallengeLobbyComponent } from './challenge-lobby.component';

describe('ChallengeLobbyComponent', () => {
  let component: ChallengeLobbyComponent;
  let fixture: ComponentFixture<ChallengeLobbyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChallengeLobbyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChallengeLobbyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
