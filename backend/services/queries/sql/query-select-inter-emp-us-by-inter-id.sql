
/**
Seleciona interferência, endereço e usuário pelo id da interferência
*/

use SRH;
select 
	_int.ID_TIPO_INTERFERENCIA,
	_emp.[ENDERECO],
	_us.[NOME]
	from [gisadmin].[INTERFERENCIA] _int 
	join [gisadmin].[EMPREENDIMENTO] _emp on _emp.[ID_EMPREENDIMENTO] = _int.[ID_EMPREENDIMENTO]
	join [gisadmin].[USUARIO] _us on _us.[ID_USUARIO] = _emp.[ID_USUARIO]
where _int.[ID_INTERFERENCIA] = 1511