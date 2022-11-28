import React, { useEffect, useState } from "react";
import { LogoutButton } from "../components/LogoutButton";
import { LoginButton } from "../components/LoginButton";
import axios from 'axios';
import cl from '../css/steam.module.scss';

//sibling1
const Steam = ({...props}) => {
  return props.userSteam ? (
    <LogoutButton {...props} user={props.userSteam} />
  ) : (
    <LoginButton />
  );
}

export default Steam
