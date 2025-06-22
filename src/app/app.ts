import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './application/services/auth.service';
import { Navbar } from './presentation/dashboard/navbar/navbar';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'carRentalChallenge.UI';
  authService: AuthService = inject(AuthService);
}
