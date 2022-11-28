import React from "react";
import cl from '../css/account.module.scss';

export const BlackMarket = (props) => {
  if (props.userStalker !== null) {
    var characters = props.userStalker.ix_characters;
    var stats = props.userStalker.ix_stats;
    var info = props.userStalker.ix_players;
    var bans = props.userStalker.ix_bans;
  }
  return bans ? (
    <span></span>
  ) : (
    <div className={cl.blackMarket_container}>
      <label className={cl.blackMarket_name}>Черный рынок</label>
      <span className={cl.blackMarket_desc}>Заходи сталкер!</span>
      <label className={cl.blackMarket_timeBlock}>
        <span className={cl.timeBlock__name}>Осталось</span>
        <span className={cl.timeBlock__time}>1:00</span>
      </label>
    </div>
  );
};

export default BlackMarket
