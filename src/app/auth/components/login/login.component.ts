import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../servicios/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
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
      password: ['', Validators.required]
    });

    this.recoveryForm = this.formBuilder.group({
      correo: ['', Validators.required]
    });
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({onlySelf: true});
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }

  onSubmit() {
    if (!this.signForm.valid) {
      this.isFormValid = true;
      this.areCredentialsInvalid = false;
      this.validateAllFormFields(this.signForm);
      return;
    } else {
      this.authenticationService.authUser(this.signForm.value)
        .subscribe(response => {
          if (response.success) {
            if (response.data.activaCuenta) {
              this.router.navigate(['home'])
                .then(() => {
                  window.location.reload();
                });
            } else {
              this.router.navigate(['perfil'])
                .then(() => {
                  window.location.reload();
                });
            }

          } else {
            this.showErrorMessage = true;
          }
        }, error => {
          console.log(error);
        });
    }
  }
}
