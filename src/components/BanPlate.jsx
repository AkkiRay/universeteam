import React, { useEffect, useState } from 'react';
import cl from '../css/accountBound.module.scss';
import { ReactComponent as InfoIcon } from '../assets/info.svg';

const BanPlate = (props) => {
  const [bans, setBans] = useState(null);
  const [timeToUnBan, setTimeToUnBan] = useState(0);

  useEffect(() => {
    const fetchData = () => {
      if (props.userStalker !== null) {
        const nowData = new Date();
        const bansData = props.userStalker.sam_bans;

        if (bansData !== undefined) {
          const unixDataNow = parseInt((nowData.getTime() / 1000).toFixed(0));
          const fetchedTimeToUnBan = Math.floor((bansData.unban_date - unixDataNow) / 1000);

          setBans(bansData);
          setTimeToUnBan(fetchedTimeToUnBan > 0 ? fetchedTimeToUnBan : 'PERMAMENT');
        }
      }
    };

    // Fetch data initially
    fetchData();

    // Update data every 60 seconds (adjust the interval as needed)
    const intervalId = setInterval(fetchData, 60000);

    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, [props.userStalker]);

  if (bans !== undefined) {
    if (timeToUnBan === 'PERMAMENT') {
      return (
        <label className={cl.container_bans}>
          <span className={cl.bans_status_ban}>Аккаунт заблокирован<InfoIcon className={cl.bans_status_icon} /></span>
        </label>
      );
    } else {
      return (
        <label className={cl.container_bans}>
          <span className={cl.bans_status_ban}>Временно ограничен<InfoIcon className={cl.bans_status_icon} /></span>
        </label>
      );
    }
  } else {
    return (
      <label className={cl.container_bans}>
        <span className={cl.bans_status_noban}>Без ограничений<InfoIcon className={cl.bans_status_icon} /></span>
      </label>
    );
  }
};

export default BanPlate;
