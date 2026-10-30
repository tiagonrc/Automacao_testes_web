const s = require('../../support/selectors');
module.exports = {
  home() { cy.get(s.home).should('be.visible'); },
  products() { cy.contains('All Products', { matchCase: false }).should('be.visible'); cy.get(s.products).should('have.length.greaterThan', 0); },
  details() {
    cy.location('pathname').should('match', /^\/product_details\/\d+$/);
    cy.get(s.productInfo).within(() => {
      cy.get(s.productName).should('have.text', 'Blue Top');
      ['Category:', 'Rs. 500', 'Availability:', 'In Stock', 'Condition:', 'New', 'Brand:', 'Polo'].forEach(text => cy.contains(text).should('be.visible'));
    });
  },
  search(term) {
    cy.contains('Searched Products', { matchCase: false }).should('be.visible');
    cy.get(s.productNames).should('have.length.greaterThan', 0).each(item => {
      expect(item.text().toLowerCase()).to.include(term.toLowerCase()); cy.wrap(item).should('be.visible');
    });
  },
  footer() { cy.get(s.footer).contains('Subscription', { matchCase: false }).should('be.visible'); },
  subscribed() { cy.get(s.subscriptionSuccess).should('be.visible').and('contain.text', 'You have been successfully subscribed!'); },
  added() { cy.get(s.cartModal).should('be.visible'); },
  cart() {
    cy.location('pathname').should('eq', '/view_cart'); cy.get(s.cart).should('be.visible');
    cy.get(s.cartRow).should('contain.text', 'Blue Top').and('contain.text', '500');
  },
  checkout(user) {
    cy.contains('Address Details').should('be.visible'); cy.contains('Review Your Order').should('be.visible');
    [s.delivery, s.billing].forEach(selector => {
      cy.get(selector).should('contain.text', `${user.firstname} ${user.lastname}`).and('contain.text', user.address1).and('contain.text', user.country);
    });
    cy.get(s.cartRow).should('contain.text', 'Blue Top');
  },
  ordered() { cy.get(s.qa('order-placed')).should('be.visible'); cy.contains('Congratulations! Your order has been confirmed!').should('be.visible'); }
};
