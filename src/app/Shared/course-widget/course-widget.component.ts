import { Component, OnDestroy, OnInit } from '@angular/core';
import { ICourses } from 'src/app/Model/courses';
import { CoursesService } from '../../Services/courses.service';

@Component({
  selector: 'app-course-widget',
  templateUrl: './course-widget.component.html',
  styleUrls: ['./course-widget.component.css'],
})
export class CourseWidgetComponent implements OnInit, OnDestroy {
  public items = [1, 3, 4, 5];
  public cartCourses: ICourses[] = [];
  public totalCartValue: number = 0;
  public course!: ICourses;
  public cartCourseCount: number = 0;

  constructor(private courseService: CoursesService) {}

  ngOnInit(): void {
    if (this.courseService.cartCourses.length === 0) {
      this.courseService.addCoursesToWidget.subscribe((courses) => {
        if (courses) {
          this.cartCourses.push(courses);
          this.courseService.cartCourses = this.cartCourses;
          this.calculateTotalCartValue();
        }
      });
    } else {
      this.cartCourses = this.courseService.cartCourses;
      this.calculateTotalCartValue();
    }
  }

  /**
   * Calculates the total cart value
   */
  calculateTotalCartValue(): void {
    this.totalCartValue = 0;
    this.cartCourses.forEach((course) => {
      this.totalCartValue += course.price;
    });
  }

  /**
   * Check cart courses available or not
   * @returns - boolean
   */
  checkCartCourseCount(): boolean {
    return this.cartCourses?.length > 0;
  }

  ngOnDestroy(): void {
    this.courseService.addCoursesToWidget.next(this.course);
  }
}
