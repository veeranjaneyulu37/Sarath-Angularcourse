import { Component, OnInit } from '@angular/core';
import { ICourses } from 'src/app/Model/courses';
import { CoursesService } from 'src/app/Services/courses.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css'],
})
export class ShoppingCartComponent implements OnInit {
  public screenInformation = 'shopping cart';
  public shoppingCartCourses: ICourses[] = [];
  public recommendedCartCourses: ICourses[] = [];
  public screenName = 'shoppingCart';
  public totalCoursesInCart: number = 0;
  public checkoutPrice: number = 0;
  public savedAmount: number = 0;
  public openDialog: boolean = false;
  public message = 'You have successfully placed your order';
  public cartCoursesTags: string[] = [];

  constructor(private courseService: CoursesService) {}

  ngOnInit(): void {
    this.shoppingCartCourses = this.courseService.cartCourses;
    this.totalCoursesInCart = this.shoppingCartCourses?.length;
    this.calculateTotalShoppingCartCourseAmount();
    this.amountSavedOnDiscount();
    this.getRecommendedCourses();
  }

  /**
   * Calculates the total shopping cart amount
   */
  calculateTotalShoppingCartCourseAmount(): void {
    this.checkoutPrice = 0;
    this.shoppingCartCourses.forEach((course: ICourses) => {
      this.checkoutPrice += course.price;
    });
  }

  /**
   * Amount saved on discount
   */
  amountSavedOnDiscount(): void {
    this.savedAmount = 0;
    this.shoppingCartCourses.forEach((course: ICourses) => {
      this.savedAmount += course.actualPrice - course.price;
    });
  }

  /**
   * Updates the shopping cart courses on deletion
   * @param courseId - the course id
   */
  updateShoppingCartCourses(courseId: number): void {
    this.courseService.updateShoppingCartCourses(courseId);
    this.calculateTotalShoppingCartCourseAmount();
    this.amountSavedOnDiscount();
    this.totalCoursesInCart = this.shoppingCartCourses?.length;
    this.courseService.updateHeaderCart.next('remove');
    if (this.totalCoursesInCart === 0) {
      this.recommendedCartCourses = [];
    }
  }

  /**
   * Checkouts the cart
   */
  goToCheckout(): void {
    if (this.checkoutPrice > 0) {
      this.openDialog = true;
    }
  }

  /**
   * Updates the dialog and clear the courses in cart
   * @param action - action
   */
  updateDialog(action: boolean): void {
    this.openDialog = action;
    this.shoppingCartCourses = [];
    this.courseService.cartCourses = [];
    this.recommendedCartCourses = [];
    this.totalCoursesInCart = this.shoppingCartCourses?.length;
    this.calculateTotalShoppingCartCourseAmount();
    this.amountSavedOnDiscount();
    this.courseService.updateHeaderCart.next('clear');
  }

  /**
   * Gets the recoomendation courses
   */
  getRecommendedCourses(): void {
    let allCourses = JSON.parse(JSON.stringify(this.courseService.allCourses));

    this.shoppingCartCourses.forEach((course) => {
      this.cartCoursesTags.push(...course.tags);
    });

    this.cartCoursesTags = this.cartCoursesTags.filter((tag, index) => {
      return this.cartCoursesTags.indexOf(tag) === index;
    });

    let filteredCourse: ICourses[] = allCourses.filter(
      (course: ICourses) =>
        !this.shoppingCartCourses.filter(
          (cartCourse: ICourses) => cartCourse.courseId === course.courseId
        ).length
    );

    filteredCourse.forEach((course: ICourses) => {
      if (this.recommendedCartCourses.length < 2) {
        const isTagMatching = course.tags.some((tag) => {
          return this.cartCoursesTags.some((cartTag) => {
            return cartTag === tag;
          });
        });
        if (isTagMatching) {
          this.recommendedCartCourses.push(course);
        }
      }
    });
  }
}
