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

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  signForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.signForm = this.formBuilder.group({
      correo: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(15),
        ],
      ],
    });
  }

  get correoNoValido() {
    return (
      this.signForm.get('correo').invalid && this.signForm.get('correo').touched
    );
  }

  get passwordNoValido() {
    return (
      this.signForm.get('password').invalid &&
      this.signForm.get('password').touched
    );
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
