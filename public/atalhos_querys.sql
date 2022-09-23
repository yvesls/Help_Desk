/* manipulando controle de tempo: */
select current_date; /* retorna a data atual */
select year(now()) /* select o ano atual */
select year(curdate() as ano_atual); /* select o ano atual e o nomeia */
select month(current_date) as mes_atual; /* select o mes atual e o nomeia */
select day(CURRENT_TIMESTAMP) as dia_atual; /* select o dia atual e o nomeia */
select datediff('2021-03-12', '2020-03-12'); /* retorna a diferença em dias entre as datas */
select timestampdiff(year, '1999-11-22', CURRENT_DATE) as idade; /* retorna a idade da pessoa OBS: primeiro 
parâmetro retorna o tipo de contagem, se é em ano, mes, dia... etc*/
ALTER TABLE <nome_da_tabela> ADD <nome_do_campo> <tipo_do_campo>; /* inserindo coluna dentro de uma tabela ja existente */
