import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClasesDetalleService } from '../../services/clasesdetalle';

@Component({
  selector: 'app-clases-detalle',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './clases-detalle.html',
  styleUrls: ['./clases-detalle.css']
})
export class ClasesDetalle implements OnInit {

  detalles: any[] = [];

  constructor(private detalleService: ClasesDetalleService) {}

  ngOnInit(): void {
    this.cargarDetalles();
  }

  cargarDetalles() {
    this.detalleService.obtenerClasesDetalle().subscribe(data => {
      this.detalles = data;
    });
  }
}
