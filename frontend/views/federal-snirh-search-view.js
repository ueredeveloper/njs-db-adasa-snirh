import snirhParams from "../shared/snirh-params";

const TopHandlersSnirhSearch = () => {

    const $this = $(this); // Store reference to $(this)

    $this.params = snirhParams.getSnirhParams();

    // Estado
    $(document).ready(function () {
        $('#sl-state').change(function () {
            var selectedValue = $(this).val();

            console.log($this.params)

            $this.params = { ...$this.params, uf: selectedValue }

            $(document).trigger('searchSnirhChanged', $this.params);
        });

        $('#sl-initial-date').change(function () {
            var selectedDate = $(this).val();
            // converte data para formato snirh: 20170101000000 - Refere-se a data 01/01/2017 00:00, formato: yyyyMMddHHmm
            $this.params = { ...$this.params, dataInicio: selectedDate.replaceAll('-', '') + '000000' }

            
            $(document).trigger('searchSnirhChanged', $this.params);
        });

        $('#sl-final-date').change(function () {
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

        $('#sl-situcao-processo').change(function () {
            var selectedValue = $(this).val();
            $this.params = { ...$this.params, idSituacaoOutorga: selectedValue }
            $(document).trigger('searchSnirhChanged', $this.params);
        });
        $('#sl-finalidade-interferencia').change(function () {
            var selectedValue = $(this).val();
            $this.params = { ...$this.params, idFinalidade: selectedValue }

            console.log( $this.params)
            $(document).trigger('searchSnirhChanged', $this.params);
        });

    });

    return `
        <div class="flex flex-1 my-2 ">
        <div class="flex flex-1 flex-col">
            <label for="state">Estado</label>
            <select class="w-32" name="state" id="sl-state">
                <option value="DF">DF</option>
                <option value="SP">SP</option>
            </select>
        </div>
        <div class="flex flex-1 flex-col">
            <label for="sl-initial-date">Início</label>
            <input type="date" id="sl-initial-date" name="sl-initial-date" class="w-32">
        </div>
        <div class="flex flex-1 flex-col">
            <label for="sl-initial-date">Fim</label>
            <input type="date" id="sl-final-date" name="sl-final-date" class="w-32">
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
            <label for="sl-situcao-processo">Situação Outorga</label>
            <select name="sl-situcao-processo" id="sl-situcao-processo" class="w-32">
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
            <label for="sl-finalidade-interferencia">Finalidade</label>
            <select id="sl-finalidade-interferencia" name="sl-finalidade-interferencia" class="w-60">
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