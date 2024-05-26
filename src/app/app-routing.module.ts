import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { RegModelComponent } from './reg-model/reg-model.component';
import { LogModelComponent } from './log-model/log-model.component';
import { ProfileComponent } from './admin/profile/profile.component';
import { PostMenuComponent } from './admin/post-menu/post-menu.component';

const routes: Routes = [
  {path: '', component: HomeComponent, children: [
    {path: 'registration', component: RegModelComponent},
    {path: 'login', component: LogModelComponent}
  ]},
  {path: 'dashboard', component: DashboardComponent, children: [
    {path: 'profile', component: ProfileComponent},
    {path: 'posts', component: PostMenuComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
