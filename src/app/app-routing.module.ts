import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseDetailComponent } from './Components/course-detail/course-detail.component';
import { DashBoardComponent } from './Components/dash-board/dash-board.component';
import { MyWhishlistComponent } from './Components/my-whishlist/my-whishlist.component';
import { ProfileInformationComponent } from './Components/profile-information/profile-information.component';
import { ShoppingCartComponent } from './Components/shopping-cart/shopping-cart.component';

const routes: Routes = [
  { path: '', redirectTo: '/courses', pathMatch: 'full' },
  { path: 'courses', component: DashBoardComponent },
  { path: 'wishlist', component: MyWhishlistComponent },
  { path: 'cart', component: ShoppingCartComponent },
  { path: 'profile', component: ProfileInformationComponent },
  { path: 'course-detail', component: CourseDetailComponent },
  { path: '**', redirectTo: '/courses' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
