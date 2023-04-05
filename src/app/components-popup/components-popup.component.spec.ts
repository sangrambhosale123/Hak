import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentsPopupComponent } from './components-popup.component';

describe('ComponentsPopupComponent', () => {
  let component: ComponentsPopupComponent;
  let fixture: ComponentFixture<ComponentsPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComponentsPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponentsPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
