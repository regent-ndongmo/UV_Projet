import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotographeListComponent } from './photographe-list.component';

describe('PhotographeListComponent', () => {
  let component: PhotographeListComponent;
  let fixture: ComponentFixture<PhotographeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PhotographeListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PhotographeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
