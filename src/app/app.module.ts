import { DataService } from './services/data.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from 'angularfire2';
import { QueryBrowserComponent } from './components/query-browser/query-browser.component';
import { AppSwitcherComponent } from './components/app-switcher/app-switcher.component';


@NgModule({
  declarations: [
    AppComponent,
    QueryBrowserComponent,
    AppSwitcherComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule,
    FormsModule
  ],
  providers: [
    DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
