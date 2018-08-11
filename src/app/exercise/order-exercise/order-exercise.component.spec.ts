import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderExerciseComponent } from './order-exercise.component';

describe('OrderExerciseComponent', () => {
  let component: OrderExerciseComponent;
  let fixture: ComponentFixture<OrderExerciseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderExerciseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderExerciseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
