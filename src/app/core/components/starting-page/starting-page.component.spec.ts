import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartingPageComponent } from './starting-page.component';

describe('StartingPageComponent', () => {
  let component: StartingPageComponent;
  let fixture: ComponentFixture<StartingPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StartingPageComponent]
    });
    fixture = TestBed.createComponent(StartingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
