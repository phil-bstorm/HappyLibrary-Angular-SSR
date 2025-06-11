import {HttpInterceptorFn} from "@angular/common/http";
import {Router} from "@angular/router";
import {inject} from "@angular/core";
import {AuthService} from "../../features/auth/services/auth.service";
import {catchError, throwError} from "rxjs";
import {ROUTES_CONSTANTS} from "../constants/routes.constants";

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
	const router: Router = inject(Router);
	const authService: AuthService = inject(AuthService);

	return next(req).pipe(
		catchError(error => {
			console.log(error);

			switch (error.status) {
				case 401:
					authService.logout();
					router.navigate([`/${ROUTES_CONSTANTS.AUTH.LOGIN}`]);
					return throwError(() => null);
				case 500:
					router.navigate([`/${ROUTES_CONSTANTS.ERROR.INTERNAL_SERVER_ERROR}`]);
					return throwError(() => null);
			}

			return throwError(() => error);
		}),
	);
};
