import {ActivatedRouteSnapshot, CanActivateFn, RouterState, RouterStateSnapshot} from '@angular/router';


export const authenticationGuard: CanActivateFn = (route, state) => {
  return true;
};
