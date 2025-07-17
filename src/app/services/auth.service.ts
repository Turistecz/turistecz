import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'http://localhost:8080/auth/register';

  constructor(private http: HttpClient) {}

  login(email: string, contrasena: string): Observable<any> {
    return this.http.post(this.apiUrl, { email, contrasena });
  }
  registrarUsuario(usuario: any): Observable<any> {
        return this.http.post(`${this.apiUrl}`, usuario);
    }
}
