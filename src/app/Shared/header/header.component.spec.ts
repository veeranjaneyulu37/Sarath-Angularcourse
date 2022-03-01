import { Injector } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CoursesService } from 'src/app/Services/courses.service';

import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let courseService: CoursesService;
  let injector: Injector;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      providers: [CoursesService],
    });
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    injector = fixture.debugElement.injector;
    courseService = injector.get(CoursesService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should increase the cartCoursesCount to 1 if updateHeaderCart returns add on calling ngOnInit', () => {
    component.cartCoursesCount = 0;
    component.updateHeaderSubscription?.unsubscribe();
    courseService.updateHeaderCart.next('add');
    component.ngOnInit();
    expect(component.cartCoursesCount).toBe(1);
  });

  it('should decrease the cartCoursesCount to 0 if updateHeaderCart returns remove on calling ngOnInit', () => {
    component.cartCoursesCount = 3;
    component.updateHeaderSubscription?.unsubscribe();
    courseService.updateHeaderCart.next('remove');
    component.ngOnInit();
    expect(component.cartCoursesCount).toBe(2);
  });

  it('should set cartCoursesCount to 0 if updateHeaderCart returns clear on calling ngOnInit', () => {
    component.cartCoursesCount = 10;
    component.updateHeaderSubscription?.unsubscribe();
    courseService.updateHeaderCart.next('clear');
    component.ngOnInit();
    expect(component.cartCoursesCount).toBe(0);
  });
});
