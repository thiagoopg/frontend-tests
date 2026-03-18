#language: pt
Funcionalidade: Gerenciar a edição e exclusão de usuários.

Contexto:
  Dado estou na pagina de gerenciar usuarios

  #É possível excluir apenas usuários não administradores
  Cenário: como administrador, excluo um usuário normal com sucesso
    Quando escolho um usuario normal
    E excluo o usuario escolhido
    Entao o usuario é deletado e nao esta na lista

  Cenário: como administrador, não consigo excluir outro usuário administrador
    Quando escolho um usuario normal
    E excluo o usuario escolhido
    Entao o usuario escolhido permanece na lista

  Cenário: como administrador, tento excluir meu próprio usuário e sou bloqueado de fazer isto
    Quando escolho o meu proprio usuario
    E excluo o usuario escolhido
    Entao o usuario escolhido permanece na lista