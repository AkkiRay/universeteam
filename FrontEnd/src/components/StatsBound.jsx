import React from 'react'
import cl from '../css/statsBound.module.scss';
import { ReactComponent as StatsICON} from '../assets/stats.svg';

function timeConverter(UNIX_timestamp){
  var a = new Date(UNIX_timestamp * 1000);
  var months = ['Янв','Фев','Мар','Апр','Май','Июн','Июль','Авг','Сен','Окт','Ноя','Дек'];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var hour = a.getHours();
  var min = a.getMinutes();
  var sec = a.getSeconds();
  var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
  return time;
}

const formatter = new Intl.NumberFormat('ru-RU', {
  style: 'currency',
  currency: 'RUB',
});


const StatsBound = (props) => {
  if (props.userStalker !== null) {
    var characters = props.userStalker.ix_characters;
    var stats = props.userStalker.ix_stats;
    var info = props.userStalker.ix_players;
    var charData = JSON.parse(characters.data);
  }
  var killanddeaths = Number(stats.playerkills)/Number(stats.deaths)
  return (
    <div className={cl.container__stats}>
      <span className = {cl.containerACC}>
        <div className={cl.containerACC__container}>
          <div className = {cl.stats__header}>
            <StatsICON/>
          </div>
          <span>Статистика</span>
        </div>
      </span>
      <label className={cl.stats__list}>
        <li className={cl.list__item}><span>Предметов найдено</span><label>{stats.looted}</label></li>
        <li className={cl.list__item__v2}><span>Игроков убито</span><label>{stats.playerkills}</label></li>
        <li className={cl.list__item}><span>NPC убито</span><label>{stats.npckills}</label></li>
        <li className={cl.list__item__v2}><span>Кол-во смертей</span><label>{stats.deaths}</label></li>
        <li className={cl.list__item}><span>Квестов выполнено</span><label>{stats.questended}</label></li>
        <li className={cl.list__item__v2}><span>Артефактов найдено</span><label>{stats.lootedartifacts}</label></li>
        <li className={cl.list__item}><span>Денег заработано</span><label>{formatter.format(stats.moneycollect)}</label></li>
        <li className={cl.list__item__v2}><span>Денег потрачено</span><label>{formatter.format(stats.moneyspent)}</label></li>
      </label>
      <span className = {cl.stats__kdaContainer}>
        <div className={cl.kdaContainer__KDA}>
          <span>K/D: {killanddeaths ? (killanddeaths.toFixed(2)) : (0)}</span>
        </div>
      </span>
    </div>
  )
}

export default StatsBound
