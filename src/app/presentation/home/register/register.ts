import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AuthService } from '../../../application/services/auth.service';
import { FormGroup, FormBuilder, Validators, FormControl, ReactiveFormsModule } from '@angular/forms';
import { LoginRequest } from '../../../domain/RequestModels/LoginRequest';
import { RegisterRequest } from '../../../domain/RequestModels/RegisterRequest';
import { FlexLayoutModule } from '@ngbracket/ngx-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { InputTextComponent } from '../../shared/forms/input-text/input-text';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [
    FlexLayoutModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    InputTextComponent
  ],
  templateUrl: './register.html',
  styleUrl: './register.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Register {
  private authService: AuthService = inject(AuthService);
  private toastr: ToastrService = inject(ToastrService);
  private router: Router = inject(Router)
  
  form: FormGroup = inject(FormBuilder).group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    firstName: ['', [Validators.required, Validators.maxLength(20)]], 
    lastName: ['', [Validators.required, Validators.maxLength(20)]], 
    address: ['', [Validators.required, Validators.maxLength(20)]], 
  });

  get emailControl(): FormControl {
    return this.form.get('email') as FormControl;
  }
  
  get passwordControl(): FormControl {
    return this.form.get('password') as FormControl;
  }  

  get firstNameControl(): FormControl {
    return this.form.get('firstName') as FormControl;
  }
  
  get lastNameControl(): FormControl {
    return this.form.get('lastName') as FormControl;
  } 
  
  get addressControl(): FormControl {
    return this.form.get('address') as FormControl;
  }  

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const registerRequest: RegisterRequest = this.form.value;

    this.authService.registerAndLogin(registerRequest).subscribe({
      next: () => {
        this.toastr.success('Registered and logged in!');
        this.router.navigate(['/dashboard']);
      },
      error: () => {
        this.toastr.error('Registration or login failed.');
      }
    });
  }
}
