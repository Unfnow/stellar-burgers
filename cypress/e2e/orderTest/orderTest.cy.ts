describe('orderTest', () => {
  before(() => {
    cy.visit(''); // Открываем страницу
    cy.intercept('GET', '/api/auth/user', { fixture: 'user.json' }); //Перехват запроса на эндпоинт api/auth/user
    cy.intercept('GET', '/api/ingredients', { fixture: 'ingredients.json' }); //Перехват запроса на эндпоинт api/ingredients
    cy.intercept('POST', 'api/auth/token', { fixture: 'user.json' }); //Перехват запроса на эндпоинт api/auth/token
  });
  it('Создание заказа', () => {
    cy.get(`[data-cy='643d69a5c3f7b9001cfa093c'] button`).click(); //Добавление булки в заказ
    cy.get(`[data-cy='643d69a5c3f7b9001cfa0941'] button`).click(); //Добавляение котлеты в заказ
    cy.get(`[data-cy='643d69a5c3f7b9001cfa0942'] button`).click(); //Добавление соуса в заказ
    cy.intercept('POST', 'api/orders', { fixture: 'order.json' }); //Перехват запроса на эндпоинт /orders
    cy.get(`[data-cy='burgerOredrBTN']`).click(); //Создание заказа
    cy.wait(2000); // Ожидание создания заказа
    const modal = cy.get('#modals');
    modal.find(`button`).should('be.visible'); //Проверка модального окна на открытие
    modal.find(`h2`).should('have.text', '1234');
    modal.find(`button`).click(); //Закрытие модального окна
    modal.should(`not.be.visible`); //Проверяется успешность закрытия модального окна
    cy.get(`[data-cy='constructor-bun']`).should('have.text', 'Выберите булки'); //Проверка конструктора на пустоту
    cy.get(`[data-cy='constructor-main']`).should(
      'have.text',
      'Выберите начинку'
    ); //Проверка конструктора на пустоту
    cy.intercept('POST', '/auth/logout'); //Очистка токена
  });
});
