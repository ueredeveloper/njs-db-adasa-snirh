//import { fetchSubterraneo } from "../services/fetchSubterraneo";

const SubterraneaModel = {
    subterranea: {
        "INT_TIN_CD": 1,
        "INT_TSU_CD": 2,
        "INT_TSI_CD": "",
        "INT_CR_LATITUDE": "-15,856013",
        "INT_CR_LONGITUDE": "-47,884798",
    },
    list:[],

    listSubterraneas: async function () {
        

        const data = {
            "recordsets": [
                [
                    {
                        "INT_TIN_CD": 1,
                        "INT_TSU_CD": 2,
                        "INT_TSI_CD": "",
                        "INT_CR_LATITUDE": "-15,856013",
                        "INT_CR_LONGITUDE": "-47,884798",
                        "ING_NU_IBGEMUNICIPIO": 5300108,
                        "EMP_NM_EMPREENDIMENTO": "SHIS QI 05, CHACARA Nº 52",
                        "EMP_NU_CPFCNPJ": "#06854566153",
                        "EMP_NM_USUARIO": "PAULO JORGE TIRO DE LIMA",
                        "EMP_DS_EMAILRESPONSAVEL": "naoinformado@gmail.com.br",
                        "EMP_NU_CEPENDERECO": "71600570",
                        "EMP_DS_LOGRADOURO": "SHIS QI 555, Chacara nº 52",
                        "EMP_DS_COMPLEMENTOENDERECO": ""
                    },
                    {
                        "INT_TIN_CD": 2,
                        "INT_TSU_CD": 3,
                        "INT_TSI_CD": "",
                        "INT_CR_LATITUDE": "-15,767613",
                        "INT_CR_LONGITUDE": "-47,666798",
                        "ING_NU_IBGEMUNICIPIO": 5305550108,
                        "EMP_NM_EMPREENDIMENTO": "SHIS Q5555 CHACARA Nº 52",
                        "EMP_NU_CPFCNPJ": "#06863426153",
                        "EMP_NM_USUARIO": "PAULO SJJJJA DE LIMA",
                        "EMP_DS_EMAILRESPONSAVEL": "naoinformado@gmail.com.br",
                        "EMP_NU_CEPENDERECO": "71600570",
                        "EMP_DS_LOGRADOURO": "SHIS QI 90, Chacara nº 52",
                        "EMP_DS_COMPLEMENTOENDERECO": ""
                    },
                    // Additional objects for simulation
                    {
                        "INT_TIN_CD": 3,
                        "INT_TSU_CD": 4,
                        "INT_TSI_CD": "",
                        "INT_CR_LATITUDE": "-15.123456",
                        "INT_CR_LONGITUDE": "-47.654321",
                        "ING_NU_IBGEMUNICIPIO": 5300203,
                        "EMP_NM_EMPREENDIMENTO": "Example Business Park",
                        "EMP_NU_CPFCNPJ": "#12345678901",
                        "EMP_NM_USUARIO": "John Doe",
                        "EMP_DS_EMAILRESPONSAVEL": "johndoe@example.com",
                        "EMP_NU_CEPENDERECO": "12345678",
                        "EMP_DS_LOGRADOURO": "123 Example Street",
                        "EMP_DS_COMPLEMENTOENDERECO": "Floor 5"
                    },
                    {
                        "INT_TIN_CD": 4,
                        "INT_TSU_CD": 5,
                        "INT_TSI_CD": "",
                        "INT_CR_LATITUDE": "-15.987654",
                        "INT_CR_LONGITUDE": "-47.123456",
                        "ING_NU_IBGEMUNICIPIO": 5300108,
                        "EMP_NM_EMPREENDIMENTO": "Central Park",
                        "EMP_NU_CPFCNPJ": "#98765432101",
                        "EMP_NM_USUARIO": "Alice Smith",
                        "EMP_DS_EMAILRESPONSAVEL": "alicesmith@example.com",
                        "EMP_NU_CEPENDERECO": "87654321",
                        "EMP_DS_LOGRADOURO": "456 Park Avenue",
                        "EMP_DS_COMPLEMENTOENDERECO": "Suite 200"
                    },
                    {
                        "INT_TIN_CD": 5,
                        "INT_TSU_CD": 6,
                        "INT_TSI_CD": "",
                        "INT_CR_LATITUDE": "-15.246801",
                        "INT_CR_LONGITUDE": "-47.135790",
                        "ING_NU_IBGEMUNICIPIO": 5300501,
                        "EMP_NM_EMPREENDIMENTO": "Ocean View Resort",
                        "EMP_NU_CPFCNPJ": "#55566677788",
                        "EMP_NM_USUARIO": "Emily Johnson",
                        "EMP_DS_EMAILRESPONSAVEL": "emilyjohnson@example.com",
                        "EMP_NU_CEPENDERECO": "13579246",
                        "EMP_DS_LOGRADOURO": "789 Beach Road",
                        "EMP_DS_COMPLEMENTOENDERECO": "Suite 100"
                    },
                    {
                        "INT_TIN_CD": 6,
                        "INT_TSU_CD": 7,
                        "INT_TSI_CD": "",
                        "INT_CR_LATITUDE": "-15.987654",
                        "INT_CR_LONGITUDE": "-47.123456",
                        "ING_NU_IBGEMUNICIPIO": 5300108,
                        "EMP_NM_EMPREENDIMENTO": "Tech Hub",
                        "EMP_NU_CPFCNPJ": "#12312312312",
                        "EMP_NM_USUARIO": "Michael Brown",
                        "EMP_DS_EMAILRESPONSAVEL": "michaelbrown@example.com",
                        "EMP_NU_CEPENDERECO": "98765432",
                        "EMP_DS_LOGRADOURO": "123 Tech Street",
                        "EMP_DS_COMPLEMENTOENDERECO": "Floor 10"
                    }
                ]
            ]
        };
        
        console.log(data);
        

        return data.recordsets[0];

        //let subterraneas = await fetchSubterraneo();

       // return subterraneas.recordset;

    }
}

export default SubterraneaModel;