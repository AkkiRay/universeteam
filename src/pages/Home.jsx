import React from 'react'
import cl from '../css/home.module.scss';
import { NavBar } from '../components/NavBar.jsx';

const Home = (props) => {
    return (
      <div>
        <NavBar userSteam={props.userSteam} userStalker={props.userStalker} />
        <main className = {cl.container}>
        </main>
      </div>
    )
}

export default Home
