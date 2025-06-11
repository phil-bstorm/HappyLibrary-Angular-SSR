import {Component, inject} from "@angular/core";
import {RouterLink} from "@angular/router";
import {AuthService} from "../../../features/auth/services/auth.service";
import {ROUTES_CONSTANTS} from "../../../core/constants/routes.constants";

@Component({
	selector: "app-nav-bar",
	imports: [RouterLink],
	templateUrl: "./nav-bar.component.html",
	styleUrl: "./nav-bar.component.scss",
})
export class NavBarComponent {
	private _authService: AuthService = inject(AuthService);

	isAuthenticated = this._authService.token;

	logoutClick() {
		this._authService.logout();
	}

	protected readonly ROUTES_CONSTANTS = ROUTES_CONSTANTS;
}
