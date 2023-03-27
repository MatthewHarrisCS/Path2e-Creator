import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { StatFormComponent } from './stat-form/stat-form.component';

const routes: Routes = [
  { path: 'create', component: StatFormComponent },
  { path: 'user', component: UserProfileComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }