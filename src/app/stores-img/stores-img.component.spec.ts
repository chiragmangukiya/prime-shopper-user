import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoresImgComponent } from './stores-img.component';

describe('StoresImgComponent', () => {
  let component: StoresImgComponent;
  let fixture: ComponentFixture<StoresImgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoresImgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StoresImgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
