import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'http://localhost:8080/auth';  // base común

  constructor(private http: HttpClient) {}

  // 🔹 Login
  login(email: string, contrasena: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { email, contrasena });
  }

  // 🔹 Registro
  registrarUsuario(usuario: any): Observable<string> {
    return this.http.post(`${this.apiUrl}/register`, usuario, {
      responseType: 'text'
    } as const);
  }
}
