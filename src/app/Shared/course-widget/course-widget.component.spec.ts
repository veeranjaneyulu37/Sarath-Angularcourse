import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseWidgetComponent } from './course-widget.component';

describe('CourseWidgetComponent', () => {
  let component: CourseWidgetComponent;
  let fixture: ComponentFixture<CourseWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourseWidgetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
