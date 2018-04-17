import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPatientComponent } from './lista-paciente.component';

describe('ListPatientComponent', () => {
  let component: ListPatientComponent;
  let fixture: ComponentFixture<ListPatientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListPatientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListPatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
