#language: pt
Funcionalidade:

#Criar usuários
  Cenário: como um visitante, crio um usuário administrador com sucesso
    Dado estou na pagina inicial
    Quando preencho corretamente o formulario de cadastro
    Entao estou logado e na pagina inicial

  Cenário: como um visitante, crio um usuário com email repetido
    Dado estou na pagina inicial
    Quando preencho corretamente com um email repetido
    Entao aparece uma mensagem de erro de email repetido

  Cenário: faço logout
    Dado faço login com um usuario
    Quando deslogo
    Entao volto para a página de login
#Administrar Usuários
  #É possível excluir apenas usuários não administradores
  Cenário: como administrador, excluo um usuário normal com sucesso

  Cenário: como administrador, não consigo excluir outro usuário administrador

  Cenário: como administrador, tento excluir meu próprio usuário e sou bloqueado de fazer isto

  #funcionalidade falhando, não é possível editar qualquer tipo de usuário, aplicar o teste para descoberta de bug
  Cenário: como administrador, edito um usuário normal

  Cenário: como administrador, não consigo editar um usuário administrador

#Cadastro de Produtos
  Cenário: crio um produto corretamente com imagem

  Cenário: crio um produto corretamente sem imagem

#administrar produtos
  Cenário: edito um produto

  Cenário: excluo um produto

# usuário normal e produtos
  Cenário: pesquiso um produto existente

  Cenário: pesquiso um produto não existente

  Cenário: adiciono um produto a lista de compras

  Cenário: limpo o carrinho com sucesso