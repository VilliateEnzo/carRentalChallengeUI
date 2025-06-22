import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import { AuthService } from '../services/auth.service';
import { JwtService } from '../services/jwt.service';

export const authGuard: CanActivateFn = (route, state) => {
    const authService: AuthService = inject(AuthService);
    const jwtService: JwtService = inject(JwtService);
    const router = inject(Router);
    const currentUser = authService.currentUser();

    if (currentUser && !jwtService.isTokenExpired(currentUser.token)) {
        return true;
    }

    authService.logout();
    router.navigate(['']);

    return false;
};
