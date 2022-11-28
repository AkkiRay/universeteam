import React from 'react'
import cl from '../css/accountBound.module.scss';

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

function declOfNum(n, text_forms) {
    n = Math.abs(n) % 100;
    var n1 = n % 10;
    if (n > 10 && n < 20) { return text_forms[2]; }
    if (n1 > 1 && n1 < 5) { return text_forms[1]; }
    if (n1 == 1) { return text_forms[0]; }
    return text_forms[2];
}


function timeConverter(UNIX_timestamp){
  var a = new Date(UNIX_timestamp * 1000);
  return a;
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


const BanPlate = (props) => {
  if (props.userStalker !== null) {
    var characters = props.userStalker.ix_characters;
    var stats = props.userStalker.ix_stats;
    var info = props.userStalker.ix_players;
    var bans = props.userStalker.ix_bans;
    var ulx = props.userStalker.ix_ulx;
    var charData = JSON.parse(characters.data);
    var nowData = new Date()
    var regData = timeConverter(characters.create_time)
    if (bans !== undefined) {
      if (bans.duration == 0) {
        timeToUnBan = 'PERMAMENT';
      } else {
        var unixDataNow = parseInt((nowData.getTime() / 1000).toFixed(0));
        var timeBan = Number(bans.time) + Number(bans.duration*60);
        var timeToUnBan = timeBan - unixDataNow;
        if (timeToUnBan < 0) {
          var timeToUnBan = 'PERMAMENT'
        }
      }
    }

  }

  if (bans !== undefined ) {
    if (timeToUnBan !== 'PERMAMENT' ) {
      return (
        <label className={cl.container_bans}>
          <span className={cl.bans_status_ban}>Заблокирован</span>
          <span className={cl.bans_time}>{secondsToHms(timeToUnBan)}</span>
        </label>
      )
    } else {
      return (
        <label className={cl.container_bans}>
          <span className={cl.bans_status_ban}>Заблокирован</span>
          <span className={cl.bans_time}>{timeToUnBan}</span>
        </label>
        )
    }
  } else {

    return (
      <label className={cl.container_bans}>
        <span className={cl.bans_status_noban}>Без ограничений</span>
      </label>
    )
  }

}

export default BanPlate
