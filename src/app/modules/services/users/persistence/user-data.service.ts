import { UserData } from './../../../models/UserData.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  userData: UserData = {
    userName: '',
    name: '',
    email: '',
    age: 0,
    birthday: null
  };
  userPassword: string = '';
}
