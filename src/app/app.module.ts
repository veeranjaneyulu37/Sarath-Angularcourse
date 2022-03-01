import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './Shared/header/header.component';
import { MyWhishlistComponent } from './Components/my-whishlist/my-whishlist.component';
import { ShoppingCartComponent } from './Components/shopping-cart/shopping-cart.component';
import { DashBoardComponent } from './Components/dash-board/dash-board.component';
import { ProfileInformationComponent } from './Components/profile-information/profile-information.component';
import { SubHeaderComponent } from './Shared/sub-header/sub-header.component';
import { CourseCardComponent } from './Shared/course-card/course-card.component';
import { CourseWidgetComponent } from './Shared/course-widget/course-widget.component';
import { HttpClientModule } from '@angular/common/http';
import { DialogModalComponent } from './Shared/dialog-modal/dialog-modal.component';
import { DialogsModule } from '@progress/kendo-angular-dialog';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@progress/kendo-angular-layout';
import { IconsModule } from '@progress/kendo-angular-icons';
import { IndicatorsModule } from '@progress/kendo-angular-indicators';
import { ReactiveFormsModule } from '@angular/forms';
import { CourseDetailComponent } from './Components/course-detail/course-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ShoppingCartComponent,
    MyWhishlistComponent,
    DashBoardComponent,
    ProfileInformationComponent,
    MyWhishlistComponent,
    SubHeaderComponent,
    CourseCardComponent,
    CourseWidgetComponent,
    DialogModalComponent,
    CourseDetailComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    DialogsModule,
    ButtonsModule,
    BrowserAnimationsModule,
    LayoutModule,
    IconsModule,
    IndicatorsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
