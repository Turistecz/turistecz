import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = `${environment.apiBaseUrl}/auth`;  // base común

  constructor(private http: HttpClient) {}

  
  login(email: string, contrasena: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { email, contrasena });
  }

  
  registrarUsuario(usuario: any): Observable<string> {
    return this.http.post(`${this.apiUrl}/register`, usuario, {
      responseType: 'text'
    } as const);
  }

  forgotPassword(email: string) {
  return this.http.post(
    'http://localhost:8080/auth/forgot-password',
    { email },
    { responseType: 'text' }
  );
}

  resetPassword(token: string, nuevaPassword: string): Observable<any>{
    return this.http.post(`${this.apiUrl}/reset-password?token=${token}&nuevaPassword=${nuevaPassword}`, {});
  }

}
