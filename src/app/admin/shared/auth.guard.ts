import {inject } from "@angular/core";
import {CanActivateFn, Router} from "@angular/router";
import { AuthService } from "./auth.service";

export const AuthGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const auth = inject(AuthService);
  if (auth.statusAuthentication()) {
    return true
  } else {
    console.log(auth.statusAuthentication())
    auth.logout()
    router.navigate(['/'], {
      queryParams: {
        loginAgain: true
      }
    })
    return false
  }
}
