import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/curso/modelo/usuario';
import Swal from 'sweetalert2';
import { UsuarioService } from '../../servicios/usuario.service';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  usuario: Usuario=new Usuario();

  constructor(
    private usuarioService: UsuarioService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  crearUsuario(){
    console.log(this.usuario);
    
    this.usuarioService.crearUsuario(this.usuario).subscribe(
      x=>{
        Swal.fire({
          title:'Registro exitoso', 
          text: `La cuenta se ha creado con exito`,
          icon: 'success',
          confirmButtonColor: "#2F6DF2"
        }); 
        this.router.navigate(['user/login']);
      }
    )
    
  }

}
