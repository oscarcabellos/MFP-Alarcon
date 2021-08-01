import { Component, OnInit } from '@angular/core';
import { CloudBinaryService }  from '../../../services/cloud-binary.service';
import { NewUsuarioService } from '../../servicios/editarperfil.service'
import { CursoService } from '../../../curso/servicios/curso.service'

@Component({
  /* Elementos del coponente para definir sus rutas especificas de valores */
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {

  /* Atributos que se muestran en el perfil */
  correo: any;
  url: any;
  usuario_apellidos: any;
  usuario_id: any;
  usuario_nombre: any;
  descripcion: any;
  cursosm: any;

  /* Objeto para editar los valores del perfil */
  objeto = {
    usuario_nombre: sessionStorage.getItem("usuario_nombre"),
    usuario_apellidos: sessionStorage.getItem("usuario_apellidos"),
    correo: sessionStorage.getItem("correo"),
    url: sessionStorage.getItem("url"),
    descripcion: sessionStorage.getItem("descripcion"),
  }

  /* Variable para el cambio al presionar el boton */
  cambio: boolean;
  certificados = [1, 2, 3];

  constructor(public CloudBinaryService: CloudBinaryService, public NewUsuarioService: NewUsuarioService, public CursoService: CursoService) {
    this.cambio = false;
    this.correo = sessionStorage.getItem("correo");
    this.url = sessionStorage.getItem("url");
    this.usuario_apellidos = sessionStorage.getItem("usuario_apellidos");
    this.usuario_id = sessionStorage.getItem("usuario_id");
    this.usuario_nombre = sessionStorage.getItem("usuario_nombre");
    this.descripcion = sessionStorage.getItem("descripcion");
  }

  ngOnInit(): void {
    this.CursoService.listarCursosPorUsuario2(this.usuario_id).subscribe(rep=>{
      this.cursosm = rep["data"].length;
    })
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
      this.descripcion = rep["user1"][0]["descripcion"];
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
      sessionStorage.setItem('descripcion', rep["user1"][0]["descripcion"]);
    })
    this.cambio = false;
  }
}
