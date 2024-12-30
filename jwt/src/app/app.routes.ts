import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './services/auth.guard';

export const routes: Routes = [

  {path: 'login', component:LoginComponent}
];
