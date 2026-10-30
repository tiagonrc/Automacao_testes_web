const qa = name => `[data-qa="${name}"]`;
const seletores = {
  qa, nav: '.shop-menu', home: '#slider', signupForm: '.signup-form', loginForm: '.login-form',
  signupName: qa('signup-name'), signupEmail: qa('signup-email'), signup: qa('signup-button'),
  loginEmail: qa('login-email'), loginPassword: qa('login-password'), login: qa('login-button'),
  title: '#id_gender1', newsletter: '#newsletter', offers: '#optin',
  products: '.features_items .product-image-wrapper', productNames: '.productinfo p',
  productLink: '.choose a', productInfo: '.product-information', productName: 'h2', search: '#search_product', searchSubmit: '#submit_search',
  footer: '#footer', subscriptionEmail: '#susbscribe_email', subscriptionSubmit: '#subscribe', subscriptionSuccess: '#success-subscribe',
  addProduct: '.features_items .productinfo a[data-product-id="1"]', cartModal: '#cartModal', cart: '#cart_info', cartRow: '#product-1',
  checkout: '.check_out', delivery: '#address_delivery', billing: '#address_invoice', comment: 'textarea[name="message"]'
};

module.exports = seletores;
