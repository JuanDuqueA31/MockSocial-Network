import { inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from '../../../models/User.model';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  http = inject(HttpClient)

  constructor() { }

  private readonly user = new BehaviorSubject<User | null>(null);

  user$ = this.user.asObservable();

  fetchUserData(id: number): void{
    this.http.get<User>(`https://dummyjson.com/users/${id}`).subscribe( user => {
      this.user.next(user);
    });
  }

}
