import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './pages/main/main.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { PasswordComponent } from './pages/password/password.component';
import { EmailComponent } from './pages/email/email.component';
import { P404Component } from './pages/p404/p404.component';
import { DevComponent } from './pages/dev/dev.component';
import { ProfileComponent } from './pages/profile/profile.component';



const routes: Routes = [
  {
    path:'',
    redirectTo:'/main',
    pathMatch:'full'
  },
  {
    path:'main',
    component: MainComponent
  },
  {
    path:'login',
    component:LoginComponent
  },
  {
    path:'register',
    component:RegisterComponent
  },
  {
    path:'password',
    component:PasswordComponent
  },
  {
    path:'email',
    component:EmailComponent
  },
  {
    path:'dev',
    component:DevComponent
  },
  {
    path:'profile',
    component:ProfileComponent
  },
  { path: '**',
   component:P404Component
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
