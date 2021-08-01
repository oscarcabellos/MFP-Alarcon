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

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registroForm: FormGroup;

  constructor(
    private usuarioService: UsuarioService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

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
  get nombreNoValido() {
    return (
      this.registroForm.get('usuario_nombre').invalid &&
      this.registroForm.get('usuario_nombre').touched
    );
  }
  get apellidoNoValido() {
    return (
      this.registroForm.get('usuario_apellidos').invalid &&
      this.registroForm.get('usuario_apellidos').touched
    );
  }
  get correoNoValido() {
    return (
      this.registroForm.get('correo').invalid &&
      this.registroForm.get('correo').touched
    );
  }
  get passwordNoValido() {
    return (
      this.registroForm.get('password').invalid &&
      this.registroForm.get('password').touched
    );
  }
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
  validarPassword(password: string, passwordValidadion: string) {
    if (password === passwordValidadion) {
      return true;
    } else {
      alert('contraseñas diferentes');
      return false;
    }
  }
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
