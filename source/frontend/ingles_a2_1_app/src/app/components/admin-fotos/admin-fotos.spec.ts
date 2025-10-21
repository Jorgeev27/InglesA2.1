import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminFotos } from './admin-fotos';

describe('AdminFotos', () => {
  let component: AdminFotos;
  let fixture: ComponentFixture<AdminFotos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminFotos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminFotos);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
