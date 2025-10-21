import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminExamenes } from './admin-examenes';

describe('AdminExamenes', () => {
  let component: AdminExamenes;
  let fixture: ComponentFixture<AdminExamenes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminExamenes]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminExamenes);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
