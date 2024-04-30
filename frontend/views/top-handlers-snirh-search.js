const TopHandlersSnirhSearch = () => {

    const $this = $(this); // Store reference to $(this)

    $this.params = {
        "uf": "DF",
        "dataInicio": "20180101000000",
        "dataFim": "20250101000000",
        "idDominialidade": "1",
        "idTipoOutorga": "1",
        "idSituacaoOutorga": "1",
        "idFinalidade": "1",
        "pagina": 1,
        "tamanhoPagina": 10000
    }

    // Estado
    $(document).ready(function () {
        $('#sl-estado').change(function () {
            var selectedValue = $(this).val();

            $this.params = { ...$this.params, uf: selectedValue }

            $(document).trigger('searchSnirhChanged', $this.params);
        });

        $('#slInitialDate').change(function () {
            var selectedDate = $(this).val();
            // converte data para formato snirh: 20170101000000 - Refere-se a data 01/01/2017 00:00, formato: yyyyMMddHHmm
            $this.params = { ...$this.params, dataInicio: selectedDate.replaceAll('-', '') + '000000' }

            
            $(document).trigger('searchSnirhChanged', $this.params);
        });

        $('#slfinalDate').change(function () {
            var selectedDate = $(this).val();
            // converte data para formato snirh: 20170101000000 - Refere-se a data 01/01/2017 00:00, formato: yyyyMMddHHmm
            $this.params = { ...$this.params, dataFim: selectedDate.replaceAll('-', '') + '000000' }
            $(document).trigger('searchSnirhChanged', $this.params);
        });

        $('#sl-dominialidade').change(function () {
            var selectedValue = $(this).val();
            $this.params = { ...$this.params, idDominialidade: selectedValue }
            $(document).trigger('searchSnirhChanged', $this.params);
        });

        $('#sl-tipo').change(function () {
            var selectedValue = $(this).val();
            $this.params = { ...$this.params, idTipoOutorga: selectedValue }
            $(document).trigger('searchSnirhChanged', $this.params);
        });

        $('#slSituacao').change(function () {
            var selectedValue = $(this).val();
            $this.params = { ...$this.params, idSituacaoOutorga: selectedValue }
            $(document).trigger('searchSnirhChanged', $this.params);
        });
        $('#slFinalidade').change(function () {
            var selectedValue = $(this).val();
            $this.params = { ...$this.params, idFinalidade: selectedValue }
            $(document).trigger('searchSnirhChanged', $this.params);
        });

    });

    return `
        <div class="flex flex-1 my-2 ">

            <div class="flex flex-1 flex-col">
            <label for="estado">Estado</label>
            <select class="w-32" name="estado" id="sl-estado">
                <option value="DF">DF</option>
                <option value="SP">SP</option>
            </select>
            </div>

            <div class="flex flex-1 flex-col">
            <label for="slInitialDate">Início</label>
            <input type="date" id="slInitialDate" name="slInitialDate" class="w-32">
            </div>
            <div class="flex flex-1 flex-col">
            <label for="slInitialDate">Fim</label>
            <input type="date" id="slfinalDate" name="slfinalDate" class="w-32">
            </div>

        </div>

        <div class="flex flex-1 my-2">
  
                <div class="flex flex-1 flex-col">
                <label for="cars">Dominialidade</label>
                <select name="sl-dominialidade" id="sl-dominialidade" class="w-32">
                    <option value="0">0 - Federal</option>
                    <option value="1">1 - Estadual</option>
                </select>
                </div>

                <div class="flex flex-1 flex-col">
                    <label for="sl-tipo">Tipo de Outorga</label>
                    <select name="sl-tipo" id="sl-tipo" class="w-32">
                        <option value="1">Captação</option>
                        <option value="2">Lançamento</option>
                        <option value="3">Barragem</option>
                        <option value="4">Ponto de Referência</option>
                    </select>
                </div>

                <div class="flex flex-1 flex-col">
                <label for="slSituacao">Situação Outorga</label>
                <select name="slSituacao" id="slSituacao" class="w-32">
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

                <div class="flex flex-1 flex-col">
                <label for="slFinalidade">Finalidade</label>
                <select id="slFinalidade" name="slFinalidade" class="w-60">
                    <option value="0">Sem Finalidade</option>
                    <option value="1">Abastecimento Público</option>
                    <option value="2">Esgotamento Sanitário</option>
                    <option value="3">Indústria</option>
                    <option value="4">Mineração - Extração de Areia/Cascalho em Leito de Rio</option>
                    <option value="5">Irrigação</option>
                    <option value="6">Criação Animal</option>
                    <option value="7">Aquicultura em Tanque Escavado</option>
                    <option value="8">Termoelétrica</option>
                    <option value="9">Transposição</option>
                    <option value="10">Aproveitamento Hidroelétrico</option>
                    <option value="11">Reservatório/Barramento/Regularização de Vazões para Usos Múltiplos</option>
                    <option value="12">Consumo Humano</option>
                    <option value="13">Mineração - Outros Processos Extrativos</option>
                    <option value="14">Barramento</option>
                    <option value="15">Obras Hidráulicas</option>
                    <option value="16">Serviços</option>
                    <option value="18">Aquicultura em Tanque Rede</option>
                    <option value="99">Outras</option>
                </select>
                </div>

        </div>
    `;
}

export default TopHandlersSnirhSearch;