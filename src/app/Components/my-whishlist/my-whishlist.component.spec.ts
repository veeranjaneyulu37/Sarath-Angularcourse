import { Injector } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CoursesMockData } from 'src/app/MockData/coursesData';
import { CoursesService } from 'src/app/Services/courses.service';
import { MyWhishlistComponent } from './my-whishlist.component';

describe('MyWhishlistComponent', () => {
  let component: MyWhishlistComponent;
  let fixture: ComponentFixture<MyWhishlistComponent>;
  let courseService: CoursesService;
  let injector: Injector;
  let courseMockData: CoursesMockData;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyWhishlistComponent],
      providers: [CoursesService, CoursesMockData],
    });
    fixture = TestBed.createComponent(MyWhishlistComponent);
    component = fixture.componentInstance;
    injector = fixture.debugElement.injector;
    courseService = injector.get(CoursesService);
    courseMockData = injector.get(CoursesMockData);
    courseService.wishlistedCourses = courseMockData.courseData;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set value for wishListCourses on calling ngOnInit', () => {
    component.ngOnInit();
    expect(component.wishListCourses).toEqual(courseMockData.courseData);
  });

  it(`should remove the course from wishListCourses, call updateAllCourseWishlist and updateWishlistCourse
  of courseServiceon calling updateWishlistCourses`, () => {
    component.wishListCourses = courseMockData.courseData;
    const spyUpdateAllCourseWishlist = spyOn(
      courseService,
      'updateAllCourseWishlist'
    );
    const spyUpdateWishlistCourse = spyOn(
      courseService,
      'updateWishlistCourse'
    );
    component.updateWishlistCourses(1);
    expect(spyUpdateAllCourseWishlist).toHaveBeenCalledWith(1, false);
    expect(spyUpdateWishlistCourse).toHaveBeenCalled();
  });

  it(`should sort the wishlist courses from low to high if sort type is low on calling onSortTypeChange`, () => {
    component.wishListCourses = courseMockData.courseData;
    component.onSortTypeChange('low');
    expect(component.wishListCourses[0].price).toBe(200);
    expect(component.wishListCourses[1].price).toBe(350);
  });

  it(`should sort the wishlist courses from high to low if sort type is high on calling onSortTypeChange`, () => {
    component.wishListCourses = courseMockData.courseData;
    component.onSortTypeChange('high');
    expect(component.wishListCourses[0].price).toBe(350);
    expect(component.wishListCourses[1].price).toBe(200);
  });
});
