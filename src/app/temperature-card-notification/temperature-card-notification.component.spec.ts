import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemperatureCardNotificationComponent } from './temperature-card-notification.component';

describe('TemperatureCardNotificationComponent', () => {
  let component: TemperatureCardNotificationComponent;
  let fixture: ComponentFixture<TemperatureCardNotificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ TemperatureCardNotificationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TemperatureCardNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
