describe('Players displays all leaders after playing game', () => {

  it(('deletes correctly to reset player'), () => {
    cy.visit('https://guess-the-celebrity-vk.herokuapp.com/');
    cy.get('#delete-startscreen').click();
    cy.get('#delete-input').type('Vizzy').click();
    cy.get('#delete-button').click();
    cy.wait(500);
  });

  it(('plays correctly and displays all players'), () => {
    cy.wait(500)
    cy.get('#player-input').type('Vizzy');
    cy.get('#submit-button').click();
    cy.get('#start-button').should('have.text','Start Game').click();
    cy.wait(100);
    cy.get('#game-button').click();
    cy.wait(100);
    cy.get('#game-button').click();
    cy.wait(100);
    cy.get('#game-button').click();
    cy.wait(100);
    cy.get('#game-button').click();
    cy.wait(100);
    cy.get('#game-button').click();
    cy.wait(100);
    cy.get('#game-button').click();
    cy.wait(100);
    cy.get('#game-button').click();
    cy.wait(100);
    cy.get('#game-button').click();
    cy.wait(100);
    cy.get('#game-button').click();
    cy.wait(100);
    cy.get('#game-button').click();
    cy.wait(100);
    cy.get('#game-button').click();
    cy.wait(100);
    cy.get('#game-button').click();
    cy.wait(100);
    cy.get('#showall-btn').click()
    cy.get('#head-all').should('have.text',' All Players ');
  });
});