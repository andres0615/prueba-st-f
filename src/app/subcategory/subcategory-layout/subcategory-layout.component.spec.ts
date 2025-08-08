import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubcategoryLayoutComponent } from './subcategory-layout.component';

describe('SubcategoryLayoutComponent', () => {
  let component: SubcategoryLayoutComponent;
  let fixture: ComponentFixture<SubcategoryLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubcategoryLayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubcategoryLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
