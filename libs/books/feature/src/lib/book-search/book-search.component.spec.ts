import { async, ComponentFixture, discardPeriodicTasks, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { SharedTestingModule } from '@tmo/shared/testing';

import { BooksFeatureModule } from '../books-feature.module';
import { BookSearchComponent } from './book-search.component';
import { provideMockStore, MockStore } from '@ngrx/store/testing'

describe('ProductsListComponent', () => {
  let component: BookSearchComponent;
  let fixture: ComponentFixture<BookSearchComponent>;
  let store: MockStore;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [BooksFeatureModule, NoopAnimationsModule, SharedTestingModule],
      providers : [
        provideMockStore({
          initialState: {
            books: {
              entities: []
            }
          }
        })
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    store = TestBed.inject(MockStore)
    spyOn(component.searchForm, 'valueChanges');
    spyOn(store, 'dispatch');
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  it('searchBook() should be called once the value changes and actual time of wait is completed', fakeAsync(() => {
    component.searchForm.controls.term.setValue('Angular')
    tick(500);
    component.searchForm.valueChanges.subscribe(() => {
      expect(store.dispatch).toBeCalled();
    })
  }));

  it('searchBook() should not be called once the value changes and actual time of wait is not completed', fakeAsync(() => {
    component.searchForm.controls.term.setValue('Angular')
    tick(400);
    expect(store.dispatch).not.toBeCalled();
    discardPeriodicTasks();
  }))
});
