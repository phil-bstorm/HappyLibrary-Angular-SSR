import {Routes} from "@angular/router";
import {HomeComponent} from "./features/home/pages/home/home.component";
import {ROUTES_CONSTANTS} from "./core/constants/routes.constants";

export const routes: Routes = [
	{path: "", component: HomeComponent, pathMatch: "full"},
	{
		path: ROUTES_CONSTANTS.AUTH.REGISTER,
		loadComponent: () =>
			import(
				"./features/auth/pages/auth-register/auth-register.component"
			).then(c => c.AuthRegisterComponent),
	},
	{
		path: ROUTES_CONSTANTS.AUTH.LOGIN,
		loadComponent: () =>
			import(
				"./features/auth/pages/auth-login/auth-login.component"
			).then(c => c.AuthLoginComponent),
	},
];
