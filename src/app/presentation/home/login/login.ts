import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FlexLayoutModule } from '@ngbracket/ngx-layout';
import { ReactiveFormsModule, FormBuilder, Validators, FormControl, FormGroup } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { InputTextComponent } from '../../shared/forms/input-text/input-text';
import { AuthService } from '../../../application/services/auth.service';
import { LoginRequest } from '../../../domain/RequestModels/LoginRequest';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

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
  private authService: AuthService = inject(AuthService);
  private toastr: ToastrService = inject(ToastrService);
  private router: Router = inject(Router)

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
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const loginRequest: LoginRequest = this.form.value;

    this.authService.login(loginRequest).subscribe({
      next: () => {
        this.toastr.success('Login successful!');
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        const errorMessage = typeof err === 'string' ? err : 'Login failed';
        this.toastr.error(errorMessage);
      }
    });
  }
}