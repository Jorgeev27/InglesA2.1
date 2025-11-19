import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import Swal from 'sweetalert2';

import { ClasesService } from '../../services/clases';

@Component({
  selector: 'app-calendario',
  standalone: true,
  imports: [CommonModule, FullCalendarModule],
  templateUrl: './calendario.html',
  styleUrls: ['./calendario.css']
})
export class CalendarioComponent implements OnInit {

  calendarOptions: any = {
    plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
    initialView: 'dayGridMonth',
    selectable: true,
    editable: false,
    locale: 'es',
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay'
    },
    events: [],
    dateClick: (info: any) => this.onDateClick(info)
  };

  constructor(private clasesService: ClasesService) {}

  ngOnInit(): void {
    this.cargarClases();
  }

  cargarClases() {
    this.clasesService.obtenerClases().subscribe(data => {
      this.calendarOptions.events = data.map((clase: any) => ({
        title: clase.descripcion,
        start: clase.fecha,
        color: "#3498db"
      }));
    });
  }

  onDateClick(info: any) {
    const fecha = new Date(info.dateStr);
    const dia = fecha.getDay(); // martes = 2, jueves = 4

    if (dia !== 2 && dia !== 4) {
      Swal.fire({
        icon: 'error',
        title: 'Solo martes o jueves',
        text: 'Solo puedes guardar clases los martes y jueves.'
      });
      return;
    }

    Swal.fire({
      title: "Añadir clase",
      input: "text",
      inputLabel: "Descripción:",
      inputPlaceholder: "Ej: Repasamos página 25-26",
      showCancelButton: true,
      confirmButtonText: "Guardar"
    }).then(result => {
      if (!result.value) return;

      const nuevaClase = {
        fecha: info.dateStr,
        descripcion: result.value
      };

      this.clasesService.insertarClase(nuevaClase).subscribe(() => {
        Swal.fire("Guardado", "La clase se añadió correctamente.", "success");
        this.cargarClases();
      });
    });
  }
}
