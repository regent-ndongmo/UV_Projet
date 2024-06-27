import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorbeilleComponent } from './corbeille.component';

describe('CorbeilleComponent', () => {
  let component: CorbeilleComponent;
  let fixture: ComponentFixture<CorbeilleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CorbeilleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CorbeilleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
