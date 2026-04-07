import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChallengeSetupComponent } from './challenge-setup.component';

describe('ChallengeSetupComponent', () => {
  let component: ChallengeSetupComponent;
  let fixture: ComponentFixture<ChallengeSetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChallengeSetupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChallengeSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
