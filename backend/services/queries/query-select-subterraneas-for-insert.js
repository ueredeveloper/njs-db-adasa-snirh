const querySelectSubterraneasForInsert = (ids) => {

    let paramsIds = ids.join(',');

    return `
        USE SRH;
        /* Criado por Welber Ferreira
            RETORNA AS CAPTAÇÕES SUBTERÂNEAS - VERIFICAR SE QUER QUE PREENCHA COM NULL OU EM BRANCO OS CAMPOS SEM DADOS
        */

        -- lista de ddds do brasil
		DECLARE @DDDS TABLE (VALOR INT);
		INSERT INTO @DDDS (VALOR)
		VALUES 
		(11), (12), (13), (14), (15), (16), (17), (18), (19),
		(21), (22), (24), (27), (28),
		(31), (32), (33), (34), (35), (37), (38),
		(41), (42), (43), (44), (45), (46), (47), (48), (49),
		(51), (53), (54), (55),
		(61), (62), (63), (64), (65), (66), (67), (68), (69),
		(71), (73), (74), (75), (77), (79),
		(81), (82), (83), (84), (85), (86), (87), (88), (89),
		(91), (92), (93), (94), (95), (96), (97), (98), (99);

        SELECT 1 as INT_TIN_CD, 

        A.ID_TIPO_INTERFERENCIA AS INT_TSU_CD, 
        '' AS INT_TSI_CD,
        REPLACE(CAST(A.LATITUDE AS VARCHAR),'.',',') AS INT_CR_LATITUDE,
        REPLACE(CAST(A.LONGITUDE  AS VARCHAR),'.',',') AS INT_CR_LONGITUDE,
        5300108 AS ING_NU_IBGEMUNICIPIO,
        B.ENDERECO AS EMP_NM_EMPREENDIMENTO,
        CONCAT('#', C.CPF_CNPJ) AS EMP_NU_CPFCNPJ,
        C.NOME AS EMP_NM_USUARIO,
        CASE 
            WHEN C.EMAIL IS NULL
            THEN 'naoinformado@gmail.com.br'
            ELSE C.EMAIL
        END  AS EMP_DS_EMAILRESPONSAVEL,
        C.CEP AS EMP_NU_CEPENDERECO,
        C.ENDERECO AS EMP_DS_LOGRADOURO,
        '' AS EMP_DS_COMPLEMENTOENDERECO,
        '' AS EMP_NU_LOGRADOURO,
        CASE
            WHEN CAIXA_POSTAL IS NULL
            THEN ''
            ELSE CAIXA_POSTAL
        END AS EMP_NU_CAIXAPOSTAL,
        5300108 AS EMP_CD_CODIGOIBGECORRESPONDENCIA,
        CASE
            WHEN CHARINDEX('(', C.TELEFONE_1) = 1
            THEN SUBSTRING(C.TELEFONE_1, 2, 2)
            ELSE SUBSTRING(C.TELEFONE_1, 0, 3)
        END AS EMP_NU_DDD,
        /*CASE
            WHEN CHARINDEX('(', C.TELEFONE_1) = 1
            THEN SUBSTRING(C.TELEFONE_1, 6, LEN(C.TELEFONE_1)-4)
            WHEN LEN(C.TELEFONE_1) > 15
            THEN REPLACE(SUBSTRING(C.TELEFONE_1, 3, 9),'/','')
            ELSE SUBSTRING(C.TELEFONE_1, 3, LEN(C.TELEFONE_1))
        END AS EMP_NU_TELEFONE,*/
        CASE
		-- remove caracteres especiais com replace
		-- captura os dois primeiros números do telefone e verifica se é um ddd, caso sim, remove.
        WHEN (SELECT COUNT(1) FROM @DDDS WHERE VALOR = CAST(SUBSTRING(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(TELEFONE_1, '(', ''), ')', ''), ' ', ''), '-', ''), '/',''), 1, 2) AS INT)) = 1 
        -- remove caracteres e apresenta número
		THEN 
			CASE 
				-- remove caracteres especiais e os dois primeiros números se o tamanho do dado for maior que 10
				WHEN LEN(TELEFONE_1) > 10 THEN SUBSTRING(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(TELEFONE_1, '(', ''), ')', ''), ' ', ''), '-', ''), '/',''), 3, 10)
				-- se não, remove apenas caracteres especiais
				ELSE REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(TELEFONE_1, '(', ''), ')', ''), ' ', ''), '-', ''), '/','')
			END
		-- mostra caracteres especiais e limita o número a 10 caracteres
        ELSE SUBSTRING(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(TELEFONE_1, '(', ''), ')', ''), ' ', ''), '-', ''), '/',''), 0, 10)
		END AS EMP_NU_TELEFONE,
        CASE
            WHEN A.ID_TIPO_INTERFERENCIA IN (1, 2, 3) AND A.ID_TIPO_OUTORGA = 1
            THEN A.ID_TIPO_OUTORGA
            WHEN A.ID_TIPO_INTERFERENCIA IN (1, 3) AND A.ID_TIPO_OUTORGA = 2
            THEN A.ID_TIPO_OUTORGA 
            WHEN A.ID_TIPO_INTERFERENCIA = 2 AND ID_TIPO_OUTORGA = 2
            THEN 5
            WHEN A.ID_TIPO_INTERFERENCIA IN (1,2,3) AND ID_TIPO_OUTORGA = 3
            THEN 7
        END AS OUT_TPO_CD,
        CASE 
            WHEN (A.ID_SITUACAO = 4 OR A.ID_SITUACAO = 3) AND ID_TIPO_OUTORGA <> 3
            THEN 1
            WHEN A.ID_SITUACAO = 2
            THEN 3
            WHEN A.ID_TIPO_OUTORGA = 3
            THEN 4
            WHEN A.ID_SITUACAO = 7
            THEN 5
            ELSE 99 --QUANDO ID_SITUACAO IN (1,5,6,8,10)
        END AS OUT_TSP_CD,
        CASE
            WHEN A.ID_TIPO_OUTORGA = 3
            /*Somar 29 anos a partir da data atual*/
            THEN CONVERT(VARCHAR(10),DATEADD(YEAR, 34, CAST(GETDATE() AS DATE)),103) 
            WHEN A.ID_TIPO_OUTORGA <> 3
            THEN CONVERT(VARCHAR(10),A.DT_VENCIMENTO,103)
        END AS OUT_DT_FINAL,
        CONVERT(VARCHAR(10),A.DT_PUBLICACAO,103) AS OUT_DT_INICIAL,
        A.NUM_PROCESSO AS OUT_NU_PROCESSO,
        D.DESCRICAO AS OUT_DS_ATO,
        A.NUM_ATO AS OUT_NU_ATO,
        '' AS INT_NU_SIAGAS,
        FORMAT(E.VAZAO, 'N2', 'de-DE') AS OPE_VZ_MESJAN,
		FORMAT(F.VAZAO, 'N2', 'de-DE') AS OPE_VZ_MESFEV,
		FORMAT(G.VAZAO, 'N2', 'de-DE') AS OPE_VZ_MESMAR,
		FORMAT(H.VAZAO, 'N2', 'de-DE') AS OPE_VZ_MESABR,
		FORMAT(I.VAZAO, 'N2', 'de-DE') AS OPE_VZ_MESMAI,
		FORMAT(J.VAZAO, 'N2', 'de-DE') AS OPE_VZ_MESJUN,
		FORMAT(L.VAZAO, 'N2', 'de-DE') AS OPE_VZ_MESJUL,
		FORMAT(M.VAZAO, 'N2', 'de-DE') AS OPE_VZ_MESAGO,
		FORMAT(N.VAZAO, 'N2', 'de-DE') AS OPE_VZ_MESSET,
		FORMAT(O.VAZAO, 'N2', 'de-DE') AS OPE_VZ_MESOUT,
		FORMAT(P.VAZAO, 'N2', 'de-DE') AS OPE_VZ_MESNOV,
		FORMAT(Q.VAZAO, 'N2', 'de-DE') AS OPE_VZ_MESDEZ,
        E.TEMPO_CAPTACAO AS OPE_QT_HORASJAN,
        F.TEMPO_CAPTACAO AS OPE_QT_HORASFEV,
        G.TEMPO_CAPTACAO AS OPE_QT_HORASMAR,
        H.TEMPO_CAPTACAO AS OPE_QT_HORASABR,
        I.TEMPO_CAPTACAO AS OPE_QT_HORASMAI,
        J.TEMPO_CAPTACAO AS OPE_QT_HORASJUN,
        L.TEMPO_CAPTACAO AS OPE_QT_HORASJUL,
        M.TEMPO_CAPTACAO AS OPE_QT_HORASAGO,
        N.TEMPO_CAPTACAO AS OPE_QT_HORASSET,
        O.TEMPO_CAPTACAO AS OPE_QT_HORASOUT,
        P.TEMPO_CAPTACAO AS OPE_QT_HORASNOV,
        Q.TEMPO_CAPTACAO AS OPE_QT_HORASDEZ,
        E.QT_DIAS AS OPE_QT_DIAJAN,
        F.QT_DIAS AS OPE_QT_DIAFEV,
        G.QT_DIAS AS OPE_QT_DIAMAR,
        H.QT_DIAS AS OPE_QT_DIAABR,
        I.QT_DIAS AS OPE_QT_DIAMAI,
        J.QT_DIAS AS OPE_QT_DIAJUN,
        L.QT_DIAS AS OPE_QT_DIAJUL,
        M.QT_DIAS AS OPE_QT_DIAAGO,
        N.QT_DIAS AS OPE_QT_DIASET,
        O.QT_DIAS AS OPE_QT_DIAOUT,
        P.QT_DIAS AS OPE_QT_DIANOV,
        Q.QT_DIAS AS OPE_QT_DIADEZ,

        REPLACE(SUBSTRING(CAST(ROUND(R.MAX_VAZAO,2) AS VARCHAR), 0, 
            CHARINDEX(',', REPLACE(SUBSTRING(CAST(ROUND(R.MAX_VAZAO,2) AS VARCHAR), 0, 5),'.',','))+3),'.',',') AS INT_VZ_MAXIMA,

        CASE 
            WHEN S.ID_TIPO_FINALIDADE = 7 AND SUBFINALIDADE = 'PRESTAÇÃO DE SERVIÇOS PÚBLICOS DE ABASTECIMENTO DE ÁGUA'
            THEN 1
            WHEN S.ID_TIPO_FINALIDADE = 7 AND SUBFINALIDADE <> 'PRESTAÇÃO DE SERVIÇOS PÚBLICOS DE ABASTECIMENTO DE ÁGUA'
            THEN 12
            WHEN S.ID_TIPO_FINALIDADE = 8 -- DESSENDENTACAO ANIMAL
            THEN 6
            WHEN S.ID_TIPO_FINALIDADE = 9 -- INDUSTRIAL
            THEN 3
            WHEN S.ID_TIPO_FINALIDADE = 10 -- IRRIGACAO DE CULTURAS
            THEN 5	
            WHEN S.ID_TIPO_FINALIDADE = 11 AND (SUBFINALIDADE NOT LIKE '%LAVAGEM DE VEÍCULOS%' AND SUBFINALIDADE NOT LIKE '%LAVANDERIA%')
            THEN 16
            WHEN S.ID_TIPO_FINALIDADE = 12 AND SUBFINALIDADE LIKE '%MINERAÇÃO%'
            THEN 4
            WHEN S.ID_TIPO_FINALIDADE = 35 -- AQUICULTURA
            THEN 7
            ELSE 99
        END AS FIN_TFN_CD,	
        CASE
			WHEN S.ID_TIPO_FINALIDADE = 11 AND S.SUBFINALIDADE LIKE '%LAVAGEM DE VEÍCULOS%'
            THEN 21
			WHEN S.ID_TIPO_FINALIDADE = 11 AND S.SUBFINALIDADE LIKE '%LAVANDERIA%'
            THEN 44
            WHEN S.ID_TIPO_FINALIDADE = 12 AND S.SUBFINALIDADE LIKE '%RECREAÇÃO%'
            THEN 2
            WHEN S.ID_TIPO_FINALIDADE = 12 AND (S.SUBFINALIDADE LIKE '%LAZER%' OR S.SUBFINALIDADE LIKE '%PISCINA%' OR S.SUBFINALIDADE LIKE '%CLUBE%')
            THEN 39
			WHEN S.ID_TIPO_FINALIDADE = 37 AND S.SUBFINALIDADE LIKE '%CONST%'
            THEN 54
			WHEN S.ID_TIPO_FINALIDADE = 39 AND S.SUBFINALIDADE LIKE '%PAIS%'
            THEN 49
			WHEN S.ID_TIPO_FINALIDADE = 41 AND S.SUBFINALIDADE LIKE '%MIN%'
            THEN 28
        END AS FOU_TOU_CD,
        CASE 
            WHEN T.ID_METODO_IRRIGACAO = 1
            THEN 3
            WHEN T.ID_METODO_IRRIGACAO = 2
            THEN 6
            WHEN T.ID_METODO_IRRIGACAO = 3
            THEN 5
            ELSE 3

            --E QUANDO FOR TIPO 5 (ASPERSÃO/GOTEJAMENTO)?
        END AS SIR_TSI_CD,
        CASE 
            WHEN S.ID_TIPO_FINALIDADE = 4 AND S.SUBFINALIDADE LIKE '%ALFACE%'
            THEN 8
            WHEN S.ID_TIPO_FINALIDADE = 4 AND S.SUBFINALIDADE LIKE '%PIMENTÃO%'
            THEN 15
            WHEN S.ID_TIPO_FINALIDADE = 4 AND S.SUBFINALIDADE LIKE '%TOMATE%'
            THEN 16
            WHEN S.ID_TIPO_FINALIDADE = 4 AND S.SUBFINALIDADE LIKE '%RAÍZES%'
            THEN 25
            WHEN S.ID_TIPO_FINALIDADE = 4 AND S.SUBFINALIDADE LIKE '%TUBÉRCULO%'
            THEN 28
            WHEN S.ID_TIPO_FINALIDADE = 4 AND S.SUBFINALIDADE LIKE '%BATATA DOCE%'
            THEN 29
            WHEN S.ID_TIPO_FINALIDADE = 4 AND S.SUBFINALIDADE LIKE '%LEGUMINOSAS%'
            THEN 32
            WHEN S.ID_TIPO_FINALIDADE = 4 AND S.SUBFINALIDADE LIKE '%FEIJÃO%'
            THEN 33
            WHEN S.ID_TIPO_FINALIDADE = 4 AND (S.SUBFINALIDADE LIKE '%GRÃO%' OR S.SUBFINALIDADE LIKE '%SOJA%')
            THEN 42
            WHEN S.ID_TIPO_FINALIDADE = 4 AND S.SUBFINALIDADE LIKE '%MORANGO%'
            THEN 46
            WHEN S.ID_TIPO_FINALIDADE = 4 AND (S.SUBFINALIDADE LIKE '%PAST%' OR S.SUBFINALIDADE LIKE '%CAPI%')
            THEN 75
            WHEN S.ID_TIPO_FINALIDADE = 4 AND (S.SUBFINALIDADE LIKE '%JARDI%' OR S.SUBFINALIDADE LIKE '%GRAM%' OR 
                        S.SUBFINALIDADE LIKE '%PAISA%' OR S.SUBFINALIDADE LIKE '%PLANTAS ORNAMENTAIS%' OR 
                        S.SUBFINALIDADE LIKE '%CAMPO DE FUTEBOL%' OR S.SUBFINALIDADE LIKE '%NATIV%' OR 
                        S.SUBFINALIDADE LIKE '%CERCA%' OR S.SUBFINALIDADE LIKE '%MUDA%' OR S.SUBFINALIDADE LIKE '%HOTEL%')
            THEN 78
            WHEN S.ID_TIPO_FINALIDADE = 4 AND S.SUBFINALIDADE LIKE '%BANANA%'
            THEN 79
            WHEN S.ID_TIPO_FINALIDADE = 4 AND S.SUBFINALIDADE LIKE '%CAFÉ%'
            THEN 82
            WHEN S.ID_TIPO_FINALIDADE = 4 AND S.SUBFINALIDADE LIKE '%PALMEIRA%'
            THEN 85
            WHEN S.ID_TIPO_FINALIDADE = 4 AND S.SUBFINALIDADE LIKE '%MEDICINAIS%'
            THEN 89
            WHEN S.ID_TIPO_FINALIDADE = 4 AND (S.SUBFINALIDADE LIKE '%CITRUS%' OR S.SUBFINALIDADE LIKE '%CITROS%')
            THEN 105
            WHEN S.ID_TIPO_FINALIDADE = 4 AND (S.SUBFINALIDADE LIKE '%FLORES%' OR S.SUBFINALIDADE LIKE '%FLORICULTURA%' OR S.SUBFINALIDADE LIKE '%ORQUÍDEA%')
            THEN 1105
            WHEN S.ID_TIPO_FINALIDADE = 4 AND S.SUBFINALIDADE LIKE '%GOIABA%'
            THEN 1023
            WHEN S.ID_TIPO_FINALIDADE = 4 AND (S.SUBFINALIDADE LIKE '%FRUT%' OR S.SUBFINALIDADE LIKE '%LIMÃO%' 
                OR S.SUBFINALIDADE LIKE '%MANGA%' OR S.SUBFINALIDADE LIKE '%FRÚT%')
            THEN 1037
            WHEN S.ID_TIPO_FINALIDADE = 4 AND S.SUBFINALIDADE LIKE '%MARACUJÁ%'
            THEN 1038
            WHEN S.ID_TIPO_FINALIDADE = 4 AND S.SUBFINALIDADE LIKE '%TANGERINA%'
            THEN 1052
            WHEN S.ID_TIPO_FINALIDADE = 4 AND S.SUBFINALIDADE LIKE '%PIMENTA%'
            THEN 1090
            WHEN S.ID_TIPO_FINALIDADE = 4 AND S.SUBFINALIDADE LIKE '%VERDURAS%'
            THEN 1094
            WHEN S.ID_TIPO_FINALIDADE = 4 AND S.SUBFINALIDADE LIKE '%COGUMELO%'
            THEN 1117
            WHEN S.ID_TIPO_FINALIDADE = 4 AND (S.SUBFINALIDADE LIKE '%HOR%' OR S.SUBFINALIDADE LIKE '%OLER%' OR S.SUBFINALIDADE LIKE '%ESTUFA%')
            THEN 1120
            WHEN S.ID_TIPO_FINALIDADE = 4 AND S.SUBFINALIDADE LIKE '%POMAR%'
            THEN 1129
            WHEN S.ID_TIPO_FINALIDADE = 4 AND (S.SUBFINALIDADE LIKE '%MILHO%' OR  S.SUBFINALIDADE LIKE '%PIV%' OR  S.SUBFINALIDADE LIKE '%CEREA%')
            THEN 1123
            WHEN S.ID_TIPO_FINALIDADE = 4 AND S.SUBFINALIDADE LIKE '%MANDIOCA%'
            THEN 25
            WHEN S.ID_TIPO_FINALIDADE = 4 AND S.SUBFINALIDADE LIKE '%TRIGO%'
            THEN 58
            WHEN S.ID_TIPO_FINALIDADE = 4 AND S.SUBFINALIDADE LIKE '%QUIABO%'
            THEN 1086
            WHEN S.ID_TIPO_FINALIDADE = 4 AND S.SUBFINALIDADE LIKE '%ALHO%'
            THEN 7
            WHEN S.ID_TIPO_FINALIDADE = 4 AND S.SUBFINALIDADE LIKE '%ABACAXI%'
            THEN 86
            WHEN S.ID_TIPO_FINALIDADE = 4 AND S.SUBFINALIDADE LIKE '%BATATA%'
            THEN 28
            WHEN S.ID_TIPO_FINALIDADE = 4 AND (S.SUBFINALIDADE LIKE '%CHUCHU%' OR S.SUBFINALIDADE LIKE '%XUXU%')
            THEN 1074
            WHEN S.ID_TIPO_FINALIDADE = 4 AND S.SUBFINALIDADE LIKE '%CANA%'
            THEN 1074
            WHEN S.ID_TIPO_FINALIDADE = 4 AND (S.SUBFINALIDADE LIKE '%AÇAÍ%' OR S.SUBFINALIDADE LIKE '%AÇAI%')
            THEN 1005
            WHEN S.ID_TIPO_FINALIDADE = 4 AND S.SUBFINALIDADE LIKE '%CENOURA%'
            THEN 4
            WHEN S.ID_TIPO_FINALIDADE = 4 AND S.SUBFINALIDADE LIKE '%ABACATE%'
            THEN 104
            WHEN S.ID_TIPO_FINALIDADE = 4 AND S.SUBFINALIDADE LIKE '%ACEROLA%'
            THEN 1006
            WHEN S.ID_TIPO_FINALIDADE = 4 AND S.SUBFINALIDADE LIKE '%SORGO%'
            THEN 62
            WHEN S.ID_TIPO_FINALIDADE = 4 AND (S.SUBFINALIDADE LIKE '%COUVE-FLOR%' OR S.SUBFINALIDADE LIKE '%COUVE FLOR%')
            THEN 5
            WHEN S.ID_TIPO_FINALIDADE = 4 AND S.SUBFINALIDADE LIKE '%COUVE%'
            THEN 1094
            WHEN S.ID_TIPO_FINALIDADE = 4 AND (S.SUBFINALIDADE LIKE '%ABOBORA%' OR S.SUBFINALIDADE LIKE '%ABÓBORA%')
            THEN 20
            WHEN S.ID_TIPO_FINALIDADE = 4 AND S.SUBFINALIDADE LIKE '%REPOLHO%'
            THEN 3
            WHEN S.ID_TIPO_FINALIDADE = 4 AND (S.SUBFINALIDADE LIKE '%GILÓ%' OR S.SUBFINALIDADE LIKE '%JILÓ%')
            THEN 1126
            WHEN S.ID_TIPO_FINALIDADE = 4 AND S.SUBFINALIDADE LIKE '%UVA%'
            THEN 93
            WHEN S.ID_TIPO_FINALIDADE = 4 AND (S.SUBFINALIDADE LIKE '%MEXERICA%' OR S.SUBFINALIDADE LIKE '%TANGERINA%')
            THEN 1052
            WHEN S.ID_TIPO_FINALIDADE = 4 AND S.SUBFINALIDADE LIKE '%GRAVIOLA%'
            THEN 1024
            WHEN S.ID_TIPO_FINALIDADE = 4 AND (S.SUBFINALIDADE LIKE '%BERINGELA%' OR S.SUBFINALIDADE LIKE '%BERINJELA%')
            THEN 14
            WHEN S.ID_TIPO_FINALIDADE = 4 AND S.SUBFINALIDADE LIKE '%PUPUNH%'
            THEN 1046
            WHEN S.ID_TIPO_FINALIDADE = 4 AND S.SUBFINALIDADE LIKE '%VAGEM%'
            THEN 1116
            ELSE 1120
        END AS SIR_TCT_CD,
        REPLACE(SUBSTRING(CAST(T.AREA_IRRIGADA  AS VARCHAR), 0, 11),'.',',') AS SIR_AR_IRRIGADA,
        '' AS IUS_NU_ALTURARES,
        '' AS IUS_AR_RESMAX,
        '' AS IUS_VO_RESMAX,	
        '' AS EFL_QT_DBOBRUTO,
        '' AS EFL_QT_DBOTRATADO,
        '' AS EFL_QT_FOSFOROBRUTO,
        '' AS EFL_QT_FOSFOROTRATADO,
        '' AS EFL_QT_NITROGENIOBRUTO,
        '' AS EFL_QT_NITROGENIOTRATADO,

        CASE
            WHEN U.DT_INSTALACAO IS NULL
                THEN ''
            ELSE CONVERT(VARCHAR(10),U.DT_INSTALACAO,103)
        END AS ASB_DT_INSTALACAO,

        CASE
            -- Condição: se poço manual, nos sistema (1,2,3,4)
            WHEN T.ID_SISTEMA IN (1, 2, 3, 4) AND S.SUBFINALIDADE NOT LIKE '%PIEZÔMETRO%' AND S.SUBFINALIDADE NOT LIKE '%PIEZOMETRO%'
            THEN 1
            WHEN T.ID_SISTEMA IN (1, 2, 3, 4) AND (S.SUBFINALIDADE LIKE '%PIEZÔMETRO%' OR S.SUBFINALIDADE LIKE '%PIEZOMETRO%')
            THEN 6
            -- Condição: se poço tubular, não nos sistemas (1,2,3,4)
            WHEN T.ID_SISTEMA NOT IN (1, 2, 3, 4) AND (S.SUBFINALIDADE LIKE '%PESQUISA%' OR S.SUBFINALIDADE LIKE '%MONITORAMENTO%')
            THEN 11
            WHEN T.ID_SISTEMA NOT IN (1, 2, 3, 4)
            THEN 10
        END AS ASB_TNP_CD,

        CASE
            WHEN U.DIAM_PERFURACAO IS NULL
                THEN ''
            ELSE REPLACE(U.DIAM_PERFURACAO,'.',',') 
        END AS ASB_NU_DIAMETROPERFURACAO,

        CASE
            WHEN U.DIAM_FILTRO IS NULL
                THEN ''
            ELSE REPLACE(U.DIAM_FILTRO,'.',',') 
        END AS ASB_NU_DIAMETROFILTRO,

        '' AS ASB_AQP_CD,
        CASE
            WHEN U.PROFUN_TOPO_AQUIF IS NULL
            THEN ''
            ELSE REPLACE(U.PROFUN_TOPO_AQUIF,'.',',')
        END AS ASB_NU_TOPO,

        '' AS ASB_NU_BASE,

        U.TP_PENETR_AQUIF AS ASB_TPN_CD,

        U.CONDICAO_AQUIF AS ASB_TCA_CD,

        CASE
            WHEN U.PROFUN_POCO IS NULL
                THEN ''
            ELSE REPLACE(U.PROFUN_POCO,'.',',') 
        END AS ASB_NU_PROFUNDIDADEFINAL,

        CASE WHEN U.ALTURA_BOCA_TUB IS NULL
            THEN ''
            ELSE REPLACE(U.ALTURA_BOCA_TUB,'.',',')
        END AS ASB_NU_ALTURABOCATUBO,

        '' AS ASB_NU_COTATERRENO,

        CASE
            WHEN V.DT_TESTE IS NULL
                THEN ''
            ELSE CONVERT(VARCHAR(10),V.DT_TESTE ,103)
        END AS TST_DT,

        CASE 
            WHEN V.TIPO_TESTE = 'ESCALONADO'
            THEN 3
            WHEN V.TIPO_TESTE = 'CONTÍNUO'
            THEN 6
            ELSE 6
        END AS TST_TTB_CD,

        CASE
            WHEN V.TEMPO_TESTE IS NULL
                THEN ''
            ELSE REPLACE(V.TEMPO_TESTE,'.',',')
        END AS TST_DS_TEMPODURACAO,

        CASE
            WHEN V.NIVEL_DINAMICO IS NULL
                THEN ''
            ELSE SUBSTRING(REPLACE(CAST(ROUND(V.NIVEL_DINAMICO,2) AS VARCHAR),'.',','),1,LEN(V.NIVEL_DINAMICO)-1) 
        END AS TST_NU_ND,

        CASE
            WHEN V.NIVEL_ESTATICO IS NULL
                THEN ''
            ELSE SUBSTRING(REPLACE(CAST(ROUND(V.NIVEL_ESTATICO,2) AS VARCHAR),'.',','),1,LEN(V.NIVEL_ESTATICO)-1)
        END AS TST_NU_NE,

        CASE
            WHEN V.VAZAO_ESTABILIDADE IS NULL
                THEN ''
            ELSE SUBSTRING(REPLACE(CAST(ROUND(V.VAZAO_ESTABILIDADE,2) AS VARCHAR),'.',','),1,LEN(V.VAZAO_ESTABILIDADE)-1)
        END  AS TST_VZ_ESTABILIZACAO,

        '' AS TST_TMI_CD,

        CASE
            WHEN V.COEF_ARMAZENAMENTO IS NULL
                THEN ''
            ELSE SUBSTRING(REPLACE(CAST(ROUND(V.COEF_ARMAZENAMENTO,2) AS VARCHAR),'.',','),1,LEN(V.COEF_ARMAZENAMENTO)-1)
        END  AS TST_NU_COEFICIENTEARMAZENAMENTO,

        CASE
            WHEN V.TRANSMISSIVIDADE IS NULL
                THEN ''
            ELSE SUBSTRING(REPLACE(CAST(ROUND(V.TRANSMISSIVIDADE,  2) AS VARCHAR),'.',','),1,LEN(V.TRANSMISSIVIDADE	)-1)
        END  AS TST_NU_TRANSMISSIVIDADE,

        CASE
            WHEN CONDUT_HIDRAUL IS NULL
                THEN ''
            ELSE SUBSTRING(REPLACE(CAST(ROUND(V.CONDUT_HIDRAUL,    2) AS VARCHAR),'.',','),1,LEN(V.CONDUT_HIDRAUL	)-1)
        END  AS TST_NU_CONDUTIVIDADEHIDRAULICA,

        CASE
            WHEN V.PERMEABILIDADE IS NULL
                THEN ''
            ELSE SUBSTRING(REPLACE(CAST(ROUND(V.PERMEABILIDADE,    2) AS VARCHAR),'.',','),1,LEN(V.PERMEABILIDADE	)-1)
        END  AS TST_NU_PERMEABILIDADE,

        CASE
            WHEN X.DT_COLETA IS NULL
                THEN ''
            ELSE CONVERT(VARCHAR(10),X.DT_COLETA,103)
        END  AS AMA_DT_COLETA,

        CASE
            WHEN X.DT_ANALISE IS NULL
                THEN ''
            ELSE CONVERT(VARCHAR(10),X.DT_ANALISE,103)
        END  AS AMA_DT_ANALISE,

        -- Arredondando números decimais para float com duas casas decimais

        CASE 
            WHEN X.CONDUT_ELETRICA IS NULL
                THEN ''
            ELSE REPLACE(CAST(CAST(ROUND(X.CONDUT_ELETRICA, 2) AS FLOAT) AS VARCHAR),'.',',')
        END AS AMA_NU_CONDUTIVIDADEELETRICA,

        CASE 
            WHEN X.TEMPERATURA IS NULL
                THEN ''
            ELSE REPLACE(CAST(CAST(ROUND(X.TEMPERATURA, 2) AS FLOAT) AS VARCHAR),'.',',')
        END AS AMA_QT_TEMPERATURA,

        CASE 
            WHEN X.SOLIDOS_TOT_DISSOL IS NULL
                THEN ''
            ELSE REPLACE(CAST(CAST(ROUND(X.SOLIDOS_TOT_DISSOL, 2) AS FLOAT) AS VARCHAR),'.',',')
        END  AS AMA_QT_STD,

        CASE 
            WHEN X.PH IS NULL
                THEN ''
            ELSE REPLACE(CAST(CAST(ROUND(X.PH, 2) AS FLOAT) AS VARCHAR),'.',',')
        END AS AMA_QT_PH,

        -- Término
        -- CASE para situações que podem aparecer texto ou números

        CASE
            WHEN X.COLIFORMES_TOTAIS IS NOT NULL AND ISNUMERIC(REPLACE(X.COLIFORMES_TOTAIS, ',', '.')) = 1
                THEN X.COLIFORMES_TOTAIS
            ELSE ''
        END AS AMA_QT_COLIFORMESTOTAIS,

        CASE
            WHEN X.COLIFORMES_FECAIS IS NOT NULL AND ISNUMERIC(REPLACE(X.COLIFORMES_FECAIS, ',', '.')) = 1
                THEN X.COLIFORMES_FECAIS
            ELSE ''
        END AS AMA_QT_COLIFORMESFECAIS,

        CASE  -- Verificar unidade usada na ADASA
            WHEN X.BICARBONATO IS NOT NULL AND ISNUMERIC(REPLACE(X.BICARBONATO, ',', '.')) = 1
                THEN X.BICARBONATO 
            ELSE ''
        END AS [AMA_QT_ BICARBONATO],

        CASE
            WHEN X.CALCIO IS NOT NULL AND ISNUMERIC(REPLACE(X.CALCIO, ',', '.')) = 1
                THEN X.CALCIO
            ELSE ''
        END AS [AMA_QT_ CALCIO],

        CASE
            WHEN X.CARBONATO IS NOT NULL AND ISNUMERIC(REPLACE(X.CARBONATO, ',', '.')) = 1
                THEN X.CARBONATO
            ELSE ''
        END AS [AMA_QT_ CARBONATO],


        -- Números com vírgulas
        CASE
            WHEN X.CLORETO IS NOT NULL AND ISNUMERIC(REPLACE(X.CLORETO, ',', '.')) = 1
                THEN REPLACE(ROUND(CAST(REPLACE(X.CLORETO,',','.') AS FLOAT),2),'.',',')
            ELSE ''
        END AS [AMA_QT_ CLORETO],

        CASE
            WHEN X.DUREZA_TOTAL IS NOT NULL AND ISNUMERIC(REPLACE(X.DUREZA_TOTAL, ',', '.')) = 1
                THEN REPLACE(ROUND(CAST(REPLACE(X.DUREZA_TOTAL,',','.') AS FLOAT),2),'.',',')
            ELSE ''
        END AS [AMA_QT_ DUREZATOTAL],

        CASE
            WHEN X.FERRO IS NOT NULL AND ISNUMERIC(REPLACE(X.FERRO, ',', '.')) = 1
                THEN REPLACE(ROUND(CAST(REPLACE(X.FERRO,',','.') AS FLOAT),2),'.',',')
            ELSE ''
        END AS [AMA_QT_ FERROTOTAL],

        CASE
            WHEN X.FLUORETOS IS NOT NULL AND ISNUMERIC(REPLACE(X.FLUORETOS, ',', '.')) = 1
                THEN REPLACE(ROUND(CAST(REPLACE(X.FLUORETOS,',','.') AS FLOAT),2),'.',',')
            ELSE ''
        END AS [AMA_QT_ FLUORETOS],


        CASE
            WHEN X.NITRATOS IS NOT NULL AND ISNUMERIC(REPLACE(X.NITRATOS, ',', '.')) = 1
                THEN REPLACE(ROUND(CAST(REPLACE(X.NITRATOS,',','.') AS FLOAT),2),'.',',')
            ELSE ''
        END AS [AMA_QT_ NITRATOS],

        CASE
            WHEN X.NITRITOS IS NOT NULL AND ISNUMERIC(REPLACE(X.NITRITOS, ',', '.')) = 1
                THEN REPLACE(ROUND(CAST(REPLACE(X.NITRITOS,',','.') AS FLOAT),2),'.',',')
            ELSE ''
        END AS [AMA_QT_ NITRITOS],

        CASE
            WHEN X.POTASSIO IS NOT NULL AND ISNUMERIC(REPLACE(X.POTASSIO, ',', '.')) = 1
                THEN REPLACE(ROUND(CAST(REPLACE(X.POTASSIO,',','.') AS FLOAT),2),'.',',')
            ELSE ''
        END AS [AMA_QT_ POTASSIO],

        CASE
            WHEN X.SODIO IS NOT NULL AND ISNUMERIC(REPLACE(X.SODIO, ',', '.')) = 1
                THEN REPLACE(ROUND(CAST(REPLACE(X.SODIO,',','.') AS FLOAT),2),'.',',')
            ELSE ''
        END AS [AMA_QT_ SODIO],
        CASE
            WHEN X.SULFATO IS NOT NULL AND ISNUMERIC(REPLACE(X.SULFATO, ',', '.')) = 1
                THEN REPLACE(ROUND(CAST(REPLACE(X.SULFATO,',','.') AS FLOAT),2),'.',',')
            ELSE ''
        END AS [AMA_QT_ SULFATO],
        CASE
            WHEN X.MAGNESIO IS NOT NULL AND ISNUMERIC(REPLACE(X.MAGNESIO, ',', '.')) = 1
                THEN REPLACE(ROUND(CAST(REPLACE(X.MAGNESIO,',','.') AS FLOAT),2),'.',',')
            ELSE ''
        END AS [AMA_QT_MAGNESIO],

        A.ID_INTERFERENCIA AS INT_CD_ORIGEM,
        '' AS INT_DS_OPCIONAL
        FROM gisadmin.INTERFERENCIA A
        INNER JOIN gisadmin.EMPREENDIMENTO B
        ON A.ID_EMPREENDIMENTO = B.ID_EMPREENDIMENTO
        INNER JOIN gisadmin.USUARIO C
        ON B.ID_USUARIO = C.ID_USUARIO
        INNER JOIN gisadmin.TIPO_ATO D
        ON A.ID_TIPO_ATO = D.ID_TIPO_ATO
        INNER JOIN 
        (SELECT ID_INTERFERENCIA, VAZAO_HORA/1000 AS VAZAO, QT_DIAS, TEMPO_CAPTACAO, MES
        FROM gisadmin.DEMANDA_TOTAL_SUB 
        WHERE MES = 1) E
        ON A.ID_INTERFERENCIA = E.ID_INTERFERENCIA
        INNER JOIN 
        (SELECT ID_INTERFERENCIA, VAZAO_HORA/1000 AS VAZAO, QT_DIAS, TEMPO_CAPTACAO, MES
        FROM gisadmin.DEMANDA_TOTAL_SUB 
        WHERE MES = 2) F
        ON A.ID_INTERFERENCIA = F.ID_INTERFERENCIA
        INNER JOIN 
        (SELECT ID_INTERFERENCIA, VAZAO_HORA/1000 AS VAZAO, QT_DIAS, TEMPO_CAPTACAO, MES
        FROM gisadmin.DEMANDA_TOTAL_SUB 
        WHERE MES = 3) G
        ON A.ID_INTERFERENCIA = G.ID_INTERFERENCIA
        INNER JOIN 
        (SELECT ID_INTERFERENCIA, VAZAO_HORA/1000 AS VAZAO, QT_DIAS, TEMPO_CAPTACAO, MES
        FROM gisadmin.DEMANDA_TOTAL_SUB 
        WHERE MES = 4) H
        ON A.ID_INTERFERENCIA = H.ID_INTERFERENCIA
        INNER JOIN 
        (SELECT ID_INTERFERENCIA, VAZAO_HORA/1000 AS VAZAO, QT_DIAS, TEMPO_CAPTACAO, MES
        FROM gisadmin.DEMANDA_TOTAL_SUB 
        WHERE MES = 5) I
        ON A.ID_INTERFERENCIA = I.ID_INTERFERENCIA
        INNER JOIN 
        (SELECT ID_INTERFERENCIA, VAZAO_HORA/1000 AS VAZAO, QT_DIAS, TEMPO_CAPTACAO, MES
        FROM gisadmin.DEMANDA_TOTAL_SUB 
        WHERE MES = 6) J
        ON A.ID_INTERFERENCIA = J.ID_INTERFERENCIA
        INNER JOIN 
        (SELECT ID_INTERFERENCIA, VAZAO_HORA/1000 AS VAZAO, QT_DIAS, TEMPO_CAPTACAO, MES
        FROM gisadmin.DEMANDA_TOTAL_SUB 
        WHERE MES = 7) L
        ON A.ID_INTERFERENCIA = L.ID_INTERFERENCIA
        INNER JOIN 
        (SELECT ID_INTERFERENCIA, VAZAO_HORA/1000 AS VAZAO, QT_DIAS, TEMPO_CAPTACAO, MES
        FROM gisadmin.DEMANDA_TOTAL_SUB 
        WHERE MES = 8) M
        ON A.ID_INTERFERENCIA = M.ID_INTERFERENCIA
        INNER JOIN 
        (SELECT ID_INTERFERENCIA, VAZAO_HORA/1000 AS VAZAO, QT_DIAS, TEMPO_CAPTACAO, MES
        FROM gisadmin.DEMANDA_TOTAL_SUB 
        WHERE MES = 9) N
        ON A.ID_INTERFERENCIA = N.ID_INTERFERENCIA
        INNER JOIN 
        (SELECT ID_INTERFERENCIA, VAZAO_HORA/1000 AS VAZAO, QT_DIAS, TEMPO_CAPTACAO, MES
        FROM gisadmin.DEMANDA_TOTAL_SUB 
        WHERE MES = 10) O
        ON A.ID_INTERFERENCIA = O.ID_INTERFERENCIA
        INNER JOIN 
        (SELECT ID_INTERFERENCIA, VAZAO_HORA/1000 AS VAZAO, QT_DIAS, TEMPO_CAPTACAO, MES
        FROM gisadmin.DEMANDA_TOTAL_SUB 
        WHERE MES = 11) P
        ON A.ID_INTERFERENCIA = P.ID_INTERFERENCIA
        INNER JOIN 
        (SELECT ID_INTERFERENCIA, VAZAO_HORA/1000 AS VAZAO, QT_DIAS, TEMPO_CAPTACAO, MES
        FROM gisadmin.DEMANDA_TOTAL_SUB 
        WHERE MES = 12) Q
        ON A.ID_INTERFERENCIA = Q.ID_INTERFERENCIA
        INNER JOIN 
        (SELECT ID_INTERFERENCIA, MAX(VAZAO_HORA/1000) AS MAX_VAZAO
        FROM gisadmin.DEMANDA_TOTAL_SUB 
        GROUP BY ID_INTERFERENCIA) R
        ON A.ID_INTERFERENCIA = R.ID_INTERFERENCIA
        INNER JOIN 
        (SELECT FIN.ID_INTERFERENCIA, FIN2.ID_TIPO_FINALIDADE, FIN.MAX_VAZAO, FIN2.SUBFINALIDADE
        FROM 
            (SELECT ID_INTERFERENCIA, MAX(VAZAO) AS MAX_VAZAO
            FROM GISADMIN.FINALIDADE
            GROUP BY ID_INTERFERENCIA) FIN
        INNER JOIN gisadmin.FINALIDADE FIN2
        ON FIN.ID_INTERFERENCIA = FIN2.ID_INTERFERENCIA
        AND FIN2.VAZAO = FIN.MAX_VAZAO) S
        ON A.ID_INTERFERENCIA = S.ID_INTERFERENCIA
        INNER JOIN gisadmin.SUBTERRANEA2 T
        ON A.ID_INTERFERENCIA = T.ID_INTERFERENCIA
        INNER JOIN gisadmin.POCO U
        ON A.ID_INTERFERENCIA = U.ID_INTERFERENCIA
        INNER JOIN gisadmin.TESTE_BOMB V
        ON A.ID_INTERFERENCIA = V.ID_INTERFERENCIA
        INNER JOIN gisadmin.QUALIDADE_SUB X
        ON A.ID_INTERFERENCIA = X.ID_INTERFERENCIA
        WHERE A.VERIFICADO = 'OK' AND A.ID_SITUACAO <> 9 AND C.CPF_CNPJ <> ''

        AND A.ID_INTERFERENCIA IN (${paramsIds})
        -- Ordenar pela ordem de ids buscadas que é a ordem de proximidade do ponto
        ORDER  BY CHARINDEX(CAST(A.ID_INTERFERENCIA AS VARCHAR), '${paramsIds}')
    `
}
module.exports = querySelectSubterraneasForInsert;