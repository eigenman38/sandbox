import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RedChildComponent } from './red-child.component';

describe('RedChildComponent', () => {
  let component: RedChildComponent;
  let fixture: ComponentFixture<RedChildComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RedChildComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RedChildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
