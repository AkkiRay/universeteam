import React from 'react'
import cl from '../css/account.module.scss';
import { NavBar } from '../components/NavBar.jsx';
import AccountBound from '../components/AccountBound.jsx';
import StatsBound from '../components/StatsBound.jsx';
import BlackMarket from '../components/BlackMarket.jsx';
import BanNotice from '../components/BanNotice.jsx';

function timeConverter(UNIX_timestamp){
  var a = new Date(UNIX_timestamp * 1000);
  var months = ['Янв','Фев','Мар','Апр','Май','Июн','Июль','Авг','Сен','Окт','Ноя','Дек'];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var hour = a.getHours();
  var min = a.getMinutes();
  var sec = a.getSeconds();
  var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
  return time;
}

const Profile = (props) => {
  if (props.userStalker !== null) {
    var characters = props.userStalker.ix_characters;
    var stats = props.userStalker.ix_stats;
    var info = props.userStalker.ix_players;
    var charData = JSON.parse(characters.data);
  }
  return props.userStalker ? (
    <div>
      <NavBar userSteam={props.userSteam} userStalker={props.userStalker} />
      <BanNotice {...props}/>
      <main className = {cl.container}>
        <label className={cl.grid__section}>
          <AccountBound {...props}/>
          <StatsBound {...props}/>
          <div className={cl.Invetory_container}>
          </div>
          <BlackMarket {...props}/>
        </label>
      </main>
    </div>
  ) : (
    <div>
      <NavBar userSteam={props.userSteam} userStalker={props.userStalker} />
      <main className = {cl.container}>
        <label className={cl.errorMessage}> Чтобы зайти в профиль, вам нужно создать персонажа на сервере!</label>
      </main>
    </div>
  );
}

export default Profile
