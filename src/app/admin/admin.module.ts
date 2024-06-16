import { NgModule, Provider } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SelectionMenuLayoutComponent } from './selection-menu-layout/selection-menu-layout.component';
import { ProfileComponent } from './profile/profile.component';
import { SettingsComponent } from './settings/settings.component';
import { PostMenuComponent } from './post-menu/post-menu.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouterModule } from '@angular/router';
import { AuthService } from './shared/auth.service';
import { SharedModule } from '../shared/shared.module';
import { AuthGuard } from './shared/auth.guard';
import { CreatePostComponent } from './posts/create-post/create-post.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AllPostComponent } from './posts/all-post/all-post.component';
import { EditPostComponent } from './posts/edit-post/edit-post.component';

@NgModule({
  declarations: [
    DashboardComponent,
    SelectionMenuLayoutComponent,
    ProfileComponent,
    SettingsComponent,
    PostMenuComponent,
    CreatePostComponent,
    AllPostComponent,
    EditPostComponent],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {path: '', component: DashboardComponent, canActivate: [AuthGuard], children: [
        {path: '', redirectTo: '/admin/profile', pathMatch: 'full'},
        {path: 'profile', component: ProfileComponent},
        {path: 'posts', children: [
          {path: '', component: PostMenuComponent, pathMatch: 'full'},
          {path: 'create', component: CreatePostComponent},
          {path: 'all', component: AllPostComponent}
        ]}
      ]}
    ])
  ],
  exports: [
    RouterModule,
  ],
  providers: [
    AuthService
  ]
})
export class AdminModule { }
