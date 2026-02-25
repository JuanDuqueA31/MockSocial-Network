import { Component } from '@angular/core';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrl: './auth-page.component.scss'
})
export class AuthPageComponent {
  isLogin: boolean = true;

  toggleForm(){
    this.isLogin = !this.isLogin;
  }
}
