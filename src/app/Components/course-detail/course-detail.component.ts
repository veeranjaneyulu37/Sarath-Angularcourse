import { Component, OnInit } from '@angular/core';
import { ICourses } from 'src/app/Model/courses';
import { CoursesService } from '../../Services/courses.service';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.css'],
})
export class CourseDetailComponent implements OnInit {
  public screenInformation = 'discover latest courses in angular';
  public tags = ['devops', 'frontend'];
  public courseDescription = [1, 2, 3, 4, 5];
  public course!: ICourses;
  public timeLeftForOffer: number = 0;
  public message!: string;
  public openDialog: boolean = false;

  constructor(private courseService: CoursesService) {}

  ngOnInit(): void {
    this.course = this.courseService.courseDetail;
    this.calculateTimeLeftForOffer();
  }

  /**
   * Calculates the time left for offer
   */
  calculateTimeLeftForOffer(): void {
    if (this.course?.actualPrice > 0) {
      this.timeLeftForOffer = 24 - new Date().getHours();
    }
  }

  /**
   * Add the course to cart
   */
  addToCart(): void {
    if (this.checkCourseExistInCart(this.course)) {
      this.openDialog = true;
      this.message = 'Already exists in the cart';
    } else {
      this.courseService.cartCourses.push(
        JSON.parse(JSON.stringify(this.course))
      );
      this.courseService.updateHeaderCart.next('add');
      this.openDialog = true;
      this.message = 'Course successfully added in the cart';
    }
  }

  /**
   * Checks the course exist in cart or not
   * @param course - the course
   * @returns - boolean whether course exist in cart or not
   */
  checkCourseExistInCart(course: ICourses): boolean {
    const cartCourseIndex = this.courseService.cartCourses.findIndex(
      (cartCourse: ICourses) => cartCourse.courseId === course.courseId
    );

    return cartCourseIndex > -1;
  }

  /**
   * Add the course to wishlist
   */
  addToWishlist(): void {
    this.courseService.updateAllCourseWishlist(this.course.courseId, true);
    const listedCourseIndex = this.courseService.wishlistedCourses.findIndex(
      (wishlistCourse: ICourses) =>
        wishlistCourse.courseId === this.course.courseId
    );
    if (listedCourseIndex < 0) {
      this.courseService.wishlistedCourses.push(
        JSON.parse(JSON.stringify(this.course))
      );
    }
    this.openDialog = true;
    this.message = 'Course successfully added in the wishlist';
  }

  /**
   * updates the openDialog property
   * @param action - action
   */
  updateDialog(action: boolean) {
    this.openDialog = action;
  }
}
