const account = require('../modules/account');
const shop = require('../modules/shop');
describe('PGATS - Automation Exercise', () => {
  let user;
  beforeEach(() => { user = account.makeUser(); });
  afterEach(() => { account.cleanup(user); });
  it('TC01 - cadastrar e excluir usuário', () => { shop.home(); account.register(user); account.remove(); });
  it('TC05 - rejeitar email já cadastrado', () => { account.create(user); shop.home(); account.signupStart(user); account.rejectDuplicate(); });
  it('TC03 - rejeitar credenciais incorretas', () => { shop.home(); account.invalidLogin(user); });
  it('TC02 - autenticar e excluir usuário', () => { account.create(user); shop.home(); account.login(user); account.remove(); });
  it('TC04 - encerrar sessão', () => { account.create(user); shop.home(); account.login(user); account.logout(); });
  it('TC08 - listar produtos e conferir detalhes', () => { shop.home(); shop.details(); });
  it('TC09 - pesquisar produtos', () => { shop.home(); shop.search('Blue Top'); });
  it('TC10 - assinar novidades na página inicial', () => { shop.home(); shop.subscribe(user.email); });
  it('TC15 - cadastrar antes de concluir pedido', () => { shop.home(); account.register(user); shop.order(user); account.remove(); });
  it('TC16 - autenticar antes de concluir pedido', () => { account.create(user); shop.home(); account.login(user); shop.order(user); account.remove(); });
});
