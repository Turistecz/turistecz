import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrlRegister = 'http://localhost:8080/auth/register';
  private apiUrlLogin = 'http://localhost:8080/api/login/signin'

  constructor(private http: HttpClient) {}

  login(email: string, contrasena: string): Observable<any> {
    return this.http.post(this.apiUrlLogin, { email, contrasena });
  }

  registrarUsuario(usuario: any): Observable<string> {
    return this.http.post(`${this.apiUrlRegister}`, usuario, {
      responseType: 'text'
    } as const);
  }
}
