import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HumidityCardNotificationComponent } from './humidity-card-notification.component';

describe('HumidityCardNotificationComponent', () => {
  let component: HumidityCardNotificationComponent;
  let fixture: ComponentFixture<HumidityCardNotificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ HumidityCardNotificationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HumidityCardNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
