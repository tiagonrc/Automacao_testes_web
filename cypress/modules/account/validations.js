const s = require('../../support/selectors');
module.exports = {
  loginForm() { cy.get(s.loginForm).should('contain.text', 'Login to your account'); },
  signupForm() { cy.get(s.signupForm).should('contain.text', 'New User Signup!'); },
  information(user) {
    cy.contains('Enter Account Information', { matchCase: false }).should('be.visible');
    cy.get(s.qa('name')).should('have.value', user.name); cy.get(s.qa('email')).should('have.value', user.email);
  },
  loggedIn(user) { cy.get(s.nav).should('contain.text', `Logged in as ${user.name}`); },
  created() { cy.get(s.qa('account-created')).should('be.visible').and('contain.text', 'Account Created!'); },
  deleted() { cy.get(s.qa('account-deleted')).should('be.visible').and('contain.text', 'Account Deleted!'); },
  duplicate() { cy.get(s.signupForm).should('contain.text', 'Email Address already exist!'); },
  invalid() { cy.get(s.loginForm).should('contain.text', 'Your email or password is incorrect!'); },
  loggedOut() { cy.location('pathname').should('eq', '/login'); cy.get(s.loginForm).should('be.visible'); cy.get(s.nav).should('not.contain.text', 'Logged in as'); }
};
