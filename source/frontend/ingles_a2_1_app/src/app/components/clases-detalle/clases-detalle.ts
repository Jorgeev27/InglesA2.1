import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClasesDetalleService } from '../../services/clasesdetalle';
import Swal from 'sweetalert2';

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

async agregarDetalle() {

  const { value: formValues } = await Swal.fire({
    title: 'Añadir detalle',
    html: `
      <input id="fecha" type="date" class="swal2-input">
      <input id="titulo" class="swal2-input" placeholder="Título">
      <textarea id="descripcion" class="swal2-textarea" placeholder="Descripción"></textarea>
    `,
    focusConfirm: false,
    confirmButtonText: 'Guardar',
    preConfirm: () => {
      const fecha = (document.getElementById('fecha') as HTMLInputElement).value;
      const titulo = (document.getElementById('titulo') as HTMLInputElement).value;
      const descripcion = (document.getElementById('descripcion') as HTMLTextAreaElement).value;

      if (!fecha || !titulo || !descripcion) {
        Swal.showValidationMessage("Todos los campos son obligatorios");
        return false;
      }

      return { fecha, titulo, descripcion };
    }
  });

  if (!formValues) return;

  // --------------------------------------
  // VALIDACIÓN: La fecha debe ser martes o jueves
  // --------------------------------------
  const fechaObj = new Date(formValues.fecha);
  const dia = fechaObj.getDay(); // martes = 2, jueves = 4

  if (dia !== 2 && dia !== 4) {
    Swal.fire({
      icon: 'error',
      title: 'Fecha inválida',
      text: 'Solo puedes guardar detalles en fechas que sean martes o jueves.'
    });
    return;
  }

  // Si es válido → guardar
  this.detalleService.insertarDetalle(formValues).subscribe(() => {
    Swal.fire("Guardado", "Detalle añadido correctamente.", "success");
    this.cargarDetalles();
  });
}

}
