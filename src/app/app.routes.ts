import { Routes } from '@angular/router';
import { authGuard } from './application/guards/auth.guard';
import { alreadyAuthGuard } from './application/guards/alreadyAuth.guard';

export const routes: Routes = [
    {
        path: '',
        loadChildren:  () => import('./presentation/home/home.routes').then(m => m.HOME_ROUTES),
        canActivate: [alreadyAuthGuard]
    },
    {
        path: 'dashboard',
        loadChildren:  () => import('./presentation/dashboard/dashboard.routes').then(m => m.DASHBOARD_ROUTES),
        canActivate: [authGuard],
    },
];
