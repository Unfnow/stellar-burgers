describe('modalTest', () => {
  before(() => {
    cy.visit(''); // Открываем страницу
    cy.intercept('GET', '/api/auth/user', { fixture: 'user.json' }); //Перехват запроса на эндпоинт api/auth/user
    cy.intercept('GET', '/api/ingredients', { fixture: 'ingredients.json' }); //Перехват запроса на эндпоинт api/ingredients
    cy.intercept('POST', 'api/auth/token', { fixture: 'user.json' }); //Перехват запроса на эндпоинт api/auth/token
  });
  it('Работа модальных окон', () => {
    cy.intercept('GET', '/api/ingredients', { fixture: 'ingredients.json' }); //Перехват запроса на эндпоинт api/ingredients
    cy.get(`[data-cy='643d69a5c3f7b9001cfa093c']`).click(); //Открытие модалки
    cy.get(`button`).click(); //Закрытие модалки
  });
});
