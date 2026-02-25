import { UserData } from './../../models/UserData.model';
import { inject, Injectable } from '@angular/core';
import { TokenPayload } from '../../models/Token.model';
import { DashboardService } from '../users/dashboard/dashboard.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly dashboardService = inject(DashboardService);

  buildToken(formInput: UserData,) {
    const payload: TokenPayload = {
      userName: formInput.userName,
      name: formInput.name,
      email: formInput.email,
      age: formInput.age,
      birthday: formInput.birthday!,
      rol: 'user'
    }

    sessionStorage.setItem('token', JSON.stringify(payload));
    this.dashboardService.loadUser();
  }
  
  verifyToken(): boolean {
    if( sessionStorage.getItem('token') || sessionStorage.getItem('adminToken')){
      return true
    } else{
      return false
    };
  }

  /* 
  buildToken(formInput: UserData, expiresIn: number = 7200) {
    const payload = {
      userName: formInput.userName,
      name: formInput.name,
      email: formInput.email,
      age: formInput.age,
      birthday: formInput.birthday,
      rol: 'user'
    }

    const token = jwt.sign(payload, env.SECRET_KEY, { expiresIn: expiresIn } )
    sessionStorage.setItem('token', token);
  }

  verifyToken(): Promise<boolean>{
    const token = sessionStorage.getItem('token')
    if (!token) return Promise.resolve(false);

    return new Promise((resolve,reject) => {
      jwt.verify(token, env.SECRET_KEY, (error, decodedToken) =>{
        if (error){
          reject(error)
        }else{
          resolve(true)
        }
      });
    })
    
  }

  decodeToken(): TokenPayload | null{
    const token = sessionStorage.getItem('token')
    if (!token) return null;
    return jwt.decode(token) as TokenPayload;
  }*/
}
