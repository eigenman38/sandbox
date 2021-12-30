import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlueChildComponent } from './blue-child.component';

describe('BlueChildComponent', () => {
  let component: BlueChildComponent;
  let fixture: ComponentFixture<BlueChildComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlueChildComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlueChildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
