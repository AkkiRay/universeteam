import React from "react";
import cl from '../css/steam.module.scss';

export const LogoutButton = (props) => {
  return (
    <div className={cl.steamContainer}>
      <label className={cl.dropdown__hero}>
        <div className={cl.dropdown__button}>
          <span className={cl.backGround2_steamAvatar}>
            <span className={cl.backGround_steamAvatar}>
              <img className={cl.steamAvatar} src={props.user.avatar.small} alt="Avatar" />
            </span>
          </span>
          <a className={cl.steamName}>{props.user.username}</a>
        </div>
        <input type="checkbox" className={cl.dropdown__input}></input>
        <ul className={cl.dropdown__menu}>
          <li><a className={cl.menuItem} href="/account">Профиль</a></li>
          <li><a className={cl.menuItem} href="http://194.93.2.183:2000/logout">Выйти</a></li>
        </ul>
      </label>
    </div>
  );
};
