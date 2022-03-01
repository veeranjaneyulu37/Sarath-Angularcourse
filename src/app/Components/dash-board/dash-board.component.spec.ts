import { Injector } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { CoursesMockData } from 'src/app/MockData/coursesData';
import { CoursesService } from 'src/app/Services/courses.service';

import { DashBoardComponent } from './dash-board.component';

describe('DashBoardComponent', () => {
  let component: DashBoardComponent;
  let fixture: ComponentFixture<DashBoardComponent>;
  let courseService: CoursesService;
  let injector: Injector;
  let courseMockData: CoursesMockData;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashBoardComponent],
      providers: [CoursesService, CoursesMockData],
    });
    fixture = TestBed.createComponent(DashBoardComponent);
    component = fixture.componentInstance;
    injector = fixture.debugElement.injector;
    courseService = injector.get(CoursesService);
    courseMockData = injector.get(CoursesMockData);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call loadCourseList on calling ngOnInit', () => {
    const spyLoadCourseList = spyOn(component, 'loadCourseList');
    component.ngOnInit();
    expect(spyLoadCourseList).toHaveBeenCalled();
  });

  it(`should call the fetchCourseList of courseService, set value for courseList and allCourses of courseService
  on calling loadCourseList`, () => {
    courseService.allCourses = [];
    const spyFetchCourseList = spyOn(
      courseService,
      'fetchCourseList'
    ).and.returnValue(of(courseMockData.courseData));
    component.loadCourseList();
    expect(component.courseList).toEqual(courseMockData.courseData);
    expect(courseService.allCourses).toEqual(courseMockData.courseData);
    expect(spyFetchCourseList).toHaveBeenCalled();
  });

  it(`should assign value to courseList from allCourses in courseService and call generateCoursePages
  on calling loadCourseList`, () => {
    courseService.allCourses = courseMockData.courseData;
    const spyGenerateCoursePages = spyOn(component, 'generateCoursePages');
    component.loadCourseList();
    expect(component.courseList).toEqual(courseMockData.courseData);
    expect(spyGenerateCoursePages).toHaveBeenCalled();
  });

  it(`should sort the paginatedCourses from low to high if sort type is low on calling onSortTypeChange`, () => {
    component.paginatedCourses = courseMockData.courseData;
    component.currentSortType = 'low';
    component.sortCourses();
    expect(component.paginatedCourses[0].price).toBe(200);
    expect(component.paginatedCourses[1].price).toBe(350);
  });

  it(`should sort the wishlist courses from high to low if sort type is high on calling onSortTypeChange`, () => {
    component.paginatedCourses = courseMockData.courseData;
    component.currentSortType = 'high';
    component.sortCourses();
    expect(component.paginatedCourses[0].price).toBe(350);
    expect(component.paginatedCourses[1].price).toBe(200);
  });

  it('should create an array of numbers based on the page count on calling getArrayOfPage', () => {
    const pageArray = component.getArrayOfPage(3);
    expect(pageArray).toEqual([1, 2, 3]);
  });

  it('should return empty array if pageCount is 0 on calling getArrayOfPage', () => {
    const pageArray = component.getArrayOfPage(0);
    expect(pageArray).toEqual([]);
  });

  it('should get the coursesTotalCount, totalPages, coursePages on calling generateCoursePages', () => {
    component.courseList = courseMockData.courseData;
    component.coursesPerPage = 5;
    component.generateCoursePages();
    expect(component.coursesTotalCount).toBe(2);
    expect(component.totalPages).toBe(1);
    expect(component.coursePages).toEqual([1]);
  });

  it('should get the coursesTotalCount, totalPages, coursePages on calling generateCoursePages', () => {
    component.courseList = courseMockData.courseData;
    component.coursesPerPage = 5;
    component.generateCoursePages();
    expect(component.coursesTotalCount).toBe(2);
    expect(component.totalPages).toBe(1);
    expect(component.coursePages).toEqual([1]);
  });
});
