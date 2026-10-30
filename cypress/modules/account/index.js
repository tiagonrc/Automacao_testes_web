const validate = require('./validations');
const s = require('../../support/selectors');
const makeUser = () => ({
  name: 'PGATS Test', email: `pgats.${Date.now()}.${Cypress._.random(1e9)}@example.com`, password: 'TestOnly!2026',
  title: 'Mr', birth_date: '10', birth_month: '5', birth_year: '1990', firstname: 'PGATS', lastname: 'Test',
  company: 'Study', address1: '123 Test Street', address2: 'Suite 2', country: 'Canada', state: 'Ontario', city: 'Toronto', zipcode: 'M5V1A1', mobile_number: '4165550100'
});
const parse = body => typeof body === 'string' ? JSON.parse(body) : body;
module.exports = {
  makeUser,
  create(user) { return cy.request({ method: 'POST', url: '/api/createAccount', form: true, body: user }).then(r => expect(parse(r.body).responseCode).to.eq(201)); },
  cleanup(user) { return cy.request({ method: 'DELETE', url: '/api/deleteAccount', form: true, body: { email: user.email, password: user.password } }).then(r => expect([200, 404]).to.include(parse(r.body).responseCode)); },
  open() { cy.get(s.nav).contains('Signup / Login').click(); },
  loggedIn(user) { validate.loggedIn(user); },
  login(user) {
    this.open(); validate.loginForm();
    cy.get(s.loginEmail).type(user.email); cy.get(s.loginPassword).type(user.password, { log: false }); cy.get(s.login).click(); this.loggedIn(user);
  },
  signupStart(user) {
    this.open(); validate.signupForm();
    cy.get(s.signupName).type(user.name); cy.get(s.signupEmail).type(user.email); cy.get(s.signup).click();
  },
  register(user) {
    this.signupStart(user); validate.information(user);
    cy.get(s.title).check();
    cy.get(s.qa('password')).type(user.password, { log: false });
    [['days', 'birth_date'], ['months', 'birth_month'], ['years', 'birth_year']].forEach(([field, key]) => cy.get(s.qa(field)).select(user[key]));
    cy.get(s.newsletter).check(); cy.get(s.offers).check();
    const fields = { first_name: 'firstname', last_name: 'lastname', company: 'company', address: 'address1', address2: 'address2', state: 'state', city: 'city', zipcode: 'zipcode', mobile_number: 'mobile_number' };
    Object.entries(fields).forEach(([field, key]) => cy.get(s.qa(field)).type(user[key]));
    cy.get(s.qa('country')).select(user.country); cy.get(s.qa('create-account')).click();
    validate.created(); cy.get(s.qa('continue-button')).click(); this.loggedIn(user);
  },
  rejectDuplicate() { validate.duplicate(); },
  invalidLogin(user) {
    this.open(); validate.loginForm();
    cy.get(s.loginEmail).type(user.email); cy.get(s.loginPassword).type('Incorrect!'); cy.get(s.login).click();
    validate.invalid();
  },
  logout() {
    cy.get(s.nav).contains('Logout').click(); validate.loggedOut();
  },
  remove() { cy.get(s.nav).contains('Delete Account').click(); validate.deleted(); cy.get(s.qa('continue-button')).click(); }
};
