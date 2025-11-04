import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
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
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
    locale: 'es',
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay'
    },
    events: []
  };

  constructor(private clasesService: ClasesService) {}

  ngOnInit(): void {
    this.cargarClases();
  }

  cargarClases(): void {
    this.clasesService.getClases().subscribe({
      next: (clases) => {
        console.log('📅 Clases recibidas:', clases);

        const eventos = clases.map((c: any) => ({
          title: `${c.dia.toUpperCase()} - ${c.descripcion}`,
          start: c.fecha,
          color: '#1abc9c'
        }));

        this.calendarOptions = {
          ...this.calendarOptions,
          events: eventos
        };
      },
      error: (err) => console.error('❌ Error al cargar clases:', err)
    });
  }
}
