import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOwnBossDamageForm } from './add-own-boss-damage-form';

describe('AddOwnBossDamageForm', () => {
  let component: AddOwnBossDamageForm;
  let fixture: ComponentFixture<AddOwnBossDamageForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddOwnBossDamageForm],
    }).compileComponents();

    fixture = TestBed.createComponent(AddOwnBossDamageForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
