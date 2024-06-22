import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { CreateBlogComponent } from './create-blog/create-blog.component';
import { EditBlogComponent } from './edit-blog/edit-blog.component';
import { AuthGuard } from './auth.guard';
import { BlogDetailComponent } from './blog-detail/blog-detail.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  {
    path: 'create-blog',
    component: CreateBlogComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'edit-blog/:id',
    component: EditBlogComponent,
    canActivate: [AuthGuard],
  },
  { path: 'blog-detail/:id', component: BlogDetailComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
