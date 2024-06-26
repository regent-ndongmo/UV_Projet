import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GalerieModalComponent } from './galerie-modal.component';

describe('GalerieModalComponent', () => {
  let component: GalerieModalComponent;
  let fixture: ComponentFixture<GalerieModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GalerieModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GalerieModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
