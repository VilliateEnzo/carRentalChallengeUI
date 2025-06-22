import { inject, Injectable } from '@angular/core';
import { User } from '../../domain/User';
import { AuthService } from './auth.service';
import { jwtDecode } from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class JwtService {
    private authService: AuthService = inject(AuthService);

    constructor() {}

    checkTokenValidity(): boolean {
        const userString = localStorage.getItem('user');
        if (!userString) {
            return false;
        }

        const user: User = JSON.parse(userString);
        const tokenExpired = this.isTokenExpired(user.token);

        if (tokenExpired) {
            this.authService.logout();
            return false;
        } 
        
        this.authService.currentUser.set(user);
        return true;
    }

    isTokenExpired(token: string): boolean {
        try {
            const decoded: any = jwtDecode(token);
            const currentTime = Math.floor(Date.now() / 1000);
            return decoded.exp < currentTime;
        } catch (e) {
            return true;
        }
    }
}