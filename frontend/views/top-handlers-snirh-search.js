const TopHandlersSnirhSearch = () => {

    return `
        <div class="flex flex-1 justify-center my-2">
            <label for="estado">Estado:</label>
            <select class="w-12 mx-5" name="estado" id="sl-estado">
                <option value="df">DF</option>
            </select>
            <label for="initial-date">Início:</label>
            <input type="date" id="initil-date" name="initial-date" class="mx-10">
            <label for="initial-date">Fim:</label>
            <input type="date" id="final-date" name="final-date" class="mx-10">
            <label for="cars">Dominialidade:</label>
            <select name="dom-1" id="dom-1" class="mx-10">
                <option value="fed-0">0 - Federal</option>
                <option value="est-1">1 - Estadual</option>
            </select>
            </div>
            <div class="flex flex-1 justify-center my-2">

            <label for="tipo">Tipo Outorga:</label>
            <select name="tipo" class="mx-10">
                <option value="1">Captação</option>
                <option value="2">Lançamento</option>
                <option value="3">Barragem</option>
                <option value="4">Ponto de Referência</option>
            </select>
            <label for="situacao">Situação Outorga:</label>
            <select name="situacao" class="mx-10">
                <option value="1">Outorgado</option>
                <option value="2">Não Outorgável</option>
                <option value="4">Uso Insignificante</option>
                <option value="5">Indeferido</option>
                <option value="6">Inválido</option>
                <option value="7">Análise Concluída (Regla)</option>
                <option value="8">Autorizado</option>
                <option value="99">Outra</option>
            </select>
        </div>
    `;
}

export default TopHandlersSnirhSearch;