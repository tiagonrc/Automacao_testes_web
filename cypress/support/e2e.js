require('cypress-mochawesome-reporter/register');
// Only advertising hosts are blocked; application requests and errors remain real.
beforeEach(() => {
  ['**/*.doubleclick.net/**', '**/pagead2.googlesyndication.com/**', '**/googleads.g.doubleclick.net/**'].forEach(url => {
    cy.intercept(url, { statusCode: 204, body: '' });
  });
});
