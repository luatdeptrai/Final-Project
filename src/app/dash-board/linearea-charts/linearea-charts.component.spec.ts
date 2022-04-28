import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LineareaChartsComponent } from './linearea-charts.component';

describe('LineareaChartsComponent', () => {
  let component: LineareaChartsComponent;
  let fixture: ComponentFixture<LineareaChartsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LineareaChartsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LineareaChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
