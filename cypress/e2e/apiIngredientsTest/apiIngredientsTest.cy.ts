describe('apiIngredientsTest', function () {
  it('Перехват запроса на эндпоинт api/ingredients', () => {
    cy.visit(''); // Открываем страницу
    cy.intercept('GET', '/api/ingredients', { fixture: 'ingredients.json' }); //Перехват запроса на эндпоинт api/ingredients
  });
});
