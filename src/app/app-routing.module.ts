import { MainComponent } from './components/main/main.component'
import { QueryBrowserComponent } from './components/query-browser/query-browser.component'
import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { LoginComponent } from './components/login/login.component'
import { AddAppComponent } from './components/add-app/add-app.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: '',
        component: QueryBrowserComponent
      },
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'add',
        component: AddAppComponent
      }
    ]
  },
  {
    path: '**',
    redirectTo: '/'
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
