describe('Тесты Cypress', function () {
  it('Перехват запроса на эндпоинт api/ingredients', () => {
    cy.visit('http://localhost:4000'); // Открываем страницу
    cy.intercept('GET', '/api/ingredients', { fixture: 'ingredients.json' }); //Перехват запроса на эндпоинт api/ingredients
    cy.intercept('GET', '/api/auth/user', { fixture: 'user.json' }); //Перехват запроса на эндпоинт api/auth/user
    cy.intercept('POST', 'api/auth/token', { fixture: 'user.json' }); //Перехват запроса на эндпоинт api/auth/token

    // cy.intercept('GET', '/orders/1234', { fixture: 'order.json' });
    cy.get(`[data-cy='643d69a5c3f7b9001cfa093c']`).click(); //Открытие модалки
    cy.get(`button`).click(); //Закрытие модалки
    cy.get(`[data-cy='643d69a5c3f7b9001cfa093c'] button`).click(); //Добавление булки в заказ
    cy.get(`[data-cy='643d69a5c3f7b9001cfa0941'] button`).click(); //Добавляение котлеты в заказ
    cy.get(`[data-cy='643d69a5c3f7b9001cfa0942'] button`).click(); //Добавление соуса в заказ
    cy.intercept('POST', 'api/orders', { fixture: 'order.json' }); //Перехват запроса на эндпоинт /orders
    cy.get(`[data-cy='burgerOredrBTN']`).click(); //Создание заказа

    cy.wait(2000); // Ожидание создания заказа
    cy.get('#modals').find(`button`).should('be.visible'); //Проверка модального окна на открытие
    cy.get('#modals').find(`h2`).should('have.text', '1234');
    cy.get(`#modals`).find(`button`).click(); //Закрытие модального окна
    cy.intercept('POST', '/auth/logout'); //Очистка токена
  });
});
