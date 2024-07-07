import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategorieInfoComponent } from './categorie-info.component';

describe('CategorieInfoComponent', () => {
  let component: CategorieInfoComponent;
  let fixture: ComponentFixture<CategorieInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategorieInfoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CategorieInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
