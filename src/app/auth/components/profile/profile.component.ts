import { Component, OnInit } from '@angular/core';
import { CloudBinaryService }  from '../../../services/cloud-binary.service';
import { NewUsuarioService } from '../../servicios/editarperfil.service'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {

  correo: any;
  url: any;
  usuario_apellidos: any;
  usuario_id: any;
  usuario_nombre: any;

  /* Objeto para editar los valores del perfil */
  objeto = {
    usuario_nombre: "",
    usuario_apellidos: "",
    correo: "",
    url: "",
    descripcion: "",
  }

  /* Variable para el cambio al presionar el boton */
  cambio: boolean;
  certificados = [1, 2, 3];

  constructor(public CloudBinaryService: CloudBinaryService, public NewUsuarioService: NewUsuarioService) {
    this.cambio = false;
    this.correo = sessionStorage.getItem("correo");
    this.url = sessionStorage.getItem("url");
    this.usuario_apellidos = sessionStorage.getItem("usuario_apellidos");
    this.usuario_id = sessionStorage.getItem("usuario_id");
    this.usuario_nombre = sessionStorage.getItem("usuario_nombre");
  }

  ngOnInit(): void {
    // Codigo de inicializacion del componente
  }

  /* Funcion para el cambio al presionar el boton */
  modificarDatos() {
    this.cambio = true;
  }

  /* Metodo para cambiar la imagen */
  modificarImagen(event) {
    this.CloudBinaryService.sendPhoto(event.target.files[0]).subscribe(rep => {
      this.objeto.url = rep["url"];
    });
  }
  
  /* Metodo para enviar los datos y cambiar los datos de perfil */
  enviarDatos(){
    this.NewUsuarioService.editarUsuario(this.objeto).subscribe(rep => {
      this.correo = rep["user1"][0]["correo"];
      this.url = rep["user1"][0]["url"];
      this.usuario_apellidos = rep["user1"][0]["usuario_apellidos"];
      this.usuario_id = rep["user1"][0]["usuario_id"];
      this.usuario_nombre = rep["user1"][0]["usuario_nombre"];
      sessionStorage.setItem('usuario_id', rep["user1"][0]["usuario_id"]);
      sessionStorage.setItem(
        'usuario_apellidos',
        rep["user1"][0]["usuario_apellidos"]
      );
      sessionStorage.setItem(
        'usuario_nombre',
        rep["user1"][0]["usuario_nombre"]
      );
      sessionStorage.setItem('correo', rep["user1"][0]["correo"]);
      sessionStorage.setItem('url', rep["user1"][0]["url"]);
    })
    this.cambio = false;
  }
}
