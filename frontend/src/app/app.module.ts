import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainFormComponent } from './main-form/main-form.component';
import { GofundmeFormComponent } from './main-form/gofundme-form/gofundme-form.component';
import { MainFormRoutingModule } from './main-form/main-form-routing.component';
import { appReducers } from './store/reducers/app.reducers';
import { GofundmeFormRoutingModule } from './main-form/gofundme-form/gofundme-form-routing.component';
import { StoreModule } from '@ngrx/store';
import { DeliversFormComponent } from './main-form/delivers-form/delivers-form.component';
import { DeliversFormRoutingModule } from './main-form/delivers-form/delivers-form-routing.component';

@NgModule({
  declarations: [
    AppComponent,
    MainFormComponent,
    GofundmeFormComponent,
    DeliversFormComponent
  ],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    MainFormRoutingModule,
    GofundmeFormRoutingModule,
    DeliversFormRoutingModule,
    StoreModule.forRoot(appReducers)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
