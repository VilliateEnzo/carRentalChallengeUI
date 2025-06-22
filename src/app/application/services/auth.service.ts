import { Observable, switchMap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { User } from '../../domain/User';
import { environment } from '../../../environments/environment';
import { LoginRequest } from '../../domain/RequestModels/LoginRequest';
import { RegisterRequest } from '../../domain/RequestModels/RegisterRequest';
import { map } from 'rxjs';
import { UUID } from 'crypto';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http: HttpClient = inject(HttpClient);
  private router: Router = inject(Router);
  private baseUrl: string = environment.apiUrl;
  currentUser = signal<User | null>(null);

  constructor() {}

  login(model: LoginRequest): Observable<void> {
    return this.http.post<User>(`${this.baseUrl}/customers/login`, model).pipe(
      map(user => {
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
          this.currentUser.set(user);
        }
      })
    );
  }

  logout() : void {
    localStorage.removeItem('user');
    this.currentUser.set(null);
    this.router.navigate(['']);
  }

  register(model: RegisterRequest): Observable<UUID> {
    return this.http.post<UUID>(`${this.baseUrl}/customers`, model);
  }

  registerAndLogin(model: RegisterRequest): Observable<void> {
    return this.register(model).pipe(
      switchMap(() => this.login({ email: model.email, password: model.password }))
    );
  }
}