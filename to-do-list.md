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

- [] Separar Busca Snirh e Adasa
    Talvez tenha que  separar as buscas no sistema da Adasa e a busca no sistema do SNIRH.

- [] Dicionário
    #### Atributos e suas descrições

    | Atributo | Descrição |
    |---|---|
    | INT_TIN_CD | Tipo de instalação: 1 - superficial e subterrânea, 2 - efluente, 3 - Barragem |
    | INT_TSU_CD | Tipo de Uso: 1 - superficial, 2 - subterrânea |
    | INT_CR_LATITUDE | Latitude para consultas de inserção de dados. |
    | INT_NU_LATITUDE | Latitude para consultas de edição de dados. |

    #### Relações com a busca SNIRH

    A busca SNIRH utiliza os seguintes atributos para filtrar os resultados:

    * **Tipo de Outorga:** Corresponde ao atributo `INT_TIN_CD`.
    * **Situação:** Corresponde ao atributo `OUT_TP_SITUACAOOUTORGA`.
    * **Finalidade:** Corresponde ao atributo `FIN_TFN_CD`.

- [X] - Erro no atributo EMP_NU_LOGRADOURO
    Estava na query de update `C.ENDERECO EMP_NU_LOGRADOURO`, porém no dicionário tem que ser um número. Mudei para ficar igual à query de inserção `'' EMP_NU_LOGRADOURO`.

- [] Adicionar espera de criação de CSV
    Ao solicitar uma edição é criado um csv, é preciso esperar a criação para depois anexar no body e enviar para o serviço SNIRH.

## 2024-08-14

- [] - Busca sem Atributos
    Adicionar valor vazio nos parâmetros de busca do SNIRH. Por exemplo, poder pesquisar no tipo de outorga os quatro valores, Captação, Lançamento, Barragem, Ponto de Referência e todos juntos, que seria o valor "".
- [X] - Erro no atributo EMP_NU_TELEFONE
    Foi editado o select para para remoção de caracteres especiais do telefone e remoção do 61 quando o valor for maio que 10 caracteres.
- [] Checkbox nas Interferências
    Adicionar um checkbox para selecionar várias interferências e criar o arquivo csv para edição.
## 20214-08-16
- [] - Ao iniciar selecionar no snirh e banco estadual as outorgas novas, ou editadas recentemente.
## 2024-08-22
- [] Filtrar Colunas
    Adicionar uma forma de renderizar já com as colunas filtradas. No caso, quando se quiser ver apenas as colunas principais e selecionar outorgas próximas estas outorgas já iniciarem com colunas filtradas, está iniciando com todas as colunas e é preciso desselecionar o `Alternar colunas` e selecionar novamente.
- [] Filtrar Linhas
    Adicionar forma de destacar a linha editada, ou colocando ela sozinha na tabela ou através de cor.

- [] Limpeza da Variável `toUpdateGrants` e Componentes
    Ao limpar a variável citada desselecionar os checkboxes.

## 2024-08-23
- [] Loop Ao Salvar
    Quando escolhe várias interferências e o usuário decide salvar apenas uma pelo botão de salvar do Estado é criado um loop e salva várias vezes a mesma interferência.
        - O erro ocorre quando é enviado vários objetos e ocorre algum erro na transmissão, como CPF inválido, por exemplo. Se neste momento o usuário quiser salvar um destas outorgas separadas, pelo botão presente no `StateUpdateView` é gerado um loop e salva várias vezes o mesmo objeto.
 - [] Botão de filtro de colunas na StateUpdateView.
    Adicionar botão para que o usuário veja apenas as colunas nome, cpf, endereço e possa comparar rapidamente estas colunas principais de comparação.

- [] Rever a busca por parâmetros no banco da Adasa.
    Um endereço conhecido não é  encontrado.


## 2024-11-18

Erro, id: 1038980. 

Foi nescessário mudar a vírgula para ponto na coordenada. Verificar o arquivo `select-closest points.js`.

Como as coordenadas do arquivo de backupd .csv baixado do Cnarh vem com vírgula, tem que mudar para ponto e assim poder encontrar as outorgas próximas.


## 2024-12-06
    No momento temos 11 registros na pesquisa de dados após 01/01/2024. 
    
    Hoje será inserido 26 dados, pela pesquisa de outorgas a partir de 01/11/2024.
    Verificar dois registros depois SIDNEI PETER IZOTON nestes 26 enviados.
    
## 2024-02/13
    - Busca um ponto na tela insert em 2024
        Busca: 01/11/2024
            INT_CD_ORIGEM: 14854
            Busca se ela existe na tela edição. Use a busca simples: 14854
                Sim, já existe.
                Faz outra busca.
            Inseri por este critério as interferência 7019 (26/12/2034	27/12/2024) e 14922 (03/12/2034	04/12/2024).

## 04/09/2025
- [] Foi melhorado a query de busca com parâmetros para aceitar melhor a busca
por nomes ou datas. Quando buscar por nome não precisa buscar por data

```
-- Busca pela data inicial da outorga
                OR (
					TRY_CONVERT(DATETIME, @param, 103) IS NOT NULL
					AND A.DT_PUBLICACAO BETWEEN TRY_CONVERT(DATETIME, @param, 103) 
					AND DATEADD(DAY, 32, TRY_CONVERT(DATETIME, @param, 103))
				)
```

## 05/09/2025
-   [X] Converter para utf 8 o resultado da busca no snirh via csv
        08/09/2025 - No momento estou tentando salvar o csv em latin1.
-   [] Verificar o atributo FIN_CD no momento desta busca por csv, ou o atributo anterior


## 09/09/2025

editados

OK


{"INT_CD":"1659420","INT_CD_ORIGEM":"6764","INT_DS_OPCIONAL":"","INT_TIN_CD":"1","INT_TSU_CD":"2","INT_NU_SIAGAS":"","INT_NU_LATITUDE":"#-15.909167","INT_NU_LONGITUDE":"#-47.749","INT_NM_CORPOHIDRICOALTERADO":"","EMP_NM_EMPREENDIMENTO":"AGROVILA II, PRÃXIMA A AR 15, ENTRE CONJUNTO 01/02, ESTAÃÃO DE TRATAMENTO DE ESGOTO, (ETE SÃO SEBASTIÃO)","EMP_NM_RESPONSAVEL":"COMPANHIA DE SANEAMENTO AMBIENTAL DO DISTRITO FEDERAL - CAESB","EMP_NU_CPFCNPJ":"00.082.024/0001-37","EMP_DS_EMAILRESPONSAVEL":"vladimirpuntel@caesb.df.gov.br","EMP_NU_CEPENDERECO":"71.928-720","EMP_DS_LOGRADOURO":"Avenida Sibipiruna Lotes 13 A 21 Ed Xingu Bl D 1 Piso Caesb Sede","EMP_DS_COMPLEMENTOENDERECO":"Centro de Gestao &#65533guas Emendadas","EMP_NU_LOGRADOURO":"","EMP_NU_CAIXAPOSTAL":"",

o erro estava aqui, cortando águas claras
``` 
"EMP_DS_BAIRRO":"Sul (&#65533","EMP_NU_DDD":"guas Claras)",
```


"EMP_NU_TELEFONE":"61","EMP_CD_IBGEMUNCORRESPONDENCIA":"32137352",


OK


{"INT_CD":"1658980","INT_CD_ORIGEM":"16266","INT_DS_OPCIONAL":"","INT_TIN_CD":"1","INT_TSU_CD":"2","INT_NU_SIAGAS":"","INT_NU_LATITUDE":"#-15.792552","INT_NU_LONGITUDE":"#-47.938383","INT_NM_CORPOHIDRICOALTERADO":"","EMP_NM_EMPREENDIMENTO":"QUADRA 811, CRUZEIRO NOVO","EMP_NM_RESPONSAVEL":"ADMINISTRAÃÃO REGIONAL DO CRUZEIRO","EMP_NU_CPFCNPJ":"16.673.858/0001-57","EMP_DS_EMAILRESPONSAVEL":"samuel_morais01@hotmail.com","EMP_NU_CEPENDERECO":"71.060-152","EMP_DS_LOGRADOURO":"QE 28, CONJUNTO O, CASA 45","EMP_DS_COMPLEMENTOENDERECO":"","EMP_NU_LOGRADOURO":"","EMP_NU_CAIXAPOSTAL":"0","EMP_DS_BAIRRO":"Guará II","EMP_NU_DDD":"61","EMP_NU_TELEFONE":"982488328","EMP_CD_IBGEMUNCORRESPONDENCIA":"5300108","OUT_TP_OUTORGA":"5","OUT_TP_SITUACAOOUTORGA":"1","OUT_DT_OUTORGAINICIAL":"12/02/2025","OUT_DT_OUTORGAFINAL":"11/02/2028","OUT_NU_PROCESSO":"0197-000721/2007",

"OUT_TP_ATO":"OUTORGA PRÃVIA","OUT_NU_ATO":"0041/2025",

"DAD_QT_VAZAODIAJAN":"2,25","DAD_QT_VAZAODIAFEV":"2,25","DAD_QT_VAZAODIAMAR":"2,25","DAD_QT_VAZAODIAABR":"2,25","DAD_QT_VAZAODIAMAI":"2,25","DAD_QT_VAZAODIAJUN":"2,25","DAD_QT_VAZAODIAJUL":"2,25","DAD_QT_VAZAODIAAGO":"2,25","DAD_QT_VAZAODIASET":"2,25","DAD_QT_VAZAODIAOUT":"2,25","DAD_QT_VAZAODIANOV":"2,25","DAD_QT_VAZAODIADEZ":"2,25","DAD_QT_HORASJAN":"17","DAD_QT_HORASFEV":"17","DAD_QT_HORASMAR":"17","DAD_QT_HORASABR":"17","DAD_QT_HORASMAI":"17","DAD_QT_HORASJUN":"17","DAD_QT_HORASJUL":"17","DAD_QT_HORASAGO":"17","DAD_QT_HORASSET":"17","DAD_QT_HORASOUT":"17","DAD_QT_HORASNOV":"17","DAD_QT_HORASDEZ":"17","DAD_QT_DIAJAN":"31","DAD_QT_DIAFEV":"28","DAD_QT_DIAMAR":"31","DAD_QT_DIAABR":"30","DAD_QT_DIAMAI":"31","DAD_QT_DIAJUN":"30","DAD_QT_DIAJUL":"31","DAD_QT_DIAAGO":"31","DAD_QT_DIASET":"30","DAD_QT_DIAOUT":"31","DAD_QT_DIANOV":"30","DAD_QT_DIADEZ":"31","FIN_CD":"1465664","FIN_TFN_CD":"99","FES_NU_PROFUNDIDADEMEDIATANQUE":"","FES_NU_AREATOTALTANQUE":"","TTC_CD":"","TTC_TCU_CD":"","FSE_TES_CD":"","FIE_TPS_CD":"","FAH_TAH_CD":"","FAH_NU_POTENCIAINSTALADA":"","FAH_IC_APROVEITAMENTOFIODAGUA":"","FAH_NU_AREAINUNDADANA":"","FAH_NU_VOLUMENA":"","FPE_TPE_CD":"","FPE_CNA_CD":"","ETP_CD":"","ETP_MPE_CD":"","ETP_NU_QUANTIDADEMAXMENSAL":"","IUS_NU_ALTURARES":"","IUS_NU_AREARESMAX":"","IUS_NU_VOLUMERES":"","IUS_NM_ENTIDADECONCEDENTE":"","IUS_NU_CONCESSAO":"","IUS_DT_FINALCONCESSAO":"","SIR_CD":"","SIR_TSI_CD":"","SIR_TCT_CD":"","SIR_NU_AREAIRRIGADA":"","FTE_NU_POTENCIAINSTALADA":"","FTE_NU_PRODUCAOMENSALMEDIA":"","FTE_TCO_CD":"","FTE_TSR_CD":"","FEA_NU_PRODUCAOMAXMENSALAREIA":"","FEA_NU_PROPORCAOAGUAPOLPA":"","FEA_PC_TEORUMIDADE":"","FOH_TOH_CD":"","FRE_NU_AREAINUNDADANA":"","FRE_NU_VOLUMENA":"","OTO_TOU_CD":"49","OTO_CD":"244260","OTO_NM_OUTROUSO":"","OTO_DS_OUTROUSO":"","HTE_CD":"","HTE_NU_QUANTIDADE":"","TUC_TEC_CD":"","TUC_CD":"","FTR_AR_TOTALEMPREENDIMENTO":"","ESC_CD":"","ESC_NU_PRODUCAOPRETENDIDA":"","ESC_TET_CD":"","CTE_CD":"","CTE_TSC_CD":"","CTE_TCA_CD":"","CTE_NU_CABECAS":"","ITC_CD":"","ITC_TUM_CD":"","ITC_NU_PRODUCAOANUAL":"","ITC_CNA_CD":"","EFL_NU_DBOBRUTO":"","EFL_NU_DBOTRATADO":"","EFL_NU_FOSFOROBRUTO":"","EFL_NU_FOSFOROTRATADO":"","EFL_NU_NITROGENIOBRUTO":"","EFL_NU_NITROGENIOTRATADO":"","EFL_NU_TEMPERATURA":"","EFL_TTE_CD":"","ASB_DT_INSTALACAO":"","ASB_TNP_CD":"10","ASB_NU_DIAMETROPERFURACAO":"","ASB_NU_DIAMETROFILTRO":"","ASB_TPA_CD":"","ASB_NU_TOPO":"","ASB_NU_BASE":"","ASB_TCQ_CD":"","ASB_NU_PROFUNDIDADEFINAL":"","ASB_NU_ALTURABOCATUBO":"","ASB_NU_COTATERRENO":"","ASB_DS_AQUIFEROEXPLOTADO":"","TST_TTB_CD":"6","TST_DS_TEMPODURACAO":"","TST_NU_ND":"","TST_NU_NE":"","TST_VZ_ESTABILIZACAO":"","TST_TMI_CD":"","TST_NU_COEFICIENTEARMAZENAMENT":"","TST_NU_TRANSMISSIVIDADE":"","TST_NU_CONDUTIVIDADEHIDRAULICA":"","TST_NU_PERMEABILIDADE":"","AMA_DT_COLETA":"","AMA_DT_ANALISE":"","AMA_NU_CONDUTIVIDADEELETRICA":"","AMA_QT_TEMPERATURA":"","AMA_QT_STD":"","AMA_QT_PH":"","AMA_QT_COLIFORMESTOTAIS":"","AMA_QT_COLIFORMESFECAIS":"","AMA_QT_BICARBONATO":"","AMA_QT_CALCIO":"","AMA_QT_CARBONATO":"","AMA_QT_CLORETO":"","AMA_QT_DUREZATOTAL":"","AMA_QT_FERROTOTAL":"","AMA_QT_FLUORETOS":"","AMA_QT_NITRATOS":"","AMA_QT_NITRITOS":"","AMA_QT_POTASSIO":"","AMA_QT_SODIO":"","AMA_QT_SULFATO":"","AMA_QT_MAGNESIO":""}


-------
09/09/2025, EDITEI ÀS 08:05

{"INT_CD":"1659168","INT_CD_ORIGEM":"16266","INT_DS_OPCIONAL":"","INT_TIN_CD":"1","INT_TSU_CD":"2","INT_NU_SIAGAS":"","INT_NU_LATITUDE":"#-15.7925527778","INT_NU_LONGITUDE":"#-47.9383833333","INT_NM_CORPOHIDRICOALTERADO":"","EMP_NM_EMPREENDIMENTO":"QUADRA 811, CRUZEIRO NOVO","EMP_NM_RESPONSAVEL":"ADMINISTRAÃ&#135Ã&#131O REGIONAL DO CRUZEIRO","EMP_NU_CPFCNPJ":"16.673.858/0001-57","EMP_DS_EMAILRESPONSAVEL":"samuel_morais01@hotmail.com","EMP_NU_CEPENDERECO":"71.060-152","EMP_DS_LOGRADOURO":"QE 28, CONJUNTO O, CASA 45","EMP_DS_COMPLEMENTOENDERECO":"","EMP_NU_LOGRADOURO":"","EMP_NU_CAIXAPOSTAL":"","EMP_DS_BAIRRO":"Guará II","EMP_NU_DDD":"61","EMP_NU_TELEFONE":"982488328","EMP_CD_IBGEMUNCORRESPONDENCIA":"5300108","OUT_TP_OUTORGA":"5","OUT_TP_SITUACAOOUTORGA":"1","OUT_DT_OUTORGAINICIAL":"12/02/2025","OUT_DT_OUTORGAFINAL":"11/02/2028","OUT_NU_PROCESSO":"0197-000721/2007",

AQUI, OUTORGA PRÉVIA SEPARADA EM DUAS COLUNAS

"OUT_TP_ATO":"OUTORGA PRÃ&#137",

"OUT_NU_ATO":"VIA",

"DAD_QT_VAZAODIAJAN":"0041/2025","DAD_QT_VAZAODIAFEV":"2,25","DAD_QT_VAZAODIAMAR":"2,25","DAD_QT_VAZAODIAABR":"2,25","DAD_QT_VAZAODIAMAI":"2,25","DAD_QT_VAZAODIAJUN":"2,25","DAD_QT_VAZAODIAJUL":"2,25","DAD_QT_VAZAODIAAGO":"2,25","DAD_QT_VAZAODIASET":"2,25","DAD_QT_VAZAODIAOUT":"2,25","DAD_QT_VAZAODIANOV":"2,25","DAD_QT_VAZAODIADEZ":"2,25","DAD_QT_HORASJAN":"2,25","DAD_QT_HORASFEV":"17","DAD_QT_HORASMAR":"17","DAD_QT_HORASABR":"17","DAD_QT_HORASMAI":"17","DAD_QT_HORASJUN":"17","DAD_QT_HORASJUL":"17","DAD_QT_HORASAGO":"17","DAD_QT_HORASSET":"17","DAD_QT_HORASOUT":"17","DAD_QT_HORASNOV":"17","DAD_QT_HORASDEZ":"17","DAD_QT_DIAJAN":"17","DAD_QT_DIAFEV":"31","DAD_QT_DIAMAR":"28","DAD_QT_DIAABR":"31","DAD_QT_DIAMAI":"30","DAD_QT_DIAJUN":"31","DAD_QT_DIAJUL":"30","DAD_QT_DIAAGO":"31","DAD_QT_DIASET":"31","DAD_QT_DIAOUT":"30","DAD_QT_DIANOV":"31","DAD_QT_DIADEZ":"30","FIN_CD":"31","FIN_TFN_CD":"1465718","FES_NU_PROFUNDIDADEMEDIATANQUE":"99","FES_NU_AREATOTALTANQUE":"","TTC_CD":"","TTC_TCU_CD":"","FSE_TES_CD":"","FIE_TPS_CD":"","FAH_TAH_CD":"","FAH_NU_POTENCIAINSTALADA":"","FAH_IC_APROVEITAMENTOFIODAGUA":"","FAH_NU_AREAINUNDADANA":"","FAH_NU_VOLUMENA":"","FPE_TPE_CD":"","FPE_CNA_CD":"","ETP_CD":"","ETP_MPE_CD":"","ETP_NU_QUANTIDADEMAXMENSAL":"","IUS_NU_ALTURARES":"","IUS_NU_AREARESMAX":"","IUS_NU_VOLUMERES":"","IUS_NM_ENTIDADECONCEDENTE":"","IUS_NU_CONCESSAO":"","IUS_DT_FINALCONCESSAO":"","SIR_CD":"","SIR_TSI_CD":"","SIR_TCT_CD":"","SIR_NU_AREAIRRIGADA":"","FTE_NU_POTENCIAINSTALADA":"","FTE_NU_PRODUCAOMENSALMEDIA":"","FTE_TCO_CD":"","FTE_TSR_CD":"","FEA_NU_PRODUCAOMAXMENSALAREIA":"","FEA_NU_PROPORCAOAGUAPOLPA":"","FEA_PC_TEORUMIDADE":"","FOH_TOH_CD":"","FRE_NU_AREAINUNDADANA":"","FRE_NU_VOLUMENA":"","OTO_TOU_CD":"","OTO_CD":"49","OTO_NM_OUTROUSO":"244291","OTO_DS_OUTROUSO":"","HTE_CD":"","HTE_NU_QUANTIDADE":"","TUC_TEC_CD":"","TUC_CD":"","FTR_AR_TOTALEMPREENDIMENTO":"","ESC_CD":"","ESC_NU_PRODUCAOPRETENDIDA":"","ESC_TET_CD":"","CTE_CD":"","CTE_TSC_CD":"","CTE_TCA_CD":"","CTE_NU_CABECAS":"","ITC_CD":"","ITC_TUM_CD":"","ITC_NU_PRODUCAOANUAL":"","ITC_CNA_CD":"","EFL_NU_DBOBRUTO":"","EFL_NU_DBOTRATADO":"","EFL_NU_FOSFOROBRUTO":"","EFL_NU_FOSFOROTRATADO":"","EFL_NU_NITROGENIOBRUTO":"","EFL_NU_NITROGENIOTRATADO":"","EFL_NU_TEMPERATURA":"","EFL_TTE_CD":"","ASB_DT_INSTALACAO":"","ASB_TNP_CD":"","ASB_NU_DIAMETROPERFURACAO":"10","ASB_NU_DIAMETROFILTRO":"","ASB_TPA_CD":"","ASB_NU_TOPO":"","ASB_NU_BASE":"","ASB_TCQ_CD":"","ASB_NU_PROFUNDIDADEFINAL":"","ASB_NU_ALTURABOCATUBO":"","ASB_NU_COTATERRENO":"","ASB_DS_AQUIFEROEXPLOTADO":"","TST_TTB_CD":"","TST_DS_TEMPODURACAO":"6","TST_NU_ND":"","TST_NU_NE":"","TST_VZ_ESTABILIZACAO":"","TST_TMI_CD":"","TST_NU_COEFICIENTEARMAZENAMENT":"","TST_NU_TRANSMISSIVIDADE":"","TST_NU_CONDUTIVIDADEHIDRAULICA":"","TST_NU_PERMEABILIDADE":"","AMA_DT_COLETA":"","AMA_DT_ANALISE":"","AMA_NU_CONDUTIVIDADEELETRICA":"","AMA_QT_TEMPERATURA":"","AMA_QT_STD":"","AMA_QT_PH":"","AMA_QT_COLIFORMESTOTAIS":"","AMA_QT_COLIFORMESFECAIS":"","AMA_QT_BICARBONATO":"","AMA_QT_CALCIO":"","AMA_QT_CARBONATO":"","AMA_QT_CLORETO":"","AMA_QT_DUREZATOTAL":"","AMA_QT_FERROTOTAL":"","AMA_QT_FLUORETOS":"","AMA_QT_NITRATOS":"","AMA_QT_NITRITOS":"","AMA_QT_POTASSIO":"","AMA_QT_SODIO":"","AMA_QT_SULFATO":"","AMA_QT_MAGNESIO":"","__parsed_extra":[""]}


## 09/09/2025
- [] Testar edição de dados convertendo para latin1, ao invés de utf-8.

```

const iconv = require('iconv-lite');



// String em UTF-8
const utf8String = 'Captação Subterrânea Poço Brasília';

// Converte de UTF-8 para Latin1
const latin1Buffer = iconv.encode(utf8String, 'latin1');
const latin1String = latin1Buffer.toString('latin1');
console.log('String em UTF-8', utf8String);
console.log('String em Latin1:', latin1String);

```


## 17/09/2025
- [] É preciso trabalhar melhor a leitra e edição do json ao pesquisar etc.
    - Leitura do json
    - Edição com valores novos pesquisados

- [] A criação do arquivo em csv utilizando o padrão latin1 ao invés de utf-8 parece ainda não funcionar.
    - No INT_CD 1154474, Antônio Jairo, não funcionou.

reenviei para edição, para isso mudei read-write-and-verify-file.js para latin1

``` 
fs.writeFile(path, jsonData, { encoding: 'latin1' }, (err) => {...
```

## 18/09/2025
- [] Ainda não funciona a formatação UTF-8
    Fiz todas as modificações, tanto de leitura com de escrita de um csv para utf 8, os fetchs enviando em utf-8 e nada ainda.


## 19/09/2025
- [] Erro 400, Verificar porquê o INT_ID: 933167 deu erro 400.

-[] Verificar o .pop, pois ele está removendo o último dado que tem outorga
    - Não parece ser esta parte.

## 22/09/2025
- []   Pesquisa 01/01/2023 - 3 registros, página 2
    INT_CD: 1031965, 1031990 esperar pois não tinha outorga muito próxima, 1043868

## 23/09/2025
- [] Busca simples por 1728
    693508		#-15,54005869	#-48,02834844	FRANCISCO MIGUEL DE LUCENO	FRANCISCO MIGUEL DE LUCENA	17280826334	12/08/2015	31/12/2050	1,97E+12	5	
        Verifica-se que o número do processo está ruim

        Deu erro de edição


- [] Adicionado outra opção para capturar a finalidade na comparação entre objetos (estadual e federal), FIN_TFN_CD.

    ```objectToSend.FIN_CD = federalGrant.FIN_CD || federalGrant.FIN_TFN_CD;```



    1523135	14164	#-15.570352	#-47.421149	NUCLEO RURAL PIPIRIPAU, FAZENDA LARGA, BR - 020 KM 48,5	NERI AMORIM DA SILVA	102.146.310-87	27/07/2023	26/07/2033	0197-000480/2010	1327484	



1659850	14164	#-15,570352	#-47,421149	NÿCLEO RURAL PIPIRIPAU FAZENDA LARGA BR - 020 KM 485	NERI AMORIM DA SILVA	10214631087	18/10/2024	17/10/2034	0197-0004802010	5	



1659225	14164	#-15.570352	#-47.421149	NÚCLEO RURAL PIPIRIPAU, FAZENDA LARGA, BR - 020 KM 48,5	NERI AMORIM DA SILVA	102.146.310-87	18/10/2024	17/10/2034	0197-000480/2010	1465895	


1660252	14164	#-15,570352	#-47,421149	NÿCLEO RURAL PIPIRIPAU FAZENDA LARGA BR - 020 KM 485	NERI AMORIM DA SILVA	10214631087	18/10/2024	17/10/2034	0197-0004802010	5	






1659492	14164	#-15.570352	#-47.421149	NÚCLEO RURAL PIPIRIPAU, FAZENDA LARGA, BR - 020 KM 48,5	NERI AMORIM DA SILVA	102.146.310-87	18/10/2024	17/10/2034	0197-000480/2010	1466161	



edição 
LAILA SIMAAN 17874

{
    "sucesso": true,
    "mensagem": "Dados enviados com sucesso",
    "resultadoEnvioPlanilha": {
        "id": 19643,
        "siglaUF": "DF",
        "dataEnvio": "2025-09-24 16:21:11",
        "dataProcessamento": null,
        "registrosAceitos": null,
        "nomeArquivo": "DF20250924132111640.csv",
        "totalRegistros": null,
        "tipoOperacao": {
            "id": 2,
            "descricao": "Update"
        },
        "tipoOrigemUpload": {
            "id": 2,
            "descricao": "Webservice"
        },
        "situacaoProcessamento": null
    }
}

federal
{
    "INT_CD": "1659586",
    "INT_CD_ORIGEM": "14953",
    "INT_DS_OPCIONAL": "",
    "INT_TIN_CD": "1",
    "INT_TSU_CD": "2",
    "INT_NU_SIAGAS": "",
    "INT_NU_LATITUDE": "#-15.804475",
    "INT_NU_LONGITUDE": "#-47.922696",
    "INT_NM_CORPOHIDRICOALTERADO": "",
    "EMP_NM_EMPREENDIMENTO": "PARQUE DONA SARAH KUBITSCHEK,  ESTACIONAMENTO 4, SETOR HÍPICO",
    "EMP_NM_RESPONSAVEL": "ALMIR ANTÔNIO LUSTOSA VIEIRA",
    "EMP_NU_CPFCNPJ": "214.264.141-53",
    "EMP_DS_EMAILRESPONSAVEL": "Almir.lustosa@gmail.com",
    "EMP_NU_CEPENDERECO": "70.673-107",
    "EMP_DS_LOGRADOURO": "SQSW 301, BLOCO G, APARTAMENTO 309",
    "EMP_DS_COMPLEMENTOENDERECO": "",
    "EMP_NU_LOGRADOURO": "",
    "EMP_NU_CAIXAPOSTAL": "0",
    "EMP_DS_BAIRRO": "Setor Sudoeste",
    "EMP_NU_DDD": "61",
    "EMP_NU_TELEFONE": "981996687",
    "EMP_CD_IBGEMUNCORRESPONDENCIA": "5300108",
    "OUT_TP_OUTORGA": "5",
    "OUT_TP_SITUACAOOUTORGA": "1",
    "OUT_DT_OUTORGAINICIAL": "19/12/2024",
    "OUT_DT_OUTORGAFINAL": "18/12/2027",
    "OUT_NU_PROCESSO": "00197-00003927/2024-18",
    "OUT_TP_ATO": "OUTORGA",
    "OUT_NU_ATO": "0360/2024",
    "DAD_QT_VAZAODIAJAN": "0,00",
    "DAD_QT_VAZAODIAFEV": "0,00",
    "DAD_QT_VAZAODIAMAR": "0,00",
    "DAD_QT_VAZAODIAABR": "6,25",
    "DAD_QT_VAZAODIAMAI": "6,25",
    "DAD_QT_VAZAODIAJUN": "6,25",
    "DAD_QT_VAZAODIAJUL": "6,25",
    "DAD_QT_VAZAODIAAGO": "6,25",
    "DAD_QT_VAZAODIASET": "6,25",
    "DAD_QT_VAZAODIAOUT": "6,25",
    "DAD_QT_VAZAODIANOV": "0,00",
    "DAD_QT_VAZAODIADEZ": "0,00",
    "DAD_QT_HORASJAN": "0",
    "DAD_QT_HORASFEV": "0",
    "DAD_QT_HORASMAR": "0",
    "DAD_QT_HORASABR": "4",
    "DAD_QT_HORASMAI": "4",
    "DAD_QT_HORASJUN": "4",
    "DAD_QT_HORASJUL": "4",
    "DAD_QT_HORASAGO": "4",
    "DAD_QT_HORASSET": "4",
    "DAD_QT_HORASOUT": "4",
    "DAD_QT_HORASNOV": "0",
    "DAD_QT_HORASDEZ": "0",
    "DAD_QT_DIAJAN": "31",
    "DAD_QT_DIAFEV": "29",
    "DAD_QT_DIAMAR": "31",
    "DAD_QT_DIAABR": "30",
    "DAD_QT_DIAMAI": "31",
    "DAD_QT_DIAJUN": "30",
    "DAD_QT_DIAJUL": "31",
    "DAD_QT_DIAAGO": "31",
    "DAD_QT_DIASET": "30",
    "DAD_QT_DIAOUT": "31",
    "DAD_QT_DIANOV": "30",
    "DAD_QT_DIADEZ": "31",
    "FIN_CD": "1466254",
    "FIN_TFN_CD": "99",
    "FES_NU_PROFUNDIDADEMEDIATANQUE": "",
    "FES_NU_AREATOTALTANQUE": "",
    "TTC_CD": "",
    "TTC_TCU_CD": "",
    "FSE_TES_CD": "",
    "FIE_TPS_CD": "",
    "FAH_TAH_CD": "",
    "FAH_NU_POTENCIAINSTALADA": "",
    "FAH_IC_APROVEITAMENTOFIODAGUA": "",
    "FAH_NU_AREAINUNDADANA": "",
    "FAH_NU_VOLUMENA": "",
    "FPE_TPE_CD": "",
    "FPE_CNA_CD": "",
    "ETP_CD": "",
    "ETP_MPE_CD": "",
    "ETP_NU_QUANTIDADEMAXMENSAL": "",
    "IUS_NU_ALTURARES": "",
    "IUS_NU_AREARESMAX": "",
    "IUS_NU_VOLUMERES": "",
    "IUS_NM_ENTIDADECONCEDENTE": "",
    "IUS_NU_CONCESSAO": "",
    "IUS_DT_FINALCONCESSAO": "",
    "SIR_CD": "",
    "SIR_TSI_CD": "",
    "SIR_TCT_CD": "",
    "SIR_NU_AREAIRRIGADA": "",
    "FTE_NU_POTENCIAINSTALADA": "",
    "FTE_NU_PRODUCAOMENSALMEDIA": "",
    "FTE_TCO_CD": "",
    "FTE_TSR_CD": "",
    "FEA_NU_PRODUCAOMAXMENSALAREIA": "",
    "FEA_NU_PROPORCAOAGUAPOLPA": "",
    "FEA_PC_TEORUMIDADE": "",
    "FOH_TOH_CD": "",
    "FRE_NU_AREAINUNDADANA": "",
    "FRE_NU_VOLUMENA": "",
    "OTO_TOU_CD": "49",
    "OTO_CD": "244507",
    "OTO_NM_OUTROUSO": "",
    "OTO_DS_OUTROUSO": "",
    "HTE_CD": "",
    "HTE_NU_QUANTIDADE": "",
    "TUC_TEC_CD": "",
    "TUC_CD": "",
    "FTR_AR_TOTALEMPREENDIMENTO": "",
    "ESC_CD": "",
    "ESC_NU_PRODUCAOPRETENDIDA": "",
    "ESC_TET_CD": "",
    "CTE_CD": "",
    "CTE_TSC_CD": "",
    "CTE_TCA_CD": "",
    "CTE_NU_CABECAS": "",
    "ITC_CD": "",
    "ITC_TUM_CD": "",
    "ITC_NU_PRODUCAOANUAL": "",
    "ITC_CNA_CD": "",
    "EFL_NU_DBOBRUTO": "",
    "EFL_NU_DBOTRATADO": "",
    "EFL_NU_FOSFOROBRUTO": "",
    "EFL_NU_FOSFOROTRATADO": "",
    "EFL_NU_NITROGENIOBRUTO": "",
    "EFL_NU_NITROGENIOTRATADO": "",
    "EFL_NU_TEMPERATURA": "",
    "EFL_TTE_CD": "",
    "ASB_DT_INSTALACAO": "",
    "ASB_TNP_CD": "10",
    "ASB_NU_DIAMETROPERFURACAO": "",
    "ASB_NU_DIAMETROFILTRO": "",
    "ASB_TPA_CD": "",
    "ASB_NU_TOPO": "",
    "ASB_NU_BASE": "",
    "ASB_TCQ_CD": "",
    "ASB_NU_PROFUNDIDADEFINAL": "",
    "ASB_NU_ALTURABOCATUBO": "",
    "ASB_NU_COTATERRENO": "",
    "ASB_DS_AQUIFEROEXPLOTADO": "",
    "TST_TTB_CD": "6",
    "TST_DS_TEMPODURACAO": "",
    "TST_NU_ND": "",
    "TST_NU_NE": "",
    "TST_VZ_ESTABILIZACAO": "",
    "TST_TMI_CD": "",
    "TST_NU_COEFICIENTEARMAZENAMENT": "",
    "TST_NU_TRANSMISSIVIDADE": "",
    "TST_NU_CONDUTIVIDADEHIDRAULICA": "",
    "TST_NU_PERMEABILIDADE": "",
    "AMA_DT_COLETA": "",
    "AMA_DT_ANALISE": "",
    "AMA_NU_CONDUTIVIDADEELETRICA": "",
    "AMA_QT_TEMPERATURA": "",
    "AMA_QT_STD": "",
    "AMA_QT_PH": "",
    "AMA_QT_COLIFORMESTOTAIS": "",
    "AMA_QT_COLIFORMESFECAIS": "",
    "AMA_QT_BICARBONATO": "",
    "AMA_QT_CALCIO": "",
    "AMA_QT_CARBONATO": "",
    "AMA_QT_CLORETO": "",
    "AMA_QT_DUREZATOTAL": "",
    "AMA_QT_FERROTOTAL": "",
    "AMA_QT_FLUORETOS": "",
    "AMA_QT_NITRATOS": "",
    "AMA_QT_NITRITOS": "",
    "AMA_QT_POTASSIO": "",
    "AMA_QT_SODIO": "",
    "AMA_QT_SULFATO": "",
    "AMA_QT_MAGNESIO": ""
}


state ( mudei de inserção para edição )
{
    "INT_CD": "",
    "INT_CD_ORIGEM": "17874",
    "INT_DS_OPTIONAL": "POÇO 1",
    "INT_TIN_CD": "1",
    "INT_TSU_CD": "2",
    "INT_NU_SIAGAS": "",
    "INT_NU_LATITUDE": "-15,625041",
    "INT_NU_LONGITUDE": "-47,557532",
    "INT_NM_CORPOHIDRICOALTERADO": "",
    "EMP_NM_EMPREENDIMENTO": "NÚCLEO RURAL TAQUARA, CHÁCARA 61",
    "EMP_NM_RESPONSAVEL": "LAILA SIMAAN",
    "EMP_NU_CPFCNPJ": "#18381600197",
    "EMP_DS_EMAILRESPONSAVEL": "premiumgrass.andre@gmail.com",
    "EMP_NU_CEPENDERECO": "70347100",
    "EMP_DS_LOGRADOURO": "SQS 108, BLOCO J, APARTAMENTO 606, ASA SUL",
    "EMP_DS_COMPLEMENTOENDERECO": "",
    "EMP_NU_LOGRADOURO": "",
    "EMP_NU_CAIXAPOSTAL": "0",
    "EMP_DS_BAIRRO": "PLANO PILOTO",
    "EMP_NU_DDD": "61",
    "EMP_NU_TELEFONE": "984418905",
    "EMP_CD_IBGEMUNCORRESPONDENCIA": "5300108",
    "OUT_TP_OUTORGA": "2",
    "OUT_TP_SITUACAOOUTORGA": "4",
    "OUT_DT_OUTORGAINICIAL": "06/08/2025",
    "OUT_DT_OUTORGAFINAL": "05/08/2028",
    "OUT_NU_PROCESSO": "00197-00000735/2023-79",
    "OUT_TP_AT": "OUTORGA PRÉVIA",
    "OUT_NU_ATO": "0237/2025",
    "DAD_QT_VAZAODIAJAN": "9,6",
    "DAD_QT_VAZAODIAFEV": "9,6",
    "DAD_QT_VAZAODIAMAR": "9,6",
    "DAD_QT_VAZAODIAABR": "9,6",
    "DAD_QT_VAZAODIAMAI": "9,6",
    "DAD_QT_VAZAODIAJUN": "9,6",
    "DAD_QT_VAZAODIAJUL": "9,6",
    "DAD_QT_VAZAODIAAGO": "9,6",
    "DAD_QT_VAZAODIASET": "9,6",
    "DAD_QT_VAZAODIAOUT": "9,6",
    "DAD_QT_VAZAODIANOV": "9,6",
    "DAD_QT_VAZAODIADEZ": "9,6",
    "DAD_QT_HORASJAN": "20",
    "DAD_QT_HORASFEV": "20",
    "DAD_QT_HORASMAR": "20",
    "DAD_QT_HORASABR": "20",
    "DAD_QT_HORASMAI": "20",
    "DAD_QT_HORASJUN": "20",
    "DAD_QT_HORASJUL": "20",
    "DAD_QT_HORASAGO": "20",
    "DAD_QT_HORASSET": "20",
    "DAD_QT_HORASOUT": "20",
    "DAD_QT_HORASNOV": "20",
    "DAD_QT_HORASDEZ": "20",
    "DAD_QT_DIAJAN": "31",
    "DAD_QT_DIAFEV": "28",
    "DAD_QT_DIAMAR": "31",
    "DAD_QT_DIAABR": "30",
    "DAD_QT_DIAMAI": "31",
    "DAD_QT_DIAJUN": "30",
    "DAD_QT_DIAJUL": "31",
    "DAD_QT_DIAAGO": "31",
    "DAD_QT_DIASET": "30",
    "DAD_QT_DIAOUT": "31",
    "DAD_QT_DIANOV": "30",
    "DAD_QT_DIADEZ": "31",
    "FIN_CD": "0",
    "FIN_TFN_CD": "5",
    "FES_NU_PROFUNDIDADEMEDIATANQUE": "",
    "FES_NU_AREATOTALTANQUE": "",
    "TTC_CD": "",
    "TTC_TCU_CD": "",
    "FSE_TES_CD": "",
    "FIE_TPS_CD": "",
    "FAH_TAH_CD": "",
    "FAH_NU_POTENCIAINSTALADA": "",
    "FAH_IC_APROVEITAMENTOFIODAGUA": "",
    "FAH_NU_AREAINUNDADANA": "",
    "FAH_NU_VOLUMENA": "",
    "FPE_TPE_CD": "",
    "FPE_CNA_CD": "",
    "ETP_CD": "",
    "ETP_MPE_CD": "",
    "ETP_NU_QUANTIDADEMAXMENSAL": "",
    "IUS_NU_ALTURARES": "",
    "IUS_NU_AREARESMAX": "",
    "IUS_NU_VOLUMERES": "",
    "IUS_NM_ENTIDADECONCEDENTE": "",
    "IUS_NU_CONCESSAO": "",
    "IUS_DT_FINALCONCESSAO": "",
    "SIR_CD": "",
    "SIR_TSI_CD": "3",
    "SIR_TCT_CD": "1120",
    "SIR_AR_IRRIGADA": "8,54",
    "FTE_NU_POTENCIAINSTALADA": "",
    "FTE_NU_PRODUCAOMENSALMEDIA": "",
    "FTE_TCO_CD": "",
    "FTE_TSR_CD": "",
    "FEA_NU_PRODUCAOMAXMENSALAREIA": "",
    "FEA_NU_PROPORCAOAGUAPOLPA": "",
    "FEA_PC_TEORUMIDADE": "",
    "FOH_TOH_CD": "",
    "FRE_NU_AREAINUNDADANA": "",
    "FRE_NU_VOLUMENA": "",
    "OTO_TOU_CD": "",
    "OTO_CD": "",
    "OTO_NM_OUTROUSO": "",
    "OTO_DS_OUTROUSO": "",
    "HTE_CD": "",
    "HTE_NU_QUANTIDADE": "",
    "TUC_TEC_CD": "",
    "TUC_CD": "",
    "FTR_AR_TOTALEMPREENDIMENTO": "",
    "ESC_CD": "",
    "ESC_NU_PRODUCAOPRETENDIDA": "",
    "ESC_TET_CD": "",
    "CTE_CD": "",
    "CTE_TSC_CD": "",
    "CTE_TCA_CD": "",
    "CTE_NU_CABECAS": "",
    "ITC_CD": "",
    "ITC_TUM_CD": "",
    "ITC_NU_PRODUCAOANUAL": "",
    "ITC_CNA_CD": "",
    "EFL_NU_DBOBRUTO": "",
    "EFL_NU_DBOTRATADO": "",
    "EFL_NU_FOSFOROBRUTO": "",
    "EFL_NU_FOSFOROTRATADO": "",
    "EFL_NU_NITROGENIOBRUTO": "",
    "EFL_NU_NITROGENIOTRATADO": "",
    "EFL_NU_TEMPERATURA": "",
    "EFL_TTE_CD": "",
    "ASB_DT_INSTALACAO": "",
    "ASB_TNP_CD": "",
    "ASB_NU_DIAMETROPERFURACAO": "",
    "ASB_NU_DIAMETROFILTRO": "",
    "ASB_TPA_CD": "",
    "ASB_NU_TOPO": "",
    "ASB_NU_BASE": "",
    "ASB_TCQ_CD": "",
    "ASB_NU_PROFUNDIDADEFINAL": "",
    "ASB_NU_ALTURABOCATUBO": "",
    "ASB_NU_COTATERRENO": "",
    "ASB_DS_AQUIFEROEXPLOTADO": "",
    "TST_TTB_CD": "",
    "TST_DS_TEMPODURACAO": "",
    "TST_NU_ND": "",
    "TST_NU_NE": "",
    "TST_VZ_ESTABILIZACAO": "",
    "TST_TMI_CD": "",
    "TST_NU_COEFICIENTEARMAZENAMENT": "",
    "TST_NU_TRANSMISSIVIDADE": "",
    "TST_NU_CONDUTIVIDADEHIDRAULICA": "",
    "TST_NU_PERMEABILIDADE": "",
    "AMA_DT_COLETA": "",
    "AMA_DT_ANALISE": "",
    "AMA_NU_CONDUTIVIDADEELETRICA": "",
    "AMA_QT_TEMPERATURA": "",
    "AMA_QT_STD": "",
    "AMA_QT_PH": "",
    "AMA_QT_COLIFORMESTOTAIS": "",
    "AMA_QT_COLIFORMESFECAIS": "",
    "AMA_QT_BICARBONATO": "",
    "AMA_QT_CALCIO": "",
    "AMA_QT_CARBONATO": "",
    "AMA_QT_CLORETO": "",
    "AMA_QT_DUREZATOTAL": "",
    "AMA_QT_FERROTOTAL": "",
    "AMA_QT_FLUORETOS": "",
    "AMA_QT_NITRATOS": "",
    "AMA_QT_NITRITOS": "",
    "AMA_QT_POTASSIO": "",
    "AMA_QT_SODIO": "",
    "AMA_QT_SULFATO": "",
    "AMA_QT_MAGNESIO": ""
}


Segunda edição, 13:26

2		-15,951103	-48,063345	5300108	NÚCLEO RURAL PONTE ALTA NORTE, CHÁCARA 11	#21134454000125	ASSOCIAÇÃO DOS MORADORES DO CONDOMÍNIO MAR DEL PLATA, CHÁCARA 11 DO NÚCLEO RURAL PONTE ALTA GAMA/DF	alvesribeiropb@hotmail.com	72427101	NÚCLEO RURAL PONTE ALTA NORTE, CHÁCARA 11			0	5300108	61	999385217	5	1	13/08/2028	14/08/2025	00197-00000598/2022-91	OUTORGA PRÉVIA	0264/2025		6,00	6,00	6,00	6,00	6,00	6,00	6,00	6,00	6,00	6,00	6,00	6,00	6	6	6	10	10	10	10	10	10	10	6	6	31	28	31	30	31	30	31	31	30	31	30	31	6,00	12	null	3	1120	1,00											10						null	null					6																															17877

INT_ID_ORIGEM 17877

[
    {
        "stateGrant": {
            "INT_CD": "",
            "INT_CD_ORIGEM": "17877",
            "INT_DS_OPTIONAL": "POÇO TUBULAR 2",
            "INT_TIN_CD": "1",
            "INT_TSU_CD": "2",1659586
            "INT_NU_SIAGAS": "",
            "INT_NU_LATITUDE": "-15,951103",
            "INT_NU_LONGITUDE": "-48,063345",
            "INT_NM_CORPOHIDRICOALTERADO": "",
            "EMP_NM_EMPREENDIMENTO": "NÚCLEO RURAL PONTE ALTA NORTE, CHÁCARA 11",
            "EMP_NM_RESPONSAVEL": "ASSOCIAÇÃO DOS MORADORES DO CONDOMÍNIO MAR DEL PLATA, CHÁCARA 11 DO NÚCLEO RURAL PONTE ALTA GAMA/DF",
            "EMP_NU_CPFCNPJ": "#21134454000125",
            "EMP_DS_EMAILRESPONSAVEL": "alvesribeiropb@hotmail.com",
            "EMP_NU_CEPENDERECO": "72427101",
            "EMP_DS_LOGRADOURO": "NÚCLEO RURAL PONTE ALTA NORTE, CHÁCARA 11",
            "EMP_DS_COMPLEMENTOENDERECO": "",
            "EMP_NU_LOGRADOURO": "",
            "EMP_NU_CAIXAPOSTAL": "0",
            "EMP_DS_BAIRRO": "GAMA",
            "EMP_NU_DDD": "61",
            "EMP_NU_TELEFONE": "999385217",
            "EMP_CD_IBGEMUNCORRESPONDENCIA": "5300108",
            "OUT_TP_OUTORGA": "2",
            "OUT_TP_SITUACAOOUTORGA": "4",
            "OUT_DT_OUTORGAINICIAL": "14/08/2025",
            "OUT_DT_OUTORGAFINAL": "13/08/2028",
            "OUT_NU_PROCESSO": "00197-00000598/2022-91",
            "OUT_TP_AT": "OUTORGA PRÉVIA",
            "OUT_NU_ATO": "0264/2025",
            "DAD_QT_VAZAODIAJAN": "6,0",
            "DAD_QT_VAZAODIAFEV": "6,0",
            "DAD_QT_VAZAODIAMAR": "6,0",
            "DAD_QT_VAZAODIAABR": "6,0",
            "DAD_QT_VAZAODIAMAI": "6,0",
            "DAD_QT_VAZAODIAJUN": "6,0",
            "DAD_QT_VAZAODIAJUL": "6,0",
            "DAD_QT_VAZAODIAAGO": "6,0",
            "DAD_QT_VAZAODIASET": "6,0",
            "DAD_QT_VAZAODIAOUT": "6,0",
            "DAD_QT_VAZAODIANOV": "6,0",
            "DAD_QT_VAZAODIADEZ": "6,0",
            "DAD_QT_HORASJAN": "6",
            "DAD_QT_HORASFEV": "6",
            "DAD_QT_HORASMAR": "6",
            "DAD_QT_HORASABR": "10",
            "DAD_QT_HORASMAI": "10",
            "DAD_QT_HORASJUN": "10",
            "DAD_QT_HORASJUL": "10",
            "DAD_QT_HORASAGO": "10",
            "DAD_QT_HORASSET": "10",
            "DAD_QT_HORASOUT": "10",
            "DAD_QT_HORASNOV": "6",
            "DAD_QT_HORASDEZ": "6",
            "DAD_QT_DIAJAN": "31",
            "DAD_QT_DIAFEV": "28",
            "DAD_QT_DIAMAR": "31",
            "DAD_QT_DIAABR": "30",
            "DAD_QT_DIAMAI": "31",
            "DAD_QT_DIAJUN": "30",
            "DAD_QT_DIAJUL": "31",
            "DAD_QT_DIAAGO": "31",
            "DAD_QT_DIASET": "30",
            "DAD_QT_DIAOUT": "31",
            "DAD_QT_DIANOV": "30",
            "DAD_QT_DIADEZ": "31",
            "FIN_CD": "0",
            "FIN_TFN_CD": "12",
            "FES_NU_PROFUNDIDADEMEDIATANQUE": "",
            "FES_NU_AREATOTALTANQUE": "",
            "TTC_CD": "",
            "TTC_TCU_CD": "",
            "FSE_TES_CD": "",
            "FIE_TPS_CD": "",
            "FAH_TAH_CD": "",
            "FAH_NU_POTENCIAINSTALADA": "",
            "FAH_IC_APROVEITAMENTOFIODAGUA": "",
            "FAH_NU_AREAINUNDADANA": "",
            "FAH_NU_VOLUMENA": "",
            "FPE_TPE_CD": "",
            "FPE_CNA_CD": "",
            "ETP_CD": "",
            "ETP_MPE_CD": "",
            "ETP_NU_QUANTIDADEMAXMENSAL": "",
            "IUS_NU_ALTURARES": "",
            "IUS_NU_AREARESMAX": "",
            "IUS_NU_VOLUMERES": "",
            "IUS_NM_ENTIDADECONCEDENTE": "",
            "IUS_NU_CONCESSAO": "",
            "IUS_DT_FINALCONCESSAO": "",
            "SIR_CD": "",
            "SIR_TSI_CD": "3",
            "SIR_TCT_CD": "1120",
            "SIR_AR_IRRIGADA": "1,00",
            "FTE_NU_POTENCIAINSTALADA": "",
            "FTE_NU_PRODUCAOMENSALMEDIA": "",
            "FTE_TCO_CD": "",
            "FTE_TSR_CD": "",
            "FEA_NU_PRODUCAOMAXMENSALAREIA": "",
            "FEA_NU_PROPORCAOAGUAPOLPA": "",
            "FEA_PC_TEORUMIDADE": "",
            "FOH_TOH_CD": "",
            "FRE_NU_AREAINUNDADANA": "",
            "FRE_NU_VOLUMENA": "",
            "OTO_TOU_CD": "",
            "OTO_CD": "",
            "OTO_NM_OUTROUSO": "",
            "OTO_DS_OUTROUSO": "",
            "HTE_CD": "",
            "HTE_NU_QUANTIDADE": "",
            "TUC_TEC_CD": "",
            "TUC_CD": "",
            "FTR_AR_TOTALEMPREENDIMENTO": "",
            "ESC_CD": "",
            "ESC_NU_PRODUCAOPRETENDIDA": "",
            "ESC_TET_CD": "",
            "CTE_CD": "",
            "CTE_TSC_CD": "",
            "CTE_TCA_CD": "",
            "CTE_NU_CABECAS": "",
            "ITC_CD": "",
            "ITC_TUM_CD": "",
            "ITC_NU_PRODUCAOANUAL": "",
            "ITC_CNA_CD": "",
            "EFL_NU_DBOBRUTO": "",
            "EFL_NU_DBOTRATADO": "",
            "EFL_NU_FOSFOROBRUTO": "",
            "EFL_NU_FOSFOROTRATADO": "",
            "EFL_NU_NITROGENIOBRUTO": "",
            "EFL_NU_NITROGENIOTRATADO": "",
            "EFL_NU_TEMPERATURA": "",
            "EFL_TTE_CD": "",
            "ASB_DT_INSTALACAO": "",
            "ASB_TNP_CD": "",
            "ASB_NU_DIAMETROPERFURACAO": "",
            "ASB_NU_DIAMETROFILTRO": "",
            "ASB_TPA_CD": "",
            "ASB_NU_TOPO": "",
            "ASB_NU_BASE": "",
            "ASB_TCQ_CD": "",
            "ASB_NU_PROFUNDIDADEFINAL": "",
            "ASB_NU_ALTURABOCATUBO": "",
            "ASB_NU_COTATERRENO": "",
            "ASB_DS_AQUIFEROEXPLOTADO": "",
            "TST_TTB_CD": "",
            "TST_DS_TEMPODURACAO": "",
            "TST_NU_ND": "",
            "TST_NU_NE": "",
            "TST_VZ_ESTABILIZACAO": "",
            "TST_TMI_CD": "",
            "TST_NU_COEFICIENTEARMAZENAMENT": "",
            "TST_NU_TRANSMISSIVIDADE": "",
            "TST_NU_CONDUTIVIDADEHIDRAULICA": "",
            "TST_NU_PERMEABILIDADE": "",
            "AMA_DT_COLETA": "",
            "AMA_DT_ANALISE": "",
            "AMA_NU_CONDUTIVIDADEELETRICA": "",
            "AMA_QT_TEMPERATURA": "",
            "AMA_QT_STD": "",
            "AMA_QT_PH": "",
            "AMA_QT_COLIFORMESTOTAIS": "",
            "AMA_QT_COLIFORMESFECAIS": "",
            "AMA_QT_BICARBONATO": "",
            "AMA_QT_CALCIO": "",
            "AMA_QT_CARBONATO": "",
            "AMA_QT_CLORETO": "",
            "AMA_QT_DUREZATOTAL": "",
            "AMA_QT_FERROTOTAL": "",
            "AMA_QT_FLUORETOS": "",
            "AMA_QT_NITRATOS": "",
            "AMA_QT_NITRITOS": "",
            "AMA_QT_POTASSIO": "",
            "AMA_QT_SODIO": "",
            "AMA_QT_SULFATO": "",
            "AMA_QT_MAGNESIO": ""
        },
        "federalGrant": {
            "INT_CD": "1660512",
            "INT_CD_ORIGEM": "15055",
            "INT_DS_OPCIONAL": "",
            "INT_TIN_CD": "1",
            "INT_TSU_CD": "2",
            "INT_NU_SIAGAS": "",
            "INT_NU_LATITUDE": "#-15,839786",
            "INT_NU_LONGITUDE": "#-48,193004",
            "INT_NM_CORPOHIDRICOALTERADO": "",
            "EMP_NM_EMPREENDIMENTO": "MÿDULO N 40 - FAZENDA ÁGUA SANTA DESTACADA DA FAZENDA GUARIROBA",
            "EMP_NM_RESPONSAVEL": "JAIME DE LIMA ALMEIDA",
            "EMP_NU_CPFCNPJ": "24904171187",
            "EMP_DS_EMAILRESPONSAVEL": "jaimedelimaalmeida@gmail.com",
            "EMP_NU_CEPENDERECO": "72120190",
            "EMP_DS_LOGRADOURO": "QND 19 CASA 38",
            "EMP_DS_COMPLEMENTOENDERECO": "",
            "EMP_NU_LOGRADOURO": "",
            "EMP_NU_CAIXAPOSTAL": "0",
            "EMP_DS_BAIRRO": "Taguatinga Norte Taguatinga",
            "EMP_NU_DDD": "61",
            "EMP_NU_TELEFONE": "992223499",
            "EMP_CD_IBGEMUNCORRESPONDENCIA": "5300108",
            "OUT_TP_OUTORGA": "Direito de Uso",
            "OUT_TP_SITUACAOOUTORGA": "Outorgado",
            "OUT_DT_OUTORGAINICIAL": "07/10/2024",
            "OUT_DT_OUTORGAFINAL": "06/10/2034",
            "OUT_NU_PROCESSO": "00197-000024762024-00",
            "OUT_TP_ATO": "OUTORGA",
            "OUT_NU_ATO": "02762024",
            "DAD_QT_VAZAODIAJAN": "0",
            "DAD_QT_VAZAODIAFEV": "0",
            "DAD_QT_VAZAODIAMAR": "0",
            "DAD_QT_VAZAODIAABR": "1,6",
            "DAD_QT_VAZAODIAMAI": "1,6",
            "DAD_QT_VAZAODIAJUN": "1,6",
            "DAD_QT_VAZAODIAJUL": "1,6",
            "DAD_QT_VAZAODIAAGO": "1,6",
            "DAD_QT_VAZAODIASET": "1,6",
            "DAD_QT_VAZAODIAOUT": "1,6",
            "DAD_QT_VAZAODIANOV": "0",
            "DAD_QT_VAZAODIADEZ": "0",
            "DAD_QT_HORASJAN": "0",
            "DAD_QT_HORASFEV": "0",
            "DAD_QT_HORASMAR": "0",
            "DAD_QT_HORASABR": "2",
            "DAD_QT_HORASMAI": "2",
            "DAD_QT_HORASJUN": "2",
            "DAD_QT_HORASJUL": "2",
            "DAD_QT_HORASAGO": "2",
            "DAD_QT_HORASSET": "2",
            "DAD_QT_HORASOUT": "2",
            "DAD_QT_HORASNOV": "0",
            "DAD_QT_HORASDEZ": "0",
            "DAD_QT_DIAJAN": "31",
            "DAD_QT_DIAFEV": "28",
            "DAD_QT_DIAMAR": "31",
            "DAD_QT_DIAABR": "30",
            "DAD_QT_DIAMAI": "31",
            "DAD_QT_DIAJUN": "30",
            "DAD_QT_DIAJUL": "31",
            "DAD_QT_DIAAGO": "31",
            "DAD_QT_DIASET": "30",
            "DAD_QT_DIAOUT": "31",
            "DAD_QT_DIANOV": "30",
            "DAD_QT_DIADEZ": "31",
            "FIN_TFN_CD": "99",
            "FES_NU_PROFUNDIDADEMEDIATANQUE": "",
            "FES_NU_AREATOTALTANQUE": "",
            "TTC_TCU_CD": "",
            "FSE_TES_CD": "",
            "FIE_TPS_CD": "",
            "FAH_TAH_CD": "",
            "FAH_NU_POTENCIAINSTALADA": "",
            "FAH_IC_APROVEITAMENTOFIODAGUA": "",
            "FAH_NU_AREAINUNDADANA": "",
            "FAH_NU_VOLUMENA": "",
            "FPE_TPE_CD": "",
            "FPE_CNA_CD": "",
            "ETP_MPE_CD": "",
            "ETP_NU_QUANTIDADEMAXMENSAL": "",
            "IUS_NU_ALTURARES": "",
            "IUS_NU_AREARESMAX": "",
            "IUS_NU_VOLUMERES": "",
            "IUS_NM_ENTIDADECONCEDENTE": "",
            "IUS_NU_CONCESSAO": "",
            "IUS_DT_FINALCONCESSAO": "",
            "SIR_TSI_CD": "",
            "SIR_TCT_CD": "",
            "SIR_NU_AREAIRRIGADA": "",
            "FTE_NU_POTENCIAINSTALADA": "",
            "FTE_NU_PRODUCAOMENSALMEDIA": "",
            "FTE_TCO_CD": "",
            "FTE_TSR_CD": "",
            "FEA_NU_PRODUCAOMAXMENSALAREIA": "",
            "FEA_NU_PROPORCAOAGUAPOLPA": "",
            "FEA_PC_TEORUMIDADE": "",
            "FOH_TOH_CD": "",
            "FRE_NU_AREAINUNDADANA": "",
            "FRE_NU_VOLUMENA": "",
            "OTO_NM_OUTROUSO": "",
            "OTO_DS_OUTROUSO": "",
            "HTE_NU_QUANTIDADE": "",
            "TUC_TEC_CD": "",
            "TUC_CD": "",
            "FTR_AR_TOTALEMPREENDIMENTO": "",
            "ESC_NU_PRODUCAOPRETENDIDA": "",
            "ESC_TET_CD": "",
            "CTE_TSC_CD": "",
            "CTE_TCA_CD": "",
            "CTE_NU_CABECAS": "",
            "ITC_TUM_CD": "",
            "ITC_NU_PRODUCAOANUAL": "",
            "EFL_NU_DBOBRUTO": "",
            "EFL_NU_DBOTRATADO": "",
            "EFL_NU_FOSFOROBRUTO": "",
            "EFL_NU_FOSFOROTRATADO": "",
            "EFL_NU_NITROGENIOBRUTO": "",
            "EFL_NU_NITROGENIOTRATADO": "",
            "EFL_NU_TEMPERATURA": "",
            "EFL_TTE_CD": "",
            "ASB_DT_INSTALACAO": "",
            "ASB_TNP_CD": "10",
            "ASB_NU_DIAMETROPERFURACAO": "",
            "ASB_NU_DIAMETROFILTRO": "",
            "ASB_NU_TOPO": "",
            "ASB_NU_BASE": "",
            "ASB_NU_PROFUNDIDADEFINAL": "60",
            "ASB_NU_ALTURABOCATUBO": "",
            "ASB_NU_COTATERRENO": "",
            "TST_TTB_CD": "6",
            "TST_DS_TEMPODURACAO": "",
            "TST_NU_ND": "55",
            "TST_NU_NE": "12",
            "TST_VZ_ESTABILIZACAO": "2",
            "TST_TMI_CD": "",
            "TST_NU_TRANSMISSIVIDADE": "",
            "TST_NU_CONDUTIVIDADEHIDRAULICA": "",
            "TST_NU_PERMEABILIDADE": "",
            "AMA_DT_COLETA": "",
            "AMA_DT_ANALISE": "",
            "AMA_NU_CONDUTIVIDADEELETRICA": "",
            "AMA_QT_TEMPERATURA": "",
            "AMA_QT_STD": "",
            "AMA_QT_PH": "",
            "AMA_QT_COLIFORMESTOTAIS": "",
            "AMA_QT_COLIFORMESFECAIS": "",
            "AMA_QT_BICARBONATO": "",
            "AMA_QT_CALCIO": "",
            "AMA_QT_CARBONATO": "",
            "AMA_QT_CLORETO": "",
            "AMA_QT_DUREZATOTAL": "",
            "AMA_QT_FERROTOTAL": "",
            "AMA_QT_FLUORETOS": "",
            "AMA_QT_NITRATOS": "",
            "AMA_QT_NITRITOS": "",
            "AMA_QT_POTASSIO": "",
            "AMA_QT_SODIO": "",
            "AMA_QT_SULFATO": "",
            "AMA_QT_MAGNESIO": "",
            "INT_CD_CNARH40": "1660512",
            "EMP_NM_USUARIO": "JAIME DE LIMA ALMEIDA"
        }
    }
]


# 25/09/2025
- [] Reescrevi o json com os dados do Cnarh baixados pelo Saulo
    Ver: `convertCSVToJSON` e o link: `node backend/utils/convert-csv-to-json-and-write.js`
- [] Fiz busca geral do Srnih utilizando o teste: `snirh-fetch.test.js` que baixa ano a ano as outorgas e reescreve o arquivo `exportacao_cnarh40_DF`.