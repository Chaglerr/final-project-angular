import { CanActivateFn } from '@angular/router';
import { map } from 'rxjs';
import { inject } from '@angular/core';
import { AuthorizationService } from '../services/authorization-services/authorization.service';

export const loggedIn: CanActivateFn = (route, state) => {
  const controller = inject(AuthorizationService);
  return controller.currentState.pipe(
    map((state) => state.currentUserId),
    map((currentUserId) => currentUserId !== "-1")
  );
};

export const loggedOut: CanActivateFn = (route, state) => {
  const controller = inject(AuthorizationService);
  return controller.currentState.pipe(
    map((state) => state.currentUserId),
    map((currentUserId) => currentUserId === "-1")
  );
};