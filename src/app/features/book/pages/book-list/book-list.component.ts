import {Component, inject} from "@angular/core";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {BookModel} from "../../../../core/moodels/book.model";
import {AuthService} from "../../../auth/services/auth.service";
import {BookService} from "../../services/book.service";
import {ROUTES_CONSTANTS} from "../../../../core/constants/routes.constants";

@Component({
	selector: "app-book-list",
	imports: [RouterLink],
	templateUrl: "./book-list.component.html",
	styleUrl: "./book-list.component.scss",
})
export class BookListComponent {
	private readonly _router: Router = inject(Router);
	private _route: ActivatedRoute = inject(ActivatedRoute);
	private _authService: AuthService = inject(AuthService);
	private _bookService: BookService = inject(BookService);

	books: BookModel[] = this._route.snapshot.data["books"] ?? [];

	isAuthenticated = this._authService.token;

	editClick(id: number): void {
		this._router.navigate([
			`/${ROUTES_CONSTANTS.BOOK.EDIT.replace(":id", id.toString())}`,
		]);
	}

	deleteClick(id: number): void {
		this._bookService.deleteBook(id).subscribe({
			next: () => {
				this.books = this.books.filter(book => book.id !== id);
			},
			error: error => {
				alert("Error deleting book: " + error.message);
				console.error("Error deleting book:", error);
			},
		});
	}

	protected readonly ROUTES_CONSTANTS = ROUTES_CONSTANTS;
}
