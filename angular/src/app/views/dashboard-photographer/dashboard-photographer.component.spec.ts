import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardPhotographerComponent } from './dashboard-photographer.component';

describe('DashboardPhotographerComponent', () => {
  let component: DashboardPhotographerComponent;
  let fixture: ComponentFixture<DashboardPhotographerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardPhotographerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DashboardPhotographerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
