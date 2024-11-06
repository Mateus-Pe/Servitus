import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }

  dias = [
    { 'id': 1, 'name': 'Segunda', 'name_caps' : 'SEGUNDA', 'name_small' : 'Seg'},
    { 'id': 2, 'name': 'Terça', 'name_caps' : 'TERÇA', 'name_small' : 'Ter' },
    { 'id': 3, 'name': 'Quarta', 'name_caps' : 'QUARTA', 'name_small' : 'Qua' },
    { 'id': 4, 'name': 'Quinta', 'name_caps' : 'QUINTA', 'name_small' : 'Qui' },
    { 'id': 5, 'name': 'Sexta', 'name_caps' : 'SEXTA', 'name_small' : 'Sex' },
    { 'id': 6, 'name': 'Sábado', 'name_caps' : 'SÁBADO', 'name_small' : 'Sab' },
    { 'id': 0, 'name': 'Domingo', 'name_caps' : 'DOMINGO', 'name_small' : 'Dom' },
  ];

  months = [
      { 'id': 1, 'name': 'Janeiro', 'name_small' : 'JAN' },
      { 'id': 2, 'name': 'Fevereiro', 'name_small' : 'FEV' },
      { 'id': 3, 'name': 'Março', 'name_small' : 'MAR' },
      { 'id': 4, 'name': 'Abril', 'name_small' : 'ABR' },
      { 'id': 5, 'name': 'Maio', 'name_small' : 'MAI' },
      { 'id': 6, 'name': 'Junho', 'name_small' : 'JUN' },
      { 'id': 7, 'name': 'Julho', 'name_small' : 'JUL' },
      { 'id': 8, 'name': 'Agosto', 'name_small' : 'AGO' },
      { 'id': 9, 'name': 'Setembro', 'name_small' : 'SET' },
      { 'id': 10, 'name': 'Outubro', 'name_small' : 'OUT' },
      { 'id': 11, 'name': 'Novembro', 'name_small' : 'NOV' },
      { 'id': 12, 'name': 'Dezembro', 'name_small' : 'DEZ' },
  ];

  formata_hora_extenso(data: string){
    let dataHora = data.split(' ');
    //var data =  window.sessionStorage.getItem('data_referencia');
    let hashdata = dataHora[1].split(":");
    let H = hashdata[0];
    let m = hashdata[1];

    if(m == '00'){
        m = '';
    }
    let strHora = H +'h'+ m;
    return strHora;
  }

  formata_dia_extenso(data: string): string {
    // Divida a data e hora
    let dataHora = data.split(' ');
    let hashdata = dataHora[0].split("-");
  
    // Extração do ano, mês e dia
    let ano: number = Number(hashdata[0]);
    let mes: number = Number(hashdata[1]);
    let D: number = Number(hashdata[2]);
  
    // Obtenção da data atual
    let hoje = new Date();
    let S = new Date(ano, mes - 1, D).getUTCDay(); // Obtém o dia da semana
    let date_ref = new Date(ano, mes - 1, D);
    
    // Calcular a diferença de dias
    let diff = date_ref.getTime() - hoje.getTime();
    let diff_days = diff / 1000 / 60 / 60 / 24;
  
    // Obter o nome do dia e do mês
    let diaName = this.dias.find(x => x.id === S)?.name || ''; // Verifique se existe o dia
    let mesName = this.months.find(x => x.id === mes)?.name || ''; // Verifique se existe o mês
  
    // Inicialização da variável strDia
    let strDia = "";
  
    // Condicional para mostrar 'Hoje', 'Amanhã' ou o nome do dia
    if (Math.floor(diff_days) < 7) {
      if (Math.floor(diff_days) < 2) {
        if (D === hoje.getDate()) {
          strDia = 'Hoje';
        } else if (D === hoje.getDate() + 1) {
          strDia = 'Amanhã';
        } else {
          strDia = diaName;
        }
      } else {
        strDia = diaName;
      }
    }
  
    // Adiciona o zero à esquerda se o dia for menor que 10
    if (D < 10) {
      D = Number('0' + D);
    }
  
    // Se não foi atribuído um nome ao dia, usa o formato "dd de Mês"
    if (strDia === "") {
      strDia = `${D} de ${mesName}`;
    }
  
    return strDia;
  }


  /**
 * 
  * @param t exemplo: HH:mm, s exemplo: h, :, -
  * @returns exemplo: 19:30 ou, 19h30 
  */
 
 
  timeFormat(t: string, s: string, withMinute: boolean): string {
    let hashTime = t.split(":");
    let H: number = Number(hashTime[0]); // Hora convertida para número
    let m: number = Number(hashTime[1]); // Minuto convertido para número

    // Se a flag withMinute for verdadeira, retorna a hora e os minutos
    if (withMinute) {
        return `${H}${s}${m}`;
    } else {
        // Se não quiser mostrar os minutos e minutos forem '00', retorna só a hora
        if (m === 0) { // Comparando com o número 0
            return `${H}${s}`;
        } else {
            return `${H}${s}${m}`;
        }
    }
  }


  /**
 * 
 * @param d exemplo: YYYY-MM-DD 
 * @returns exemplo: HOJE, AMANHÃ ou dia especificado
 */

  dateText(d: string): string {
    const hashDate = d.split('-');
    let Y: number = Number(hashDate[0]);
    let M: number = Number(hashDate[1]);
    let D: number | string = Number(hashDate[2]);
    
    const today = new Date();
    const S: number = new Date(Y, M - 1, D).getUTCDay();
    const ref = new Date(Y, M - 1, D);
    const diff = ref.getTime() - today.getTime(); // Em milissegundos
    const diff_days = diff / (1000 * 60 * 60 * 24); // Diferença em dias
  
    const dayName = this.dias.find(x => x.id === S)?.name_caps || '';  // Verifica se dayName existe
    const monthName = this.months.find(x => x.id === M)?.name_small || '';  // Verifica se monthName existe
  
    let ret = "";
  
    if (Math.floor(diff_days) < 7) {
      if (Math.floor(diff_days) < 2) {
        if (D === today.getDate()) {
          ret = 'HOJE';
        } else if (D === today.getDate() + 1) {
          ret = 'AMANHÃ';
        } else {
          ret = dayName;
        }
      } else {
        ret = dayName;
      }
    }
  
    if (D < 10) {
      D = '0' + D;
    }
  
    if (!ret) {
      ret = `${D}/${M < 10 ? '0' + M : M}`; // Formata o mês com dois dígitos, se necessário
    }
  
    return ret;
  }


  /**
 * 
 * @param d exemplo: YYYY-MM-DD HH:mm
 * @returns exemplo: {date: YYYY-MM-DD, time: HH:mm}
 */

  splitDateTime(d: string): { date: string, time: string } {
    const hashDateTime = d.split(' ');
  
    // Verifica se a string possui a parte de data e hora
    if (hashDateTime.length < 2) {
      throw new Error('Formato de data e hora inválido');
    }
  
    const arrDateTime = {
      date: hashDateTime[0],
      time: hashDateTime[1]
    };
  
    return arrDateTime;
  }


  splitHourMinute(t: string): { hour: string, minute: string } {
    const hashTime = t.split(':');
  
    // Verifica se o horário tem o formato esperado
    if (hashTime.length !== 2) {
      throw new Error('Formato de hora inválido');
    }
  
    const arrTime = {
      hour: hashTime[0],
      minute: hashTime[1]
    };
  
    return arrTime;
  }


  removerUf(cidadeUf: string): string {
    // Verifica se a string termina com " - XX"
    const regex = / - [A-Z]{2}$/;
    
    // Se a regex encontrar uma correspondência, remove a UF
    if (regex.test(cidadeUf)) {
      return cidadeUf.replace(regex, '');
    }
  
    return cidadeUf;
  }


  upperText(t: string): string{
    return t.toUpperCase();
  }

}
