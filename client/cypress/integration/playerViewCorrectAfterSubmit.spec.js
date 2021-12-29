describe('Player submmits the info then deletes it', () => {

  it(('deletes correctly'), () => {
    cy.visit('https://guess-the-celebrity-vk.herokuapp.com/');
    cy.get('#delete-startscreen').click();
    cy.get('#delete-input').type('Vizzy').click();
    cy.get('#delete-button').click();
    cy.wait(500);
  });

  it(('starts correctly'), () => {
    cy.wait(200);
    cy.get('#player-input').type('Vizzy');
    cy.get('#submit-button').click();
    cy.get('#start-button').should('have.text','Start Game');
  });
});
