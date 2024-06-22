import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarCodeComponent } from './bar-code.component';

describe('BarCodeComponent', () => {
  let component: BarCodeComponent;
  let fixture: ComponentFixture<BarCodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BarCodeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BarCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
