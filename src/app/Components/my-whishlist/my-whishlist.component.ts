import { Component, OnChanges, OnInit } from '@angular/core';
import { SorterType } from 'src/app/Enums/courses-enum';
import { ICourses } from '../../Model/courses';
import { CoursesService } from '../../Services/courses.service';

@Component({
  selector: 'app-my-whishlist',
  templateUrl: './my-whishlist.component.html',
  styleUrls: ['./my-whishlist.component.css'],
})
export class MyWhishlistComponent implements OnInit {
  public screenInformation = 'discover latest courses in angular';
  public wishListCourses: ICourses[] = [];
  public priceFilters = [
    { value: 'price', display: 'Course Price' },
    { value: 'low', display: 'Low to High' },
    { value: 'high', display: 'High to Low' },
  ];
  public screenName = 'wishlist';

  constructor(private courseService: CoursesService) {}

  ngOnInit(): void {
    this.wishListCourses = JSON.parse(
      JSON.stringify(this.courseService.wishlistedCourses)
    );
  }

  /**
   * Updates wishlist courses on deletion
   * @param courseId - the course id
   */
  updateWishlistCourses(courseId: number): void {
    const wishlistCourseIndex = this.wishListCourses.findIndex(
      (course: ICourses) => course.courseId === courseId
    );
    const deletedWishlistCourse = this.wishListCourses.splice(
      wishlistCourseIndex,
      1
    );
    // Update wishList property in all courses object
    this.courseService.updateAllCourseWishlist(courseId, false);
    // Remove the course from wishlist object
    this.courseService.updateWishlistCourse(deletedWishlistCourse[0]);
  }

  /**
   * Sorts the courses
   * @param event - sort filter selection event
   */
  onSortTypeChange(value: string): void {
    if (value === SorterType.Low) {
      this.wishListCourses.sort((firstElement, secondElement) => {
        return firstElement.price - secondElement.price;
      });
    } else if (value === SorterType.High) {
      this.wishListCourses.sort((firstElement, secondElement) => {
        return secondElement.price - firstElement.price;
      });
    } else {
      this.sortCoursesToDefaultOrder();
    }
  }

  /**
   * Sorts the courses to the default order
   */
  sortCoursesToDefaultOrder(): void {
    this.wishListCourses.sort((firstElement, secondElement) => {
      return (
        this.courseService.wishlistedCourses.findIndex(
          (course: ICourses) => course.price === firstElement.price
        ) -
        this.courseService.wishlistedCourses.findIndex(
          (course: ICourses) => course.price === secondElement.price
        )
      );
    });
  }
}
