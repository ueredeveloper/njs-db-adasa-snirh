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


{
"INT_CD":"1659420","INT_CD_ORIGEM":"6764","INT_DS_OPCIONAL":"",
"INT_TIN_CD":"1","INT_TSU_CD":"2","INT_NU_SIAGAS":"",
"INT_NU_LATITUDE":"#-15.909167","INT_NU_LONGITUDE":"#-47.749",
"INT_NM_CORPOHIDRICOALTERADO":"","EMP_NM_EMPREENDIMENTO":"AGROVILA II, PRÃXIMA A AR 15, ENTRE CONJUNTO 01/02, ESTAÃÃO DE TRATAMENTO DE ESGOTO, (ETE SÃO SEBASTIÃO)",
"EMP_NM_RESPONSAVEL":"COMPANHIA DE SANEAMENTO AMBIENTAL DO DISTRITO FEDERAL - CAESB","EMP_NU_CPFCNPJ":"00.082.024/0001-37","EMP_DS_EMAILRESPONSAVEL":"vladimirpuntel@caesb.df.gov.br","EMP_NU_CEPENDERECO":"71.928-720","EMP_DS_LOGRADOURO":"Avenida Sibipiruna Lotes 13 A 21 Ed Xingu Bl D 1 Piso Caesb Sede","EMP_DS_COMPLEMENTOENDERECO":"Centro de Gestao &#65533guas Emendadas","EMP_NU_LOGRADOURO":"","EMP_NU_CAIXAPOSTAL":"",

o erro estava aqui, cortando águas claras
``` 
"EMP_DS_BAIRRO":"Sul (&#65533","EMP_NU_DDD":"guas Claras)",
```


"EMP_NU_TELEFONE":"61","EMP_CD_IBGEMUNCORRESPONDENCIA":"32137352",

25/09/25, 14:28 -> O valor mudou para outro id
1660609	6764		1	2		#-15.909167	#-47.749		AGROVILA II, PRÓXIMA A AR 15, ENTRE CONJUNTO 01/02, ESTAÇÃO DE TRATAMENTO DE ESGOTO, (ETE SÃO SEBASTIÃO)	COMPANHIA DE SANEAMENTO AMBIENTAL DO DISTRITO FEDERAL - CAESB	00.082.024/0001-37	vladimirpuntel@caesb.df.gov.br	71.928-720	Avenida Sibipiruna Lotes 13 A 21 Ed Xingu Bl D 1 Piso Caesb Sede	Centro de Gestao �guas Emendadas			Sul (�	guas Claras)	61	32137352	5300108	7	4	12/02/2025	28/03/2059	0197-001016/2017	REGISTRO DE USO	1287/2024	0,00	0,00	0,00	0,00	0,00	0,00	0,00	0,00	0,00	0,00	0,00	0,00	0	0	0	0	0	0	0	0	0	0	0	0	31	28	31	30	31	30	31	31	30	31	30	31	1467286	99																																						244965																												11											6																															






OK


{"INT_CD":"1658980","INT_CD_ORIGEM":"16266","INT_DS_OPCIONAL":"","INT_TIN_CD":"1","INT_TSU_CD":"2","INT_NU_SIAGAS":"","INT_NU_LATITUDE":"#-15.792552","INT_NU_LONGITUDE":"#-47.938383","INT_NM_CORPOHIDRICOALTERADO":"","EMP_NM_EMPREENDIMENTO":"QUADRA 811, CRUZEIRO NOVO","EMP_NM_RESPONSAVEL":"ADMINISTRAÃÃO REGIONAL DO CRUZEIRO","EMP_NU_CPFCNPJ":"16.673.858/0001-57","EMP_DS_EMAILRESPONSAVEL":"samuel_morais01@hotmail.com","EMP_NU_CEPENDERECO":"71.060-152","EMP_DS_LOGRADOURO":"QE 28, CONJUNTO O, CASA 45","EMP_DS_COMPLEMENTOENDERECO":"","EMP_NU_LOGRADOURO":"","EMP_NU_CAIXAPOSTAL":"0","EMP_DS_BAIRRO":"Guará II","EMP_NU_DDD":"61","EMP_NU_TELEFONE":"982488328","EMP_CD_IBGEMUNCORRESPONDENCIA":"5300108","OUT_TP_OUTORGA":"5","OUT_TP_SITUACAOOUTORGA":"1","OUT_DT_OUTORGAINICIAL":"12/02/2025","OUT_DT_OUTORGAFINAL":"11/02/2028","OUT_NU_PROCESSO":"0197-000721/2007",

"OUT_TP_ATO":"OUTORGA PRÃVIA","OUT_NU_ATO":"0041/2025",

"DAD_QT_VAZAODIAJAN":"2,25","DAD_QT_VAZAODIAFEV":"2,25","DAD_QT_VAZAODIAMAR":"2,25","DAD_QT_VAZAODIAABR":"2,25","DAD_QT_VAZAODIAMAI":"2,25","DAD_QT_VAZAODIAJUN":"2,25","DAD_QT_VAZAODIAJUL":"2,25","DAD_QT_VAZAODIAAGO":"2,25","DAD_QT_VAZAODIASET":"2,25","DAD_QT_VAZAODIAOUT":"2,25","DAD_QT_VAZAODIANOV":"2,25","DAD_QT_VAZAODIADEZ":"2,25","DAD_QT_HORASJAN":"17","DAD_QT_HORASFEV":"17","DAD_QT_HORASMAR":"17","DAD_QT_HORASABR":"17","DAD_QT_HORASMAI":"17","DAD_QT_HORASJUN":"17","DAD_QT_HORASJUL":"17","DAD_QT_HORASAGO":"17","DAD_QT_HORASSET":"17","DAD_QT_HORASOUT":"17","DAD_QT_HORASNOV":"17","DAD_QT_HORASDEZ":"17","DAD_QT_DIAJAN":"31","DAD_QT_DIAFEV":"28","DAD_QT_DIAMAR":"31","DAD_QT_DIAABR":"30","DAD_QT_DIAMAI":"31","DAD_QT_DIAJUN":"30","DAD_QT_DIAJUL":"31","DAD_QT_DIAAGO":"31","DAD_QT_DIASET":"30","DAD_QT_DIAOUT":"31","DAD_QT_DIANOV":"30","DAD_QT_DIADEZ":"31","FIN_CD":"1465664","FIN_TFN_CD":"99","FES_NU_PROFUNDIDADEMEDIATANQUE":"","FES_NU_AREATOTALTANQUE":"","TTC_CD":"","TTC_TCU_CD":"","FSE_TES_CD":"","FIE_TPS_CD":"","FAH_TAH_CD":"","FAH_NU_POTENCIAINSTALADA":"","FAH_IC_APROVEITAMENTOFIODAGUA":"","FAH_NU_AREAINUNDADANA":"","FAH_NU_VOLUMENA":"","FPE_TPE_CD":"","FPE_CNA_CD":"","ETP_CD":"","ETP_MPE_CD":"","ETP_NU_QUANTIDADEMAXMENSAL":"","IUS_NU_ALTURARES":"","IUS_NU_AREARESMAX":"","IUS_NU_VOLUMERES":"","IUS_NM_ENTIDADECONCEDENTE":"","IUS_NU_CONCESSAO":"","IUS_DT_FINALCONCESSAO":"","SIR_CD":"","SIR_TSI_CD":"","SIR_TCT_CD":"","SIR_NU_AREAIRRIGADA":"","FTE_NU_POTENCIAINSTALADA":"","FTE_NU_PRODUCAOMENSALMEDIA":"","FTE_TCO_CD":"","FTE_TSR_CD":"","FEA_NU_PRODUCAOMAXMENSALAREIA":"","FEA_NU_PROPORCAOAGUAPOLPA":"","FEA_PC_TEORUMIDADE":"","FOH_TOH_CD":"","FRE_NU_AREAINUNDADANA":"","FRE_NU_VOLUMENA":"","OTO_TOU_CD":"49","OTO_CD":"244260","OTO_NM_OUTROUSO":"","OTO_DS_OUTROUSO":"","HTE_CD":"","HTE_NU_QUANTIDADE":"","TUC_TEC_CD":"","TUC_CD":"","FTR_AR_TOTALEMPREENDIMENTO":"","ESC_CD":"","ESC_NU_PRODUCAOPRETENDIDA":"","ESC_TET_CD":"","CTE_CD":"","CTE_TSC_CD":"","CTE_TCA_CD":"","CTE_NU_CABECAS":"","ITC_CD":"","ITC_TUM_CD":"","ITC_NU_PRODUCAOANUAL":"","ITC_CNA_CD":"","EFL_NU_DBOBRUTO":"","EFL_NU_DBOTRATADO":"","EFL_NU_FOSFOROBRUTO":"","EFL_NU_FOSFOROTRATADO":"","EFL_NU_NITROGENIOBRUTO":"","EFL_NU_NITROGENIOTRATADO":"","EFL_NU_TEMPERATURA":"","EFL_TTE_CD":"","ASB_DT_INSTALACAO":"","ASB_TNP_CD":"10","ASB_NU_DIAMETROPERFURACAO":"","ASB_NU_DIAMETROFILTRO":"","ASB_TPA_CD":"","ASB_NU_TOPO":"","ASB_NU_BASE":"","ASB_TCQ_CD":"","ASB_NU_PROFUNDIDADEFINAL":"","ASB_NU_ALTURABOCATUBO":"","ASB_NU_COTATERRENO":"","ASB_DS_AQUIFEROEXPLOTADO":"","TST_TTB_CD":"6","TST_DS_TEMPODURACAO":"","TST_NU_ND":"","TST_NU_NE":"","TST_VZ_ESTABILIZACAO":"","TST_TMI_CD":"","TST_NU_COEFICIENTEARMAZENAMENT":"","TST_NU_TRANSMISSIVIDADE":"","TST_NU_CONDUTIVIDADEHIDRAULICA":"","TST_NU_PERMEABILIDADE":"","AMA_DT_COLETA":"","AMA_DT_ANALISE":"","AMA_NU_CONDUTIVIDADEELETRICA":"","AMA_QT_TEMPERATURA":"","AMA_QT_STD":"","AMA_QT_PH":"","AMA_QT_COLIFORMESTOTAIS":"","AMA_QT_COLIFORMESFECAIS":"","AMA_QT_BICARBONATO":"","AMA_QT_CALCIO":"","AMA_QT_CARBONATO":"","AMA_QT_CLORETO":"","AMA_QT_DUREZATOTAL":"","AMA_QT_FERROTOTAL":"","AMA_QT_FLUORETOS":"","AMA_QT_NITRATOS":"","AMA_QT_NITRITOS":"","AMA_QT_POTASSIO":"","AMA_QT_SODIO":"","AMA_QT_SULFATO":"","AMA_QT_MAGNESIO":""}


25/09/25, 14:29 -> mudou o int_id aqui também?

1660626	16266		1	2		#-15.792552	#-47.938383		QUADRA 811, CRUZEIRO NOVO	ADMINISTRAÇÃO REGIONAL DO CRUZEIRO	16.673.858/0001-57	samuel_morais01@hotmail.com	71.060-152	QE 28, CONJUNTO O, CASA 45			0	Guar� II	61	982488328	5300108	5	1	12/02/2025	11/02/2028	0197-000721/2007	OUTORGA PRÉVIA	0041/2025	2,25	2,25	2,25	2,25	2,25	2,25	2,25	2,25	2,25	2,25	2,25	2,25	17	17	17	17	17	17	17	17	17	17	17	17	31	28	31	30	31	30	31	31	30	31	30	31	1467303	99																																					49	244978																												10											6																															



-------___________________________________________________________________________________________
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


## 23/09/2025

- [] Adicionado outra opção para capturar a finalidade na comparação entre objetos (estadual e federal), FIN_TFN_CD.

    ```objectToSend.FIN_CD = federalGrant.FIN_CD || federalGrant.FIN_TFN_CD;```

# 25/09/2025
- [] Reescrevi o json com os dados do Cnarh baixados pelo Saulo
    Ver: `convertCSVToJSON` e o link: `node backend/utils/convert-csv-to-json-and-write.js`
- [] Fiz busca geral do Srnih utilizando o teste: `snirh-fetch.test.js` que baixa ano a ano as outorgas e reescreve o arquivo `exportacao_cnarh40_DF`.

## 01/10/2025
- [] Editados até a página 2, 400 registros por página, data: 01/01/2019.

## 02/10/2025
- [X] Criar teste para revisar os ítems editados, lendo os csv de edição e comparando com o snirh.
    O teste revisa as edições e cria um arquivo em json `(pasta: unedited-items)` para conferência.
- [] Editados hoje: 01/01/2019, 400 registros, páginas 3 e 4. Fiz até a página 5, mas refazer página 4, 400 registros.

- [] Passos: 
    Utiliza `node backend/tests/snirh-fetch.test.js` para atualizar os dados do snirh.
    Utiliza `npx jest ./backend/tests/analyse-editions.test.js` para verificar se os últmos editados foram mesmo editados.


## 03/10/2025
- [] Atualizações de 01/01/2018, 400 registors por página, páginas: 1, 2
    Não foi a página 2 completa, faltou energia.
    Continuarei da página 3 e 4, depois é preciso refazer a página 2
## 06/10/2025
- [] Verificar se é possível buscar todas as outorgas de 2025 e inserir. Talvez esperar remover os duplicados já solicitado à Ana pelo whatsapp.
- [] Criar um método no backend de buscar todas as outorgas e editálas tudo de uma vez, por posição ou por id na Adasa (INT_CD_ORIGEM).


## 21/10/2025
- [X] No arquivo gerado `exportacao_cnrarh40_DF.json` nesta parte estava com uma vírgula a mais (,,), gerando erro de leitura da array `desktopDB`.
    Ex:  "EMP_NM_EMPREENDIMENTO": "RODOVIA DF 150, KM 2,5, SETOR HABITACIONAL COLORADO,, MODULO N, CASA 12",...


## 10/11/2025
    - [] Edição e Finalidade
        No SNIRH não é possível mudar a finalidade. Desta forma não editarei a finalidade, deixando a finalidade que estiver no SNIRH.
        Ver arquivos `compare-and-write-list-grants`

```
// O valor FIN_CD vem do SNRIH, ou FIN_TFN_CD.
objectToSend.FIN_CD = federalGrant.FIN_TFN_CD //federalGrant.FIN_CD || federalGrant.FIN_TFN_CD;

// 10/11/2025 - Não é possível modificar a finalidade principal
objectToSend.FIN_TFN_CD = federalGrant.FIN_TFN_CD;
```
        Vou esperar a edição de hoje. Interferência 627.

        No processo 197001817/2010 fiz a edição mantendo em FIN_CD E FIN_TFN_CD o valor do SNIRH.


## 01/12/2025
- [X] Precisei atualizar o arquivo do CNARH e verificar se haviam items repetidos. Verifiquei 10 items.
    Passos: 
        Baixei a planilha no site `https://www2.snirh.gov.br/cnarh40/restrito/carga_planilha.jsf`.
        Atualizei o arquivo e os items repetidos com o comando `node backend/utils/convert-csv-to-json-and-write.js`.


- [] Atualizar dados do cnarh automaticamente: `node ./backend/utils/update-snirh-files.js`.


- [] Adicionar a coluna int_cd_cnarh como int_cd no arquivo ao buscar uma outorga para editar.


## 02/12/2025

- [] Verificar retorno search closest points
    Se não for outorga ainda estudada, como lançamento, retornar array vazia, [].

- [] Buscar todos os dados do CNARH `node backend/tests/snirh-fetch.test.js`


## 15/12/2025
- [] Regra 16 - Serviços - SQL
    Mudar esta regra para 99. Verificar erros no cnarh. Me parece que não precisa colocar nada como serviços, pois esta finalidade é só
    para poços de monitoramento.

```
WHEN S.ID_TIPO_FINALIDADE = 11 AND (SUBFINALIDADE NOT LIKE '%LAVAGEM DE VEÍCULOS%' AND SUBFINALIDADE NOT LIKE '%LAVANDERIA%')
    THEN 16 para 99
```

Id dos errados, adicionar para finalidade 99 OU outra solução: 

```
--AND A.ID_INTERFERENCIA  IN (18068,16724, 17978, 4929, 17892, 14647, 7017, 17807, 3272, 17802, 16788, 16751, 16306, 16398, 9889, 15007, 17944, 17943, 17944, 17943)
```
Adiciona no Snirh a finalidade de maior consumo, visto que só pode adicionar uma finalidade.

## 16/12/2025

- [] Edições
    Me parece que ao editar outorgas sem o número do processo salvo no Cnarh, tem que salvar também cep, telefone, endereço. Todos estes dados de 
    caráter obrigatório. Se não houver estes dados criar genéricos para cep etc. Como é feito no email que tem um e-mail genérico.


## 07/01/2026
- [] No caso da Caesb, no arquivo `compare-and-write-list-grants-for-update` tive que fazer uma mudança no código. 

 ```

objectToSend.FIN_CD = federalGrant.FIN_TFN_CD, ao invés de: federalGrant.FIN_CD

objectToSend.FIN_TFN_CD = 99 ou 1  ao invés de: federalGrant.FIN_TFN_CD;

```

Se a finalidade for outras, poço de monitoramento FIN_TFN_CD = 99  15 FOU_TOU_CD = 15 TNP_CD = 6

Ex: 

```

federalGrant =
{ 
    FIN_CD: "0"
    FIN_TFN_CD: "716257"
}

stateGrant = {
    FIN_CD: "0"
    FIN_TFN_CD: "99"
}

```
