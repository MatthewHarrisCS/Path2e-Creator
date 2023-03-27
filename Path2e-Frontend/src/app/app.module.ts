import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { StatFormComponent } from './stat-form/stat-form.component';
import { BackendService } from './services/backend/backend.service';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { LoginComponent } from './login/login.component';
import { AuthService } from './services/auth/auth.service';
import { TopNavComponent } from './top-nav/top-nav.component';

@NgModule({
  declarations: [
    AppComponent,
    StatFormComponent,
    UserProfileComponent,
    LoginComponent,
    TopNavComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [AuthService, BackendService],
  bootstrap: [AppComponent]
})
export class AppModule { }
