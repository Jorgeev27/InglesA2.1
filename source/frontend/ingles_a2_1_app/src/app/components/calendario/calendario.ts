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

  clases: any[] = [];

  calendarOptions: any = {
    plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
    initialView: 'dayGridMonth',
    selectable: true,
    editable: false,
    locale: 'es',
    headerToolbar: {
      left: 'prev,next',
      center: 'title',
      right: 'timeGridDay,timeGridWeek,dayGridMonth'
    },
    events: [],
    dateClick: (info: any) => this.onDateClick(info),
    eventClick: (info: any) => this.onEventClick(info)     // ✅ AÑADIDO
  };

  constructor(private clasesService: ClasesService) {}

  ngOnInit(): void {
    this.cargarClases();
  }

  cargarClases() {
    this.clasesService.obtenerClases().subscribe(data => {
      this.clases = data;   // Guardamos todas las clases

      this.calendarOptions.events = data.map((clase: any) => ({
        title: clase.descripcion,
        start: clase.fecha,
        color: "#3498db"
      }));
    });
  }

  // ────────────────────────────────────────────
  //  CLICK EN DÍA
  // ────────────────────────────────────────────
  onDateClick(info: any) {

    // 1️⃣ Comprobar si ese día YA tiene clase
    const claseExistente = this.clases.find(c => c.fecha === info.dateStr);

    if (claseExistente) {
      Swal.fire({
        title: info.dateStr,
        html: `
          <div style="font-size:18px; text-align:left;">
            <b>Contenido de la clase:</b><br>
            ${claseExistente.descripcion}
          </div>
        `,
        confirmButtonText: "Cerrar",
        icon: "info"
      });
      return;
    }

    // 2️⃣ Si no existe → permitir crearla
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
      inputPlaceholder: "Ej: Reading + Listening",
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

  // ────────────────────────────────────────────
  //  CLICK EN EVENTO
  // ────────────────────────────────────────────
  onEventClick(info: any) {
    const descripcion = info.event.title;
    const fecha = info.event.startStr;

    Swal.fire({
      title: fecha,
      html: `
        <div style="font-size:18px; text-align:left;">
          <b>Contenido de la clase:</b><br>
          ${descripcion}
        </div>
      `,
      icon: "info",
      confirmButtonText: "Aceptar"
    });
  }
}
