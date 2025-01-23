import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { addToReadingList, failedAddToReadingList, failedRemoveFromReadingList, getReadingList, removeFromReadingList } from '@tmo/books/data-access';

@Component({
  selector: 'tmo-reading-list',
  templateUrl: './reading-list.component.html',
  styleUrls: ['./reading-list.component.scss']
})
export class ReadingListComponent {
  readingList$ = this.store.select(getReadingList);

  constructor(private readonly store: Store,
    private _snackBar: MatSnackBar
  ) {}

  removeFromReadingList(item) {
    this.store.dispatch(removeFromReadingList({ item }));
    const snackBar = this._snackBar.open('Removed from reading list', 'undo', { duration: 5000});
        snackBar.onAction().subscribe(() => {
          this.store.dispatch(failedRemoveFromReadingList({item}));
    })
  }
}
