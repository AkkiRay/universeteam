import React from 'react'
import cl from '../css/shop.module.scss';
import { NavBar } from '../components/NavBar.jsx';
import BanNotice from '../components/BanNotice.jsx';

const Shop = (props) => {
    return (
      <div>
        <NavBar userSteam={props.userSteam} userStalker={props.userStalker} />
        <main className = {cl.container}>
          <section className = {cl.shopContainer}>
            <label className = {cl.shopTagName}>
              Магазин
            </label>
            <span className = {cl.shopMenu}>
              <label className = {cl.shopMenu__block}>
                <span className = {cl.shopMenu__itemMoney}>
                  No Limit Money
                </span>
              </label>
              <label className = {cl.shopMenu__block}>
                <span className = {cl.shopMenu__item}>
                Package Newbie
                </span>
                <span className = {cl.shopMenu__item}>
                Package Stalker
                </span>
                <span className = {cl.shopMenu__item}>
                Package Richman
                </span>
                <span className = {cl.shopMenu__item}>
                Package Scrooge McDuck
                </span>
              </label>
            </span>
          </section>
        </main>
      </div>
    )
}

export default Shop
