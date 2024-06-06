import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegModelComponent } from './reg-model/reg-model.component';
import { LogModelComponent } from './log-model/log-model.component';
import { AuthGuard } from './admin/shared/auth.guard';

const routes: Routes = [
  {path: '', component: HomeComponent, children: [
    {path: 'registration', component: RegModelComponent},
    {path: 'login', component: LogModelComponent}
  ]},
  {
    path: 'admin', loadChildren:  () => import('./admin/admin.module').then(module => module.AdminModule)
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
