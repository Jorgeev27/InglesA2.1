import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { ExamenesService } from '../../services/examenes';

@Component({
  selector: 'app-examenes',
  templateUrl: './examenes.html',
  styleUrls: ['./examenes.css']
})
export class ExamenesComponent implements OnInit {

  constructor(private examenesService: ExamenesService) {}

  ngOnInit(): void {
    this.cargarExamenes();
  }

  cargarExamenes() {
    this.examenesService.obtenerExamenes().subscribe((exams: any[]) => {
      const today = new Date().toISOString().split("T")[0];
      let futureHTML = '';
      let pastHTML = '';

      exams.forEach(exam => {
        if (exam.fecha >= today) {
          futureHTML += `
            <figure>
              <blockquote class="blockquote">
                <p><strong>${exam.descripcion}</strong> - ${exam.fecha}</p>
              </blockquote>
            </figure>`;
        } else {
          pastHTML += `
            <li>
              <a class="d-flex flex-column flex-lg-row gap-3 align-items-start align-items-lg-center py-3 link-body-emphasis text-decoration-none border-top">
                <img src="../../../assets/img/banderaInglaterra.jpg" width="33%">
                <div class="col-lg-8">
                  <h6 class="mb-0">${exam.descripcion}</h6>
                  <small class="text-body-secondary">${exam.fecha}</small>
                </div>
              </a>
            </li>`;
        }
      });

      const futureContainer = document.getElementById('futureExamsContainer');
      const pastContainer = document.getElementById('pastExamsContainer');
      if(futureContainer) futureContainer.innerHTML = futureHTML;
      if(pastContainer) pastContainer.innerHTML = pastHTML;
    });
  }

  anadirExamen() {
    Swal.fire({
      title: 'Añadir examen',
      html: `
        <input id="examDesc" class="swal2-input" placeholder="Descripción">
        <input id="examDate" type="date" class="swal2-input">`,
      focusConfirm: false,
      preConfirm: () => {
        const desc = (document.getElementById('examDesc') as HTMLInputElement).value;
        const date = (document.getElementById('examDate') as HTMLInputElement).value;
        const day = new Date(date).getDay();
        if (!desc.trim()) Swal.showValidationMessage('Pon la descripción');
        if (day !== 2 && day !== 4) Swal.showValidationMessage('La fecha debe ser martes o jueves');
        return { descripcion: desc, fecha: date };
      }
    }).then(result => {
      if (result.value) {
        this.examenesService.agregarExamen(result.value).subscribe(() => {
          Swal.fire('Examen añadido', '', 'success');
          this.cargarExamenes();
        });
      }
    });
  }
}
