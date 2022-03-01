import { Injector } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { CoursesMockData } from 'src/app/MockData/coursesData';
import { CoursesService } from 'src/app/Services/courses.service';

import { CourseCardComponent } from './course-card.component';

describe('CourseCardComponent', () => {
  let component: CourseCardComponent;
  let fixture: ComponentFixture<CourseCardComponent>;
  let courseService: CoursesService;
  let injector: Injector;
  let courseMockData: CoursesMockData;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [CourseCardComponent],
      providers: [CoursesService, CoursesMockData],
    });
    fixture = TestBed.createComponent(CourseCardComponent);
    component = fixture.componentInstance;
    injector = fixture.debugElement.injector;
    courseService = injector.get(CoursesService);
    courseMockData = injector.get(CoursesMockData);
    component.course = courseMockData.courseData[0];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set IsWhishlisted property to true if course is not wishlisted on calling updateWishlist', () => {
    component.course.IsWhishlisted = false;
    component.updateWishlist();
    expect(component.course.IsWhishlisted).toBe(true);
  });

  it('should set IsWhishlisted property to false if course is already wishlisted on calling updateWishlist', () => {
    component.course.IsWhishlisted = true;
    component.updateWishlist();
    expect(component.course.IsWhishlisted).toBe(false);
  });

  it('should call updateWishlistCourse and updateAllCourseWishlist on calling updateWishlist', () => {
    const spyUpdateAllCourseWishlist = spyOn(
      courseService,
      'updateAllCourseWishlist'
    );
    const spyUpdateWishlistCourse = spyOn(
      courseService,
      'updateWishlistCourse'
    );
    component.updateWishlist();
    expect(spyUpdateAllCourseWishlist).toHaveBeenCalled();
    expect(spyUpdateWishlistCourse).toHaveBeenCalled();
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
    component.addToCard();
    expect(component.openDialog).toBe(true);
    expect(component.message).toBe('Already exists in the cart');
  });

  it(`should set openDialog to true message, call next method in updateHeaderCart
  if course not exist in cartCourses of courseService on calling addToCart`, () => {
    spyOn(component, 'checkCourseExistInCart').and.returnValue(false);
    const spyUpdateHeaderCart = spyOn(courseService.updateHeaderCart, 'next');
    component.addToCard();
    expect(spyUpdateHeaderCart).toHaveBeenCalled();
    expect(component.openDialog).toBe(true);
    expect(component.message).toBe('Course successfully added in the cart');
  });

  it('should set true to openDialog if updateDialog is called with true', () => {
    component.openDialog = false;
    component.updateDialog(true);
    expect(component.openDialog).toBe(true);
  });

  it('should call emit method of deleteWishlistCourses eventemitter on calling deleteCourse', () => {
    const spy = spyOn(component.deleteWishlistCourses, 'emit');
    component.screenName = 'wishlist';
    component.deleteCourse();
    expect(spy).toHaveBeenCalled();
  });

  it('should call emit method of deleteShoppingCartCourses eventemitter on calling deleteCourse', () => {
    const spy = spyOn(component.deleteShoppingCartCourses, 'emit');
    component.screenName = 'shoppingCart';
    component.deleteCourse();
    expect(spy).toHaveBeenCalled();
  });
});
