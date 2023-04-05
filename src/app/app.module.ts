import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { signupService } from 'src/Service/Signup.service';
import { AngularFireModule } from "@angular/fire/compat";
import { environment } from 'src/environments/environment';
import { LogoutComponent } from './logout/logout.component';
import { sharedService } from 'src/Service/SharedService.service';
import { provideStorage,getStorage } from "@angular/fire/storage";
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { AddprojectComponent } from './addproject/addproject.component';
import { ProjectsComponent } from './projects/projects.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PopupComponent } from './popup/popup.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';
import { ProjectInfoComponent } from './project-info/project-info.component';
import { EditprofileComponent } from './editprofile/editprofile.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ComponentsComponent } from './components/components.component';
import { ComponentsPopupComponent } from './components-popup/components-popup.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { EditComponentComponent } from './edit-component/edit-component.component';
import { provideAnalytics,getAnalytics,ScreenTrackingService,UserTrackingService } from '@angular/fire/analytics';
import { ActionCardComponent } from './shared/action-card/action-card.component';
import {MatCardModule} from '@angular/material/card';
import { EditProjectComponent } from './edit-project/edit-project.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { ProjectPopupComponent } from './project-popup/project-popup.component';
import { SearchComponent } from './search/search.component';
import { StorageModule } from '@angular/fire/storage';




@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    LoginComponent,
    SignupComponent,
    LogoutComponent,
    ForgotpasswordComponent,
    AddprojectComponent,
    ProjectsComponent,
    PopupComponent,
    ProjectInfoComponent,
    EditprofileComponent,
    ComponentsComponent,  
    PopupComponent,
    ComponentsPopupComponent,
    ContactUsComponent,
    EditComponentComponent,
    ActionCardComponent,
    EditProjectComponent,
    WishlistComponent,
    ProjectPopupComponent,
    SearchComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatIconModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    StorageModule,
    provideFirebaseApp(()=> initializeApp(environment.firebase)),
    AngularFireModule.initializeApp(environment.firebase),
    provideStorage(()=> getStorage()),
  ],
  providers: [signupService,sharedService, ScreenTrackingService,UserTrackingService],
  bootstrap: [AppComponent]
})
export class AppModule { }
