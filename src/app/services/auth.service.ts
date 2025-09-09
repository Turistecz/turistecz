import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'http://localhost:8080/auth';  // base común

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

}
