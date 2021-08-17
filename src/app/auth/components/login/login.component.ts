/* Este es el archivo principal en Typescript del componenete login */

/*Importaciones principales del componente*/
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/curso/modelo/usuario';
import { AuthenticationService } from '../../servicios/authentication.service';
import Swal from 'sweetalert2';

/* Elementos del coponente para definir sus rutas especificas de valores */
@Component({
  /* Nombre del selector para el componente */
  selector: 'app-login',
  /* Direccion del modelo HTML del componente */
  templateUrl: './login.component.html',
  /* Direccion de los estilos CSS del componente */
  styleUrls: ['./login.component.css'],
})

/* Exportaciones del componente */
export class LoginComponent implements OnInit {
  /* Atributo que determina el label para implementar los datos del usuario */
  signForm: FormGroup;

  /* Constructor donde se importan las funciones que usa la logica del componente */
  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}

  /* Funciones principales para validar los datos ingresados en los forms */
  ngOnInit(): void {
    this.signForm = this.formBuilder.group({
      correo: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(15),
        ],
      ],
    });
  }

  /* Obtencicon al colocar un correo invalido */
  get correoNoValido() {
    return (
      this.signForm.get('correo').invalid && this.signForm.get('correo').touched
    );
  }

  /* Obtencion al colocar una contraseña invalida */
  get passwordNoValido() {
    return (
      this.signForm.get('password').invalid &&
      this.signForm.get('password').touched
    );
  }

  /* Metodo para apoyar y definir el validar los formularios */
  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach((field) => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }

  /* Metodo para verificar los datos y redirigir al usuario al sistema en modo de su cuenta */
  login(usuario: Usuario) {
    this.authenticationService.authUser(usuario).subscribe((response) => {
      if (response['user']?.usuario_id != null) {
        this.router.navigate(['cursos/dashboard']).then(() => {
          window.location.reload();
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Credenciales no válidas',
          timer: 1500,
          timerProgressBar: true,
          position: 'top-end',
          width: '25rem',
          showConfirmButton: false,
        });
      }
    });
  }

  /* Metodo para validar los valores de la funcion anterior */
  validarValores() {
    if (this.signForm.valid) {
      const usuario: Usuario = new Usuario();
      usuario.correo = this.signForm.get('correo').value;
      usuario.password = this.signForm.get('password').value;
      this.login(usuario);
    } else {
      this.validateAllFormFields(this.signForm);
    }
  }
}
