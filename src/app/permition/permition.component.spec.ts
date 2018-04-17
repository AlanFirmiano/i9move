import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PermitionComponent } from './permition.component';

describe('PermitionComponent', () => {
  let component: PermitionComponent;
  let fixture: ComponentFixture<PermitionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PermitionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PermitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
