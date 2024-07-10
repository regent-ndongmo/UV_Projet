import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListePhotographeComponent } from './liste-photographe.component';

describe('ListePhotographeComponent', () => {
  let component: ListePhotographeComponent;
  let fixture: ComponentFixture<ListePhotographeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListePhotographeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListePhotographeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
