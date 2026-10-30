# Evidências de validação

## Execução local — 30/10/2026

- Comando: `npm test`.
- Node.js 24.18.0, npm 11.16.0, Cypress 16.2.1, Electron 146, Windows 11.
- Início: 16:05:29; fim: 16:07:39 (America/Sao_Paulo).
- Resultado: **10 testes aprovados, 0 falhas, 0 pendentes, 0 ignorados**.
- Duração informada pelo relatório: 130250 ms.
- Relatório: `reports/index.html` e `reports/index.json` (gerados, fora do Git).
- Dependências instaladas e auditadas: zero vulnerabilidades após atualização do reporter para 5.0.0.
- Sintaxe JavaScript e `git diff --cached --check` verificadas.
- `node_modules` excluído do versionamento.

Foram corrigidos durante as execuções reais: seletor de produto que alcançava também a seção de recomendados e nomes dos atributos `data-qa` do pagamento. Não foram adicionadas exceções globais, simulações das respostas da aplicação ou retentativas para ocultar falhas.

## GitHub Actions

Execução hospedada será registrada após o primeiro push. A aprovação local acima não substitui esse resultado.

## Conferência com o guia

O PDF fornecido foi lido, incluindo os critérios da página 4: dez cenários na ordem indicada, módulos por contexto, `module.exports`, seletores centralizados, `should` em funções de validação, spec com chamadas de ações, contas independentes, relatório HTML e workflow. O caso 14 não está incluído. O histórico registra a implementação consolidada, sem inventar commits individuais retroativos.
