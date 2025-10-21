import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

@Component({
  selector: 'app-calendario',
  standalone: true,
  imports: [CommonModule, FullCalendarModule],
  templateUrl: './calendario.html',
  styleUrls: ['./calendario.css']
})
export class CalendarioComponent {
  calendarOptions: any = {
    initialView: 'timeGridWeek', // Vista tipo Google Calendar (semana con horas)
    plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
    locale: 'es',
    selectable: true,
    editable: true,
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay'
    },
    events: [
      { title: 'Examen Unidad 1', start: '2025-10-15T10:30:00', color: '#e74c3c' },
      { title: 'Clase Speaking', start: '2025-10-17T11:00:00', color: '#3498db' }
    ],
    dateClick: (info: any) => {
      const titulo = prompt(`Nueva actividad para el ${info.dateStr}`);
      if (titulo) {
        this.calendarOptions.events = [
          ...this.calendarOptions.events,
          { title: titulo, start: info.dateStr, color: '#2ecc71' }
        ];
      }
    }
  };
}
