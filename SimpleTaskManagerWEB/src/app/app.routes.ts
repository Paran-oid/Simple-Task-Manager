import { Routes } from '@angular/router';
import { TodayComponent } from './components/today/today.component';
import { CompletedComponent } from './components/completed/completed.component';
import { AllComponent } from './components/all/all.component';
import { ImportantComponent } from './components/important/important.component';
import { EditComponent } from './shared/edit/edit.component';
import { ScheduledComponent } from './components/scheduled/scheduled.component';

export const routes: Routes = [
  { path: '', component: TodayComponent },
  { path: 'Today', redirectTo: '' },
  { path: 'Scheduled', component: ScheduledComponent },
  { path: 'All', component: AllComponent },
  { path: 'Completed', component: CompletedComponent },
  { path: 'Important', component: ImportantComponent },
];
