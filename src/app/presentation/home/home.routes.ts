import {Routes} from "@angular/router";
import { HomeLayout } from "./home-layout/home-layout";
import { Login } from "./login/login";
import { Register } from "./register/register";

export const HOME_ROUTES: Routes = [
  { path: '', component: HomeLayout },
  { path: 'login', component: Login},
  { path: 'register', component: Register}
];
