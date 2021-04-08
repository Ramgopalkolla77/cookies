import { MaterialModule } from './reactive-form/material.module';
import { ReactiveFormComponent } from './reactive-form/reactive-form.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from  '@angular/forms';
import { CookieModule } from 'ngx-cookie';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
@NgModule({
  declarations: [
    AppComponent,
    ReactiveFormComponent,
  ],
  imports: [
    BrowserModule,
    MatInputModule,
    RouterModule,
    MaterialModule,
    AppRoutingModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', component: ReactiveFormComponent },
      { path: 'reactive-form', component: ReactiveFormComponent }
    ]),
    CookieModule.forRoot(),
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
