import {inject, Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {API_CONSTANTS} from "../../../core/constants/API.constants";
import {map} from "rxjs";
import {BookModel} from "../../../core/moodels/book.model";

@Injectable({
	providedIn: "root",
})
export class BookService {
	private _httpClient: HttpClient = inject(HttpClient);
	private _apiUrl = API_CONSTANTS.BASE;

	getBooks() {
		return this._httpClient
			.get<any>(`${this._apiUrl}/${API_CONSTANTS.BOOK.GET_ALL}`)
			.pipe(
				map((response: any[]): BookModel[] => {
					return response.map(
						(book: any) =>
							({
								...book,
								// releaseDate: new Date(book.releaseDate)
							}) as BookModel,
					);
				}),
			);
	}

	getBookById(id: number) {
		return this._httpClient.get<BookModel>(
			`${this._apiUrl}/${API_CONSTANTS.BOOK.GET_BY_ID.replace(":id", id.toString())}`,
		);
	}

	createBook(book: Partial<BookModel>) {
		return this._httpClient.post<BookModel>(
			`${this._apiUrl}/${API_CONSTANTS.BOOK.CREATE}`,
			book,
		);
	}

	updateBook(book: BookModel) {
		return this._httpClient.put<BookModel>(
			`${this._apiUrl}/${API_CONSTANTS.BOOK.UPDATE.replace(":id", book.id.toString())}`,
			book,
		);
	}

	deleteBook(id: number) {
		return this._httpClient.delete(
			`${this._apiUrl}/${API_CONSTANTS.BOOK.DELETE.replace(":id", id.toString())}`,
		);
	}
}
