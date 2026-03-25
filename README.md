# Frontend Tests - Serverest

Projeto de testes automatizados end-to-end desenvolvido para o processo seletivo da SimFrete. 
Testes de interface web utilizando a aplicação [Serverest](https://front.serverest.dev/login).

## Sobre o Projeto

Este projeto implementa testes automatizados para a plataforma Serverest, focando em fluxos de:
- **Criação de usuários** (administradores e usuários normais)
- **Validações de cadastro** (emails duplicados, etc)
- **Gerenciamento de usuários** (exclusão com permissões)

A solução utiliza boas práticas de automação de testes, incluindo Page Object Model, Factory Pattern e Fixtures customizadas.

## Tecnologias

- **[Playwright](https://playwright.dev/)** - Framework de automação de testes E2E
- **[TypeScript](https://www.typescriptlang.org/)** - Tipagem estática para JavaScript
- **[Node.js](https://nodejs.org/)** - Runtime JavaScript
- **[Maven](https://maven.apache.org/)** - Gerenciador de dependências (para execução em Java)

## Principais Estrutura do Projeto

```
frontend-tests/
├── tests/
│   ├── PageObjectModel/          # Pasta com os Page Object Model
│   │   └── componentes/          # Componentes reutilizáveis para as Pages
│   ├── factory/                  # Factory Pattern
│   ├── fixtures/                 # Fixtures customizadas do Playwright usufruindo do POM
│   ├── login.spec.ts             # Testes de login e cadastro
│   └── gerenciarUsers.spec.ts    # Testes de gerenciamento de usuários
├── playwright.config.ts          # Configuração do Playwright
├── package.json                  # Dependências Node.js
└── pom.xml                       # Configuração Maven
```

## Instalação

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

## Executar Testes

### Executar todos os testes

```bash
npx playwright test
```

### Abrir interface de testes
```bash
npx playwright test --ui
```

### Modo debug
```bash
npx playwright test --debug
```

## Arquitetura e Padrões

### Page Object Model (POM)

Cada página da aplicação possui uma classe base correspondente que encapsula os elementos e ações:

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

O `UserFactory` gera dados de teste consistentes, dinâmicos usando os milisegundos para o email e reutilizáveis:

```typescript
// Criando um usuário para testes
const adminUser = UserFactory.build({ admin: true });
const normalUser = UserFactory.build({ admin: false });
```

### Fixtures Customizadas

Fixtures injetam automaticamente os Page Objects nos testes que são necessários:

```typescript
// Nos testes, os Page Objects estão disponíveis via injeção
test('teste exemplo', async ({ cadastroPage, loginPage, page }) => {
  await cadastroPage.visitarPaginaCadastro();
  // ...
});
```

## Melhorias futuras

  - logs para partes complexas
  - parâmetro para visualizar logs ou não.
  - melhorar documentação
  - os demais testes
  
