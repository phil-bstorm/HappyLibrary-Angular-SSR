import {CanActivateFn, Router} from "@angular/router";
import {inject} from "@angular/core";
import {AuthService} from "../../features/auth/services/auth.service";
import {ROUTES_CONSTANTS} from "../constants/routes.constants";

export const authenticatedGuard: CanActivateFn = () => {
	const authService = inject(AuthService);
	const router = inject(Router);

	if (authService.token()) {
		return true;
	}

	return router.navigate([`/${ROUTES_CONSTANTS.AUTH.LOGIN}`]);
};
