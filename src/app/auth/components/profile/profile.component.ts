/*Datos principales del componenete perfil*/

/*Importaciones principales del componente*/
import { Component, OnInit } from '@angular/core';
import { CloudBinaryService }  from '../../../services/cloud-binary.service';
import { NewUsuarioService } from '../../servicios/editarperfil.service'
import { CursoService } from '../../../curso/servicios/curso.service'
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

/* Elementos del coponente para definir sus rutas especificas de valores */
@Component({
  /* Nombre del selector para el componente */
  selector: 'app-profile',
  /* Direccion del modelo HTML del componente */
  templateUrl: './profile.component.html',
  /* Direccion de los estilos CSS del componente */
  styleUrls: ['./profile.component.css'],
})

/* Exportaciones del componente */
export class ProfileComponent implements OnInit {

  // perfilForm: FormGroup;

  /* Atributos principales que se muestran en el perfil */
  correo: any;
  url: any;
  usuario_apellidos: any;
  usuario_id: any;
  usuario_nombre: any;
  descripcion: any;
  cursosm: any;

  /* Objeto para editar los valores del perfil, se iguala a los valores del usuario para evitar problemas 
  a la hora de editarlos */
  objeto = {
    usuario_nombre: sessionStorage.getItem("usuario_nombre"),
    usuario_apellidos: sessionStorage.getItem("usuario_apellidos"),
    correo: sessionStorage.getItem("correo"),
    url: sessionStorage.getItem("url"),
    descripcion: sessionStorage.getItem("descripcion"),
  }

  /* Variable para el cambio al presionar el boton */
  cambio: boolean;

  /* Las constantes del constructor son los datos del usuario en cuestion, obtenidos al importar las funciones
  necesarias en fin de obtener los datos */
  constructor(
    public cloudBinaryService: CloudBinaryService, 
    public newUsuarioService: NewUsuarioService, 
    public cursoService: CursoService,
    // private formBuilder: FormBuilder
    ) {
      this.cambio = false;
      this.correo = sessionStorage.getItem("correo");
      this.url = sessionStorage.getItem("url");
      this.usuario_apellidos = sessionStorage.getItem("usuario_apellidos");
      this.usuario_id = sessionStorage.getItem("usuario_id");
      this.usuario_nombre = sessionStorage.getItem("usuario_nombre");
      this.descripcion = sessionStorage.getItem("descripcion");
  }

  /* En esta parte se obtienen los cursos matriculados de cada usuario */
  ngOnInit(): void {
    this.cursoService.listarCursosPorUsuario2(this.usuario_id).subscribe(rep=>{
      this.cursosm = rep["data"].length;
    })

    /* this.perfilForm = this.formBuilder.group({
      usuario_nombre: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(30)
        ],
      ],
    });*/
  }

  /* get nombreNoValido() {
    return (
      this.perfilForm.get('usuario_nombre').invalid &&
      this.perfilForm.get('usuario_nombre').touched
    );
  } */

  /* Funcion para el cambio al presionar el boton */
  modificarDatos() {
    this.cambio = true;
  }

  /* Metodo para cambiar la imagen, donde se hace uso del CloudBinary */
  modificarImagen(event) {
    this.cloudBinaryService.sendPhoto(event.target.files[0]).subscribe(rep => {
      this.objeto.url = rep["url"];
    });
  }
  
  /* Metodo para enviar los datos y cambiar los datos de perfil */
  enviarDatos(){
    /* Para esto, se obtienen los datos del objeto anteriormente visto en los atributos y se envian mediante
    los metodos importados para cambiar los datos del usuario en la base de datos */
    this.newUsuarioService.editarUsuario(this.objeto).subscribe(rep => {
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
    /* Cambia los elementos para volver a la vista del perfil normal */
    this.cambio = false;
  }
}
