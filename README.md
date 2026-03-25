# Frontend Tests - Serverest 🚀

Projeto de testes automatizados end-to-end desenvolvido para o processo seletivo. Testes de interface web utilizando a aplicação [Serverest](https://front.serverest.dev/login).

## 📋 Sobre o Projeto

Este projeto implementa testes automatizados para a plataforma Serverest, focando em fluxos de:
- **Criação de usuários** (administradores e usuários normais)
- **Validações de cadastro** (emails duplicados, etc)
- **Gerenciamento de usuários** (exclusão com permissões)

A solução utiliza boas práticas de automação de testes, incluindo Page Object Model, Factory Pattern e Fixtures customizadas.

## 🛠️ Tecnologias

- **[Playwright](https://playwright.dev/)** - Framework de automação de testes E2E
- **[TypeScript](https://www.typescriptlang.org/)** - Tipagem estática para JavaScript
- **[Node.js](https://nodejs.org/)** - Runtime JavaScript
- **[Maven](https://maven.apache.org/)** - Gerenciador de dependências (para execução em Java)
- **[JUnit 5](https://junit.org/junit5/)** - Framework de testes unitários

## 📁 Estrutura do Projeto

```
frontend-tests/
├── tests/
│   ├── PageObjectModel/          # Padrão Page Object Model
│   │   ├── CadastroPage.ts       # Page Object - Página de Cadastro
│   │   ├── LoginPage.ts          # Page Object - Página de Login
│   │   ├── ListarUsersPage.ts    # Page Object - Listagem de Usuários
│   │   ├── admin/                # Pages de admin
│   │   └── componentes/          # Componentes reutilizáveis
│   ├── factory/                  # Factory Pattern
│   │   └── UserFactory.ts        # Factory para criar dados de teste
│   ├── fixtures/                 # Fixtures customizadas do Playwright
│   │   └── Fixture.ts            # Fixture com injeção de Page Objects
│   ├── login.spec.ts             # Testes de login e cadastro
│   └── gerenciarUsers.spec.ts    # Testes de gerenciamento de usuários
├── playwright.config.ts          # Configuração do Playwright
├── package.json                  # Dependências Node.js
└── pom.xml                       # Configuração Maven (opcional)
```

## 🚀 Instalação

### Pré-requisitos
- Node.js (v18+)
- npm ou yarn
- Git

### Passos

1. **Clone o repositório**
```bash
git clone https://github.com/thiagoopg/frontend-tests.git
cd frontend-tests
```

2. **Instale as dependências**
```bash
npm install
```

3. **Instale os navegadores do Playwright**
```bash
npx playwright install
```

## ▶️ Executar Testes

### Executar todos os testes
```bash
npm test
```
ou
```bash
npx playwright test
```

### Executar um arquivo de teste específico
```bash
npx playwright test tests/login.spec.ts
```

### Executar testes em um navegador específico
```bash
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
```

### Modo UI (interativo)
```bash
npx playwright test --ui
```

### Modo debug
```bash
npx playwright test --debug
```

### Visualizar relatório HTML
```bash
npx playwright show-report
```

## 🏗️ Arquitetura e Padrões

### Page Object Model (POM)

Cada página da aplicação possui uma classe correspondente que encapsula os elementos e ações:

```typescript
// Exemplo: CadastroPage.ts
export class CadastroPage {
  readonly page: Page;
  readonly cadastro: Cadastro;

  constructor(page: Page) {
    this.page = page;
    this.cadastro = new Cadastro(page);
  }

  async visitarPaginaCadastro() {
    await this.page.goto('https://front.serverest.dev/cadastrarusuarios');
  }
}
```

### Factory Pattern

O `UserFactory` gera dados de teste consistentes e reutilizáveis:

```typescript
// Criando um usuário para testes
const adminUser = UserFactory.build({ admin: true });
const normalUser = UserFactory.build({ admin: false });
```

### Fixtures Customizadas

Fixtures injetam automaticamente os Page Objects nos testes:

```typescript
// Nos testes, os Page Objects estão disponíveis via injeção
test('teste exemplo', async ({ cadastroPage, loginPage, page }) => {
  await cadastroPage.visitarPaginaCadastro();
  // ...
});
```

## 📝 Exemplos de Testes

### Teste 1: Criar usuário com sucesso
```typescript
test('como um visitante, crio um usuário administrador com sucesso', async ({cadastroPage, page}) => {
    await cadastroPage.visitarPaginaCadastro()
    await cadastroPage.cadastro.cadastrarUsuario(UserFactory.build({admin: true}))
    await expect(page).toHaveURL('https://front.serverest.dev/admin/home', {timeout: 20000})
})
```

### Teste 2: Validar email duplicado
```typescript
test('como um visitante, crio um usuário com email repetido', async ({cadastroPage, page}) => {
    const user = UserFactory.build({admin: false})
    
    await cadastroPage.visitarPaginaCadastro()
    await cadastroPage.cadastro.cadastrarUsuario(user)
    
    await cadastroPage.visitarPaginaCadastro()
    await cadastroPage.cadastro.cadastrarUsuario(user)
    await expect(await cadastroPage.cadastro.getAlert()).toContainText('Este email já está sendo usado')
})
```

### Teste 3: Gerenciar usuários (exclusão)
```typescript
test('como administrador, excluo um usuário normal com sucesso', async ({ cadastrarUsersPage, listarUsersPage, page }) => {
    await cadastrarUsersPage.visitarPaginaCadastrarUsers();
    const userParaExcluir = UserFactory.build({ admin: false });
    
    await cadastrarUsersPage.cadastro.cadastrarUsuario(userParaExcluir);
    await listarUsersPage.excluirUsuarioPorEmail(userParaExcluir.email);
    
    await expect(page.locator(`text=${userParaExcluir.email}`))
        .toHaveCount(0);
})
```

## 🔧 Configuração do Playwright

O arquivo `playwright.config.ts` define:

- **Base URL**: https://front.serverest.dev/login
- **Relatório**: HTML
- **Retries**: 2 em CI, 0 localmente
- **Screenshots**: Apenas em falhas
- **Vídeos**: Retidos em falhas
- **Trace**: Retido em falhas
- **Navegadores**: Chromium, Firefox, WebKit

## 📊 Relatório de Testes

Após executar os testes, um relatório HTML é gerado. Visualize com:

```bash
npx playwright show-report
```

O relatório inclui:
- Status de cada teste (✅ passou, ❌ falhou)
- Screenshots em caso de falha
- Vídeos do teste
- Traces para debug detalhado

## 🐛 Debug e Troubleshooting

### Executar em modo debug
```bash
npx playwright test --debug
```

### Inspecionar elementos
```bash
npx playwright codegen https://front.serverest.dev/login
```

### Verificar logs detalhados
```bash
npm test -- --trace on
```

## 📚 Recursos

- [Documentação Playwright](https://playwright.dev/)
- [Documentação TypeScript](https://www.typescriptlang.org/docs/)
- [Page Object Model Pattern](https://playwright.dev/docs/pom)
- [Playwright Best Practices](https://playwright.dev/docs/best-practices)

## ✨ Características Principais

✅ Testes E2E completos  
✅ Page Object Model para melhor manutenibilidade  
✅ Factory Pattern para geração de dados de teste  
✅ Fixtures customizadas do Playwright  
✅ Testes paralelos em múltiplos navegadores  
✅ Relatórios HTML detalhados  
✅ Screenshots e vídeos de falhas  
✅ Traces para debug avançado  

## 📄 Licença

ISC

## 👤 Autor

**Thiago Oliveira** (@thiagoopg)

---

**Desenvolvido com ❤️ para o processo seletivo