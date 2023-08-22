import { Component } from '@angular/core';
import { ComprasRealizadas } from 'src/app/model/comprasrealizadas.model';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {

  constructor(private api: ApiService) {

  }

  hola() {
    this.api.getPersonas().then(a => {
      console.log(a)

      console.log(a.personas)
    })
  }

  addCompra() {
    const compra: ComprasRealizadas = {
      id_persona: 1, id_producto: 1,
      descripcion: 'Prueba'
    }
    //   {
    //   id_persona = 1,
    //   id_producto = 1,
    //   descripcion = 'ASD'
    // }

    this.api.addCompraRealizada(compra)
  }
}
