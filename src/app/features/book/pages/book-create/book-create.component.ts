import {Component, inject} from "@angular/core";
import {
	FormBuilder,
	FormsModule,
	ReactiveFormsModule,
	Validators,
} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {BookService} from "../../services/book.service";
import {BookModel} from "../../../../core/moodels/book.model";
import {ROUTES_CONSTANTS} from "../../../../core/constants/routes.constants";

@Component({
	selector: "app-book-create",
	imports: [FormsModule, ReactiveFormsModule],
	templateUrl: "./book-create.component.html",
	styleUrl: "./book-create.component.scss",
})
export class BookCreateComponent {
	private readonly _bookService: BookService = inject(BookService);
	private readonly _fb: FormBuilder = inject(FormBuilder);
	private readonly _router: Router = inject(Router);

	bookForm = this._fb.group({
		title: [null, [Validators.required, Validators.minLength(3)]],
		isbn: [
			null,
			[
				Validators.required,
				Validators.minLength(3),
				Validators.maxLength(50),
			],
		],
		author: [null, [Validators.required, Validators.minLength(3)]],
		description: [null, [Validators.required, Validators.minLength(10)]],
		releaseDate: [null, [Validators.required]],
	});

	submit() {
		if (this.bookForm.invalid) {
			alert("Formulaire invalide...");
			return;
		}

		this._bookService
			.createBook(this.bookForm.value as Partial<BookModel>)
			.subscribe({
				next: () => {
					this._router.navigate([`/${ROUTES_CONSTANTS.BOOK.BASE}`]);
				},
				error: error => {
					console.error("Error updating book:", error);
				},
			});
	}
}
