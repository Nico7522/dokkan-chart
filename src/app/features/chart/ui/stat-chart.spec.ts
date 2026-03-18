import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StatChart } from './stat-chart';

describe('StatChart', () => {
  let component: StatChart;
  let fixture: ComponentFixture<StatChart>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatChart],
    }).compileComponents();

    fixture = TestBed.createComponent(StatChart);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
