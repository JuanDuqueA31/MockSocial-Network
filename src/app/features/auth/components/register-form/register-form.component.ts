import { Component, EventEmitter, Output, OnInit, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { UserDataService } from '../../../services/users/persistence/user-data.service';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent implements OnInit {
  @Output() toggleForm = new EventEmitter<void>();

  private readonly fb = inject(FormBuilder);
  private readonly db = inject(UserDataService)
  
  registerForm!: FormGroup<{
    username: FormControl<string | null>;
    name: FormControl<string | null>;
    email: FormControl<string | null>;
    age: FormControl<number | null>;
    birthday: FormControl<Date | null>;
    password: FormControl<string | null>;
    confirmPassword: FormControl<string | null>;
  }>;

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      username: new FormControl<string>('', [Validators.required, Validators.minLength(3)]),
      name: new FormControl<string>('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl<string>('', [Validators.required, Validators.email]),
      age: new FormControl<number>(0, [Validators.required, Validators.min(18)]),
      birthday: new FormControl<Date>(new Date(), [Validators.required]),
      password: new FormControl<string>('', [Validators.required, Validators.minLength(3)]),
      confirmPassword: new FormControl<string>('', [Validators.required])
    }, { validators: this.passwordMatchValidator });
  }

  // Validator para que password y confirmPassword coincidan
  passwordMatchValidator(group: AbstractControl) {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }


  get username() { return this.registerForm.get('username'); }
  get name() { return this.registerForm.get('name'); }
  get email() { return this.registerForm.get('email'); }
  get age() { return this.registerForm.get('age'); }
  get birthday() { return this.registerForm.get('birthday'); }
  get password() { return this.registerForm.get('password'); }
  get confirmPassword() { return this.registerForm.get('confirmPassword'); }

  onSubmit() {
    if (this.registerForm.valid) {
      this.db.userData.userName = this.username?.value ?? '';
      this.db.userData.name = this.name?.value ?? '';
      this.db.userData.email = this.email?.value ?? '';
      this.db.userData.age = this.age?.value ?? 0;
      this.db.userData.birthday = this.birthday?.value ?? null;
      this.db.userPassword = this.password?.value ?? ''

      this.toggleForm.emit();
    } else {
      this.registerForm.markAllAsTouched();
    }
  }
}