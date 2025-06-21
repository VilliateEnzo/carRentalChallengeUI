import { Routes } from '@angular/router';
import { HomeLayout } from './presentation/home/home-layout/home-layout';

export const routes: Routes = [
    {
        path: '',
        loadChildren:  () => import('./presentation/home/home.routes').then(m => m.HOME_ROUTES)
    },
];
