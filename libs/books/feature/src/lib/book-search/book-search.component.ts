import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  addToReadingList,
  clearSearch,
  failedAddToReadingList,
  getAllBooks,
  ReadingListBook,
  searchBooks
} from '@tmo/books/data-access';
import { FormBuilder } from '@angular/forms';
import { Book } from '@tmo/shared/models';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'tmo-book-search',
  templateUrl: './book-search.component.html',
  styleUrls: ['./book-search.component.scss']
})
export class BookSearchComponent implements OnInit {
  books: Observable<ReadingListBook[]>;;

  searchForm = this.fb.group({
    term: ''
  });

  constructor(
    private readonly store: Store,
    private readonly fb: FormBuilder,
    private _snackBar: MatSnackBar
  ) {}

  get searchTerm(): string {
    return this.searchForm.value.term;
  }

  ngOnInit(): void {
    this.books = this.store.select(getAllBooks);
  }

  addBookToReadingList(book: Book) {
    this.store.dispatch(addToReadingList({ book }));
    const snackBar = this._snackBar.open('Added to reading list', 'undo', { duration: 5000});
    snackBar.onAction().subscribe(() => {
      this.store.dispatch(failedAddToReadingList({ book }));
    })
  }

  searchExample() {
    this.searchForm.controls.term.setValue('javascript');
    this.searchBooks();
  }

  searchBooks() {
    if (this.searchForm.value.term) {
      this.store.dispatch(searchBooks({ term: this.searchTerm }));

    } else {
      this.store.dispatch(clearSearch());
    }
  }
}
