const dictionary = {
    INT_TIN_CD: {
        nomeColuna: "INT_TIN_CD",
        tipoDado: "NUMBER",
        obs: "OBR",
        exemplo: 1,
        unidade: "-",
        anexo: "",
        comentarios: "",
        interferencia: "CODIGO IDENTIFICADOR DO TIPO DE INTERFERENCIA. SENDO 1 PARA CAPTAÇÃO, 2 PARA LANÇAMENTO, 3 BARRAGEM, 4 PONTO DE REFERÊNCIA."
    },
    INT_TSU_CD: {
        nomeColuna: "INT_TSU_CD",
        tipoDado: "NUMBER",
        obs: "OBR",
        exemplo: 1,
        unidade: "-",
        anexo: "",
        comentarios: "",
        interferencia: "CODIGO IDENTIFICADOR DO SUBTIPO DA CAPTAÇÃO, SENDO 1 SE SUPERFICIAL E 2 PARA SUBTERRÂNEA, SOMENTE SE INT_TIN_CD = 1."
    },
    INT_TSI_CD: {
        nomeColuna: "INT_TSI_CD",
        tipoDado: "NUMBER",
        obs: "OPC",
        exemplo: 3,
        unidade: "-",
        anexo: "",
        comentarios: "",
        interferencia: "CODIGO IDENTIFICADOR DA SITUAÇÃO DA INTERFERÊNCIA."
    },
    INT_CR_LATITUDE: {
        nomeColuna: "INT_CR_LATITUDE",
        tipoDado: "NUMBER (12,10)",
        obs: "OBR",
        exemplo: "-3,8888888",
        unidade: "GRAU DECIMAL",
        anexo: "-",
        comentarios: "CAMPO NÚMERICO QUE REPRESENTA A LATITUDE DE LOCALIZAÇÃO DO PONTO DE INTERFERÊNCIA, EM GRAU DECIMAL COM SETE CASAS DE PRECISÃO."
    },
    INT_CR_LONGITUDE: {
        nomeColuna: "INT_CR_LONGITUDE",
        tipoDado: "NUMBER (12,10)",
        obs: "OBR",
        exemplo: "-35,8888888",
        unidade: "GRAU DECIMAL",
        anexo: "-",
        comentarios: "CAMPO NÚMERICO QUE REPRESENTA A LONGITUDE DE LOCALIZAÇÃO DO PONTO DE INTERFERÊNCIA, EM GRAU DECIMAL COM SETE CASAS DE PRECISÃO."
    },
    ING_NU_IBGEMUNICIPIO: {
        nomeColuna: "ING_NU_IBGEMUNICIPIO",
        tipoDado: "VARCHAR2 (7 BYTE)",
        obs: "OBR",
        exemplo: "245698",
        unidade: "-",
        anexo: "-",
        comentarios: "CAMPO DESCRITIVO QUE REPRESENTA O CÓDIGO IBGE DO MUNICIPIO ONDE ESTÁ LOCALIZADA A INTERFERÊNCIA."
    },
    EMP_NM_EMPREENDIMENTO: {
        nomeColuna: "EMP_NM_EMPREENDIMENTO",
        tipoDado: "VARCHAR2 (150 BYTE)",
        obs: "OBR",
        exemplo: "FAZENDA LUZ",
        unidade: "-",
        anexo: "-",
        comentarios: "CAMPO DESCRITIVO QUE REPRESENTA O NOME DO EMPREENDIMENTO."
    },
    EMP_NU_CPFCNPJ: {
        nomeColuna: "EMP_NU_CPFCNPJ",
        tipoDado: "VARCHAR2 (14 BYTE)",
        obs: "OBR",
        exemplo: "#000.456.789-00",
        unidade: "-",
        anexo: "-",
        comentarios: "CAMPO DESCRITIVO QUE REPRESENTA O NÚMERO DE IDENTIFICAÇÃO DO USUÁRIO. ESTE CAMPO PODE SER PREENCHIDO COM O CPF OU CNPJ DO USUÁRIO. [INSERIR O SÍMBOLO # ANTES DO NÚMERO]"
    },
    EMP_NM_USUARIO: {
        nomeColuna: "EMP_NM_USUARIO",
        tipoDado: "VARCHAR2 (150 BYTE)",
        obs: "OBR",
        exemplo: "Nome Sobrenome",
        unidade: "-",
        anexo: "-",
        comentarios: "CAMPO DESCRITIVO QUE REPRESENTA O NOME DO USUÁRIO (OU RAZÃO SOCIAL) DE RECURSOS HÍDRICOS."
    },
    EMP_DS_EMAILRESPONSAVEL: {
        nomeColuna: "EMP_DS_EMAILRESPONSAVEL",
        tipoDado: "VARCHAR2 (150 BYTE)",
        obs: "OPC",
        exemplo: "email@gggg.com.br",
        unidade: "-",
        anexo: "-",
        comentarios: "CAMPO DESCRITIVO QUE REPRESENTA O EMAIL DE CONTATO DO RESPONSÁVEL PELO EMPREENDIMENTO."
    },
    EMP_NU_CEPENDERECO: {
        nomeColuna: "EMP_NU_CEPENDERECO",
        tipoDado: "VARCHAR2 (8 BYTE)",
        obs: "OPC",
        exemplo: "71649115",
        unidade: "-",
        anexo: "-",
        comentarios: "CAMPO DESCRITIVO QUE REPRESENTA O NÚMERO DO CEP DO ENDEREÇO DE CORRESPONDÊNCIA."
    },
    EMP_DS_LOGRADOURO: {
        nomeColuna: "EMP_DS_LOGRADOURO",
        tipoDado: "VARCHAR2 (150 BYTE)",
        obs: "OPC",
        exemplo: "RUA VICENTE DE ABREU",
        unidade: "-",
        anexo: "-",
        comentarios: "CAMPO DESCRITIVO QUE REPRESENTA O ENDEREÇO PARA ENVIO DE CORRESPONDÊNCIA."
    },
    EMP_DS_COMPLEMENTOENDERECO: {
        nomeColuna: "EMP_DS_COMPLEMENTOENDERECO",
        tipoDado: "VARCHAR2 (150 BYTE)",
        obs: "OPC",
        exemplo: "ESQUINA COM A RUA MARIA DA GLORIA",
        unidade: "-",
        anexo: "-",
        comentarios: "CAMPO DESCRITIVO QUE REPRESENTA O COMPLEMENTO DO ENDEREÇO PARA ENVIO DE CORRESPONDÊNCIA."
    },
    EMP_NU_LOGRADOURO: {
        nomeColuna: "EMP_NU_LOGRADOURO",
        tipoDado: "NUMBER",
        obs: "OPC",
        exemplo: 42,
        unidade: "-",
        anexo: "-",
        comentarios: "CAMPO DESCRITIVO QUE REPRESENTA O NÚMERO DO ENDEREÇO DE CORRESPONDÊNCIA."
    },
    EMP_NU_CAIXAPOSTAL: {
        nomeColuna: "EMP_NU_CAIXAPOSTAL",
        tipoDado: "NUMBER",
        obs: "OPC",
        exemplo: 33,
        unidade: "-",
        anexo: "-",
        comentarios: "CAMPO DESCRITIVO QUE REPRESENTA O NÚMERO DA CAIXA POSTAL DO RESPONSÁVEL PELO EMPREENDIMENTO."
    },
    EMP_CD_CODIGOIBGECORRESPONDENCIA: {
        nomeColuna: "EMP_CD_CODIGOIBGECORRESPONDENCIA",
        tipoDado: "NUMBER",
        obs: "OPC",
        exemplo: 245698,
        unidade: "-",
        anexo: "-",
        comentarios: "CÓDIGO IBGE DO MUNICÍPIO DO ENDEREÇO DE CORRESPONDÊNCIA."
    },
    EMP_NU_DDD: {
        nomeColuna: "EMP_NU_DDD",
        tipoDado: "VARCHAR2 (2 BYTE)",
        obs: "OPC",
        exemplo: "21",
        unidade: "-",
        anexo: "-",
        comentarios: "CAMPO DESCRITIVO QUE REPRESENTA O DDD DO TELEFONE DE CONTATO DO RESPONSÁVEL PELO EMPREENDIMENTO (USUÁRIO)."
    },
    EMP_NU_TELEFONE: {
        nomeColuna: "EMP_NU_TELEFONE",
        tipoDado: "VARCHAR2 (10 BYTE)",
        obs: "OPC",
        exemplo: "33452056",
        unidade: "-",
        anexo: "-",
        comentarios: "CAMPO DESCRITIVO QUE REPRESENTA O NÚMETO DO TELEFONE DE CONTATO DO RESPONSÁVEL PELO EMPREENDIMENTO (USUÁRIO)."
    },
    OUT_TPO_CD: {
        nomeColuna: "OUT_TPO_CD",
        tipoDado: "NUMBER",
        obs: "OBR",
        exemplo: 3,
        unidade: "-",
        anexo: "-",
        comentarios: "CÓDIGO IDENTIFICADOR DO TIPO DO ATO ADMINISTRATIVO OU INSTRUMENTO DE REGULARIZAÇÃO. CÓDIGOS 5,6,7 SOMENTE SE INT_TIN_CD = 1 E INT_TSU_CD = 2 E OUT_TSP_CD = 8."
    },
    OUT_TSP_CD: {
        nomeColuna: "OUT_TSP_CD",
        tipoDado: "NUMBER",
        obs: "OBR",
        exemplo: 1,
        unidade: "-",
        anexo: "-",
        comentarios: "CÓDIGO IDENTIFICADOR DO TIPO DE SITUAÇÃO DO ATO ADMINISTRATIVO OU INSTRUMENTO DE REGULARIZAÇÃO."
    },
    OUT_DT_FINAL: {
        nomeColuna: "OUT_DT_FINAL",
        tipoDado: "DATE",
        obs: "OBR",
        exemplo: "01/04/2015",
        unidade: "-",
        anexo: "-",
        comentarios: "CAMPO DESCRITIVO QUE REPRESENTA A DATA DE TÉRMINO DO PRAZO DE OUTORGA."
    },
    OUT_DT_INICIAL: {
        nomeColuna: "OUT_DT_INICIAL",
        tipoDado: "DATE",
        obs: "OBR",
        exemplo: "01/04/2000",
        unidade: "-",
        anexo: "-",
        comentarios: "CAMPO DESCRITIVO QUE REPRESENTA A DATA DE INÍCIO DO PRAZO DE OUTORGA."
    },
    OUT_NU_PROCESSO: {
        nomeColuna: "OUT_NU_PROCESSO",
        tipoDado: "VARCHAR2 (50 BYTE)",
        obs: "OPC",
        exemplo: "02501.53698/2000",
        unidade: "-",
        anexo: "-",
        comentarios: "CAMPO DESCRITIVO DO NÚMERO DO PROCESSO."
    },
    OUT_DS_ATO: {
        nomeColuna: "OUT_DS_ATO",
        tipoDado: "VARCHAR2 (10 BYTE)",
        obs: "OBR",
        exemplo: "Portaria",
        unidade: "-",
        anexo: "-",
        comentarios: "CAMPO DESCRITIVO DO ATO ADMINISTRATIVO DE PUBLICAÇÃO DO INSTRUMENTO DE REGULARIZAÇÃO."
    },
    OUT_NU_ATO: {
        nomeColuna: "OUT_NU_ATO",
        tipoDado: "VARCHAR2 (50 BYTE)",
        obs: "OBR",
        exemplo: "1122/2000",
        unidade: "-",
        anexo: "-",
        comentarios: "CAMPO DESCRITIVO DO NÚMERO DO ATO."
    },

    SIAGAS: {
        nomeColuna: "SIAGAS",
        tipoDado: "VARCHAR2 (20 BYTE)",
        obs: "OPC",
        exemplo: "5200000044",
        unidade: "-",
        anexo: "-",
        comentarios: "CAMPO DESCRITIVO QUE REPRESENTA O NÚMERO DE REGISTRO DE UMA CAPTAÇÃO SUBTERRÂNEA NO SISTEMA SIAGAS."

    },

    OPE_VZ_MESJAN: {
        nomeColuna: "OPE_VZ_MESJAN",
        tipoDado: "NUMBER (15,2)",
        obs: "OBR",
        exemplo: "30,5",
        unidade: "m³/h",
        anexo: "-",
        comentarios: "CAMPO NÚMERICO QUE REPRESENTA A QUANTIDADE DE VAZÃO PARA O MÊS DE JANEIRO. SE INT_TIN_CD = 3 OU 4 ESTE CAMPO NÃO SERÁ OBRIGATÓRIO."
    },
    OPE_VZ_MESFEV: {
        nomeColuna: "OPE_VZ_MESFEV",
        tipoDado: "NUMBER (15,2)",
        obs: "OBR",
        exemplo: "30,5",
        unidade: "m³/h",
        anexo: "-",
        comentarios: "CAMPO NÚMERICO QUE REPRESENTA A QUANTIDADE DE VAZÃO PARA O MÊS DE FEVEREIRO. SE INT_TIN_CD = 3 OU 4 ESTE CAMPO NÃO SERÁ OBRIGATÓRIO."
    },
    OPE_VZ_MESMAR: {
        nomeColuna: "OPE_VZ_MESMAR",
        tipoDado: "NUMBER (15,2)",
        obs: "OBR",
        exemplo: "30,5",
        unidade: "m³/h",
        anexo: "-",
        comentarios: "CAMPO NÚMERICO QUE REPRESENTA A QUANTIDADE DE VAZÃO PARA O MÊS DE MARÇO. SE INT_TIN_CD = 3 OU 4 ESTE CAMPO NÃO SERÁ OBRIGATÓRIO."
    },
    OPE_VZ_MESABR: {
        nomeColuna: "OPE_VZ_MESABR",
        tipoDado: "NUMBER (15,2)",
        obs: "OBR",
        exemplo: "30,5",
        unidade: "m³/h",
        anexo: "-",
        comentarios: "CAMPO NÚMERICO QUE REPRESENTA A QUANTIDADE DE VAZÃO PARA O MÊS DE ABRIL. SE INT_TIN_CD = 3 OU 4 ESTE CAMPO NÃO SERÁ OBRIGATÓRIO."
    },
    OPE_VZ_MESMAI: {
        nomeColuna: "OPE_VZ_MESMAI",
        tipoDado: "NUMBER (15,2)",
        obs: "OBR",
        exemplo: "30,5",
        unidade: "m³/h",
        anexo: "-",
        comentarios: "CAMPO NÚMERICO QUE REPRESENTA A QUANTIDADE DE VAZÃO PARA O MÊS DE MAIO. SE INT_TIN_CD = 3 OU 4 ESTE CAMPO NÃO SERÁ OBRIGATÓRIO."
    },
    OPE_VZ_MESJUN: {
        nomeColuna: "OPE_VZ_MESJUN",
        tipoDado: "NUMBER (15,2)",
        obs: "OBR",
        exemplo: "30,5",
        unidade: "m³/h",
        anexo: "-",
        comentarios: "CAMPO NÚMERICO QUE REPRESENTA A QUANTIDADE DE VAZÃO PARA O MÊS DE JUNHO. SE INT_TIN_CD = 3 OU 4 ESTE CAMPO NÃO SERÁ OBRIGATÓRIO."
    },
    OPE_VZ_MESJUL: {
        nomeColuna: "OPE_VZ_MESJUL",
        tipoDado: "NUMBER (15,2)",
        obs: "OBR",
        exemplo: "30,5",
        unidade: "m³/h",
        anexo: "-",
        comentarios: "CAMPO NÚMERICO QUE REPRESENTA A QUANTIDADE DE VAZÃO PARA O MÊS DE JULHO. SE INT_TIN_CD = 3 OU 4 ESTE CAMPO NÃO SERÁ OBRIGATÓRIO."
    },
    OPE_VZ_MESAGO: {
        nomeColuna: "OPE_VZ_MESAGO",
        tipoDado: "NUMBER (15,2)",
        obs: "OBR",
        exemplo: "30,5",
        unidade: "m³/h",
        anexo: "-",
        comentarios: "CAMPO NÚMERICO QUE REPRESENTA A QUANTIDADE DE VAZÃO PARA O MÊS DE AGOSTO. SE INT_TIN_CD = 3 OU 4 ESTE CAMPO NÃO SERÁ OBRIGATÓRIO."
    },
    OPE_VZ_MESSET: {
        nomeColuna: "OPE_VZ_MESSET",
        tipoDado: "NUMBER (15,2)",
        obs: "OBR",
        exemplo: "30,5",
        unidade: "m³/h",
        anexo: "-",
        comentarios: "CAMPO NÚMERICO QUE REPRESENTA A QUANTIDADE DE VAZÃO PARA O MÊS DE SETEMBRO. SE INT_TIN_CD = 3 OU 4 ESTE CAMPO NÃO SERÁ OBRIGATÓRIO."
    },
    OPE_VZ_MESOUT: {
        nomeColuna: "OPE_VZ_MESOUT",
        tipoDado: "NUMBER (15,2)",
        obs: "OBR",
        exemplo: "30,5",
        unidade: "m³/h",
        anexo: "-",
        comentarios: "CAMPO NÚMERICO QUE REPRESENTA A QUANTIDADE DE VAZÃO PARA O MÊS DE OUTUBRO. SE INT_TIN_CD = 3 OU 4 ESTE CAMPO NÃO SERÁ OBRIGATÓRIO."
    },
    OPE_VZ_MESNOV: {
        nomeColuna: "OPE_VZ_MESNOV",
        tipoDado: "NUMBER (15,2)",
        obs: "OBR",
        exemplo: "30,5",
        unidade: "m³/h",
        anexo: "-",
        comentarios: "CAMPO NÚMERICO QUE REPRESENTA A QUANTIDADE DE VAZÃO PARA O MÊS DE NOVEMBRO. SE INT_TIN_CD = 3 OU 4 ESTE CAMPO NÃO SERÁ OBRIGATÓRIO."
    },
    OPE_VZ_MESDEZ: {
        nomeColuna: "OPE_VZ_MESDEZ",
        tipoDado: "NUMBER (15,2)",
        obs: "OBR",
        exemplo: "30,5",
        unidade: "m³/h",
        anexo: "-",
        comentarios: "CAMPO NÚMERICO QUE REPRESENTA A QUANTIDADE DE VAZÃO MÁXIMA. SE INT_TIN_CD = 3 OU 4 ESTE CAMPO NÃO SERÁ OBRIGATÓRIO. "
    },

    FIN_TFN_CD: {
        nomeColuna: "FIN_TFN_CD",
        tipoDado: "NUMBER",
        obs: "OBR",
        exemplo: 5,
        unidade: "-",
        anexo: 6,
        comentarios: "CODIGO IDENTIFICADOR DO TIPO DA FINALIDADE."
    },
    FOU_TOU_CD: {
        nomeColuna: "FOU_TOU_CD",
        tipoDado: "NUMBER",
        obs: "CON",
        exemplo: 3,
        unidade: "-",
        anexo: 7,
        comentarios: "CODIGO IDENTIFICADOR DO TIPO DE OUTRO USO. SOMENTE SE FIN_TFN_CD = 99."
    },
    SIR_TSI_CD: {
        nomeColuna: "SIR_TSI_CD",
        tipoDado: "NUMBER",
        obs: "CON",
        exemplo: 3,
        unidade: "-",
        anexo: 8,
        comentarios: "CAMPO DESCRITIVO QUE REPRESENTA O SISTEMA DE IRRIGAÇÃO UTILIZADO PELA INTERFERÊNCIA, SOMENTE SE FIN_TFN_CD = 5."
    },
    SIR_TCT_CD: {
        nomeColuna: "SIR_TCT_CD",
        tipoDado: "NUMBER",
        obs: "CON",
        exemplo: 1009,
        unidade: "-",
        anexo: 9,
        comentarios: "CODIGO IDENTIFICADOR DO TIPO DE CULTURA, SOMENTE SE FIN_TFN_CD = 5."
    },
    SIR_AR_IRRIGADA: {
        nomeColuna: "SIR_AR_IRRIGADA",
        tipoDado: "NUMBER (15,2)",
        obs: "CON",
        exemplo: "1,5",
        unidade: "ha (hectares)",
        anexo: "-",
        comentarios: "CAMPO NÚMERICO QUE REPRESENTA A ÁREA TOTAL IRRIGADA PELO PONTO DE CAPTAÇÃO, SOMENTE SE FIN_TFN_CD = 5."
    },
    IUS_NU_ALTURARES: {
        nomeColuna: "IUS_NU_ALTURARES",
        tipoDado: "NUMBER (15,2)",
        obs: "CON",
        exemplo: "1,5",
        unidade: "m (metro)",
        anexo: "-",
        comentarios: "CAMPO NÚMERICO QUE REPRESENTA A ALTURA TOTAL DO RESERVATÓRIO SOMENTE SE FIN_TFN_CD = [10 e 11]."
    },
    IUS_AR_RESMAX: {
        nomeColuna: "IUS_AR_RESMAX",
        tipoDado: "NUMBER (15,5)",
        obs: "CON",
        exemplo: "0,00005",
        unidade: "ha (hectares)",
        anexo: "-",
        comentarios: "CAMPO NÚMERICO QUE REPRESENTA A ÁREA TOTAL DO RESERVATÓRIO, SOMENTE SE FIN_TFN_CD = [10 e 11]."
    },
    IUS_VO_RESMAX: {
        nomeColuna: "IUS_VO_RESMAX",
        tipoDado: "NUMBER (15,5)",
        obs: "CON",
        exemplo: "0,00005",
        unidade: "hm³",
        anexo: "-",
        comentarios: "CAMPO NÚMERICO QUE REPRESENTA O VOLUME MÁXIMO DO RESERVATÓRIO, SOMENTE SE FIN_TFN_CD = [10 e 11]."
    },
    EFL_QT_DBOBRUTO: {
        nomeColuna: "EFL_QT_DBOBRUTO",
        tipoDado: "NUMBER",
        obs: "OPC",
        exemplo: 300,
        unidade: "mg/L",
        anexo: "-",
        comentarios: "CAMPO NÚMERICO QUE REPRESENTA A QUANTIDADE DE DBO DO EFLUENTE BRUTO. VALOR MÁXIMO 7200."
    },
    EFL_QT_DBOTRATADO: {
        nomeColuna: "EFL_QT_DBOTRATADO",
        tipoDado: "NUMBER",
        obs: "OPC",
        exemplo: 200,
        unidade: "mg/L",
        anexo: "-",
        comentarios: "CAMPO NÚMERICO QUE REPRESENTA A QUANTIDADE DE DBO DO EFLUENTE TRATADO. DEVE NECESSARIAMENTE SER MENOR QUE O VALOR BRUTO."
    },
    EFL_QT_FOSFOROBRUTO: {
        nomeColuna: "EFL_QT_FOSFOROBRUTO",
        tipoDado: "NUMBER",
        obs: "OPC",
        exemplo: "2,2",
        unidade: "mg/L",
        anexo: "-",
        comentarios: "CAMPO NÚMERICO QUE REPRESENTA A QUANTIDADE DE FÓSFORO DO EFLUENTE BRUTO."
    },
    EFL_QT_FOSFOROTRATADO: {
        nomeColuna: "EFL_QT_FOSFOROTRATADO",
        tipoDado: "NUMBER",
        obs: "OPC",
        exemplo: "0,1",
        unidade: "mg/L",
        anexo: "-",
        comentarios: "CAMPO NÚMERICO QUE REPRESENTA A QUANTIDADE DE FÓSFORO DO EFLUENTE TRATADO."
    },
    EFL_QT_NITROGENIOBRUTO: {
        nomeColuna: "EFL_QT_NITROGENIOBRUTO",
        tipoDado: "NUMBER",
        obs: "OPC",
        exemplo: "9,2",
        unidade: "mg/L",
        anexo: "-",
        comentarios: "CAMPO NÚMERICO QUE REPRESENTA A QUANTIDADE DE NITROGÊNIO DO EFLUENTE BRUTO."
    },
    EFL_QT_NITROGENIOTRATADO: {
        nomeColuna: "EFL_QT_NITROGENIOTRATADO",
        tipoDado: "NUMBER",
        obs: "OPC",
        exemplo: "0,3",
        unidade: "mg/L",
        anexo: "-",
        comentarios: "CAMPO NÚMERICO QUE REPRESENTA A QUANTIDADE DE NITROGÊNIO DO EFLUENTE TRATADO."
    },
    ASB_DT_INSTALACAO: {
        nomeColuna: "ASB_DT_INSTALACAO",
        tipoDado: "DATETIME",
        obs: "OPC",
        exemplo: "01/07/2015",
        unidade: "-",
        anexo: "-",
        comentarios: "CAMPO DESCRITIVO QUE REPRESENTA A DATA DE INSTALAÇÃO DO POÇO."
    },
    ASB_TNP_CD: {
        nomeColuna: "ASB_TNP_CD",
        tipoDado: "NUMBER",
        obs: "OPC",
        exemplo: 10,
        unidade: "-",
        anexo: 10,
        comentarios: "CÓDIGO IDENTIFICADOR DA NATUREZAPONTO."
    },
    ASB_NU_DIAMETROPERFURACAO: {
        nomeColuna: "ASB_NU_DIAMETROPERFURACAO",
        tipoDado: "NUMBER",
        obs: "OPC",
        exemplo: 6,
        unidade: "Polegadas",
        anexo: "-",
        comentarios: "DIÂMETRO PERFURAÇÃO."
    },
    ASB_NU_DIAMETROFILTRO: {
        nomeColuna: "ASB_NU_DIAMETROFILTRO",
        tipoDado: "NUMBER",
        obs: "OPC",
        exemplo: 6,
        unidade: "Polegadas",
        anexo: "-",
        comentarios: "DIÂMETRO DO FILTRO."
    },
    ASB_AQP_CD: {
        nomeColuna: "ASB_AQP_CD",
        tipoDado: "NUMBER",
        obs: "OPC",
        exemplo: 3,
        unidade: "-",
        anexo: 15,
        comentarios: "CÓDIGO IDENTIFICADOR DO AQUÍFERO PONTO."
    },
    ASB_NU_TOPO: {
        nomeColuna: "ASB_NU_TOPO",
        tipoDado: "DECIMAL(6,2)",
        obs: "OPC",
        exemplo: 40,
        unidade: "Metros",
        anexo: "-",
        comentarios: "PROFUNDIDADE DO TOPO DO AQUÍFERO CAPTADO, MEDIDA EM METROS A PARTIR DA SUPERFÍCIE."
    },
    ASB_NU_BASE: {
        nomeColuna: "ASB_NU_BASE",
        tipoDado: "DECIMAL(6,2)",
        obs: "OPC",
        exemplo: 150,
        unidade: "Metros",
        anexo: "-",
        comentarios: "PROFUNDIDADE DA BASE DO AQUÍFERO CAPTADO, MEDIDA EM METROS A PARTIR DA SUPERFÍCIE."
    },
    ASB_TPN_CD: {
        nomeColuna: "ASB_TPN_CD",
        tipoDado: "NUMBER",
        obs: "OPC",
        exemplo: "PARCIAL",
        unidade: "-",
        anexo: 11,
        comentarios: "TIPO DE PENETRAÇÃO DO AQUÍFERO."
    },
    ASB_TCA_CD: {
        nomeColuna: "ASB_TCA_CD",
        tipoDado: "NUMBER",
        obs: "OPC",
        exemplo: "LIVRE",
        unidade: "-",
        anexo: 12,
        comentarios: "CONDIÇÃO DO AQUÍFERO."
    },
    ASB_NU_PROFUNDIDADEFINAL: {
        nomeColuna: "ASB_NU_PROFUNDIDADEFINAL",
        tipoDado: "NUMBER (10,2)",
        obs: "OPC",
        exemplo: 150,
        unidade: "Metros",
        anexo: "-",
        comentarios: "PROFUNDIDADE DO POÇO."
    },
    ASB_NU_ALTURABOCATUBO: {
        nomeColuna: "ASB_NU_ALTURABOCATUBO",
        tipoDado: "NUMBER (4,2)",
        obs: "OPC",
        exemplo: "0,8",
        unidade: "Metros",
        anexo: "-",
        comentarios: "ALTURA DA BOCA DA TUBULAÇÃO."
    },
    ASB_NU_COTATERRENO: {
        nomeColuna: "ASB_NU_COTATERRENO",
        tipoDado: "NUMBER (9,2)",
        obs: "OPC",
        exemplo: 630,
        unidade: "Metros",
        anexo: "-",
        comentarios: "ALTITUDE DO TERRENO."
    },
    TST_DT: {
        nomeColuna: "TST_DT",
        tipoDado: "DATETIME",
        obs: "OPC",
        exemplo: "01/07/2015",
        unidade: "-",
        anexo: "-",
        comentarios: "DATA DO TESTE DO BOMBEAMENTO."
    },
    TST_TTB_CD: {
        nomeColuna: "TST_TTB_CD",
        tipoDado: "NUMBER",
        obs: "OPC",
        exemplo: 1,
        unidade: "-",
        anexo: 13,
        comentarios: "CÓDIGO IDENTIFICADOR DO TIPO DE TESTE DE BOMBEAMENTO. VIDE."
    },
    TST_DS_TEMPODURACAO: {
        nomeColuna: "TST_DS_TEMPODURACAO",
        tipoDado: "VARCHAR2 (5)",
        obs: "OPC",
        exemplo: 24,
        unidade: "Horas",
        anexo: "-",
        comentarios: "DESCRIÇÃO DO TEMPO DE DURAÇÃO DO TESTE DE BOMBEAMENTO EM HORAS."
    },
    TST_NU_ND: {
        nomeColuna: "TST_NU_ND",
        tipoDado: "NUMBER (9,2)",
        obs: "OPC",
        exemplo: 60,
        unidade: "Metros",
        anexo: "-",
        comentarios: "NÍVEL DINÂMICO."
    },
    TST_NU_NE: {
        nomeColuna: "TST_NU_NE",
        tipoDado: "NUMBER (9,2)",
        obs: "OPC",
        exemplo: 10,
        unidade: "Metros",
        anexo: "-",
        comentarios: "NÍVEL ESTÁTICO."
    },
    TST_VZ_ESTABILIZACAO: {
        nomeColuna: "TST_VZ_ESTABILIZACAO",
        tipoDado: "NUMBER",
        obs: "OPC",
        exemplo: 20,
        unidade: "m3/h",
        anexo: "-",
        comentarios: "VAZÃO DE ESTABILIZAÇÃO."
    },
    TST_TMI_CD: {
        nomeColuna: "TST_TMI_CD",
        tipoDado: "NUMBER",
        obs: "OPC",
        exemplo: 11,
        unidade: "-",
        anexo: 14,
        comentarios: "CÓDIGO IDENTIFICADOR DO TIPO DE MÉTODO DE INTERPRETAÇÃO. VIDE."
    },
    TST_NU_COEFICIENTEARMAZENAMENTO: {
        nomeColuna: "TST_NU_COEFICIENTEARMAZENAMENTO",
        tipoDado: "NUMBER",
        obs: "OPC",
        exemplo: "0,00025",
        unidade: "-",
        anexo: "-",
        comentarios: "COEFICIENTE DE ARMAZENAMENTO."
    },
    TST_NU_TRANSMISSIVIDADE: {
        nomeColuna: "TST_NU_TRANSMISSIVIDADE",
        tipoDado: "NUMBER",
        obs: "OPC",
        exemplo: "0,028",
        unidade: "m2/s",
        anexo: "-",
        comentarios: "TRANSMISSIVIDADE."
    },
    TST_NU_CONDUTIVIDADEHIDRAULICA: {
        nomeColuna: "TST_NU_CONDUTIVIDADEHIDRAULICA",
        tipoDado: "NUMBER",
        obs: "OPC",
        exemplo: "0,000003",
        unidade: "m/s",
        anexo: "-",
        comentarios: "CONDUTIVIDADE HIDRÁULICA."
    },
    TST_NU_PERMEABILIDADE: {
        nomeColuna: "TST_NU_PERMEABILIDADE",
        tipoDado: "NUMBER",
        obs: "OPC",
        exemplo: "0,000003",
        unidade: "m/s",
        anexo: "-",
        comentarios: "PERMEABILIDADE."
    },
    AMA_DT_COLETA: {
        nomeColuna: "AMA_DT_COLETA",
        tipoDado: "DATETIME",
        obs: "OPC",
        exemplo: "15/10/2015",
        unidade: "-",
        anexo: "-",
        comentarios: "DATA DA COLETA."
    },
    AMA_DT_ANALISE: {
        nomeColuna: "AMA_DT_ANALISE",
        tipoDado: "DATETIME",
        obs: "OPC",
        exemplo: "15/10/2015",
        unidade: "-",
        anexo: "-",
        comentarios: "DATA DA ANÁLISE."
    },
    AMA_NU_CONDUTIVIDADEELETRICA: {
        nomeColuna: "AMA_NU_CONDUTIVIDADEELETRICA",
        tipoDado: "NUMBER (12,2)",
        obs: "OPC",
        exemplo: "140,50",
        unidade: "µS/cm",
        anexo: "-",
        comentarios: "CONDUTIVIDADE ELÉTRICA."
    },
    AMA_QT_TEMPERATURA: {
        nomeColuna: "AMA_QT_TEMPERATURA",
        tipoDado: "NUMBER (4,1)",
        obs: "OPC",
        exemplo: "22,5",
        unidade: "ºC",
        anexo: "-",
        comentarios: "TEMPERATURA."
    },
    AMA_QT_STD: {
        nomeColuna: "AMA_QT_STD",
        tipoDado: "NUMBER (12,2)",
        obs: "OPC",
        exemplo: "70,25",
        unidade: "mg/L",
        anexo: "-",
        comentarios: "SÓLIDOS TOTAIS DISSOLVIDOS."
    },
    AMA_QT_PH: {
        nomeColuna: "AMA_QT_PH",
        tipoDado: "NUMBER (4,2)",
        obs: "OPC",
        exemplo: "6,55",
        unidade: "-",
        anexo: "-",
        comentarios: "PH – POTENCIAL HIDROGENIÔNICO (QUANTIDADE DE PRÓTONS H+), QUE INDICA A ACIDEZ, NEUTRALIDADE OU ALCALINIDADE DE UMA SOLUÇÃO AQUOSA."
    },
    AMA_QT_COLIFORMESTOTAIS: {
        nomeColuna: "AMA_QT_COLIFORMESTOTAIS",
        tipoDado: "NUMBER",
        obs: "OPC",
        exemplo: 50,
        unidade: "nº/100 ml",
        anexo: "-",
        comentarios: "VALOR DO PARÂMETRO DE CONCENTRAÇÃO DE COLIFORMES TOTAIS."
    },
    AMA_QT_COLIFORMESFECAIS: {
        nomeColuna: "AMA_QT_COLIFORMESFECAIS",
        tipoDado: "NUMBER",
        obs: "OPC",
        exemplo: 0,
        unidade: "nº/100 ml",
        anexo: "-",
        comentarios: "VALOR DO PARÂMETRO DE CONCENTRAÇÃO DE COLIFORMES FECAIS."
    },
    AMA_QT_BICARBONATO: {
        nomeColuna: "AMA_QT_BICARBONATO",
        tipoDado: ",1",
        obs: "OPC",
        exemplo: "1,77",
        unidade: "mg/L",
        anexo: "-",
        comentarios: "VALOR DO PARÂMETRO DE AMOSTRA QUÍMICA PARA BICARBONATO (HCO3)."
    },
    AMA_QT_CALCIO: {
        nomeColuna: "AMA_QT_CALCIO",
        tipoDado: "NUMBER",
        obs: "OPC",
        exemplo: "2,145",
        unidade: "mg/L",
        anexo: "-",
        comentarios: "VALOR DO PARÂMETRO DE AMOSTRA QUÍMICA PARA CALCIO (Ca)."
    },
    AMA_QT_CARBONATO: {
        nomeColuna: "AMA_QT_CARBONATO",
        tipoDado: "NUMBER",
        obs: "OPC",
        exemplo: "0,100",
        unidade: "mg/L",
        anexo: "-",
        comentarios: "VALOR DO PARÂMETRO DE AMOSTRA QUÍMICA PARA CARBONATO (CO3)."
    },
    AMA_QT_CLORETO: {
        nomeColuna: "AMA_QT_CLORETO",
        tipoDado: "NUMBER",
        obs: "OPC",
        exemplo: "8,58",
        unidade: "mg/L",
        anexo: "-",
        comentarios: "VALOR DO PARÂMETRO DE AMOSTRA QUÍMICA PARA CLORETO (Cl)."
    },
    AMA_QT_DUREZATOTAL: {
        nomeColuna: "AMA_QT_DUREZATOTAL",
        tipoDado: "NUMBER",
        obs: "OPC",
        exemplo: "20,105",
        unidade: "mg/L",
        anexo: "-",
        comentarios: "VALOR DO PARÂMETRO DE AMOSTRA QUÍMICA PARA DUREZA TOTAL."
    },
    AMA_QT_FERROTOTAL: {
        nomeColuna: "AMA_QT_FERROTOTAL",
        tipoDado: "NUMBER",
        obs: "OPC",
        exemplo: "0,005",
        unidade: "mg/L",
        anexo: "-",
        comentarios: "VALOR DO PARÂMETRO DE AMOSTRA QUÍMICA PARA FERRO TOTAL (Fe)."
    },
    AMA_QT_FLUORETOS: {
        nomeColuna: "AMA_QT_FLUORETOS",
        tipoDado: "NUMBER",
        obs: "OPC",
        exemplo: "0,002",
        unidade: "mg/L",
        anexo: "-",
        comentarios: "VALOR DO PARÂMETRO DE AMOSTRA QUÍMICA PARA FLUORETOS (F)."
    },
    AMA_QT_NITRATOS: {
        nomeColuna: "AMA_QT_NITRATOS",
        tipoDado: "NUMBER",
        obs: "OPC",
        exemplo: "3,95",
        unidade: "mg/L",
        anexo: "-",
        comentarios: "VALOR DO PARÂMETRO DE AMOSTRA QUÍMICA PARA NITRATOS (NO3)."
    },
    AMA_QT_NITRITOS: {
        nomeColuna: "AMA_QT_NITRITOS",
        tipoDado: "NUMBER",
        obs: "OPC",
        exemplo: "0,023",
        unidade: "mg/L",
        anexo: "-",
        comentarios: "VALOR DO PARÂMETRO DE AMOSTRA QUÍMICA PARA NITRITOS (NO2)."
    },
    AMA_QT_POTASSIO: {
        nomeColuna: "AMA_QT_POTASSIO",
        tipoDado: "NUMBER",
        obs: "OPC",
        exemplo: "2,687",
        unidade: "mg/L",
        anexo: "-",
        comentarios: "VALOR DO PARÂMETRO DE AMOSTRA QUÍMICA PARA POTASSIO (K)."
    },
    AMA_QT_SODIO: {
        nomeColuna: "AMA_QT_SODIO",
        tipoDado: "NUMBER",
        obs: "OPC",
        exemplo: "5,479",
        unidade: "mg/L",
        anexo: "-",
        comentarios: "VALOR DO PARÂMETRO DE AMOSTRA QUÍMICA PARA SODIO (Na)."
    },
    AMA_QT_SULFATO: {
        nomeColuna: "AMA_QT_SULFATO",
        tipoDado: "NUMBER",
        obs: "OPC",
        exemplo: "1,53",
        unidade: "mg/L",
        anexo: "-",
        comentarios: "VALOR DO PARÂMETRO DE AMOSTRA QUÍMICA PARA SULFATO (SO4)."
    },
    AMA_QT_MAGNESIO: {
        nomeColuna: "AMA_QT_MAGNESIO",
        tipoDado: "NUMBER",
        obs: "OPC",
        exemplo: "1,569",
        unidade: "mg/L",
        anexo: "-",
        comentarios: "VALOR DO PARÂMETRO DE AMOSTRA QUÍMICA PARA MAGNÉSIO (Mg)."
    },
    INT_CD_ORIGEM: {
        nomeColuna: "INT_CD_ORIGEM",
        tipoDado: "NUMBER",
        obs: "OPC",
        exemplo: 88888,
        unidade: "-",
        anexo: "-",
        comentarios: "CÓDIGO DE IDENTIFICAÇÃO DA INTERFERÊNCIA NO SISTEMA DE ORIGEM."
    },
    INT_DS_OPCIONAL: {
        nomeColuna: "INT_DS_OPCIONAL",
        tipoDado: "VARCHAR2 (40)",
        obs: "OPC",
        exemplo: "",
        unidade: "-",
        anexo: "-",
        comentarios: "CAMPO DESCRITIVO ABERTO PARA INFORMAÇÃO COMPLEMENTAR DA INTERFERÊNCIA."
    },

    // Atributos adicionados posteriormente

    INT_CD: {
        nomeColuna: "INT_CD",
        tipoDado: "NUMBER",
        obs: "OPC",
        exemplo: 123456,
        unidade: "-",
        anexo: "-",
        comentarios: ""
    },

    INT_NU_SIAGAS: {
        nomeColuna: "INT_NU_SIAGAS",
        tipoDado: "NUMBER",
        obs: "",
        exemplo: 78455,
        unidade: "-",
        anexo: "",
        comentarios: ""
    },
    INT_NU_LATITUDE: {
        nomeColuna: "INT_NU_LATITUDE",
        tipoDado: "NUMBER (12,10)",
        obs: "",
        exemplo: "-15,631346",
        unidade: "-",
        anexo: "",
        comentarios: ""
    },
    INT_NU_LONGITUDE: {
        nomeColuna: "INT_NU_LONGITUDE",
        tipoDado: "NUMBER (12,10)",
        obs: "",
        exemplo: "-47,78455",
        unidade: "-",
        anexo: "",
        comentarios: ""
    },
    INT_NM_CORPOHIDRICOALTERADO: {
        nomeColuna: "INT_NM_CORPOHIDRICOALTERADO",
        tipoDado: "VARCHAR2",
        obs: "",
        exemplo: "Rio fazenda tizumba",
        unidade: "-",
        anexo: "",
        comentarios: ""
    },
    EMP_NM_RESPONSAVEL: {
        nomeColuna: "EMP_NM_RESPONSAVEL",
        tipoDado: "VARCHAR2 (150 BYTE)",
        obs: "OBR",
        exemplo: "Nome Sobrenome",
        unidade: "-",
        anexo: "-",
        comentarios: "CAMPO DESCRITIVO QUE REPRESENTA O NOME DO USUÁRIO (OU RAZÃO SOCIAL) DE RECURSOS HÍDRICOS."
    },
    OUT_DT_OUTORGAFINAL: {
        nomeColuna: "OUT_DT_OUTORGAFINAL",
        tipoDado: "DATE",
        obs: "OBR",
        exemplo: "01/04/2015",
        unidade: "-",
        anexo: "-",
        comentarios: "CAMPO DESCRITIVO QUE REPRESENTA A DATA DE TÉRMINO DO PRAZO DE OUTORGA."
    },
    OUT_DT_OUTORGAINICIAL: {
        nomeColuna: "OUT_DT_OUTORGAINICIAL",
        tipoDado: "DATE",
        obs: "OBR",
        exemplo: "01/04/2000",
        unidade: "-",
        anexo: "-",
        comentarios: "CAMPO DESCRITIVO QUE REPRESENTA A DATA DE INÍCIO DO PRAZO DE OUTORGA."
    },
    DAD_QT_VAZAODIAJAN: {
        nomeColuna: "DAD_QT_VAZAODIAJAN",
        tipoDado: "NUMBER",
        obs: "OBR",
        exemplo: "30,5",
        unidade: "m³/h",
        anexo: "-",
        comentarios: "CAMPO NÚMERICO QUE REPRESENTA A QUANTIDADE DE VAZÃO PARA O MÊS DE JANEIRO. SE INT_TIN_CD = 3 OU 4 ESTE CAMPO NÃO SERÁ OBRIGATÓRIO."
      },
      DAD_QT_VAZAODIAFEV: {
        nomeColuna: "DAD_QT_VAZAODIAFEV",
        tipoDado: "NUMBER",
        obs: "OBR",
        exemplo: "30,5",
        unidade: "m³/h",
        anexo: "-",
        comentarios: "CAMPO NÚMERICO QUE REPRESENTA A QUANTIDADE DE VAZÃO PARA O MÊS DE FEVEREIRO. SE INT_TIN_CD = 3 OU 4 ESTE CAMPO NÃO SERÁ OBRIGATÓRIO."
      },
      DAD_QT_VAZAODIAMAR: {
        nomeColuna: "DAD_QT_VAZAODIAMAR",
        tipoDado: "NUMBER",
        obs: "OBR",
        exemplo: "30,5",
        unidade: "m³/h",
        anexo: "-",
        comentarios: "CAMPO NÚMERICO QUE REPRESENTA A QUANTIDADE DE VAZÃO PARA O MÊS DE MARÇO. SE INT_TIN_CD = 3 OU 4 ESTE CAMPO NÃO SERÁ OBRIGATÓRIO."
      },
      DAD_QT_VAZAODIAABR: {
        nomeColuna: "DAD_QT_VAZAODIAABR",
        tipoDado: "NUMBER",
        obs: "OBR",
        exemplo: "30,5",
        unidade: "m³/h",
        anexo: "-",
        comentarios: "CAMPO NÚMERICO QUE REPRESENTA A QUANTIDADE DE VAZÃO PARA O MÊS DE ABRIL. SE INT_TIN_CD = 3 OU 4 ESTE CAMPO NÃO SERÁ OBRIGATÓRIO."
      },
      DAD_QT_VAZAODIAMAI: {
        nomeColuna: "DAD_QT_VAZAODIAMAI",
        tipoDado: "NUMBER",
        obs: "OBR",
        exemplo: "30,5",
        unidade: "m³/h",
        anexo: "-",
        comentarios: "CAMPO NÚMERICO QUE REPRESENTA A QUANTIDADE DE VAZÃO PARA O MÊS DE MAIO. SE INT_TIN_CD = 3 OU 4 ESTE CAMPO NÃO SERÁ OBRIGATÓRIO."
      },
      DAD_QT_VAZAODIAJUN: {
        nomeColuna: "DAD_QT_VAZAODIAJUN",
        tipoDado: "NUMBER",
        obs: "OBR",
        exemplo: "30,5",
        unidade: "m³/h",
        anexo: "-",
        comentarios: "CAMPO NÚMERICO QUE REPRESENTA A QUANTIDADE DE VAZÃO PARA O MÊS DE JUNHO. SE INT_TIN_CD = 3 OU 4 ESTE CAMPO NÃO SERÁ OBRIGATÓRIO."
      },
      DAD_QT_VAZAODIAJUL: {
        nomeColuna: "DAD_QT_VAZAODIAJUL",
        tipoDado: "NUMBER",
        obs: "OBR",
        exemplo: "30,5",
        unidade: "m³/h",
        anexo: "-",
        comentarios: "CAMPO NÚMERICO QUE REPRESENTA A QUANTIDADE DE VAZÃO PARA O MÊS DE JULHO. SE INT_TIN_CD = 3 OU 4 ESTE CAMPO NÃO SERÁ OBRIGATÓRIO."
      },
      DAD_QT_VAZAODIAAGO: {
        nomeColuna: "DAD_QT_VAZAODIAAGO",
        tipoDado: "NUMBER",
        obs: "OBR",
        exemplo: "30,5",
        unidade: "m³/h",
        anexo: "-",
        comentarios: "CAMPO NÚMERICO QUE REPRESENTA A QUANTIDADE DE VAZÃO PARA O MÊS DE AGOSTO. SE INT_TIN_CD = 3 OU 4 ESTE CAMPO NÃO SERÁ OBRIGATÓRIO."
      },
      DAD_QT_VAZAODIASET: {
        nomeColuna: "DAD_QT_VAZAODIASET",
        tipoDado: "NUMBER",
        obs: "OBR",
        exemplo: "30,5",
        unidade: "m³/h",
        anexo: "-",
        comentarios: "CAMPO NÚMERICO QUE REPRESENTA A QUANTIDADE DE VAZÃO PARA O MÊS DE SETEMBRO. SE INT_TIN_CD = 3 OU 4 ESTE CAMPO NÃO SERÁ OBRIGATÓRIO."
      },
      DAD_QT_VAZAODIAOUT: {
        nomeColuna: "DAD_QT_VAZAODIAOUT",
        tipoDado: "NUMBER",
        obs: "OBR",
        exemplo: "30,5",
        unidade: "m³/h",
        anexo: "-",
        comentarios: "CAMPO NÚMERICO QUE REPRESENTA A QUANTIDADE DE VAZÃO PARA O MÊS DE OUTUBRO. SE INT_TIN_CD = 3 OU 4 ESTE CAMPO NÃO SERÁ OBRIGATÓRIO."
      },
      DAD_QT_VAZAODIANOV: {
        nomeColuna: "DAD_QT_VAZAODIANOV",
        tipoDado: "NUMBER",
        obs: "OBR",
        exemplo: "30,5",
        unidade: "m³/h",
        anexo: "-",
        comentarios: "CAMPO NÚMERICO QUE REPRESENTA A QUANTIDADE DE VAZÃO PARA O MÊS DE NOVEMBRO. SE INT_TIN_CD = 3 OU 4 ESTE CAMPO NÃO SERÁ OBRIGATÓRIO."
      },
      DAD_QT_VAZAODIADEZ: {
        nomeColuna: "DAD_QT_VAZAODIADEZ",
        tipoDado: "NUMBER",
        obs: "OBR",
        exemplo: "30,5",
        unidade: "m³/h",
        anexo: "-",
        comentarios: "CAMPO NÚMERICO QUE REPRESENTA A QUANTIDADE DE VAZÃO PARA O MÊS DE DEZEMBRO. SE INT_TIN_CD = 3 OU 4 ESTE CAMPO NÃO SERÁ OBRIGATÓRIO."
      }

}

// Encontrar o objeto com nomeColuna = "INT_TIN_CD"
//const objetoEncontrado = Object.values(dictionary).find(item => item.nomeColuna === "INT_TIN_CD");

// Exibir o objeto encontrado
//console.log('encontrado: ', objetoEncontrado);

// node backend/tests/dictionary.js


module.exports = dictionary;