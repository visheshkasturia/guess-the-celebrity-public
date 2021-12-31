describe('Player enters invalid name', () => {
  it(('Shows error and button'), () => {
    cy.visit('https://guess-the-celebrity-vk.herokuapp.com/');
    cy.get('#player-input').type('abc@a');
    cy.get('#error-msg-div').should('have.text', 'Only Letter and Digits Allowed')
    cy.get('#error-msg-btn').should('have.text','OK')
  });
} )