import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {
    login(user: string, password: string): boolean {
        return true;
    }


    logout(): any {
        
    }

    getUser(): any {
       
    }

    isLoggedIn(): boolean {
       return false;
    }


    createUser(userName: string, password : string){
        
    }

}

export const AUTH_PROVIDERS: Array<any> = [
  { provide: AuthService, useClass: AuthService }
];
