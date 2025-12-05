import { Routes } from '@angular/router';

// Importa los componentes standalone (si los generaste como standalone)
import { CalendarioComponent } from './components/calendario/calendario';
import { ClasesDetalle } from './components/clases-detalle/clases-detalle';
import { ExamenesComponent } from './components/examenes/examenes';
import { AdminClases } from './components/admin-clases/admin-clases';
import { AdminFotos } from './components/admin-fotos/admin-fotos';
import { AdminExamenes } from './components/admin-examenes/admin-examenes';
import { Main } from './components/main/main';

export const routes: Routes = [
    { path: '', component: Main },
    { path: 'calendario', component: CalendarioComponent },
    { path: 'clase', component: ClasesDetalle },
    { path: 'examenes', component: ExamenesComponent },
    { path: 'admin/clases', component: AdminClases },
    { path: 'admin/fotos', component: AdminFotos },
    { path: 'admin/examenes', component: AdminExamenes },
    { path: '**', redirectTo: '', pathMatch: 'full' }
];
