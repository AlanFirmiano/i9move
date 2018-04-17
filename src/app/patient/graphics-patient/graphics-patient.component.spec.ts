import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphicsPatientComponent } from './graphics-patient.component';

describe('GraphicsPatientComponent', () => {
  let component: GraphicsPatientComponent;
  let fixture: ComponentFixture<GraphicsPatientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraphicsPatientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphicsPatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
