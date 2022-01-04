import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ParentComponent } from './parent/parent.component';
import { RedChildComponent } from './red-child/red-child.component';
import { BlueChildComponent } from './blue-child/blue-child.component';
import { HomeComponent } from './home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GreenChildComponent } from './green-child/green-child.component';

@NgModule({
  declarations: [
    AppComponent,
    ParentComponent,
    RedChildComponent,
    BlueChildComponent,
    HomeComponent,
    GreenChildComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
