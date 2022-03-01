import { Injector } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CoursesMockData } from 'src/app/MockData/coursesData';
import { CoursesService } from 'src/app/Services/courses.service';

import { ShoppingCartComponent } from './shopping-cart.component';

describe('ShoppingCartComponent', () => {
  let component: ShoppingCartComponent;
  let fixture: ComponentFixture<ShoppingCartComponent>;
  let courseService: CoursesService;
  let injector: Injector;
  let courseMockData: CoursesMockData;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShoppingCartComponent],
      providers: [CoursesService, CoursesMockData],
    });
    fixture = TestBed.createComponent(ShoppingCartComponent);
    component = fixture.componentInstance;
    injector = fixture.debugElement.injector;
    courseService = injector.get(CoursesService);
    courseMockData = injector.get(CoursesMockData);
    courseService.cartCourses = courseMockData.courseData;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set value for shoppingCartCourses and totalCoursesInCart on calling ngOnInit', () => {
    component.ngOnInit();
    expect(component.shoppingCartCourses).toBe(courseMockData.courseData);
    expect(component.totalCoursesInCart).toBe(courseMockData.courseData.length);
  });

  it(`should call calculateTotalShoppingCartCourseAmount, amountSavedOnDiscount, getRecommendedCourses
  on calling ngOnInit`, () => {
    const spyCalculateTotalShoppingCartCourseAmount = spyOn(
      component,
      'calculateTotalShoppingCartCourseAmount'
    );
    const spyAmountSavedOnDiscount = spyOn(component, 'amountSavedOnDiscount');
    const spyGetRecommendedCourses = spyOn(component, 'getRecommendedCourses');
    component.ngOnInit();
    expect(spyAmountSavedOnDiscount).toHaveBeenCalled();
    expect(spyCalculateTotalShoppingCartCourseAmount).toHaveBeenCalled();
    expect(spyGetRecommendedCourses).toHaveBeenCalled();
  });

  it('should calculate the checkout price on calling calculateTotalShoppingCartCourseAmount', () => {
    component.shoppingCartCourses = courseMockData.courseData;
    component.calculateTotalShoppingCartCourseAmount();
    expect(component.checkoutPrice).toBe(550);
  });

  it('should calculate the amount saved on discount on calling amountSavedOnDiscount', () => {
    component.shoppingCartCourses = courseMockData.courseData;
    component.amountSavedOnDiscount();
    expect(component.savedAmount).toBe(550);
  });

  it(`should call updateShoppingCartCourses of courseService, calculateTotalShoppingCartCourseAmount, amountSavedOnDiscount
  on calling updateShoppingCartCourses`, () => {
    const spyCalculateTotalShoppingCartCourseAmount = spyOn(
      component,
      'calculateTotalShoppingCartCourseAmount'
    );
    const spyAmountSavedOnDiscount = spyOn(component, 'amountSavedOnDiscount');
    const spyUpdateShoppingCartCourses = spyOn(
      courseService,
      'updateShoppingCartCourses'
    );
    component.updateShoppingCartCourses(1);
    expect(spyCalculateTotalShoppingCartCourseAmount).toHaveBeenCalled();
    expect(spyAmountSavedOnDiscount).toHaveBeenCalled();
    expect(spyUpdateShoppingCartCourses).toHaveBeenCalled();
  });

  it('should set value for totalCoursesInCart, call next method of updateHeaderCart on calling updateShoppingCartCourses', () => {
    component.totalCoursesInCart = 0;
    const spyUpdateHeaderCart = spyOn(courseService.updateHeaderCart, 'next');
    component.updateShoppingCartCourses(1);
    expect(component.totalCoursesInCart).toBe(1);
    expect(spyUpdateHeaderCart).toHaveBeenCalled();
  });

  it('should set empty array for recommendedCartCourses on calling updateShoppingCartCourses', () => {
    component.shoppingCartCourses.pop();
    component.updateShoppingCartCourses(1);
    expect(component.totalCoursesInCart).toBe(0);
    expect(component.recommendedCartCourses).toEqual([]);
  });

  it('should set openDialog to true on calling goToCheckout', () => {
    component.openDialog = true;
    component.goToCheckout();
    expect(component.openDialog).toBe(true);
  });

  it(`should set value for openDialog, shoppingCartCourses, cartCourses, recommendedCartCourses, totalCoursesInCart
  on caling updateDialog`, () => {
    component.updateDialog(false);
    expect(component.openDialog).toBe(false);
    expect(component.shoppingCartCourses).toEqual([]);
    expect(component.recommendedCartCourses).toEqual([]);
    expect(courseService.cartCourses).toEqual([]);
    expect(component.totalCoursesInCart).toEqual(0);
  });

  it(`should call calculateTotalShoppingCartCourseAmount, amountSavedOnDiscount and call next method of updateHeaderCart
  on caling updateDialog`, () => {
    const spyUpdateHeaderCart = spyOn(courseService.updateHeaderCart, 'next');
    const spyCalculateTotalShoppingCartCourseAmount = spyOn(
      component,
      'calculateTotalShoppingCartCourseAmount'
    );
    const spyAmountSavedOnDiscount = spyOn(component, 'amountSavedOnDiscount');
    component.updateDialog(false);
    expect(spyUpdateHeaderCart).toHaveBeenCalled();
    expect(spyCalculateTotalShoppingCartCourseAmount).toHaveBeenCalled();
    expect(spyAmountSavedOnDiscount).toHaveBeenCalled();
  });
});
