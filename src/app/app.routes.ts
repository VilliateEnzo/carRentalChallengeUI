import { Routes } from '@angular/router';
import { authGuard } from './application/guards/auth.guard';

export const routes: Routes = [
    {
        path: '',
        loadChildren:  () => import('./presentation/home/home.routes').then(m => m.HOME_ROUTES)
    },
    {
        path: 'dashboard',
        loadChildren:  () => import('./presentation/dashboard/dashboard.routes').then(m => m.DASHBOARD_ROUTES),
        canActivate: [authGuard],
    },
];
