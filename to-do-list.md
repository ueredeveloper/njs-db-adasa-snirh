# To-Do List

## 2024-03-21

### Tarefas:
- [X] Adicionar tablea de outorgas do banco de dados da Adasa dentro da tabela de dados do banco da Ana utilizando o SNIRH.

## 2024-03-21
- [X] Melhorar css para que a tabela Adasa não se sobressaia à thead da tabela SNIRH.
    - Foi retirado z-index: 10 do elemento `table` no `list-grants-view`.
- [] Verificar a possibilidade de buscar pontos por proximidade utilizando SQL. Já foi feito testes utilizando a biblioteca ...
    - Primeiramente foi criado o método `select-closest-points`. Está  sendo verificado com o Welber a possiblidade de adicionar a query utilizada neste método nos outros métodos como `select-sub-insert-model.js`;

## 2024-03-25
- [] Comparar Nome e CPF
    Criar um comparador de nome e CPF/CNPJ. Função de comparação de nome criada no `jsfiddle.js`.
- [] Criar manipuladores da planilha.
    Eu criei a div com id `list-handlers` para isso.

## 2024-04-09
- [] Melhorar ids de botões no component `AccordionView`.

## 2024-04-19
- [] Ao selecionar apenas as colunas principais de verificação utilizando o checkbox `list-handle-view`, organizar as colunas. Hoje o cnpj está sendo mostrado em lugares não muito próximos na `list-snirh-view` e na `list-adasa-view`.

## 2024-04-23
- [] A pesquisa no banco desktop em json deve atender à uma busca com acento, ex: José e Jose.

## 2024-04-24
- [] Verificar se modifica muito a query para barragens e lançamentos. Enviei um e-mail para o Welber à respeito.

## 2024-05-09
- [] Criar objetos da planilha de edição e inserção na pasta models.

## 2024-05-29
- [X] Erro
    Não está selecionando por parâmetro `select-by-param`.
        Funcionando.
## 2024-06-03
- [X]    Esperando resposta de e-mail de como verficiar as edições, no momento não estou conseguindo ver o resultado das edições.
    Em resposta a instituição avisa que solucionou o problema e que as edições serão atualizadas de 15 em 15 minutos.
    03/07/2024 - No momento a edição que fiz ainda não foi verificada. Estou entrando novamente em contato com o Márlon da Ana.
- [X]    Criando método de busca por parâmetro no banco da Adasa.

## 2024-06-24
- []    Mudar o nome da view `list-adasa-view` para `list-grants-view`. Isto adiciona um nome mais genérico pois depois pode ser utilizado para outorgas de outros Estados, por exemplo.

## 2024-06-25
- [X]    Revisão da ordem das colunas ao criar o csv.
    Ao criar o csv revise a ordem das colunas. É necessário criar uma array com a ordem e orientar a criação do csv de evição por ela.
        03/07/2024 - No momento não está sendo necessário. Consegui enviar uma planilha de edição de superficial apenas com a query e editando o id da interferência na Ana.

## 2024-08-07
- [X] Foi adicionado tabs separando inserção de dados e edição de dados, `ManageDataView`.

- [] É preciso melhorar o css para que o manipulador de quantidade de colunas fique sempre na parte inferior da tela.

## 2024-08-12
- [X] Edição Interferencia 3132
    A edição foi feita com sucesso. Para buscar utilize: 
        idFinalidade: 6 -> FIN_TFN_CD
        idTipoOutorga: 1, 
        idSituação: 4 -> OUT_TP_SITUACAOOUTORGA

    [] Verificar pois a interferência 3132 tem tipo outorga 2, "OUT_TP_OUTORGA": "2", porém só se pesquisa  com idTipoOutorga: 1.

- [] Verificar se todos os usuários do SNIRH ao pesquisar informa o atributo FIN_CD.
- [] A interferência do SNIRH, INT_CD:1153745, tem formato de json diferente da interferência do mesmo usuário, INT_CD: 928961.


## 2024-08-13
- [] Adicionar número de página na busca.
- [x] Criar uma única variável de parâmetro de buscas.
    Foi criado na pasta `utils` a variável `searchParams`;.
- [] Adicionar retorno no método `compare-and-write-csv-to-uptade`, pois há interferências no SNIRH sem o atributo FIN_CD e, desta forma, gerando erro na tentativa de editar.
        Talvez esta conferência seja melhor no frontend.


