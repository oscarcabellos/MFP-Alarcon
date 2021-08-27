/**
 * Se importa las dependecias desde el core de angular
 */
import { Component, OnInit } from '@angular/core';

/**
 * Se declaran las dependencias con otros archivos
 */
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
/**
 * Se crea la clase para el componente footer
 */
export class FooterComponent implements OnInit {
  /**
   * Contructor del componente footer
   */
  constructor() {
    //Codigo
  }

  /**
   * Función que se llama al crear el componente
   */
  ngOnInit(): void {
    // Codigo de inicializacion del componente
  }
}
