
        /* Planilha de Edição - Subterrânea
            
        */
		USE SRH;
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
		
        SELECT 
		-- Id da interferência no sistem snirh 
		'' as INT_CD,
		-- id da interferência no sistema da adasa
		A.ID_INTERFERENCIA as INT_CD_ORIGEM,
		-- informação complementar da interferência
		'' INT_DS_OPTIONAL,
		-- 1 -> superficial ou subterrânea, 2 -> efluente, 3 -> barragem
		1 INT_TIN_CD,
		-- 1 -> superficial , 2 -> subterrânea
		A.ID_TIPO_INTERFERENCIA AS INT_TSU_CD,
		-- captação subterrânea no sistema SIAGAS
		'' INT_NU_SIAGAS,
        -- latitude e longitude
		REPLACE(CAST(A.LATITUDE AS VARCHAR),'.',',') AS INT_NU_LATITUDE,
		REPLACE(CAST(A.LONGITUDE  AS VARCHAR),'.',',') AS INT_NU_LONGITUDE,
		'' INT_NM_CORPOHIDRICOALTERADO,
		-- endereço do empreendimento
		B.ENDERECO EMP_NM_EMPREENDIMENTO,
		-- nome do usuário
		C.NOME EMP_NM_RESPONSAVEL,
		-- cpf/cnpj
		CONCAT('#', C.CPF_CNPJ) AS EMP_NU_CPFCNPJ,
		CASE 
			WHEN C.EMAIL IS NULL
			THEN 'naoinformado@gmail.com.br'
			ELSE C.EMAIL
		END  AS EMP_DS_EMAILRESPONSAVEL,
		-- cep do endereço de correspondência
		C.CEP EMP_NU_CEPENDERECO,
		-- logradouro de correspondência
		C.ENDERECO EMP_DS_LOGRADOURO,
		'' EMP_DS_COMPLEMENTOENDERECO,
		'' AS EMP_NU_LOGRADOURO,
		CASE
            WHEN CAIXA_POSTAL IS NULL
            THEN ''
            ELSE CAIXA_POSTAL
        END AS EMP_NU_CAIXAPOSTAL,	
		C.BAIRRO EMP_DS_BAIRRO,	
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

		5300108 EMP_CD_IBGEMUNCORRESPONDENCIA,
		A.ID_TIPO_INTERFERENCIA OUT_TP_OUTORGA,
		A.ID_SITUACAO OUT_TP_SITUACAOOUTORGA,
		CONVERT(VARCHAR(10),A.DT_PUBLICACAO,103) AS OUT_DT_OUTORGAINICIAL,	
		CASE
			WHEN A.ID_TIPO_OUTORGA = 3
			/*Somar 29 anos a partir da data atual*/
			THEN CONVERT(VARCHAR(10),DATEADD(YEAR, 34, CAST(GETDATE() AS DATE)),103) 
			WHEN A.ID_TIPO_OUTORGA <> 3
			THEN CONVERT(VARCHAR(10),A.DT_VENCIMENTO,103)
		END AS OUT_DT_OUTORGAFINAL,
		A.NUM_PROCESSO AS OUT_NU_PROCESSO,
		D.DESCRICAO AS OUT_TP_AT,
		A.NUM_ATO AS OUT_NU_ATO,
		
        REPLACE(E.VAZAO, '.', ',') AS DAD_QT_VAZAODIAJAN,
		REPLACE(F.VAZAO, '.', ',') AS DAD_QT_VAZAODIAFEV,
		REPLACE(G.VAZAO, '.', ',') AS DAD_QT_VAZAODIAMAR,
		REPLACE(H.VAZAO, '.', ',') AS DAD_QT_VAZAODIAABR,
		REPLACE(I.VAZAO, '.', ',') AS DAD_QT_VAZAODIAMAI,
		REPLACE(J.VAZAO, '.', ',') AS DAD_QT_VAZAODIAJUN,
		REPLACE(L.VAZAO, '.', ',') AS DAD_QT_VAZAODIAJUL,
		REPLACE(M.VAZAO, '.', ',') AS DAD_QT_VAZAODIAAGO,
		REPLACE(N.VAZAO, '.', ',') AS DAD_QT_VAZAODIASET,
		REPLACE(O.VAZAO, '.', ',') AS DAD_QT_VAZAODIAOUT,
		REPLACE(P.VAZAO, '.', ',') AS DAD_QT_VAZAODIANOV,
		REPLACE(Q.VAZAO, '.', ',') AS DAD_QT_VAZAODIADEZ, 
        E.TEMPO_CAPTACAO AS DAD_QT_HORASJAN,
        F.TEMPO_CAPTACAO AS DAD_QT_HORASFEV,
        G.TEMPO_CAPTACAO AS DAD_QT_HORASMAR,
        H.TEMPO_CAPTACAO AS DAD_QT_HORASABR,
        I.TEMPO_CAPTACAO AS DAD_QT_HORASMAI,
        J.TEMPO_CAPTACAO AS DAD_QT_HORASJUN,
        L.TEMPO_CAPTACAO AS DAD_QT_HORASJUL,
        M.TEMPO_CAPTACAO AS DAD_QT_HORASAGO,
        N.TEMPO_CAPTACAO AS DAD_QT_HORASSET,
        O.TEMPO_CAPTACAO AS DAD_QT_HORASOUT,
        P.TEMPO_CAPTACAO AS DAD_QT_HORASNOV,
        Q.TEMPO_CAPTACAO AS DAD_QT_HORASDEZ,
        E.QT_DIAS AS DAD_QT_DIAJAN,
        F.QT_DIAS AS DAD_QT_DIAFEV,
        G.QT_DIAS AS DAD_QT_DIAMAR,
        H.QT_DIAS AS DAD_QT_DIAABR,
        I.QT_DIAS AS DAD_QT_DIAMAI,
        J.QT_DIAS AS DAD_QT_DIAJUN,
        L.QT_DIAS AS DAD_QT_DIAJUL,
        M.QT_DIAS AS DAD_QT_DIAAGO,
        N.QT_DIAS AS DAD_QT_DIASET,
        O.QT_DIAS AS DAD_QT_DIAOUT,
        P.QT_DIAS AS DAD_QT_DIANOV,
        Q.QT_DIAS AS DAD_QT_DIADEZ,
		0 FIN_CD,
		CASE 
            WHEN S.ID_TIPO_FINALIDADE = 7 AND SUBFINALIDADE = 'PRESTAÇÃO DE SERVIÇOS PÚBLICOS DE ABASTECIMENTO DE ÁGUA'
            THEN 1
            WHEN S.ID_TIPO_FINALIDADE = 7 AND SUBFINALIDADE <> 'PRESTAÇÃO DE SERVIÇOS PÚBLICOS DE ABASTECIMENTO DE ÁGUA'
            THEN 12
            WHEN S.ID_TIPO_FINALIDADE = 8
            THEN 6
            WHEN S.ID_TIPO_FINALIDADE = 9
            THEN 3
            WHEN S.ID_TIPO_FINALIDADE = 10
            THEN 5	
            WHEN S.ID_TIPO_FINALIDADE = 11 AND (SUBFINALIDADE NOT LIKE '%LAVAGEM DE VEÍCULOS%' AND SUBFINALIDADE NOT LIKE '%LAVANDERIA%')
            THEN 16
            WHEN S.ID_TIPO_FINALIDADE = 12 AND SUBFINALIDADE LIKE '%MINERAÇÃO%'
            THEN 4
            WHEN S.ID_TIPO_FINALIDADE = 35 
            THEN 7
            ELSE 99
        END AS FIN_TFN_CD,
		'' FES_NU_PROFUNDIDADEMEDIATANQUE,	
		'' FES_NU_AREATOTALTANQUE,	
		'' TTC_CD,	
		'' TTC_TCU_CD,	
		'' FSE_TES_CD,	
		'' FIE_TPS_CD,	
		'' FAH_TAH_CD,	
		'' FAH_NU_POTENCIAINSTALADA,	
		'' FAH_IC_APROVEITAMENTOFIODAGUA,	
		'' FAH_NU_AREAINUNDADANA,	
		'' FAH_NU_VOLUMENA,	
		'' FPE_TPE_CD,	
		'' FPE_CNA_CD,	
		'' ETP_CD,	
		'' ETP_MPE_CD,	
		'' ETP_NU_QUANTIDADEMAXMENSAL,	
		'' IUS_NU_ALTURARES,	
		'' IUS_NU_AREARESMAX,	
		'' IUS_NU_VOLUMERES,	
		'' IUS_NM_ENTIDADECONCEDENTE,	
		'' IUS_NU_CONCESSAO,	
		'' IUS_DT_FINALCONCESSAO,
		'' SIR_CD,	
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
		'' FTE_NU_POTENCIAINSTALADA,		
		'' FTE_NU_PRODUCAOMENSALMEDIA,	
		'' FTE_TCO_CD,	
		'' FTE_TSR_CD,	
		'' FEA_NU_PRODUCAOMAXMENSALAREIA,	
		'' FEA_NU_PROPORCAOAGUAPOLPA,	
		'' FEA_PC_TEORUMIDADE,	
		'' FOH_TOH_CD,	
		'' FRE_NU_AREAINUNDADANA,	
		'' FRE_NU_VOLUMENA,	
		'' OTO_TOU_CD,	
		'' OTO_CD,	
		'' OTO_NM_OUTROUSO,	
		'' OTO_DS_OUTROUSO,
		'' HTE_CD,	
		'' HTE_NU_QUANTIDADE,	
		'' TUC_TEC_CD,	
		'' TUC_CD,	
		'' FTR_AR_TOTALEMPREENDIMENTO,	
		'' ESC_CD,
		'' ESC_NU_PRODUCAOPRETENDIDA,	
		'' ESC_TET_CD,	
		'' CTE_CD,	
		'' CTE_TSC_CD,	
		'' CTE_TCA_CD,	
		'' CTE_NU_CABECAS,	
		'' ITC_CD,	
		'' ITC_TUM_CD,	
		'' ITC_NU_PRODUCAOANUAL,	
		'' ITC_CNA_CD,	
		'' EFL_NU_DBOBRUTO,	
		'' EFL_NU_DBOTRATADO,	
		'' EFL_NU_FOSFOROBRUTO,	
		'' EFL_NU_FOSFOROTRATADO,	
		'' EFL_NU_NITROGENIOBRUTO,	
		'' EFL_NU_NITROGENIOTRATADO,	
		'' EFL_NU_TEMPERATURA,	
		'' EFL_TTE_CD,	
		'' ASB_DT_INSTALACAO,	
		'' ASB_TNP_CD,	
		'' ASB_NU_DIAMETROPERFURACAO,	
		'' ASB_NU_DIAMETROFILTRO,	
		'' ASB_TPA_CD,	
		'' ASB_NU_TOPO,	
		'' ASB_NU_BASE,	
		'' ASB_TCQ_CD,	
		'' ASB_NU_PROFUNDIDADEFINAL,	
		'' ASB_NU_ALTURABOCATUBO,	
		'' ASB_NU_COTATERRENO,	
		'' ASB_DS_AQUIFEROEXPLOTADO,	
		'' TST_TTB_CD,	
		'' TST_DS_TEMPODURACAO,	
		'' TST_NU_ND,	
		'' TST_NU_NE,	
		'' TST_VZ_ESTABILIZACAO,	
		'' TST_TMI_CD,	
		'' TST_NU_COEFICIENTEARMAZENAMENT,	
		'' TST_NU_TRANSMISSIVIDADE,	
		'' TST_NU_CONDUTIVIDADEHIDRAULICA,	
		'' TST_NU_PERMEABILIDADE,	
		'' AMA_DT_COLETA,	
		'' AMA_DT_ANALISE,	
		'' AMA_NU_CONDUTIVIDADEELETRICA,	
		'' AMA_QT_TEMPERATURA,	
		'' AMA_QT_STD,	
		'' AMA_QT_PH,	
		'' AMA_QT_COLIFORMESTOTAIS,	
		'' AMA_QT_COLIFORMESFECAIS,	
		'' AMA_QT_BICARBONATO,	
		'' AMA_QT_CALCIO,	
		'' AMA_QT_CARBONATO,	
		'' AMA_QT_CLORETO,	
		'' AMA_QT_DUREZATOTAL,	
		'' AMA_QT_FERROTOTAL,	
		'' AMA_QT_FLUORETOS,	
		'' AMA_QT_NITRATOS,	
		'' AMA_QT_NITRITOS,	
		'' AMA_QT_POTASSIO,	
		'' AMA_QT_SODIO,	
		'' AMA_QT_SULFATO,	
		'' AMA_QT_MAGNESIO
       
        FROM gisadmin.INTERFERENCIA A
        INNER JOIN gisadmin.EMPREENDIMENTO B
        ON A.ID_EMPREENDIMENTO = B.ID_EMPREENDIMENTO
        INNER JOIN gisadmin.USUARIO C
        ON B.ID_USUARIO = C.ID_USUARIO
        INNER JOIN gisadmin.TIPO_ATO D
        ON A.ID_TIPO_ATO = D.ID_TIPO_ATO

        INNER JOIN 
        (SELECT ID_INTERFERENCIA, REPLACE(CAST(CAST(VAZAO_HORA/1000 AS DECIMAL(10, 1)) AS VARCHAR), '.', ',') AS VAZAO, QT_DIAS, TEMPO_CAPTACAO, MES
        FROM gisadmin.DEMANDA_TOTAL_SUB 
        WHERE MES = 1) E
        ON A.ID_INTERFERENCIA = E.ID_INTERFERENCIA
        INNER JOIN 
        (SELECT ID_INTERFERENCIA, REPLACE(CAST(CAST(VAZAO_HORA/1000 AS DECIMAL(10, 1)) AS VARCHAR), '.', ',') AS VAZAO, QT_DIAS, TEMPO_CAPTACAO, MES
        FROM gisadmin.DEMANDA_TOTAL_SUB 
        WHERE MES = 2) F
        ON A.ID_INTERFERENCIA = F.ID_INTERFERENCIA
        INNER JOIN 
        (SELECT ID_INTERFERENCIA, REPLACE(CAST(CAST(VAZAO_HORA/1000 AS DECIMAL(10, 1)) AS VARCHAR), '.', ',') AS VAZAO, QT_DIAS, TEMPO_CAPTACAO, MES
        FROM gisadmin.DEMANDA_TOTAL_SUB 
        WHERE MES = 3) G
        ON A.ID_INTERFERENCIA = G.ID_INTERFERENCIA
        INNER JOIN 
        (SELECT ID_INTERFERENCIA, REPLACE(CAST(CAST(VAZAO_HORA/1000 AS DECIMAL(10, 1)) AS VARCHAR), '.', ',') AS VAZAO, QT_DIAS, TEMPO_CAPTACAO, MES
        FROM gisadmin.DEMANDA_TOTAL_SUB 
        WHERE MES = 4) H
        ON A.ID_INTERFERENCIA = H.ID_INTERFERENCIA
        INNER JOIN 
        (SELECT ID_INTERFERENCIA, REPLACE(CAST(CAST(VAZAO_HORA/1000 AS DECIMAL(10, 1)) AS VARCHAR), '.', ',') AS VAZAO, QT_DIAS, TEMPO_CAPTACAO, MES
        FROM gisadmin.DEMANDA_TOTAL_SUB 
        WHERE MES = 5) I
        ON A.ID_INTERFERENCIA = I.ID_INTERFERENCIA
        INNER JOIN 
        (SELECT ID_INTERFERENCIA, REPLACE(CAST(CAST(VAZAO_HORA/1000 AS DECIMAL(10, 1)) AS VARCHAR), '.', ',') AS VAZAO, QT_DIAS, TEMPO_CAPTACAO, MES
        FROM gisadmin.DEMANDA_TOTAL_SUB 
        WHERE MES = 6) J
        ON A.ID_INTERFERENCIA = J.ID_INTERFERENCIA
        INNER JOIN 
        (SELECT ID_INTERFERENCIA, REPLACE(CAST(CAST(VAZAO_HORA/1000 AS DECIMAL(10, 1)) AS VARCHAR), '.', ',') AS VAZAO, QT_DIAS, TEMPO_CAPTACAO, MES
        FROM gisadmin.DEMANDA_TOTAL_SUB 
        WHERE MES = 7) L
        ON A.ID_INTERFERENCIA = L.ID_INTERFERENCIA
        INNER JOIN 
        (SELECT ID_INTERFERENCIA, REPLACE(CAST(CAST(VAZAO_HORA/1000 AS DECIMAL(10, 1)) AS VARCHAR), '.', ',') AS VAZAO, QT_DIAS, TEMPO_CAPTACAO, MES
        FROM gisadmin.DEMANDA_TOTAL_SUB 
        WHERE MES = 8) M
        ON A.ID_INTERFERENCIA = M.ID_INTERFERENCIA
        INNER JOIN 
        (SELECT ID_INTERFERENCIA, REPLACE(CAST(CAST(VAZAO_HORA/1000 AS DECIMAL(10, 1)) AS VARCHAR), '.', ',') AS VAZAO, QT_DIAS, TEMPO_CAPTACAO, MES
        FROM gisadmin.DEMANDA_TOTAL_SUB 
        WHERE MES = 9) N
        ON A.ID_INTERFERENCIA = N.ID_INTERFERENCIA
        INNER JOIN 
        (SELECT ID_INTERFERENCIA, REPLACE(CAST(CAST(VAZAO_HORA/1000 AS DECIMAL(10, 1)) AS VARCHAR), '.', ',') AS VAZAO, QT_DIAS, TEMPO_CAPTACAO, MES
        FROM gisadmin.DEMANDA_TOTAL_SUB 
        WHERE MES = 10) O
        ON A.ID_INTERFERENCIA = O.ID_INTERFERENCIA
        INNER JOIN 
        (SELECT ID_INTERFERENCIA, REPLACE(CAST(CAST(VAZAO_HORA/1000 AS DECIMAL(10, 1)) AS VARCHAR), '.', ',') AS VAZAO, QT_DIAS, TEMPO_CAPTACAO, MES
        FROM gisadmin.DEMANDA_TOTAL_SUB 
        WHERE MES = 11) P
        ON A.ID_INTERFERENCIA = P.ID_INTERFERENCIA
        INNER JOIN 
        (SELECT ID_INTERFERENCIA, REPLACE(CAST(CAST(VAZAO_HORA/1000 AS DECIMAL(10, 1)) AS VARCHAR), '.', ',') AS VAZAO, QT_DIAS, TEMPO_CAPTACAO, MES
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
        --WHERE A.VERIFICADO = 'OK' AND A.ID_SITUACAO <> 9 AND C.CPF_CNPJ <> ''
        -- Remove filtro situação na edição para atualizar a situação no SNIRH
        WHERE A.VERIFICADO = 'OK' AND C.CPF_CNPJ <> ''

        ----AND A.ID_INTERFERENCIA IN (6841,3899,9156,3900,8662,14061,6542,14062,7131,9591)
		AND A.ID_INTERFERENCIA = 7391
		-- Ordenar pela ordem de ids buscadas que é a ordem de proximidade do ponto
		----ORDER  BY CHARINDEX(CAST(A.ID_INTERFERENCIA AS VARCHAR), '6841,3899,9156,3900,8662,14061,6542,14062,7131,9591')