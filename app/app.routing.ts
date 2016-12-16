import { Routes, RouterModule } from '@angular/router';

import { LearnComponent } from './learn.component';

const appRoutes: Routes = [
  { path: 'learn/:step', component: LearnComponent },
  { path: 'learn', pathMatch: 'full', redirectTo: '/learn/start' }
];

export const routing = RouterModule.forRoot(appRoutes);
