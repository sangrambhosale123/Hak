import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddprojectComponent } from './addproject/addproject.component';
import { ComponentsComponent } from './components/components.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { EditprofileComponent } from './editprofile/editprofile.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { ProjectInfoComponent } from './project-info/project-info.component';
import { ProjectsComponent } from './projects/projects.component';
import { SignupComponent } from './signup/signup.component';
import { WishlistComponent } from './wishlist/wishlist.component';


const routes: Routes = [
  { path: 'Login', component:LoginComponent},
  { path: 'Signup', component:SignupComponent},
  { path: 'Logout', component:LogoutComponent},
  { path: 'Forgot-Password', component:ForgotpasswordComponent},
  { path: 'addProject', component:AddprojectComponent},
  { path: '', component:ProjectsComponent},
  { path: 'viewProject', component:ProjectInfoComponent},
  { path: 'editProfile', component:EditprofileComponent},
  { path: 'components', component:ComponentsComponent},
  { path: 'contactUs', component:ContactUsComponent},
  { path: 'wishlist', component:WishlistComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
