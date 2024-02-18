import React, { useEffect, useState } from 'react';
import cl from '../css/accountBound.module.scss';
import BanPlate from './BanPlate.jsx';

const AccountBound = (props) => {
  const [characters, setCharacters] = useState(null);
  const [samGroup, setSamGroup] = useState('user');

  useEffect(() => {
    const fetchData = () => {
      if (props.userStalker !== null) {
        const samData = props.userStalker.sam_players;
        const charData = props.userStalker.ix_characters;

        if (charData) {
          setCharacters(charData);
        }

        if (samData) {
          setSamGroup(samData.rank || 'user');
        }
      }
    };
    fetchData();

    const intervalId = setInterval(fetchData, 60000);

    return () => clearInterval(intervalId);
  }, [props.userStalker]);

  if (characters) {
    return (
      <ul>
        <label className={cl.profile}>
          <BanPlate {...props} />
          <div className={cl.profile__container}>
            <div className={cl.charContainer}>
              <label className={cl.container_charName}>
                <span className={cl.charName_header}>Никнейм в игре</span>
                <span className={cl.charName}>
                  {characters.name} <span className={cl.charName_desc}>(это вы)</span>
                </span>
                <span className={cl.charTimeWithUs}>{samGroup}</span>
              </label>
              <label className={cl.container_charName}>
                <span className={cl.top_header}>Место в топе</span>
                <div className={cl.top_placeBack}>
                  <span className={cl.top_placeNumber}>0</span>
                </div>
              </label>
            </div>
            <div className={cl.charContainer}>
              <label className={cl.container_button}>
                <span className={cl.button_text}>₽</span>
                <span className={cl.button_text}>ПОПОЛНИТЬ СЧЕТ</span>
              </label>
              <label className={cl.container_buttonVIP}>
                <span className={cl.button_textVIP}>+</span>
                <span className={cl.button_textVIP}>V I P</span>
              </label>
            </div>
          </div>
        </label>
      </ul>
    );
  } else {
    return null; // You may want to handle the case where characters are not available
  }
};

export default AccountBound;
