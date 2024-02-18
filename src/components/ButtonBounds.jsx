import React from 'react';
import cl from '../css/account.module.scss';
import { ReactComponent as ReputationIcon } from '../assets/rep_up.svg';
import { ReactComponent as DonateIcon } from '../assets/currencyDonate.svg';
import { ReactComponent as CurrencyIcon }  from '../assets/currencyInGame.svg';

const ButtonBounds = (props) => {
  if (props.userStalker !== null) {
    var characters = props.userStalker.ix_characters;
    var stats = props.userStalker.ix_stats;
    var info = props.userStalker.ix_players;
    var bans = props.userStalker.ix_bans;
    var ulx = props.userStalker.ix_ulx;
    var charData = characters.data;
  }

  const formatter = new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
  });

  if (characters) {
    return (
      <label className={cl.profile__button}>
        <span className={cl.button__text_header}>Репутация</span>
        <div className={cl.buttonInfo}>
          <span className={cl.button__text}>0</span>
        </div>
        <span id="rep" className={`${cl.buttonIconBackground} ${cl.rep}`}></span>
      </label>
    );
  }
};

export default ButtonBounds;
