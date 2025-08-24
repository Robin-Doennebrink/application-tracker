import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import {RouterOutlet} from "@angular/router";
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [AppComponent],
    imports: [BrowserModule, HttpClientModule, RouterOutlet, RouterModule.forRoot([]),],
  bootstrap: [AppComponent]
})
export class AppModule {}
