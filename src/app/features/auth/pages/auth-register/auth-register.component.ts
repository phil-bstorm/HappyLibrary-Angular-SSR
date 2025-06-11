import {Component, inject} from "@angular/core";
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {ROUTES_CONSTANTS} from "../../../../core/constants/routes.constants";

@Component({
	selector: "app-auth-register",
	imports: [ReactiveFormsModule],
	templateUrl: "./auth-register.component.html",
	styleUrl: "./auth-register.component.scss",
})
export class AuthRegisterComponent {
	private readonly _fb: FormBuilder = inject(FormBuilder);
	private readonly _authService: AuthService = inject(AuthService);
	private readonly _router: Router = inject(Router);

	errorMessage: string | null = null;

	registerForm = this._fb.group({
		email: [null, [Validators.required, Validators.email]],
		password: [null, [Validators.minLength(8)]],
	});

	registerSubmit() {
		if(this.registerForm.invalid) {
			console.log('Invalid form', this.registerForm.value);
			return;
		}

		const value = {
			email: this.registerForm.value.email!,
			password: this.registerForm.value.password!,
		};

		this._authService.register(value).subscribe({
			next: (res) => {
				this._router.navigate(["/", ROUTES_CONSTANTS.AUTH.LOGIN]);
			},
			error: (error) => {
				// ça a échoué!
				console.warn('Error', error);
				this.errorMessage = error.error || "An error occurred during registration.";
			}
		});
	}
}
