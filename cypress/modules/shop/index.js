const s = require('../../support/selectors');
const validate = require('./validations');
module.exports = {
  home() { cy.visit('/'); validate.home(); },
  products() { cy.get(s.nav).contains('Products').click(); validate.products(); },
  details() { this.products(); cy.get(s.products).first().find(s.productLink).click(); validate.details(); },
  search(term) { this.products(); cy.get(s.search).type(term); cy.get(s.searchSubmit).click(); validate.search(term); },
  subscribe(email) {
    cy.get(s.footer).scrollIntoView(); validate.footer();
    cy.get(s.subscriptionEmail).type(email); cy.get(s.subscriptionSubmit).click(); validate.subscribed();
  },
  order(user) {
    cy.get(s.addProduct).click(); validate.added(); cy.get(s.cartModal).contains('Continue Shopping').click();
    cy.get(s.nav).contains('Cart').click(); validate.cart();
    cy.get(s.checkout).click(); validate.checkout(user);
    cy.get(s.comment).type('Synthetic educational test order'); cy.contains('a', 'Place Order').click();
    const payment = { 'name-on-card': user.name, 'card-number': '4111111111111111', cvc: '123', 'expiry-month': '12', 'expiry-year': '2030' };
    Object.entries(payment).forEach(([field, value]) => cy.get(s.qa(field)).type(value));
    cy.get(s.qa('pay-button')).click(); validate.ordered();
  }
};
