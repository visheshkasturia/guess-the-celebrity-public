describe('Correct player view when player deletes and player enters their name', () => {

  it(('deletes correctly to reset player'), () => {
    cy.visit('https://guess-the-celebrity-vk.herokuapp.com/');
    cy.get('#delete-startscreen').click();
    cy.get('#delete-input').type('Vizzy').click();
    cy.get('#delete-button').click();
    cy.wait(500);
  });

  it(('executes correctly'), () => {
    cy.wait(200);
    cy.get('#player-input').type('Vizzy');
    cy.get('#submit-button').click();
    cy.get('#start-button').should('have.text','Start Game');
  });

  it(('executes correctly'), () => {
    cy.reload()
    cy.wait(500);
    cy.get('#delete-startscreen').click();
    cy.get('#delete-input').type('Vizzy').click();
    cy.wait(100);
    cy.get('#delete-button').click();
    cy.get('#delete-succ').should('have.text','Delete Successful');
  });
});


