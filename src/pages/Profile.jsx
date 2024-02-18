import React from 'react'
import cl from '../css/account.module.scss';
import { NavBar } from '../components/NavBar.jsx';
import AccountBound from '../components/AccountBound.jsx';
//import StatsBound from '../components/StatsBound.jsx';
import ButtonBounds from '../components/ButtonBounds.jsx';

/*function timeConverter(UNIX_timestamp){
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
}*/

const Profile = (props) => {
  const { userStalker, userSteam } = props;

  return (
    <div>
      <NavBar userSteam={userSteam} userStalker={userStalker} />
      {userStalker ? (
        <>
          <label className={cl.PageContainerHead}>
            <span className={cl.namePage}>ВАШ ПРОФИЛЬ</span>
            <p className={cl.descPage}>USER</p>
          </label>
          <main className={cl.container}>
            <label className={cl.grid__section}>
              <AccountBound {...props} />
              <ButtonBounds {...props} />
              <div className={cl.Invetory_container}></div>
            </label>
          </main>
        </>
      ) : (
        <main className={cl.container}>
          <label className={cl.errorMessage}>
            Чтобы зайти в профиль, вам нужно создать персонажа на сервере!
          </label>
        </main>
      )}
    </div>
  );
}

export default Profile;