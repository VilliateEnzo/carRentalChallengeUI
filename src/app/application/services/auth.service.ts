import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { User } from '../../domain/User';
import { environment } from '../../../environments/environment';
import { LoginRequest } from '../../domain/RequestModels/LoginRequest';
import { RegisterRequest } from '../../domain/RequestModels/RegisterRequest';
import { map } from 'rxjs';
import { UUID } from 'crypto';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http: HttpClient = inject(HttpClient);
  private baseUrl: string = environment.apiUrl;
  currentUser = signal<User | null>(null);

  constructor() { }

  login(model: LoginRequest) {
    return this.http.post<User>(`${this.baseUrl}/customers/login`, model).pipe(
      map(user => {
        if (!!user) {
          localStorage.setItem('user', JSON.stringify(user));
          this.currentUser.set(user);
        }
      })
    );
  }

  register(model: RegisterRequest) {
        return this.http.post<UUID>(`${this.baseUrl}/customers`, model).pipe();
  }
}
