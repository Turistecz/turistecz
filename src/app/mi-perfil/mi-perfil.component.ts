import { Component } from '@angular/core';
import { LoginService } from '../services/login.service';


@Component({
  selector: 'app-mi-perfil',
  imports: [],
  templateUrl: './mi-perfil.component.html',
  styleUrl: './mi-perfil.component.css'
})
export class MiPerfilComponent {
  constructor ( private LoginService : LoginService ){
    this.LoginService.getUsuario
  }
  
  
}
