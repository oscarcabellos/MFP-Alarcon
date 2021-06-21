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

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

  usuario: Usuario = new Usuario();
  isFormValid = false;
  areCredentialsInvalid = false;
  signForm: FormGroup;
  token: any;
  authSucces: any;
  unidadOrganicas: any;
  subUnidadOrganicas: any;
  selectedValue: any = true;
  showErrorMessage = false;
  recoveryForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.signForm = this.formBuilder.group({
      correo: ['', Validators.required],
      password: ['', Validators.required],
    });

    this.recoveryForm = this.formBuilder.group({
      correo: ['', Validators.required],
    });

    /* this.buscarUsuario(); */
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

  login() {
    this.authenticationService.authUser(this.usuario).subscribe(
      (response) => { console.log(response);
        /* this.router.navigate(['cursos/crear']); */
        
      }
    );

  }
  buscarUsuario() {
    this.authenticationService
      .authUser({ correo: 'uno@gmail.com', password: 'prueba' })
      .subscribe((x) => console.log(x));
  }
}
