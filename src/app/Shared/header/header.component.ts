import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CoursesService } from '../../Services/courses.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  public cartCoursesCount: number = 0;
  public updateHeaderSubscription!: Subscription;

  constructor(private courseService: CoursesService) {}

  ngOnInit(): void {
    this.updateHeaderSubscription =
      this.courseService.updateHeaderCart.subscribe((action) => {
        if (action === 'add') {
          this.cartCoursesCount += 1;
        } else if (action === 'remove') {
          this.cartCoursesCount -= 1;
        } else {
          this.cartCoursesCount = 0;
        }
      });
  }

  ngOnDestroy(): void {
    this.updateHeaderSubscription.unsubscribe();
  }
}
