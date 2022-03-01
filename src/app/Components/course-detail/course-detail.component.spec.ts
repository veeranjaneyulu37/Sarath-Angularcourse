import { Injector } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CoursesMockData } from 'src/app/MockData/coursesData';
import { CoursesService } from 'src/app/Services/courses.service';

import { CourseDetailComponent } from './course-detail.component';

describe('CourseDetailComponent', () => {
  let component: CourseDetailComponent;
  let fixture: ComponentFixture<CourseDetailComponent>;
  let courseService: CoursesService;
  let injector: Injector;
  let courseMockData: CoursesMockData;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CourseDetailComponent],
      providers: [CoursesService, CoursesMockData],
    });

    fixture = TestBed.createComponent(CourseDetailComponent);
    component = fixture.componentInstance;
    injector = fixture.debugElement.injector;
    courseService = injector.get(CoursesService);
    courseMockData = injector.get(CoursesMockData);
    courseService.courseDetail = courseMockData.courseData[0];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set value for course on calling ngOnInit', () => {
    component.ngOnInit();
    expect(component.course).toEqual(courseMockData.courseData[0]);
  });

  it('should call calculateTimeLeftForOffer on calling ngOnInit', () => {
    const spyCalculatimeLeftForOffer = spyOn(
      component,
      'calculateTimeLeftForOffer'
    );
    component.ngOnInit();
    expect(spyCalculatimeLeftForOffer).toHaveBeenCalled();
  });

  it('should calculate the time left for offer if course data is available on calling calculateTimeLeftForOffer', () => {
    const timeLeft = 24 - new Date().getHours();
    component.calculateTimeLeftForOffer();
    expect(component.timeLeftForOffer).toBe(timeLeft);
  });

  it(`should return true if course is already exist in cartCourse of courseService on calling checkCourseExistInCart`, () => {
    courseService.cartCourses = [courseMockData.courseData[0]];
    const result = component.checkCourseExistInCart(
      courseMockData.courseData[0]
    );
    expect(result).toBe(true);
  });

  it(`should return false if course not exist in cartCourse of courseService on calling checkCourseExistInCart`, () => {
    courseService.cartCourses = [];
    const result = component.checkCourseExistInCart(
      courseMockData.courseData[0]
    );
    expect(result).toBe(false);
  });

  it(`should set openDialog to true and message if course already exist in cartCourses of courseService on calling addToCart`, () => {
    spyOn(component, 'checkCourseExistInCart').and.returnValue(true);
    component.addToCart();
    expect(component.openDialog).toBe(true);
    expect(component.message).toBe('Already exists in the cart');
  });

  it(`should set openDialog to true message, push course to cart and call next method in updateHeaderCart
  if course not exist in cartCourses of courseService on calling addToCart`, () => {
    spyOn(component, 'checkCourseExistInCart').and.returnValue(false);
    const spyUpdateHeaderCart = spyOn(courseService.updateHeaderCart, 'next');
    component.addToCart();
    expect(spyUpdateHeaderCart).toHaveBeenCalled();
    expect(courseService.cartCourses[0]).toEqual(courseMockData.courseData[0]);
    expect(component.openDialog).toBe(true);
    expect(component.message).toBe('Course successfully added in the cart');
  });

  it('should set true to openDialog if updateDialog is called with true', () => {
    component.openDialog = false;
    component.updateDialog(true);
    expect(component.openDialog).toBe(true);
  });

  it(`should call updateAllCourseWishlist of course with course id and true on calling addToWishlist`, () => {
    component.course = courseMockData.courseData[0];
    const spyUpdateAllCoursesWishlist = spyOn(
      courseService,
      'updateAllCourseWishlist'
    );
    component.addToWishlist();
    expect(spyUpdateAllCoursesWishlist).toHaveBeenCalledWith(
      component.course.courseId,
      true
    );
  });

  it(`should set openDialog to true and value for message on calling addToWishlist`, () => {
    component.course = courseMockData.courseData[0];
    component.openDialog = false;
    component.message = '';
    component.addToWishlist();
    expect(component.openDialog).toBe(true);
    expect(component.message).toBe('Course successfully added in the wishlist');
  });

  it(`should push value to wishlistedCourses of courseService if course is not available in wishlistedCourses
  on calling addToWishlist`, () => {
    component.course = courseMockData.courseData[0];
    courseService.wishlistedCourses = [];
    component.addToWishlist();
    expect(courseService.wishlistedCourses[0]).toEqual(
      courseMockData.courseData[0]
    );
  });

  it(`should not push value to wishlistedCourses of courseService if course is already available in wishlistedCourses
  on calling addToWishlist`, () => {
    component.course = courseMockData.courseData[0];
    courseService.wishlistedCourses = [courseMockData.courseData[0]];
    component.addToWishlist();
    expect(courseService.wishlistedCourses.length).toBe(1);
  });
});
