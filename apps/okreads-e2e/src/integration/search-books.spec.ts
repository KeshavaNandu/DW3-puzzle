describe('When: Use the search feature', () => {
  beforeEach(() => {
    readingItemsCount = cy.$$('[data-testing="reading-list-item"]').length;
    cy.startAt('/');
  });

  it('Then: I should be able to search books by title', () => {
    cy.get('input[type="search"]').type('javascript');

    cy.get('form').submit();

    cy.get('[data-testing="book-item"]').should('have.length.greaterThan', 1);
  });

  xit('Then: I should see search results as I am typing', () => {
    // TODO: Implement this test!
  });

  it('Then: I should add the book to reading list and it should undo', () => {
    cy.get('input[type="search"]').type('python');

    cy.get('form').submit();

    cy.get('[data-testing="add-item"]:enabled').first().click();

    cy.get('[data-testing="reading-list-item"]').should('have.length', readingItemsCount + 1);

    cy.get('.mat-simple-snackbar-action button').click();

    cy.get('[data-testing="reading-list-item"]').should('have.length', readingItemsCount);
  })
});
