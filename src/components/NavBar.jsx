import React from "react";
import cl from '../css/navbar.module.scss';
import SteamAuth from '../modules/steamAuth';
import BanNotice from '../components/BanNotice.jsx';

export const NavBar = (props) => {
  return (

    <header>
      <label className={cl.container__header}>
        <label className={cl.header__first_section}>
          <nav className={cl.first_section__nav}>
              <li className={cl.nav__item}><a href="/home">Главная</a></li>
              <li className={cl.nav__item}><a href="/home">О нас</a></li>
              <li className={cl.nav__item}><a href="/home">Магазин</a></li>
              <li className={cl.nav__item}><a href="/home">Форум</a></li>
          </nav>
                <SteamAuth userSteam={props.userSteam} userStalker={props.userStalker} />
        </label>
      </label>
      <BanNotice {...props} />
    </header>
    
  );
};
