import { TokenPayload } from '../../../../models/Token.model';
import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { UserData } from '../../../../models/UserData.model';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private readonly userSubject = new BehaviorSubject<UserData | null>(
    this.getUser()
  );

  user$ = this.userSubject.asObservable();

  private getUser(): TokenPayload | null {
    const token = sessionStorage.getItem('token');
    return token ? JSON.parse(token) : null;
  }

  loadUser() {
    const user = this.getUser();
    this.userSubject.next(user);
  }
}
