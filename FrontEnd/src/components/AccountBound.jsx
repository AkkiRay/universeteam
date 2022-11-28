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
    var charData = JSON.parse(characters.data);
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

  return (
    <ul className = {cl.containerACC}>
      <span className = {cl.containerACC__container}>
        <div className={cl.container__AccountHeader}>
          <div className = {cl.AccountHeader__img}>
           <AccICON/>
          </div>
          <span>Аккаунт</span>
        </div>
        <span className = {cl.AccountHeader__faction}>{nameOfGrops[characters.faction]}</span>
      </span>
      <label className = {cl.accountBox}>
        <div className = {cl.accountBox__img}>
          <div className = {cl.characterBox__reputation}>
            <ReputationICON className={cl.value__tumbnail}/>
            <span className = {cl.reputation__value}>{characters.reputation.replace(/(.)(?=(\d{3})+$)/g,'$1,')}</span>
          </div>
          <img src={characters.pdaavatar} />
        </div>
        <label className = {cl.characterBox}>
          <div className = {cl.characterBox__itemCHAR}>
            <div className = {cl.itemCHAR__itemBlock}>
              <span className = {cl.itemCHAR__head}>Имя</span>
              <span className = {cl.itemCHAR__name}>{characters.name} <span className={cl.help_snos}>(это вы)</span></span>
              <span className={cl.itemCHAR__time}>С нами уже {timeConverterCheck(nowData,regData).number} {declOfNum(timeConverterCheck(nowData,regData).number,timeConverterCheck(nowData,regData).convstabel)}</span>
            </div>
            <span className={cl.ulx__rights}><UlxGroup/></span>
          </div>
          <div className = {cl.characterBox__itemCHAR}>
            <div className = {cl.itemCHAR__itemBlock}>
              <span className = {cl.itemBlock__currencyDonate}><DonateICON className={cl.currencyDonate__icon}/>0 UC</span>
              <a className = {cl.itemBlock__buy}>Купить</a>
              <span className={cl.itemBlock__currencyInGame}><CurrencyICON className={cl.currency__icon}/>{formatter.format(characters.money)}</span>
            </div>
            <label className={cl.itemBlock__container}>
              <div className={cl.container__lastJoin}>
                <span className={cl.lastJoin__header}>Последний вход</span>
              </div>
              <div className={cl.container__lastJoin_item}>
                <span className={cl.lastJoin_item__header}>No Data</span>
              </div>
              <div className={cl.container__lastJoin_item}>
                <span className={cl.lastJoin_item__header}>{convertUnixData(characters.last_join)}</span>
              </div>
            </label>
          </div>
        </label>
      </label>
      <BanPlate {...props}/>
    </ul>
  )
}

export default AccountBound
