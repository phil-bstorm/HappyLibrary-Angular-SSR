import {ResolveFn, Router} from "@angular/router";
import {BookModel} from "../../../core/moodels/book.model";
import {inject} from "@angular/core";
import {BookService} from "../services/book.service";
import {ROUTES_CONSTANTS} from "../../../core/constants/routes.constants";

export const bookDetailsResolver: ResolveFn<BookModel> = (route, state) => {
	const bookService = inject(BookService);
	const router = inject(Router);
	const bookId = Number(route.paramMap.get("id"));
	if (isNaN(bookId)) {
		router.navigate([`/${ROUTES_CONSTANTS.ERROR.NOT_FOUND}`]);
	}
	return bookService.getBookById(bookId);
};
