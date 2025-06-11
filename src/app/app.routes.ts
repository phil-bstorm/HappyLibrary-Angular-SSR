import {Routes} from "@angular/router";
import {HomeComponent} from "./features/home/pages/home/home.component";
import {ROUTES_CONSTANTS} from "./core/constants/routes.constants";
import {bookListResolver} from "./features/book/resolvers/book-list.resolver";
import {bookDetailsResolver} from "./features/book/resolvers/book-details.resolver";
import {authenticatedGuard} from "./core/guards/authenticated.guard";

export const routes: Routes = [
	{path: "", component: HomeComponent, pathMatch: "full"},

	/* AUTH ROUTES */
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

	/* BOOK ROUTES */
	{
		path: ROUTES_CONSTANTS.BOOK.BASE,
		loadComponent: () =>
			import("./features/book/pages/book-list/book-list.component").then(
				c => c.BookListComponent,
			),
		resolve: {
			books: bookListResolver,
		},
	},
	{
		path: ROUTES_CONSTANTS.BOOK.CREATE,
		loadComponent: () =>
			import(
				"./features/book/pages/book-create/book-create.component"
			).then(c => c.BookCreateComponent),
		canActivate: [authenticatedGuard]
	},
	{
		path: ROUTES_CONSTANTS.BOOK.EDIT,
		loadComponent: () =>
			import("./features/book/pages/book-edit/book-edit.component").then(
				c => c.BookEditComponent,
			),
		resolve: {
			book: bookDetailsResolver,
		},
		canActivate: [authenticatedGuard]
	},

	/* ERROR ROUTES */
	{
		path: ROUTES_CONSTANTS.ERROR.NOT_FOUND,
		loadComponent: () =>
			import(
				"./features/errors/pages/not-found/not-found.component"
			).then(c => c.NotFoundComponent),
	},
	{
		path: ROUTES_CONSTANTS.ERROR.INTERNAL_SERVER_ERROR,
		loadComponent: () =>
			import(
				"./features/errors/pages/server-error/server-error.component"
			).then(c => c.ServerErrorComponent),
	},

	// redirect all other paths to 404
	{
		path: "**",
		redirectTo: ROUTES_CONSTANTS.ERROR.NOT_FOUND,
	},
];
