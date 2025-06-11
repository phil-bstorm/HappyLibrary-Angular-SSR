import {computed, inject, Injectable, PLATFORM_ID, signal} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {API_CONSTANTS} from "../../../core/constants/API.constants";
import {tap} from "rxjs";
import {UserModel} from "../../../core/moodels/user.model";
import {LOCAL_STORAGE_CONSTANTS} from "../../../core/constants/localstorage.constants";
import {isPlatformBrowser} from "@angular/common";

@Injectable({
	providedIn: "root",
})
export class AuthService {
	private platformId = inject(PLATFORM_ID);

	// Injection de l'HttpClient pour faire des requêtes HTTP
	private _httpClient: HttpClient = inject(HttpClient);
	private _apiUrl = API_CONSTANTS.BASE;

	// Signal pour récupérer le token d'authentification
	private _token = signal<string | null>(null);
	private _user = signal<UserModel | null>(null);

	// Getter pour le token (pour l'utiliser dans les composants sans avoir à s'abonner ou pouvoir le modifier)
	token = this._token.asReadonly();

	constructor() {
		console.log("AuthService initialized");
		if (!isPlatformBrowser(this.platformId)) {
			return;
		}

		console.log(localStorage.getItem(LOCAL_STORAGE_CONSTANTS.TOKEN));
		// Initialiser le token depuis le localStorage au démarrage de l’app
		const storedToken = localStorage.getItem(LOCAL_STORAGE_CONSTANTS.TOKEN);
		if (storedToken) {
			this._token.set(storedToken);

			// Récupérer l'utilisateur depuis le localStorage
			const storedUser = localStorage.getItem(
				LOCAL_STORAGE_CONSTANTS.USER,
			);
			if (storedUser) {
				try {
					this._user.set(JSON.parse(storedUser));
				} catch (err) {
					console.error("Error parsing user from localStorage:", err);
					this._user.set(null);
					// TODO récupérer l'utilisateur depuis l'API si nécessaire
				}
			}
		}
	}

	register(value: {email: string, password: string}) {
		return this._httpClient.post<UserModel>(
			`${this._apiUrl}/${API_CONSTANTS.AUTH.REGISTER}`,
			value,
		);
	}

	login(value: {email: string, password: string}) {
		return this._httpClient
			.post<{
				accessToken: string;
				user: UserModel;
			}>(`${this._apiUrl}/${API_CONSTANTS.AUTH.LOGIN}`, value)
			.pipe(
				// On récupère le token de la réponse et on le stocke dans le signal
				// On utilise 'tap' pour ne pas modifier le flux de données
				tap(response => {
					// On stocke le token et l'utilisateur dans le localStorage
					this._token.set(response.accessToken);
					this._user.set(response.user);

					localStorage.setItem(
						LOCAL_STORAGE_CONSTANTS.TOKEN,
						response.accessToken,
					);
					localStorage.setItem(
						LOCAL_STORAGE_CONSTANTS.USER,
						JSON.stringify(response.user),
					);
				}),
			);
	}

	logout() {
		// On vide le token et l'utilisateur du signal
		this._token.set(null);
		this._user.set(null);

		// On supprime le token et l'utilisateur du localStorage
		localStorage.removeItem(LOCAL_STORAGE_CONSTANTS.TOKEN);
		localStorage.removeItem(LOCAL_STORAGE_CONSTANTS.USER);
	}
}
