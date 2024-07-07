import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoPhotographeComponent } from './info-photographe.component';

describe('InfoPhotographeComponent', () => {
  let component: InfoPhotographeComponent;
  let fixture: ComponentFixture<InfoPhotographeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfoPhotographeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InfoPhotographeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
