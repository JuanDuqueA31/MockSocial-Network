import { Component, inject, OnInit } from '@angular/core';
import { LayoutService } from '../../../services/layout/layout.service';
import { AuthService } from '../../../services/auth/auth.service';
import { TokenPayload } from '../../../models/Token.model';
import { UserData } from '../../../models/UserData.model';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss'
})
export class SidenavComponent implements OnInit{

  layoutService = inject(LayoutService);
  private readonly auth = inject(AuthService)
  private readonly router = inject (Router)

  showHeader$ = this.layoutService.showHeader$;
  showFooter$ = this.layoutService.showFooter$;

  isAdminToggle = false;

  ngOnInit() {
  const adminToken = sessionStorage.getItem('adminToken');
  this.isAdminToggle = !!adminToken; // true si existe, false si no
}

  onAdminToggle(event: MatSlideToggleChange) {
    this.isAdminToggle = event.checked;

    const adminTokenPayload: TokenPayload = {
        userName: 'admin',
        name: 'Administrator',
        email: 'admin@example.com',
        age: 0,
        birthday: new Date(2000, 0, 1),
        rol: 'admin'
      }

    if (this.isAdminToggle) {
      this.buildAdminToken(adminTokenPayload)
      this.router.navigate(["/users/dashboard"])
    } else {
      sessionStorage.removeItem('adminToken');
      this.router.navigate(["/''"])
    }
  }

  buildAdminToken(formInput: UserData,) {
      const payload: TokenPayload = {
        userName: formInput.userName,
        name: formInput.name,
        email: formInput.email,
        age: formInput.age,
        birthday: formInput.birthday!,
        rol: 'user'
      }
  
      sessionStorage.setItem('adminToken', JSON.stringify(payload));
    }
}
