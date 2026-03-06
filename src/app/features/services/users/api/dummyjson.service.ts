import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { UserResponse } from '../../../../models/User.model';

@Injectable({
  providedIn: 'root'
})
export class DummyjsonService {

  http: HttpClient = inject(HttpClient);

  constructor() { }

  private readonly URL_DUMMY_USERS: string = 'https://dummyjson.com/users';

  getUserById(userId: number) {
    return this.http.get<UserResponse>(`${this.URL_DUMMY_USERS}/${userId}`);
  }

  getAllUsers(limit: number, skip: number ) {

    let httpParams = new HttpParams()
    .set('limit', limit.toString())
    .set('skip', skip.toString());
    
    return this.http.get<UserResponse>(this.URL_DUMMY_USERS, { params: httpParams });
  }
}
