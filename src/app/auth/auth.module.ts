 /**
     * se importo NgModule
     */
import { NgModule } from '@angular/core';

 /**
     * se importo Commonmodule
     */
import { CommonModule } from '@angular/common';

 /**
     * se importo AuthRoutingmodule
     */
import { AuthRoutingModule } from './auth-routing.module';

/**
     * se importo LoginComponente
     */
import { LoginComponent } from './components/login/login.component';

/**
     * se importo ProfileComponent
     */
import { ProfileComponent } from './components/profile/profile.component';

/**
     * se importo RegisterComponent
     */
import { RegisterComponent } from './components/register/register.component';

/**
     * se importo ReactiveFormsModulo
     */
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

/**
* declaraciones
*/
@NgModule({
  declarations: [LoginComponent, ProfileComponent, RegisterComponent],
  imports: [CommonModule, ReactiveFormsModule, FormsModule, AuthRoutingModule],
})

/**
* Exportando
*/
export class AuthModule {}
