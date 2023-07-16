import React from 'react'
import cl from '../css/accountBound.module.scss';
import BanPlate from './BanPlate.jsx';
import { ReactComponent as AccICON} from '../assets/profile.svg';
import { ReactComponent as ReputationICON} from '../assets/rep_up.svg';
import { ReactComponent as DonateICON} from '../assets/currencyDonate.svg';
import { ReactComponent as CurrencyICON} from '../assets/currencyInGame.svg';

const nameOfGrops = {
  army : `ОКСОП`,
  bandit : `Бандит`,
  dolg : `Долг`,
  freedom : `Свобода`,
  grex : `Грех`,
  inkv : `Адская Инквизиция`,
  isg : `ИИГ`,
  loners : `Одиночка`,
  mercernary : `Наемник`,
  mithril : `Мифрил`,
  monolit : `Монолит`,
  scientist : `НИИГ`,
  screntist_guards : `ОНИГ`,
  zavet : `Завет`
}

function convertUnixData(UNIX_timestamp){
  var a = new Date(UNIX_timestamp * 1000);
  var year = a.getFullYear();
  var month = a.getMonth();
  var date = a.getDate();
  var hour = a.getHours();
  var min = a.getMinutes();
  var sec = a.getSeconds();
  var time = hour + ':' + min + ':' + sec +' '+ date + '.' + month + '.' + year ;
  return time;
}



function timeConverter(UNIX_timestamp){
  var a = new Date(UNIX_timestamp * 1000);
  return a;
}

var DateDiff = {

    inDays: function(d1, d2) {
        var t2 = d2.getTime();
        var t1 = d1.getTime();

        return Math.floor((t2-t1)/(24*3600*1000));
    },

    inWeeks: function(d1, d2) {
        var t2 = d2.getTime();
        var t1 = d1.getTime();

        return parseInt((t2-t1)/(24*3600*1000*7));
    },

    inMonths: function(d1, d2) {
        var d1Y = d1.getFullYear();
        var d2Y = d2.getFullYear();
        var d1M = d1.getMonth();
        var d2M = d2.getMonth();

        return (d2M+12*d2Y)-(d1M+12*d1Y);
    },

    inYears: function(d1, d2) {
        return d2.getFullYear()-d1.getFullYear();
    }
}

function timeConverterCheck(nowData, regData){
  if (DateDiff.inYears(regData, nowData) === 0) {
    if (DateDiff.inMonths(regData, nowData) === 0) {
      if (DateDiff.inWeeks(regData, nowData) === 0) {
        if (DateDiff.inDays(regData, nowData) === 0) {
          return { number : DateDiff.inDays(regData, nowData), convstabel : ['день', 'дня', 'дней'] }
        } else {
          return { number : DateDiff.inDays(regData, nowData), convstabel : ['день', 'дня', 'дней'] }
        }
      } else {
        return { number : DateDiff.inWeeks(regData, nowData), convstabel: ['неделя', 'недели', 'недель'] }
      }
    } else {
      return { number : DateDiff.inMonths(regData, nowData), convstabel : ['месяц', 'месяця', 'месяцев'] }
    }
  } else {
    return { number : DateDiff.inYears(regData, nowData), convstabel : ['год', 'года', 'лет'] }
  }
}

function declOfNum(n, text_forms) {
    n = Math.abs(n) % 100;
    var n1 = n % 10;
    if (n > 10 && n < 20) { return text_forms[2]; }
    if (n1 > 1 && n1 < 5) { return text_forms[1]; }
    if (n1 == 1) { return text_forms[0]; }
    return text_forms[2];
}

function secondsToHms(seconds) {
  var days     = Math.floor(seconds / (24*60*60));
      seconds -= days    * (24*60*60);
  var hours    = Math.floor(seconds / (60*60));
      seconds -= hours   * (60*60);
  var minutes  = Math.floor(seconds / (60));
      seconds -= minutes * (60);
  return ((0<days)?(days+declOfNum(days, ['день', 'дня', 'дней'])):"") + ' ' + hours + ' ' + declOfNum(hours, ['час', 'часа', 'часов'])+ ' ' +minutes+ ' ' + declOfNum(minutes, ['минута', 'минуты', 'минут'])+ ' ' +seconds+' '+declOfNum(seconds, ['секунда', 'секунды', 'секунд']);

}


const AccountBound = (props) => {
  if (props.userStalker !== null) {
    var characters = props.userStalker.ix_characters;
    var stats = props.userStalker.ix_stats;
    var info = props.userStalker.ix_players;
    var bans = props.userStalker.ix_bans;
    var ulx = props.userStalker.ix_ulx;
    var charData = characters.data;
    var nowData = new Date()
    var regData = timeConverter(characters.create_time)

  }

  const formatter = new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
  });

  function UlxGroup() {
    if (ulx) {
      return <p className={cl.admin}>{ulx.group}</p>
    }
    return 'user'
  }
  if (characters) {
    return (
      
      <ul>
        <label className = {cl.profile}>
          <BanPlate {...props}/>
          <div className = {cl.profile__container}>
            <div className = {cl.charContainer}>
              <label className={cl.container_charName}>
                <span className= {cl.charName_header}>Никнейм в игре</span>
                <span className={cl.charName}>{characters.name} <span className={cl.charName_desc}>(это вы)</span></span>
              </label>
              <label className={cl.container_charName}>
                <span className= {cl.top_header}>Место в топе</span>
                <div className={cl.top_placeBack}>
                  <span className={cl.top_placeNumber}>0</span>
                </div>
              </label>
            </div>
            <div className = {cl.charContainer}>
              <label className={cl.container_button}>
                <span className= {cl.button_text}>₽</span>
                <span className= {cl.button_text}>ПОПОЛНИТЬ СЧЕТ</span>
              </label>
              <label className={cl.container_buttonVIP}>
              <span className= {cl.button_textVIP}>+</span>
              <span className= {cl.button_textVIP}>V I P</span>
            </label>
            </div>
          </div>
        </label>
      </ul>
    )
  }
}

export default AccountBound
