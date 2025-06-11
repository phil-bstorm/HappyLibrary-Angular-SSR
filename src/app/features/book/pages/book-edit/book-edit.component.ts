import {Component, inject} from "@angular/core";
import {BookService} from "../../services/book.service";
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {BookModel} from "../../../../core/moodels/book.model";

@Component({
	selector: "app-book-edit",
	imports: [ReactiveFormsModule],
	templateUrl: "./book-edit.component.html",
	styleUrl: "./book-edit.component.scss",
})
export class BookEditComponent {
	private _route: ActivatedRoute = inject(ActivatedRoute);
	private readonly _bookService: BookService = inject(BookService);
	private readonly _fb: FormBuilder = inject(FormBuilder);
	private readonly _router: Router = inject(Router);

	books: BookModel = this._route.snapshot.data['book'] ?? [];

	bookForm = this._fb.group({
		id: [this.books.id, [Validators.required]],
		title: [this.books.title, [Validators.required, Validators.minLength(3)]],
		isbn: [this.books.isbn, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
		author: [this.books.author, [Validators.required, Validators.minLength(3)]],
		description: [this.books.description, [Validators.required, Validators.minLength(10)]],
		releaseDate: [this.books.releaseDate ? new Date(this.books.releaseDate) : null, [Validators.required]],
	});

	submit() {
		if (this.bookForm.invalid) {
			return;
		}

		const book: BookModel = this.bookForm.value as BookModel;

		this._bookService.updateBook(book).subscribe({
			next: () => {
				this._router.navigate(["/books"]);
			},
			error: (error) => {
				console.error("Error updating book:", error);
			},
		});
	}
}
