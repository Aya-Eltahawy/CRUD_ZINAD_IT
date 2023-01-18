import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogincomComponent } from './logincom.component';

describe('LogincomComponent', () => {
  let component: LogincomComponent;
  let fixture: ComponentFixture<LogincomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LogincomComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LogincomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
