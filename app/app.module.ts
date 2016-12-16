import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule, XHRBackend } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { LearnClockComponent } from './learn-clock.component';
import { LearnComponent } from './learn.component';
import { FavoriteDirective } from './favorite.directive';
import { HourPipe } from './hour.pipe';
import { QuartersPipe } from './quarters.pipe';
import { LearnService } from './learn.service';
import { lookupListToken, lookupLists } from './providers';
import { MockXHRBackend } from './mock-xhr-backend';
import { routing } from './app.routing';

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule,
    routing
  ],
  declarations: [
    AppComponent,
    LearnClockComponent,
    LearnComponent,
    FavoriteDirective,
    QuartersPipe,
    HourPipe
  ],
  providers: [
    LearnService,
    { provide: lookupListToken, useValue: lookupLists },
    { provide: XHRBackend, useClass: MockXHRBackend }
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {}
