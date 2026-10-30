# PGATS — Automação Web com Cypress

Projeto JavaScript/CommonJS para os casos 1, 5, 3, 2, 4, 8, 9, 10, 15 e 16 do [Automation Exercise](https://automationexercise.com/test_cases).

## Executar

Requer Node.js 24 e acesso à internet. Na pasta deste arquivo:

```sh
npm ci
npm test
```

No Windows, se o PowerShell bloquear `npm.ps1`, use `npm.cmd ci` e `npm.cmd test`.
Para acompanhar interativamente: `npm run test:open`.
O relatório é gerado em `reports/index.html`; falhas incluem capturas de tela. O comando retorna código diferente de zero se houver falha.

## Organização

- `cypress/e2e/automation.cy.js`: os dez testes, cada um executável sem os anteriores.
- `cypress/support/selectors.js`: seletores centralizados, priorizando `data-qa`; IDs/classes para elementos sem esse atributo.
- `cypress/modules/account/index.js`: cadastro, autenticação e exclusão, exportados com `module.exports`.
- `cypress/modules/shop/index.js`: navegação, catálogo e pedido com cartão fictício.
- `cypress/modules/*/validations.js`: verificações de resultado; os `should` ficam nestas funções de validação.
- `cypress/support/e2e.js`: integração do relatório e bloqueio restrito de anúncios externos.
- `cypress.config.js`: isolamento, navegador, relatório e timeouts.
- `.github/workflows/cypress.yml`: instalação reproduzível, testes e upload das evidências mesmo em caso de falha.

## Dados e independência

Cada teste recebe um email sintético exclusivo. Cenários que exigem conta preexistente criam seu próprio pré-requisito pela API oficial; o comportamento em avaliação é exercitado pela interface. O `afterEach` exclui a conta daquele teste, aceitando conta já excluída. Se o processo for interrompido ou a rede cair, a limpeza pode não terminar. Não há credenciais pessoais nem cartão real.

Os testes não ignoram exceções da aplicação, não usam pausas fixas e não simulam respostas de cadastro, login, catálogo ou pagamento. Só requisições publicitárias externas são bloqueadas. O site de treinamento pode mudar e ficar indisponível.

## Cobertura

| Caso | Verificação |
| --- | --- |
| 01 | Cadastro completo, opções de comunicação, sessão e exclusão |
| 05 | Recusa de email existente |
| 03 | Recusa de credenciais incorretas |
| 02 | Login válido e exclusão |
| 04 | Logout e retorno ao login |
| 08 | Catálogo e dados do primeiro produto |
| 09 | Busca e correspondência dos resultados |
| 10 | Inscrição pelo rodapé |
| 15 | Cadastro pela interface antes do pedido |
| 16 | Login pela interface antes do pedido |

Nos casos 15/16 é validada a confirmação persistente da página final, cujo texto atual difere da frase descrita no roteiro oficial.

## GitHub Actions

Publique os arquivos, incluindo `package-lock.json` e `.github`, na raiz de um repositório. O workflow roda em push, pull request ou acionamento manual. Consulte a aba Actions e baixe `cypress-evidence`. Não requer Cypress Cloud nem token de gravação. Execução local não comprova execução hospedada.
