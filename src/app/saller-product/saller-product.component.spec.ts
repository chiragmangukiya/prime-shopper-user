import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SallerProductComponent } from './saller-product.component';

describe('SallerProductComponent', () => {
  let component: SallerProductComponent;
  let fixture: ComponentFixture<SallerProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SallerProductComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SallerProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
