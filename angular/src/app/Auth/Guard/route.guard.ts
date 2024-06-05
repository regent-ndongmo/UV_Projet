import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, NavigationStart, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { Observable, filter, map, take } from 'rxjs';

export const routeGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): Observable<boolean> => {
  const service = inject(AuthService);
  const router = inject(Router);

  return service.buttonClicked$.pipe(
    map((buttonClicked: boolean) => {
      if (buttonClicked) {
        return true;
      } else {
        // Détecter les changements de route
        return router.events.pipe(
          filter(event => event instanceof NavigationStart),
          take(1),
          map(() => {
            // Redirigez l'utilisateur vers une page par défaut, par exemple la page d'accueil
            router.navigate(['/dashboard']);
            return false;
          })
        );
      }
    }),
    take(1),
    // Convertir l'observable imbriqué en observable de boolean
    map(result => typeof result === 'boolean' ? result : false)
  );
};
