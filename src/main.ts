import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter} from '@angular/router';
import { MainAppComponent } from './app/core/components/main-app/main-app.component';
import {ROUTES} from './app/core/components/main-app/routes'

bootstrapApplication(MainAppComponent, {
  providers: [CommonModule, 
      importProvidersFrom(HttpClientModule),
      provideRouter(ROUTES)    
  ],
  
});