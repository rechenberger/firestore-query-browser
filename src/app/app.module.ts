import { DataService } from './services/data.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from 'angularfire2';
import { QueryBrowserComponent } from './components/query-browser/query-browser.component';


@NgModule({
  declarations: [
    AppComponent,
    QueryBrowserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule
  ],
  providers: [
    DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
