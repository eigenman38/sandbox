import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GreenChildComponent } from './green-child.component';

describe('GreenChildComponent', () => {
  let component: GreenChildComponent;
  let fixture: ComponentFixture<GreenChildComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GreenChildComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GreenChildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
