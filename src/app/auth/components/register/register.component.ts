/* Archivo principal para administrar el componente registro */

/* Importaciones del componente */
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/curso/modelo/usuario';
import Swal from 'sweetalert2';
import { UsuarioService } from '../../servicios/usuario.service';

/* Elementos del coponente para definir sus rutas especificas de valores */
@Component({
  /* Nombre del selector para el componente */
  selector: 'register',
  /* Direccion del modelo HTML del componente */
  templateUrl: './register.component.html',
  /* Direccion de los estilos CSS del componente */
  styleUrls: ['./register.component.css'],
})

/* Exportaciones del componente */
export class RegisterComponent implements OnInit {
  /* Atributo que determina el label para implementar los datos del usuario */
  registroForm: FormGroup;

  /* Constructor donde se importan las funciones que usa la logica del componente */
  constructor(
    private usuarioService: UsuarioService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  /* Funciones principales para validar los datos ingresados en los forms */
  ngOnInit(): void {
    this.registroForm = this.formBuilder.group({
      usuario_nombre: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(30),
        ],
      ],
      usuario_apellidos: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(30),
        ],
      ],
      correo: [
        '',
        [Validators.required, Validators.email, Validators.maxLength(30)],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(15),
        ],
      ],
      passwordValidacion: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(15),
        ],
      ],
    });
  }

  /* Obtencion en caso de no poner un nombre valido */
  get nombreNoValido() {
    return (
      this.registroForm.get('usuario_nombre').invalid &&
      this.registroForm.get('usuario_nombre').touched
    );
  }
  /* Obtencion en caso de poner un apellido valido */
  get apellidoNoValido() {
    return (
      this.registroForm.get('usuario_apellidos').invalid &&
      this.registroForm.get('usuario_apellidos').touched
    );
  }
  /* Obtencion en caso de no poner un correo valido */
  get correoNoValido() {
    return (
      this.registroForm.get('correo').invalid &&
      this.registroForm.get('correo').touched
    );
  }
  /* Obtencion en caso de no poner una contraseña valida */
  get passwordNoValido() {
    return (
      this.registroForm.get('password').invalid &&
      this.registroForm.get('password').touched
    );
  }

  /* Metodo para enviar los elementos y datos del nuevo usuario y confirmarlo en la base de datos */
  crearUsuario(usuario: Usuario) {
    this.usuarioService.crearUsuario(usuario).subscribe((x) => {
      Swal.fire({
        title: 'Registro exitoso',
        text: `La cuenta se ha creado con exito`,
        icon: 'success',
        confirmButtonColor: '#2F6DF2',
        timer: 1500,
      });
      this.router.navigate(['user/login']);
    });
  }

  /* Metodo para verificar los datos y redirigir al usuario al sistema en modo de su cuenta */
  validarFormulario() {
    if (
      this.registroForm.valid &&
      this.validarPassword(
        this.registroForm.value['password'],
        this.registroForm.value['passwordValidacion']
      )
    ) {
      const usuario = new Usuario();
      usuario.usuario_nombre = this.registroForm.value['usuario_nombre'];
      usuario.usuario_apellidos = this.registroForm.value['usuario_apellidos'];
      usuario.correo = this.registroForm.value['correo'];
      usuario.password = this.registroForm.value['password'];

      this.crearUsuario(usuario);
    } else {
      this.validateAllFormFields(this.registroForm);
    }
  }

  /* Metodo que apoya en la validacion del password */
  validarPassword(password: string, passwordValidadion: string) {
    if (password === passwordValidadion) {
      return true;
    } else {
      alert('contraseñas diferentes');
      return false;
    }
  }

  /* Metodo para validar los valores de la funcion anterior */
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
}
