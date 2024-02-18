import React, { useEffect, useState } from 'react';
import notice from '../css/notice.module.scss';

function declOfNum(n, text_forms) {
  n = Math.abs(n) % 100;
  var n1 = n % 10;
  if (n > 10 && n < 20) {
    return text_forms[2];
  }
  if (n1 > 1 && n1 < 5) {
    return text_forms[1];
  }
  if (n1 === 1) {
    return text_forms[0];
  }
  return text_forms[2];
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

  const [bans, setBans] = useState(null);
  const [timeToUnBan, setTimeToUnBan] = useState(0);

  useEffect(() => {
    const fetchData = () => {
      if (userStalker !== null) {
        const nowData = new Date();
        const unixDataNow = parseInt((nowData.getTime() / 1000).toFixed(0));

        const fetchedBans = userStalker.sam_bans;
        let fetchedTimeToUnBan = 0;

        if (fetchedBans !== undefined) {
          if (fetchedBans.unban_date === 0) {
            fetchedTimeToUnBan = 'вечность';
          } else {
            fetchedTimeToUnBan = new Date(fetchedBans.unban_date - unixDataNow);
            if (fetchedTimeToUnBan < 0) {
              fetchedTimeToUnBan = 'вечность';
            }
          }
        }

        setBans(fetchedBans);
        setTimeToUnBan(fetchedTimeToUnBan);
      }
    };

    // Fetch data initially
    fetchData();

    // Update data every 60 seconds (adjust the interval as needed)
    const intervalId = setInterval(fetchData, 1000);

    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, [userStalker]);


  if (bans !== undefined && bans !== null) {
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
              Причина: {bans.reason}, оставшееся время: {timeToUnBan}.
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
