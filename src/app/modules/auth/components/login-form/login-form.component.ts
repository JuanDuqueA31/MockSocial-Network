import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserDataService } from '../../../services/users/persistence/user-data.service';
import { AuthService } from '../../../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {
  @Output() toggleForm = new EventEmitter<void>();

  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly db = inject(UserDataService);
  private readonly auth = inject(AuthService);

  loginForm!: FormGroup<{
    email: FormControl<string | null>;
    password: FormControl<string | null>;
  }>;

  loginError: string | null = null;

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: new FormControl<string>('', [
        Validators.required,
        Validators.email,
        Validators.minLength(5)
      ]),
      password: new FormControl<string>('', [
        Validators.required,
        Validators.minLength(3)
      ])
    });
  }

  get email() {return this.loginForm.get('email');}

  get password() {return this.loginForm.get('password');}

  onSubmit() {
    this.loginError = null;
    const email: string = this.email?.value ?? '';
    const password: string = this.password?.value ?? '';

    if (email === this.db.userData.email && password === this.db.userPassword) {
      this.auth.buildToken(this.db.userData);
      this.router.navigate(['/users/dashboard']);
    } else {
      this.loginError = 'Email o contraseña incorrectos';
    }
  }
}