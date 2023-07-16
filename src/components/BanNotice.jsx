import React from 'react';
import notice from '../css/notice.module.scss';

function convertUnixData(UNIX_timestamp) {
  var a = new Date(UNIX_timestamp * 1000);
  var year = a.getFullYear();
  var month = a.getMonth();
  var date = a.getDate();
  var hour = a.getHours();
  var min = a.getMinutes();
  var sec = a.getSeconds();
  var time = hour + ':' + min + ':' + sec + ' ' + date + '.' + month + '.' + year;
  return time;
}

function declOfNum(n, text_forms) {
  n = Math.abs(n) % 100;
  var n1 = n % 10;
  if (n > 10 && n < 20) {
    return text_forms[2];
  }
  if (n1 > 1 && n1 < 5) {
    return text_forms[1];
  }
  if (n1 == 1) {
    return text_forms[0];
  }
  return text_forms[2];
}

function timeConverter(UNIX_timestamp) {
  var a = new Date(UNIX_timestamp * 1000);
  return a;
}

function secondsToHms(seconds) {
  var days = Math.floor(seconds / (24 * 60 * 60));
  seconds -= days * (24 * 60 * 60);
  var hours = Math.floor(seconds / (60 * 60));
  seconds -= hours * (60 * 60);
  var minutes = Math.floor(seconds / 60);
  seconds -= minutes * 60;
  return (
    (0 < days ? days + declOfNum(days, ['день', 'дня', 'дней']) : '') +
    ' ' +
    hours +
    ' ' +
    declOfNum(hours, ['час', 'часа', 'часов']) +
    ' ' +
    minutes +
    ' ' +
    declOfNum(minutes, ['минута', 'минуты', 'минут']) +
    ' ' +
    seconds +
    ' ' +
    declOfNum(seconds, ['секунда', 'секунды', 'секунд'])
  );
}

const BanNotice = (props) => {
  const { userStalker } = props;
  if (userStalker !== null) {
    var characters = userStalker.ix_characters;
    var bans = userStalker.ix_bans;
    var nowData = new Date();

    if (bans !== undefined) {
      if (bans.duration === 0) {
        var timeToUnBan = 'вечность';
      } else {
        var unixDataNow = parseInt((nowData.getTime() / 1000).toFixed(0));
        var timeBan = Number(bans.time) + Number(bans.duration * 60);
        var timeToUnBan = timeBan - unixDataNow;
        if (timeToUnBan < 0) {
          var timeToUnBan = 'вечность';
        }
      }
    }
  }

  if (bans !== undefined) {
    if (timeToUnBan !== 'вечность') {
      return (
        <label className={notice.noticeMessage}>
          <div className={notice.noticeContainer}>
            <i className={notice.noticeIconBack}></i>
            <i className={notice.noticeIcon}></i>
            <span className={notice.noticeText}>
              К сожалению, вы были забанены. Сейчас вы не можете играть на нашем сервере.
              Причина: {bans.reason}, оставшееся время: {secondsToHms(timeToUnBan)}.
              Вы можете подать прошение о разбане, но оно может быть не удовлетворено.
            </span>
          </div>
        </label>
      );
    } else {
      return (
        <label className={notice.noticeMessage}>
          <div className={notice.noticeContainer}>
            <i className={notice.noticeIconBack}></i>
            <i className={notice.noticeIcon}></i>
            <span className={notice.noticeText}>
              К сожалению, вы были забанены. Сейчас вы не можете играть на нашем сервере.
              Причина: ingame currency trading, оставшееся время: {timeToUnBan}.
              Вы можете подать прошение о разбане, но оно может быть не удовлетворено.
            </span>
          </div>
        </label>
      );
    }
  } else {
    return <label></label>;
  }
};

export default BanNotice;
