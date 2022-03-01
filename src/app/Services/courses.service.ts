import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { ICourses } from '../Model/courses';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  public course!: ICourses;
  public addCoursesToWidget = new BehaviorSubject<ICourses>(this.course);
  public updateHeaderCart = new BehaviorSubject<String>('');
  public allCourses: ICourses[] = [];
  public wishlistedCourses: ICourses[] = [];
  public cartCourses: ICourses[] = [];
  public defaultCourseList: ICourses[] = [];
  public courseDetail!: ICourses;

  constructor() {}

  fetchCourseList(): Observable<ICourses[]> {
    return of([
      {
        courseId: 1,
        courseName: 'Angular Framework basic Learning1',
        description:
          'The most efficient way to dive into Angular 2+ if you got limited time or need to refresh the basics!',
        tags: ['Frontend'],
        author: 'Sarath kumar',
        IsWhishlisted: false,
        price: 200,
        actualPrice: 400,
        isCourseDiscounted: true,
      },
      {
        courseId: 2,
        courseName: 'Cloud computing2',
        description:
          'Learn Cloud Computing concepts and AWS Basics. Master AWS fundamentals and hands-on skills on Amazon Web Services (AWS)',
        tags: ['Devops', 'Fullstack'],
        author: 'Veeranjaneyulu',
        IsWhishlisted: false,
        price: 600,
        actualPrice: 1200,
        isCourseDiscounted: true,
      },
      {
        courseId: 3,
        courseName: 'Microservice architecture3',
        description:
          'Learn Microservices architecture with .NET Core MVC(.NET 6) and Identity Server Integration with Azure Service Bus',
        tags: ['Backend', 'Frondend'],
        author: 'Sudhansu Sharma',
        IsWhishlisted: false,
        price: 350,
        actualPrice: 700,
        isCourseDiscounted: true,
      },
      {
        courseId: 4,
        courseName: 'HTML and CSS full learning4',
        description:
          'Web Development for absolute beginners.Learn HTML5 and CSS3 from scratch by building 20+ amazing real world projects',
        tags: ['Frontend'],
        author: 'Khurana Gaurav',
        IsWhishlisted: false,
        price: 400,
        actualPrice: 0,
        isCourseDiscounted: false,
      },
      {
        courseId: 5,
        courseName: 'HTML and CSS full learning5',
        description:
          'Web Development for absolute beginners.Learn HTML5 and CSS3 from scratch by building 20+ amazing real world projects',
        tags: ['Frontend'],
        author: 'Khurana Gaurav',
        IsWhishlisted: false,
        price: 250,
        actualPrice: 0,
        isCourseDiscounted: true,
      },
      {
        courseId: 6,
        courseName: 'HTML and CSS full learning6',
        description:
          'Web Development for absolute beginners.Learn HTML5 and CSS3 from scratch by building 20+ amazing real world projects',
        tags: ['Frontend'],
        author: 'Khurana Gaurav',
        IsWhishlisted: false,
        price: 500,
        actualPrice: 1000,
        isCourseDiscounted: true,
      },
      {
        courseId: 7,
        courseName: 'Angular Framework Deep Learning7',
        description:
          'The most efficient way to dive into Angular 2+ if you got limited time or need to refresh the basics!',
        tags: ['Frontend'],
        author: 'Sarath kumar',
        IsWhishlisted: false,
        price: 900,
        actualPrice: 1800,
        isCourseDiscounted: true,
      },
      {
        courseId: 8,
        courseName: 'Cloud computing8',
        description:
          'Learn Cloud Computing concepts and AWS Basics. Master AWS fundamentals and hands-on skills on Amazon Web Services (AWS)',
        tags: ['Devops', 'Fullstack'],
        author: 'Veeranjaneyulu',
        IsWhishlisted: false,
        price: 450,
        actualPrice: 900,
        isCourseDiscounted: true,
      },
      {
        courseId: 9,
        courseName: 'Microservice architecture9',
        description:
          'Learn Microservices architecture with .NET Core MVC(.NET 6) and Identity Server Integration with Azure Service Bus',
        tags: ['Backend', 'Frondend'],
        author: 'Sudhansu Sharma',
        IsWhishlisted: false,
        price: 400,
        actualPrice: 800,
        isCourseDiscounted: true,
      },
      {
        courseId: 10,
        courseName: 'HTML and CSS full learning10',
        description:
          'Web Development for absolute beginners.Learn HTML5 and CSS3 from scratch by building 20+ amazing real world projects',
        tags: ['Frontend'],
        author: 'Khurana Gaurav',
        IsWhishlisted: false,
        price: 300,
        actualPrice: 0,
        isCourseDiscounted: false,
      },
      {
        courseId: 11,
        courseName: 'HTML and CSS full learning11',
        description:
          'Web Development for absolute beginners.Learn HTML5 and CSS3 from scratch by building 20+ amazing real world projects',
        tags: ['Frontend'],
        author: 'Khurana Gaurav',
        IsWhishlisted: false,
        price: 600,
        actualPrice: 1200,
        isCourseDiscounted: true,
      },
      {
        courseId: 12,
        courseName: 'HTML and CSS full learning12',
        description:
          'Web Development for absolute beginners.Learn HTML5 and CSS3 from scratch by building 20+ amazing real world projects',
        tags: ['Frontend'],
        author: 'Khurana Gaurav',
        IsWhishlisted: false,
        price: 500,
        actualPrice: 1000,
        isCourseDiscounted: true,
      },
    ]);
  }

  updateWishlistCourse(course: ICourses): void {
    const listedCourseIndex = this.wishlistedCourses.findIndex(
      (wishlistCourse: ICourses) => wishlistCourse.courseId === course.courseId
    );
    if (listedCourseIndex > -1) {
      this.wishlistedCourses.splice(listedCourseIndex, 1);
    } else {
      this.wishlistedCourses.push(course);
    }
  }

  updateAllCourseWishlist(courseId: number, toWishlist: boolean): void {
    this.allCourses.forEach((course: ICourses) => {
      if (course.courseId === courseId) {
        course.IsWhishlisted = toWishlist;
      }
    });
  }

  updateShoppingCartCourses(courseId: number): void {
    const shoppingCartCourseIndex = this.cartCourses.findIndex(
      (course: ICourses) => course.courseId === courseId
    );
    this.cartCourses.splice(shoppingCartCourseIndex, 1);
  }
}
