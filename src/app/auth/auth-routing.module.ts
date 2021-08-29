 /**
     * se importo NgModule
     */
import { NgModule } from '@angular/core';

/**
     * se importo RouterModule y Routes
     */
import { RouterModule, Routes } from '@angular/router';

/**
     * se importo LoginComponent
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
     * se establecio las rutas
     */
const routes: Routes = [
  { path: '', redirectTo: 'login' },
  { path: 'login', component: LoginComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'register', component: RegisterComponent },
];

/**
     * se importo y exporto
     */
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

/**
     * Exportando
     */
export class AuthRoutingModule {}
