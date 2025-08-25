import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { AppComponent } from './app.component';
import {RouterOutlet, Routes} from "@angular/router";
import { RouterModule } from '@angular/router';
import {ApplicationOverviewComponent} from "./applications/application-overview/application-overview.component";
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

const routes: Routes = [
    {path: '', component: ApplicationOverviewComponent}
]

@NgModule({ declarations: [AppComponent],
    bootstrap: [AppComponent], imports: [BrowserModule, RouterOutlet, RouterModule.forRoot(routes), BrowserAnimationsModule], providers: [
        provideAnimationsAsync(),
        provideHttpClient(withInterceptorsFromDi())
    ] })
export class AppModule {}
