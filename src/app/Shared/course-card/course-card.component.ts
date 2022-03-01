import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CoursesService } from '../../Services/courses.service';
import { ICourses } from '../../Model/courses';
import { Router } from '@angular/router';

@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.css'],
})
export class CourseCardComponent implements OnInit {
  @Input() course!: ICourses;
  @Input() screenName!: string;
  @Output() deleteWishlistCourses: EventEmitter<number> =
    new EventEmitter<number>();
  @Output() deleteShoppingCartCourses: EventEmitter<number> =
    new EventEmitter<number>();
  public openDialog: boolean = false;
  public message!: string;

  constructor(private courseService: CoursesService, private router: Router) {}

  ngOnInit(): void {}

  /**
   * Update the wishlist courses
   */
  updateWishlist(): void {
    if (this.course.IsWhishlisted) {
      this.course.IsWhishlisted = false;
    } else {
      this.course.IsWhishlisted = true;
    }

    this.courseService.updateAllCourseWishlist(
      this.course.courseId,
      this.course.IsWhishlisted
    );

    this.courseService.updateWishlistCourse(
      JSON.parse(JSON.stringify(this.course))
    );
  }

  /**
   * Adds the courses to cart
   */
  addToCard(): void {
    if (this.checkCourseExistInCart(this.course)) {
      this.openDialog = true;
      this.message = 'Already exists in the cart';
    } else {
      this.courseService.addCoursesToWidget.next(
        JSON.parse(JSON.stringify(this.course))
      );
      this.courseService.updateHeaderCart.next('add');
      this.openDialog = true;
      this.message = 'Course successfully added in the cart';
    }
  }

  /**
   * Checks the course already exists or not
   * @param course - cart courses
   * @returns - boolean whether course exist in cart or not
   */
  checkCourseExistInCart(course: ICourses): boolean {
    const cartCourseIndex = this.courseService.cartCourses.findIndex(
      (cartCourse: ICourses) => cartCourse.courseId === course.courseId
    );

    return cartCourseIndex > -1;
  }

  /**
   * updates the openDialog property
   * @param action - action
   */
  updateDialog(action: boolean) {
    this.openDialog = action;
  }

  /**
   * Deletes course by triggering an event emitter
   */
  deleteCourse(): void {
    if (this.screenName === 'wishlist') {
      this.deleteWishlistCourses.emit(this.course.courseId);
    } else if (this.screenName === 'shoppingCart') {
      this.deleteShoppingCartCourses.emit(this.course.courseId);
    }
  }

  /**
   * Move the card courses to wishlist
   */
  moveCardCoursesToWishlist(): void {
    this.deleteShoppingCartCourses.emit(this.course.courseId);
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
  }

  /**
   * Navigates to course details page
   */
  navigateToCourseDetailsPage(): void {
    this.courseService.courseDetail = this.course;
    this.router.navigate(['/course-detail']);
  }
}
