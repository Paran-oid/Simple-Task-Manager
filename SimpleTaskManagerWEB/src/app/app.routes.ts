import { Routes } from '@angular/router';
import { TodayComponent } from './components/today/today.component';
import { CompletedComponent } from './components/completed/completed.component';
import { AllComponent } from './components/all/all.component';
import { ImportantComponent } from './components/important/important.component';
import { PlannedComponent } from './components/planned/planned.component';

export const routes: Routes = [
  { path: '', component: TodayComponent },
  { path: 'Today', redirectTo: '' },
  { path: 'Planned', component: PlannedComponent },
  { path: 'All', component: AllComponent },
  { path: 'Completed', component: CompletedComponent },
  { path: 'Important', component: ImportantComponent },
];
