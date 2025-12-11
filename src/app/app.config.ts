import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withFetch, withInterceptors, withInterceptorsFromDi, HttpClient } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideApiConfig } from './core/api/api-config.provider';
import { environment } from '../environments/environment';
import { AuthDataSource } from './data/datasources/auth.datasource';
import { AuthRepository } from './domain/repositories/auth.repository';
import { AuthRemoteDataSource } from './data/datasources/remote/auth-remote.datasource';
import { AuthRepositoryImpl } from './data/repositories/auth-repository.impl';
import { AccountDataSource } from './data/datasources/account.datasource';
import { AccountRemoteDataSource } from './data/datasources/remote/account-remote.datasource';
import { AccountRepository, CourseRepository } from './domain';
import { AccountRepositoryImpl } from './data/repositories/account-repository.impl';
import { authInterceptor } from './presentation/interceptors';
import { createTranslateLoader } from './core/config/translation.config';
import { CourseDataSource } from './data/datasources/course.datasource';
import { CourseRemoteDataSource } from './data/datasources/remote/course-remote.datasource';
import { CourseRepositoryImpl } from './data/repositories/course-repository.impl';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideHttpClient(withInterceptorsFromDi(),withFetch(),withInterceptors([
      authInterceptor
    ])),
    importProvidersFrom(
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: createTranslateLoader,
          deps: [HttpClient],
        },
      })
    ),
    provideApiConfig({
      baseUrl: `${environment.apiUrl}/${environment.apiVersion}`,
    }),
    {provide: AuthDataSource, useClass: AuthRemoteDataSource},
    {provide: AuthRepository, useClass: AuthRepositoryImpl,deps:[AuthDataSource]},
    {provide: AccountDataSource, useClass: AccountRemoteDataSource},
    {provide: AccountRepository, useClass: AccountRepositoryImpl,deps:[AccountDataSource]},

    {provide: CourseDataSource, useClass:CourseRemoteDataSource},
    {provide: CourseRepository, useClass:CourseRepositoryImpl,deps:[CourseDataSource]}
  ]
};
