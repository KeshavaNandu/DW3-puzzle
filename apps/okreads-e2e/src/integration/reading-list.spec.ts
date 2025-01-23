describe('When: I use the reading list feature', () => {
  beforeEach(() => {
    readingItemsCount = cy.$$('[data-testing="reading-list-item"]').length;
    cy.startAt('/');
  });

  it('Then: I should see my reading list', () => {
    cy.get('[data-testing="toggle-reading-list"]').click();

    cy.get('[data-testing="reading-list-container"]').should(
      'contain.text',
      'My Reading List'
    );
  });
});
