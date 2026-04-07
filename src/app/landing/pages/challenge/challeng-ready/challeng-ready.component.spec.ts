import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChallengReadyComponent } from './challeng-ready.component';

describe('ChallengReadyComponent', () => {
  let component: ChallengReadyComponent;
  let fixture: ComponentFixture<ChallengReadyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChallengReadyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChallengReadyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
