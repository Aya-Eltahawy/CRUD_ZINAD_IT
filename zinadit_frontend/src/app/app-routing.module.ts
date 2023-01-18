import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApiService } from './api.service';
import { LoginComponent } from './pages/login/login.component';
import { LogincomComponent } from './pages/logincom/logincom.component';
import { NewsComponent } from './pages/news/news.component';

const routes: Routes = [
  {path: 'news', component: NewsComponent, canActivate:[ApiService]},
  {path: '', component: LoginComponent} , 

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
