import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {Storage} from "../../enums";
import {AuthService} from "../../../services/auth/auth.service";

export const authGuard: CanActivateFn = async (route, state) => {
  const service = inject(AuthService);
  const router = inject(Router);

  try {
    const token = await service.getSession();

    //Logica para verificar si el token expiró
    return !token ? router.navigate(['/login'], {replaceUrl: true}) : true;
  } catch (e) {
    return router.navigate(['/login'], {replaceUrl: true});
  }

};
