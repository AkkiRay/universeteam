import React from "react";
import cl from '../css/steam.module.scss';
import { ReactComponent as SteamICON} from '../assets/steamAuth.svg';

export const LoginButton = () => {
  return (
    <div className={cl.steamContainer}>
      <label className={cl.dropdown__hero}>
        <div className={cl.dropdown__button}>
        </div>
        <div onClick={() => (window.location.href = "http://localhost:2000/authenticate")} className={cl.btn}>
          <div className={cl.eff}></div>
          <a className={cl.button__SteamName}><SteamICON className={cl.steamICON}/> Войти</a>
        </div>
      </label>
    </div>
  );
};
