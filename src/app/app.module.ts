import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { RegModelComponent } from './reg-model/reg-model.component';
import { LogModelComponent } from './log-model/log-model.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { SelectionMenuLayoutComponent } from './admin/selection-menu-layout/selection-menu-layout.component';
import { ProfileComponent } from './admin/profile/profile.component';
import { SettingsComponent } from './admin/settings/settings.component';
import { PostMenuComponent } from './admin/post-menu/post-menu.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RegModelComponent,
    LogModelComponent,
    DashboardComponent,
    SelectionMenuLayoutComponent,
    ProfileComponent,
    SettingsComponent,
    PostMenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
