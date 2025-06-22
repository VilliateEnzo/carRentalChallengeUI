import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FlexLayoutModule } from '@ngbracket/ngx-layout';
import { ReactiveFormsModule, FormBuilder, Validators, FormControl, FormGroup } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { InputTextComponent } from '../../shared/forms/input-text/input-text';
import { AuthService } from '../../../application/services/auth.service';
import { User } from '../../../domain/User';
import { LoginRequest } from '../../../domain/RequestModels/LoginRequest';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FlexLayoutModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    InputTextComponent
  ],
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Login {
  authService: AuthService = inject(AuthService);
  form: FormGroup = inject(FormBuilder).group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  get emailControl(): FormControl {
    return this.form.get('email') as FormControl;
  }
  
  get passwordControl(): FormControl {
    return this.form.get('password') as FormControl;
  }  

  onSubmit(): void {
    if (this.form.valid) {
      const loginRequest: LoginRequest = {
        email: this.emailControl.value,
        password: this.passwordControl.value
      };

      this.authService.login(loginRequest).subscribe({
        next: () => {
          console.log('Login successful!');
        },
        error: (err) => {
          console.error('Login failed:', err);
        }
    });
    } else {
      this.form.markAllAsTouched();
    }
  }
}