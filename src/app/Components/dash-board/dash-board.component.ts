import { Component, OnInit } from '@angular/core';
import { SorterType } from 'src/app/Enums/courses-enum';
import { ICourses } from '../../Model/courses';
import { CoursesService } from '../../Services/courses.service';

@Component({
  selector: 'app-dash-board',
  templateUrl: './dash-board.component.html',
  styleUrls: ['./dash-board.component.css'],
})
export class DashBoardComponent implements OnInit {
  public screenInformation = 'discover latest courses in angular';
  public priceFilters = [
    { value: 'default', display: 'Course Price' },
    { value: 'low', display: 'Low to High' },
    { value: 'high', display: 'High to Low' },
  ];
  public items = [1, 2, 3, 4, 5];
  public courseList: ICourses[] = [];
  public screenName = 'dashboard';
  public type!: string;
  public coursesPerPage = 5;
  public coursesTotalCount: number = 0;
  public totalPages: number = 0;
  public coursePages: number[] = [];
  public activePage: number = 1;
  public paginatedCourses: ICourses[] = [];
  public currentSortType!: string;
  public filteredCourses: ICourses[] = [];
  public isCourseSearched: boolean = false;
  public isFilteredValueNotAvailable: boolean = false;
  public defaultCourseList: ICourses[] = [];

  constructor(private courseService: CoursesService) {}

  ngOnInit(): void {
    this.loadCourseList();
  }

  /**
   * Gets the list of courses
   */
  loadCourseList(): void {
    if (this.courseService.allCourses.length === 0) {
      this.courseService.fetchCourseList().subscribe((courses: ICourses[]) => {
        this.courseList = courses;
        this.courseService.allCourses = JSON.parse(
          JSON.stringify(this.courseList)
        );
        // Assigning default course list
        this.defaultCourseList = this.courseList.slice(0, 5);
        this.generateCoursePages();
      });
    } else {
      this.courseList = JSON.parse(
        JSON.stringify(this.courseService.allCourses)
      );
      this.generateCoursePages();
    }
  }

  /**
   * Sorts the courses
   * @param event - sort filter selection event
   */
  onSortTypeChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.currentSortType = selectElement.value;
    this.sortCourses();
  }

  sortCourses(): void {
    if (this.currentSortType === SorterType.Low) {
      this.paginatedCourses.sort((firstElement, secondElement) => {
        return firstElement.price - secondElement.price;
      });
    } else if (this.currentSortType === SorterType.High) {
      this.paginatedCourses.sort((firstElement, secondElement) => {
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
    this.paginatedCourses.sort((firstElement, secondElement) => {
      return (
        this.defaultCourseList.findIndex(
          (course: ICourses) => course.price === firstElement.price
        ) -
        this.defaultCourseList.findIndex(
          (course: ICourses) => course.price === secondElement.price
        )
      );
    });
  }

  /**
   * Generate pagination
   */
  generateCoursePages(): void {
    this.coursesTotalCount = this.courseList.length;
    this.totalPages = Math.ceil(this.coursesTotalCount / this.coursesPerPage);
    this.coursePages = this.getArrayOfPage(this.totalPages);

    if (this.coursesTotalCount <= 5) {
      this.paginatedCourses = JSON.parse(JSON.stringify(this.courseList));
    } else {
      this.paginatedCourses = this.courseList.slice(0, 5);
    }
  }

  /**
   * Gest the array of page
   * @param pageCount - total pages
   * @returns array of page
   */
  public getArrayOfPage(pageCount: number): number[] {
    const pageArray = [];

    if (pageCount > 0) {
      for (let i = 1; i <= pageCount; i++) {
        pageArray.push(i);
      }
    }
    return pageArray;
  }

  onInputChange(): void {
    let searchValue = (
      document.getElementById('search-bar') as HTMLInputElement
    ).value;
    if (searchValue.length === 0 && this.isCourseSearched) {
      this.isFilteredValueNotAvailable = false;
      this.isCourseSearched = false;
      this.loadCourseList();
    }
  }

  /**
   * Updates the view based on clicked page number
   * @param pageNumber - clicked page number
   */
  onClickPage(pageNumber: number): void {
    if (pageNumber >= 1 && pageNumber <= this.totalPages) {
      this.activePage = pageNumber;
      const startIndex = (pageNumber - 1) * 5;
      const endIndex =
        this.coursesTotalCount - startIndex <= 5
          ? this.coursesTotalCount
          : startIndex + 5;
      this.paginatedCourses = this.courseList.slice(startIndex, endIndex);
      this.defaultCourseList = JSON.parse(
        JSON.stringify(this.paginatedCourses)
      );
      // Sort course on pagination if sort type is not selected to default
      if (this.currentSortType !== SorterType.Default) {
        this.sortCourses();
      }
    }
  }

  /**
   * Searchs for the courses
   */
  onSearchCourses(): void {
    let searchValue = (
      document.getElementById('search-bar') as HTMLInputElement
    ).value;
    if (searchValue.trim().length !== 0) {
      this.activePage = 1;
      this.isCourseSearched = true;
      this.filteredCourses = [];
      searchValue = searchValue.toLowerCase();
      this.courseService.allCourses.forEach((course) => {
        course.tags?.forEach((tag: string) => tag.toLowerCase());
        if (
          course.courseName?.toLowerCase().includes(searchValue) ||
          course.author?.toLowerCase().includes(searchValue) ||
          course.tags?.find((tag: string) =>
            tag.toLowerCase().includes(searchValue.toLowerCase())
          )
        ) {
          this.filteredCourses.push(course);
        }
      });
      if (this.filteredCourses?.length > 0) {
        this.isFilteredValueNotAvailable = false;
        this.courseList = JSON.parse(JSON.stringify(this.filteredCourses));
        this.generateCoursePages();
      } else {
        this.isFilteredValueNotAvailable = true;
      }
    }
  }
}
