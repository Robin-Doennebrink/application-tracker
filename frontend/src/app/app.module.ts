import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import {RouterOutlet, Routes} from "@angular/router";
import { RouterModule } from '@angular/router';
import {ApplicationOverviewComponent} from "./applications/application-overview/application-overview.component";
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

const routes: Routes = [
    {path: '', component: ApplicationOverviewComponent}
]

@NgModule({
    declarations: [AppComponent],
    imports: [BrowserModule, HttpClientModule, RouterOutlet, RouterModule.forRoot(routes), BrowserAnimationsModule ],
    bootstrap: [AppComponent],
    providers: [
      provideAnimationsAsync()
    ]
})
export class AppModule {}
