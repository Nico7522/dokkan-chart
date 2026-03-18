import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatForm } from './stat-form';

describe('StatForm', () => {
  let component: StatForm;
  let fixture: ComponentFixture<StatForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatForm],
    }).compileComponents();

    fixture = TestBed.createComponent(StatForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
