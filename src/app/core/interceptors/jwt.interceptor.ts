import {HttpInterceptorFn} from "@angular/common/http";
import {AuthService} from "../../features/auth/services/auth.service";
import {inject} from "@angular/core";

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
	const authService: AuthService = inject(AuthService);

	const token = authService.token();

	// vérifier si le token existe
	if (token) {
		// ajouter Authorization dans les headers
		const requestClone = req.clone({
			headers: req.headers.append("Authorization", "Bearer " + token),
		});

		return next(requestClone);
	}

	return next(req);
};
