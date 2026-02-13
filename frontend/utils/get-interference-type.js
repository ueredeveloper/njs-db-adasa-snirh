const getInterferenceType = (INT_TIN_CD, INT_TSU_CD) => {

    /* 
    this.tables = [
            { class: 'list-snirh', id: 'list-snirh-sub', tipo: '1', subtipo: '2' },
            { class: 'list-snirh hidden', id: 'list-snirh-sup', tipo: '1', subtipo: '1' },
            { class: 'list-snirh hidden', id: 'list-snirh-lan', tipo: '2', subtipo: '1' },
            { class: 'list-snirh hidden', id: 'list-snirh-bar', tipo: '3', subtipo: '1' }
        ];
        */

    /*
     Tabela tipo interferência
        1 - Superficial;
        2 - Subterrânea
        3 - Lançamento de Águas Pluviais
        4 - Lançamento de Efluentes
        5 - Barragem
        6 - Caminhão Pipa
        
        */

    switch ([INT_TIN_CD, INT_TSU_CD].join('')) {
        case "11":
            return 1; // Interferência do tipo 1 (Superficial)
        case "12":
            return 2; // Interferência do tipo 2 (Subterrânea)
        case "21":
            return 3; // Interferência do tipo 3 (Lançamento)
        case "31":
            return 5; // Interferência do tipo 5 (Barragem)
        default:
            return null; // Outro tipo de interferência
    }
}

export { getInterferenceType }
