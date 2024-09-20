describe('addIngredientsTest', function () {
  before(() => {
    cy.visit(''); // Открываем страницу
    cy.intercept('GET', '/api/ingredients', { fixture: 'ingredients.json' }); //Перехват запроса на эндпоинт api/ingredients
  });
  it('Добавление ингредиента из списка в конструктор', () => {
    cy.intercept('GET', '/api/ingredients', { fixture: 'ingredients.json' }); //Перехват запроса на эндпоинт api/ingredients
    cy.get(`[data-cy='643d69a5c3f7b9001cfa093c'] button`).click(); //Добавление булки в заказ
    cy.get(`[data-cy='643d69a5c3f7b9001cfa0941'] button`).click(); //Добавляение котлеты в заказ
    cy.get(`[data-cy='643d69a5c3f7b9001cfa0942'] button`).click(); //Добавление соуса в заказ
  });
});
