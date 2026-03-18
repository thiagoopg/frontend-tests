#language: pt
Funcionalidade: Testar a página de login, cadastro e fazer logout.

  Contexto:
    Dado estou na pagina inicial de login


  Cenário: como um visitante, crio um usuário administrador com sucesso
    Quando preencho corretamente o formulario de cadastro
    Entao estou logado e na pagina inicial

  Cenário: como um visitante, crio um usuário normal com sucesso
    Quando preencho corretamente o formulario de cadastro
    Entao estou logado e na pagina inicial

  Cenário: como um visitante, crio um usuário com email repetido
    Quando preencho corretamente com um email repetido
    Entao aparece uma mensagem de erro de email repetido

  Cenário: faço logout
    Dado faço login com um usuario
    Quando deslogo
    Entao volto para a página de login