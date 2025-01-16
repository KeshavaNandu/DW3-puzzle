#Code fixes and review

1. In book-search.component.ts the observable which is subscribed in `ngOnInit` is never unsubscribed
    - Added async pipe in `book-search.component.html` 

2. formatDate function is removed
    - Function call triggers with every change detection which impacts application performance. Used pipe to improve performance

3. Nameing convention used for variables in `ngFor`
    - Instead of using b used book which helps in better understandability of code

4. Testing cases failing in `reading-list.reducer.spec.ts`
    - Implemented `failedAddToReadingList` and `failedRemoveFromReadingList`

5. Removed unused lifecycle hook in `total-count.component.ts`

6. Use of button instead of a tab
    - In file `book-search.component.html` used button instead of `a` which uses (click) listener

7. Used ngSubmit instead of submit

# Web Accessibility issues

## From Lighthouse report:

- Adjusted background and foreground colors to achieve sufficient contrast ratio between them.

- Added `aria-label` attribute is added to buttons