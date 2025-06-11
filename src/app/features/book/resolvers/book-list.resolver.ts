import {inject} from "@angular/core";
import { ResolveFn } from '@angular/router';
import {BookService} from "../services/book.service";
import {BookModel} from "../../../core/moodels/book.model";

export const bookListResolver: ResolveFn<BookModel[]> = () => {
	const bookService = inject(BookService);
	return bookService.getBooks();
};
